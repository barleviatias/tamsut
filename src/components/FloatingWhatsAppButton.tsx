import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteText } from '../config';
import { trackWhatsAppClick } from '../services/googleAnalytics';

export default function FloatingWhatsAppButton() {
	const handleWhatsAppClick = () => {
		// Track WhatsApp click for analytics and conversions
		trackWhatsAppClick();
	};

	return (
		<motion.a
			href={`https://wa.link/61sj5y`}
			target="_blank"
			rel="noopener noreferrer"
			onClick={handleWhatsAppClick}
			className="fixed bottom-8 right-8 z-50"
			initial={{ opacity: 0, scale: 0.8, x: 20 }}
			animate={{ opacity: 1, scale: 1, x: 0 }}
			transition={{ duration: 0.5, delay: 1 }}
			whileHover={{ scale: 1.1, x: -5 }}>
			<div className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
				<MessageCircle size={34} />
			</div>
		</motion.a>
	);
}
