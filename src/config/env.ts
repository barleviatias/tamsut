// Environment variable configurations with defaults
export const env = {
	HUBSPOT_ACCESS_TOKEN: import.meta.env.VITE_HUBSPOT_ACCESS_TOKEN || '',
	// Google Tag Manager ID
	GTM_ID: import.meta.env.VITE_GTM_ID || 'GTM-PDJP4NWF', // Your GTM Container ID
	// WhatsApp Configuration
	WHATSAPP_PHONE: import.meta.env.VITE_WHATSAPP_PHONE || '972507282180',
};
