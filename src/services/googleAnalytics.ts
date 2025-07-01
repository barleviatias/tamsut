import { env } from '../config';

// Declare dataLayer for TypeScript
declare global {
	interface Window {
		dataLayer: any[];
	}
}

// Initialize Google Tag Manager dataLayer
export const initializeGA = () => {
	// Initialize dataLayer if it doesn't exist
	window.dataLayer = window.dataLayer || [];

	// GTM is already initialized by the script in SEO component
	// This function can be used for additional initialization if needed
	console.log('GTM DataLayer initialized:', env.GTM_ID);
};

// Track page views using GTM dataLayer
export const trackPageView = (url: string, title?: string) => {
	if (typeof window !== 'undefined' && window.dataLayer) {
		window.dataLayer.push({
			event: 'page_view',
			page_path: url,
			page_title: title || document.title,
			page_location: window.location.href,
		});
	}
};

// Track custom events using GTM dataLayer
export const trackEvent = (
	eventName: string,
	parameters?: {
		event_category?: string;
		event_label?: string;
		value?: number;
		[key: string]: any;
	}
) => {
	if (typeof window !== 'undefined' && window.dataLayer) {
		window.dataLayer.push({
			event: eventName,
			...parameters,
		});
	}
};

// Track conversions using GTM dataLayer
export const trackConversion = (
	conversionLabel: string,
	value?: number,
	currency = 'ILS'
) => {
	if (typeof window !== 'undefined' && window.dataLayer) {
		window.dataLayer.push({
			event: 'conversion',
			conversion_label: conversionLabel,
			value: value,
			currency: currency,
		});
	}
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
	trackEvent('form_submit', {
		event_category: 'engagement',
		event_label: formName,
	});
};

// Track contact attempts
export const trackContactAttempt = (
	method: 'phone' | 'whatsapp' | 'email' | 'form'
) => {
	trackEvent('contact_attempt', {
		event_category: 'conversion',
		event_label: method,
		value: 1,
	});
};

// Track phone calls
export const trackPhoneCall = () => {
	trackContactAttempt('phone');

	// Track as conversion (you can set the conversion label in GTM)
	trackConversion('phone_call');
};

// Track WhatsApp clicks
export const trackWhatsAppClick = () => {
	trackContactAttempt('whatsapp');

	// Track as conversion (you can set the conversion label in GTM)
	trackConversion('whatsapp_click');
};

// Track email clicks
export const trackEmailClick = () => {
	trackContactAttempt('email');

	// Track as conversion (you can set the conversion label in GTM)
	trackConversion('email_click');
};

// Enhanced tracking for enhanced ecommerce (if needed)
export const trackEnhancedEvent = (eventName: string, eventData: any) => {
	if (typeof window !== 'undefined' && window.dataLayer) {
		window.dataLayer.push({
			event: eventName,
			...eventData,
		});
	}
};
