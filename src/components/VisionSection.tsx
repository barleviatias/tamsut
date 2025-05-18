import React from 'react';
import { motion } from 'framer-motion';

export default function VisionSection() {
	return (
		<motion.section
			id="about"
			className="py-16 bg-white"
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8 }}>
			<div className="container mx-auto px-4">
				<motion.div
					className="max-w-3xl mx-auto text-center"
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.6 }}>
					<h2 className="text-3xl font-bold text-[#23494E] mb-6">החזון שלנו</h2>
					<motion.p
						className="text-lg text-gray-700 leading-relaxed mb-6"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4, duration: 0.6 }}>
						"לשנות את הדרך בה אנשים חווים את מערכת המשפט לתעבורה, תוך שילוב של
						יחס אישי, שקיפות, תמיכה והכוונה מקצועית."
					</motion.p>
					<motion.p
						className="text-md text-gray-600"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.6, duration: 0.6 }}>
						אנו מאמינים כי כל אדם זכאי להגנה משפטית מקצועית ולליווי אישי
						בהתמודדות עם מערכת המשפט. המשרד שלנו מתמחה במתן מענה מקיף לכל סוגי
						העבירות בתחום התעבורה, תוך שמירה על האינטרסים של לקוחותינו ומציאת
						הפתרון המיטבי עבורם.
					</motion.p>
				</motion.div>
			</div>
		</motion.section>
	);
}
