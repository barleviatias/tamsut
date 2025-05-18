import React from 'react';
import { motion } from 'framer-motion';
import TestimonialsCarousel from './TestimonialsCarousel';

export default function TestimonialsSection() {
	return (
		<motion.section
			id="testimonials"
			className="py-16 bg-[#23494E] text-white"
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8 }}>
			<div className="container mx-auto px-4">
				<motion.h2
					className="text-3xl font-bold text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}>
					לקוחות ממליצים
				</motion.h2>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<TestimonialsCarousel />
				</motion.div>
			</div>
		</motion.section>
	);
}
