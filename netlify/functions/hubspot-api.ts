import { Client } from '@hubspot/api-client';
import fetch from 'node-fetch';

// Rate limiting store
const rateLimit = new Map<string, { count: number; resetTime: number }>();

// Clean old entries every hour
setInterval(() => {
	const now = Date.now();
	for (const [key, value] of rateLimit.entries()) {
		if (now > value.resetTime) {
			rateLimit.delete(key);
		}
	}
}, 3600000);

interface LeadContact {
	name: string;
	phone: string;
	email?: string;
	type?: string;
	details?: string;
	source?: string;
}

interface NetlifyEvent {
	path: string;
	httpMethod: string;
	headers: { [header: string]: string };
	queryStringParameters: { [param: string]: string } | null;
	body: string;
	isBase64Encoded: boolean;
}

interface HandlerResponse {
	statusCode: number;
	headers?: { [header: string]: string | number | boolean };
	body: string;
	isBase64Encoded?: boolean;
}

exports.handler = async (
	event: NetlifyEvent
): Promise<HandlerResponse> => {
	// Whitelist of allowed origins
	const allowedOrigins = [
		'https://tamsut-law.co.il',
		'https://www.tamsut-law.co.il',
		'http://localhost:3000',
		'http://localhost:8888'
	];

	const origin = event.headers.origin || event.headers.Origin || '';
	const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

	// Set CORS headers with restricted origin
	const headers = {
		'Access-Control-Allow-Origin': allowOrigin,
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Max-Age': '86400', // 24 hours
	};

	// Handle preflight OPTIONS request
	if (event.httpMethod === 'OPTIONS') {
		return {
			statusCode: 200,
			headers,
			body: '',
		};
	}

	// Only allow POST requests
	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			headers,
			body: JSON.stringify({ error: 'Method not allowed' }),
		};
	}

	try {
		// Rate limiting check
		const clientIP = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
		const rateLimitResult = checkRateLimit(clientIP);

		if (!rateLimitResult.allowed) {
			return {
				statusCode: 429,
				headers: {
					...headers,
					'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
				},
				body: JSON.stringify({
					error: 'Too many requests. Please try again later.',
					retryAfter: rateLimitResult.resetTime
				}),
			};
		}

		// Validate request body exists
		if (!event.body || event.body.trim() === '') {
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({ error: 'Request body is required' }),
			};
		}

		// Prevent large payloads (max 10KB)
		if (event.body.length > 10240) {
			return {
				statusCode: 413,
				headers,
				body: JSON.stringify({ error: 'Payload too large' }),
			};
		}

		let payload;
		try {
			payload = JSON.parse(event.body);
		} catch (e) {
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({ error: 'Invalid JSON payload' }),
			};
		}
		const { action } = payload;

		// Basic request validation
		if (!payload || typeof payload !== 'object') {
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({ error: 'Invalid request payload' }),
			};
		}

		// HubSpot API configuration
		const hubspotClient = new Client({
			accessToken: process.env.VITE_HUBSPOT_ACCESS_TOKEN || '',
		});

		// Handle different actions
		// Validate honeypot
		if (!validateHoneypot(payload)) {
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({ error: 'Invalid request' }),
			};
		}

		switch (action) {
			case 'add-lead': {
				// Verify reCAPTCHA v3
				if (payload.recaptchaToken) {
					const recaptchaResult = await verifyRecaptcha(payload.recaptchaToken);
					if (!recaptchaResult.success) {
						console.log('reCAPTCHA verification failed:', recaptchaResult);
						return {
							statusCode: 400,
							headers,
							body: JSON.stringify({
								error: 'reCAPTCHA verification failed',
								score: recaptchaResult.score,
								action: recaptchaResult.action
							}),
						};
					}
					console.log(`reCAPTCHA verification passed. Score: ${recaptchaResult.score}`);
				} else {
					return {
						statusCode: 400,
						headers,
						body: JSON.stringify({ error: 'reCAPTCHA token required' }),
					};
				}

				// Validate contact data
				const validation = validateContactData(payload.contactData);
				if (!validation.valid) {
					return {
						statusCode: 400,
						headers,
						body: JSON.stringify({ error: validation.error }),
					};
				}
				return await handleAddLead(payload.contactData, hubspotClient, headers);
			}
			case 'update-contact':
				return await handleUpdateContact(
					payload.email,
					payload.data,
					hubspotClient,
					headers
				);
			default:
				return {
					statusCode: 400,
					headers,
					body: JSON.stringify({ error: 'Invalid action' }),
				};
		}
	} catch (error) {
		console.error('Error in HubSpot API function:', error);
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({
				error: error instanceof Error ? error.message : 'Unknown error',
			}),
		};
	}
};

// Rate limiting function
function checkRateLimit(clientIP: string): { allowed: boolean; resetTime: number } {
	const now = Date.now();
	const windowMs = 15 * 60 * 1000; // 15 minutes
	const maxRequests = 5; // Max 5 requests per 15 minutes per IP

	const key = `${clientIP}`;
	const current = rateLimit.get(key);

	if (!current || now > current.resetTime) {
		// Create new or reset expired entry
		rateLimit.set(key, { count: 1, resetTime: now + windowMs });
		return { allowed: true, resetTime: now + windowMs };
	}

	if (current.count >= maxRequests) {
		return { allowed: false, resetTime: current.resetTime };
	}

	// Increment count
	current.count++;
	rateLimit.set(key, current);
	return { allowed: true, resetTime: current.resetTime };
}

// Request validation functions
function validateContactData(contactData: LeadContact): { valid: boolean; error?: string } {
	// Check required fields
	if (!contactData.name || typeof contactData.name !== 'string' || contactData.name.trim().length < 2) {
		return { valid: false, error: 'Invalid or missing name' };
	}

	if (!contactData.phone || typeof contactData.phone !== 'string' || contactData.phone.trim().length < 8) {
		return { valid: false, error: 'Invalid or missing phone number' };
	}

	// Validate phone format (basic)
	const phoneRegex = /^[+]?[\d\s\-()]{8,20}$/;
	if (!phoneRegex.test(contactData.phone.trim())) {
		return { valid: false, error: 'Invalid phone number format' };
	}

	// Validate email if provided
	if (contactData.email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(contactData.email)) {
			return { valid: false, error: 'Invalid email format' };
		}
	}

	// Validate name doesn't contain suspicious content
	const suspiciousPatterns = [
		/https?:\/\//i,
		/[<>]/,
		/script/i,
		/javascript/i,
		/\btest\b.*\btest\b/i,
		/^(.)\1{4,}/, // Repeated characters
	];

	for (const pattern of suspiciousPatterns) {
		if (pattern.test(contactData.name)) {
			return { valid: false, error: 'Invalid input detected' };
		}
	}

	// Check for spam-like patterns in details
	if (contactData.details) {
		if (contactData.details.length > 1000) {
			return { valid: false, error: 'Message too long' };
		}

		const spamPatterns = [
			/(?:https?:\/\/|www\.)[^\s]+/gi, // URLs
			/[A-Z]{20,}/, // Long strings of caps
			/(.)\1{10,}/, // Repeated characters
			/\b(?:viagra|cialis|casino|lottery|winner|congratulations|click here|free money)\b/gi,
		];

		for (const pattern of spamPatterns) {
			if (pattern.test(contactData.details)) {
				return { valid: false, error: 'Suspicious content detected' };
			}
		}
	}

	return { valid: true };
}

// Honeypot validation
function validateHoneypot(payload: any): boolean {
	// Check for honeypot fields that should be empty
	const honeypotFields = ['website', 'url', 'link', 'address', 'company'];

	for (const field of honeypotFields) {
		if (payload[field] && payload[field].trim() !== '') {
			return false; // Bot detected
		}
	}

	return true;
}

// reCAPTCHA v3 verification with detailed scoring
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number; action?: string }> {
	try {
		const secretKey = process.env.VITE_RECAPTCHA_SECRET_KEY;

		if (!secretKey) {
			console.error('reCAPTCHA secret key not configured');
			return { success: false };
		}

		const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `secret=${secretKey}&response=${token}`,
		});

		const data = await response.json() as {
			success: boolean;
			score?: number;
			action?: string;
			'error-codes'?: string[];
		};
		console.log('reCAPTCHA verification result:', data);

		// For reCAPTCHA v3, verify success, score, and action
		if (!data.success) {
			console.error('reCAPTCHA verification failed:', data['error-codes']);
			return { success: false };
		}

		// Check if it's v3 (has score) or v2 (no score)
		if (data.score !== undefined) {
			// reCAPTCHA v3 - check score (0.0 = bot, 1.0 = human)
			const minScore = 0.5; // Adjust this threshold as needed
			const isHuman = data.score >= minScore;

			console.log(`reCAPTCHA v3 score: ${data.score}, action: ${data.action}, human: ${isHuman}`);

			// Also verify the action matches what we expect
			const expectedAction = 'contact_form';
			const actionValid = data.action === expectedAction;

			if (!actionValid) {
				console.warn(`reCAPTCHA action mismatch: expected ${expectedAction}, got ${data.action}`);
			}

			return {
				success: isHuman && actionValid,
				score: data.score,
				action: data.action
			};
		} else {
			// reCAPTCHA v2 - just check success
			return { success: true };
		}
	} catch (error) {
		console.error('reCAPTCHA verification error:', error);
		return { success: false };
	}
}

async function handleAddLead(
	contactData: LeadContact,
	hubspotClient: Client,
	headers: Record<string, string>
): Promise<HandlerResponse> {
	try {
		// Prepare properties for HubSpot contact
		const properties: Record<string, string> = {
			firstname: contactData.name.split(' ')[0] || '',
			lastname: contactData.name.split(' ').slice(1).join(' ') || '',
			phone: contactData.phone,
		};

		// Add email if provided, otherwise use placeholder
		if (contactData.email) {
			properties.email = contactData.email;
		} else {
			// HubSpot requires either email or phone as unique identifier
			// Use phone as the identifier
			properties.email = `${contactData.phone.replace(/\D/g, '')}@placeholder.com`;
		}

		// Add custom properties
		if (contactData.source) {
			properties.hs_lead_source = contactData.source;
		}

		if (contactData.details) {
			properties.message = contactData.details;
		}

		if (contactData.type) {
			properties.contact_type = contactData.type;
		}

		// Create contact in HubSpot
		const response = await hubspotClient.crm.contacts.basicApi.create({
			properties: properties,
			associations: []
		});

		console.log('Contact added to HubSpot successfully:', response);

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({ success: true }),
		};
	} catch (error: any) {
		// Handle duplicate contact error (contact already exists)
		if (error?.body?.category === 'CONFLICT') {
			console.log('Contact already exists in HubSpot, updating instead');
			// If contact exists, you could update it here
			return {
				statusCode: 200,
				headers,
				body: JSON.stringify({ success: true, message: 'Contact already exists' }),
			};
		}

		console.error('Error adding contact to HubSpot:', error);
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({
				error: error instanceof Error ? error.message : 'Unknown error',
			}),
		};
	}
}

async function handleUpdateContact(
	email: string,
	data: Partial<LeadContact>,
	hubspotClient: Client,
	headers: Record<string, string>
): Promise<HandlerResponse> {
	try {
		// Prepare properties for update
		const properties: Record<string, string> = {};

		if (data.name) {
			properties.firstname = data.name.split(' ')[0] || '';
			properties.lastname = data.name.split(' ').slice(1).join(' ') || '';
		}

		if (data.phone) {
			properties.phone = data.phone;
		}

		if (data.type) {
			properties.contact_type = data.type;
		}

		if (data.details) {
			properties.message = data.details;
		}

		// Search for contact by email first
		const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
			filterGroups: [{
				filters: [{
					propertyName: 'email',
					operator: 'EQ',
					value: email
				}]
			}],
			properties: ['email'],
			limit: 1
		});

		if (searchResponse.results && searchResponse.results.length > 0) {
			const contactId = searchResponse.results[0].id;

			// Update the contact
			await hubspotClient.crm.contacts.basicApi.update(contactId, {
				properties: properties
			});

			console.log('Contact updated in HubSpot successfully');

			return {
				statusCode: 200,
				headers,
				body: JSON.stringify({ success: true }),
			};
		} else {
			return {
				statusCode: 404,
				headers,
				body: JSON.stringify({ error: 'Contact not found' }),
			};
		}
	} catch (error) {
		console.error('Error updating contact in HubSpot:', error);
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({
				error: error instanceof Error ? error.message : 'Unknown error',
			}),
		};
	}
}
