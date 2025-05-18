const SibApiV3Sdk = require('@getbrevo/brevo');

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

interface NetlifyContext {
	callbackWaitsForEmptyEventLoop: boolean;
	functionName: string;
	functionVersion: string;
	// other context properties
}

interface HandlerResponse {
	statusCode: number;
	headers?: { [header: string]: string | number | boolean };
	body: string;
	isBase64Encoded?: boolean;
}

exports.handler = async (
	event: NetlifyEvent,
	context: NetlifyContext
): Promise<HandlerResponse> => {
	// Set CORS headers
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
		const payload = JSON.parse(event.body);
		const { action } = payload;

		// Brevo API configuration
		const apiInstance = new SibApiV3Sdk.ContactsApi();
		apiInstance.setApiKey(
			SibApiV3Sdk.ContactsApiApiKeys.apiKey,
			process.env.VITE_BREVO_API_KEY || ''
		);

		// Handle different actions
		switch (action) {
			case 'add-lead':
				return await handleAddLead(payload.contactData, apiInstance, headers);
			case 'update-contact':
				return await handleUpdateContact(
					payload.email,
					payload.data,
					apiInstance,
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
		console.error('Error in Brevo API function:', error);
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({
				error: error instanceof Error ? error.message : 'Unknown error',
			}),
		};
	}
};

async function handleAddLead(
	contactData: LeadContact,
	apiInstance: any,
	headers: Record<string, string>
): Promise<HandlerResponse> {
	try {
		// Create an instance of the API class
		const createContact = new SibApiV3Sdk.CreateContact();

		// Prepare the contact data
		createContact.email =
			contactData.email ||
			`${contactData.phone.replace(/\D/g, '')}@placeholder.com`;

		// Create attributes with proper typing
		const attributes: Record<string, string> = {
			FIRSTNAME: contactData.name.split(' ')[0] || '',
			LASTNAME: contactData.name.split(' ').slice(1).join(' ') || '',
			PHONE: contactData.phone,
			SOURCE: contactData.source || 'website',
		};

		// Add type if present
		if (contactData.type) {
			attributes.CONTACT_TYPE = contactData.type;
			attributes.TYPE = contactData.type;
			attributes.INQUIRY_TYPE = contactData.type;
		}

		// Add details if present
		if (contactData.details) {
			attributes.DETAILS = contactData.details;
			attributes.MESSAGE = contactData.details;
		}

		createContact.attributes = attributes;

		// Add to the leads list
		createContact.listIds = [
			parseInt(process.env.VITE_BREVO_LEADS_LIST_ID || '2'),
		];

		// Call the Brevo API to create the contact
		const response = await apiInstance.createContact(createContact);
		console.log('Contact added to Brevo successfully:', response);

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({ success: true }),
		};
	} catch (error) {
		console.error('Error adding contact to Brevo:', error);
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
	apiInstance: any,
	headers: Record<string, string>
): Promise<HandlerResponse> {
	try {
		// Create an instance of the API class
		const updateContact = new SibApiV3Sdk.UpdateContact();

		// Prepare the update data with proper typing
		const attributes: Record<string, string> = {};
		updateContact.attributes = attributes;

		if (data.name) {
			attributes.FIRSTNAME = data.name.split(' ')[0] || '';
			attributes.LASTNAME = data.name.split(' ').slice(1).join(' ') || '';
		}

		if (data.phone) {
			attributes.PHONE = data.phone;
		}

		if (data.type) {
			attributes.CONTACT_TYPE = data.type;
			attributes.TYPE = data.type;
			attributes.INQUIRY_TYPE = data.type; // Try multiple formats to ensure compatibility
		}

		if (data.details) {
			attributes.DETAILS = data.details;
			attributes.MESSAGE = data.details;
		}

		// Call the Brevo API to update the contact
		await apiInstance.updateContact(email, updateContact);
		console.log('Contact updated in Brevo successfully');

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({ success: true }),
		};
	} catch (error) {
		console.error('Error updating contact in Brevo:', error);
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({
				error: error instanceof Error ? error.message : 'Unknown error',
			}),
		};
	}
}
