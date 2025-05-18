import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteText } from '../config';

export default function FloatingWhatsAppButton() {
	return (
		<motion.a
			href={`https://wa.me/${siteText.contact.whatsapp}`}
			target="_blank"
			rel="noopener noreferrer"
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
