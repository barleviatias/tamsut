// Type for lead contact data
export interface LeadContact {
	name: string;
	phone: string;
	email?: string;
	type?: string;
	details?: string;
	source?: string;
}

/**
 * Add a contact to Brevo list and tag them as a lead
 */
export const addLeadToBrevo = async (
	contactData: LeadContact
): Promise<boolean> => {
	try {
		// Determine if we're in development mode without netlify functions
		const isDev = import.meta.env.DEV;
		const isLocalDev = isDev && window.location.port === '3000';

		let response;

		if (isLocalDev) {
			// In local development without netlify functions, mock the API call
			console.log('DEV MODE: Mocking Brevo API call with data:', contactData);
			// Simulate a successful API response
			response = {
				ok: true,
				json: async () => ({ success: true }),
			} as Response;
		} else {
			// Call the Netlify function endpoint
			response = await fetch('/.netlify/functions/brevo-api', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					action: 'add-lead',
					contactData,
				}),
			});
		}

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			console.error('Server response:', errorData);
			throw new Error(
				`Failed to add contact to Brevo: ${errorData.error || 'Unknown error'}`
			);
		}

		return true;
	} catch (error) {
		console.error('Error adding contact to Brevo:', error);

		// For local development, return success even if there's an error
		const isDev = import.meta.env.DEV;
		const isLocalDev = isDev && window.location.port === '3000';
		if (isLocalDev) {
			console.log('DEV MODE: Simulating successful submission despite error');
			return true;
		}

		return false;
	}
};

/**
 * Update an existing contact in Brevo
 */
export const updateBrevoContact = async (
	email: string,
	data: Partial<LeadContact>
): Promise<boolean> => {
	try {
		// Determine if we're in development mode without netlify functions
		const isDev = import.meta.env.DEV;
		const isLocalDev = isDev && window.location.port === '3000';

		let response;

		if (isLocalDev) {
			// In local development without netlify functions, mock the API call
			console.log('DEV MODE: Mocking Brevo API update with data:', {
				email,
				data,
			});
			// Simulate a successful API response
			response = {
				ok: true,
				json: async () => ({ success: true }),
			} as Response;
		} else {
			// Call the Netlify function endpoint
			response = await fetch('/.netlify/functions/brevo-api', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					action: 'update-contact',
					email,
					data,
				}),
			});
		}

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			console.error('Server response:', errorData);
			throw new Error(
				`Failed to update contact in Brevo: ${
					errorData.error || 'Unknown error'
				}`
			);
		}

		return true;
	} catch (error) {
		console.error('Error updating contact in Brevo:', error);

		// For local development, return success even if there's an error
		const isDev = import.meta.env.DEV;
		const isLocalDev = isDev && window.location.port === '3000';
		if (isLocalDev) {
			console.log('DEV MODE: Simulating successful update despite error');
			return true;
		}

		return false;
	}
};

export default {
	addLeadToBrevo,
	updateBrevoContact,
};
