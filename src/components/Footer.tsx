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
						<a
							href="tel:050-7282180"
							className="flex flex-col items-center mr-8 hover:text-blue-500"
							aria-label="Call 050-7282180"
						>
							<Phone className="w-6 h-6 mb-2" />
							<span>050-7282180</span>
						</a>

						<a
							href="mailto:tamsutlaw@gmail.com"
							className="flex flex-col items-center mx-8 hover:text-blue-500"
							aria-label="Email tamsutlaw@gmail.com"
						>
							<Mail className="w-6 h-6 mb-2" />
							<span>tamsutlaw@gmail.com</span>
						</a>

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
