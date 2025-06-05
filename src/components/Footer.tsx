import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
	return (
		<motion.footer
			className="bg-[#23494E] text-white py-8"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8 }}>
			<div className="container mx-auto px-4">
				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}>
					<p className="mb-6 max-w-2xl mx-auto">
						אנו מתחייבים לשמירה על פרטיותך ולשקיפות מלאה לאורך כל התהליך. המשרד
						שלנו דוגל במקצועיות, אמינות ושירות אישי לכל לקוח.
					</p>
					<div className="flex justify-center items-center mb-4">
						<div className="flex flex-col items-center mr-8">
							<Phone className="w-6 h-6 mb-2" />
							<span>050-7282180</span>
						</div>
						<div className="flex flex-col items-center ml-8 mr-8">
							<Mail className="w-6 h-6 mb-2" />
							<span>tamsutlaw@gmail.com</span>
						</div>
						<div className="flex flex-col items-center ml-8">
							<MapPin className="w-6 h-6 mb-2" />
							<span>פריסה ארצית</span>
						</div>
					</div>
				</motion.div>
			</div>
		</motion.footer>
	);
}
