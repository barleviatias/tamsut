// Environment variable configurations with defaults
export const env = {
	BREVO_API_KEY: import.meta.env.VITE_BREVO_API_KEY || '',
	BREVO_LEADS_LIST_ID: import.meta.env.VITE_BREVO_LEADS_LIST_ID || '2',
	// Google Tag Manager ID
	GTM_ID: import.meta.env.VITE_GTM_ID || 'GTM-PDJP4NWF', // Your GTM Container ID
};
