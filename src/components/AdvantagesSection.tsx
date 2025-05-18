import React from 'react';
import { Shield, UserCheck, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdvantagesSection() {
	return (
		<motion.section
			className="py-16 bg-[#8CAE9D]/10"
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8 }}>
			<div className="container mx-auto px-4">
				<motion.h2
					className="text-3xl font-bold text-center text-[#23494E] mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}>
					היתרונות שלנו
				</motion.h2>
				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					{[
						{
							icon: Shield,
							title: 'ניסיון מקצועי',
							description:
								'ניסיון עשיר כחוקר ובוחן בשירותו הצבאי, המעניק לנו יתרון משמעותי בהבנת המערכת מבפנים',
						},
						{
							icon: UserCheck,
							title: 'שירות בוטיקי',
							description:
								'יחס אישי ומותאם לצרכי כל לקוח, עם זמינות גבוהה ותקשורת ישירה לאורך כל התהליך',
						},
						{
							icon: Scale,
							title: 'ליווי מקצועי',
							description:
								'תמיכה והכוונה מקצועית לאורך כל התהליך המשפטי, עם דגש על שקיפות מלאה והסברים ברורים',
						},
					].map((item, index) => (
						<motion.div
							key={index}
							className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.2, duration: 0.6 }}
							whileHover={{ scale: 1.02 }}>
							<item.icon className="w-12 h-12 text-[#C68A3B] mb-4 mx-auto" />
							<h3 className="text-xl font-bold text-[#23494E] mb-3 text-center">
								{item.title}
							</h3>
							<p className="text-gray-600 text-center">{item.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
