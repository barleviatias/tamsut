import React, { useState } from 'react';
import {
	Wine,
	User,
	FileText,
	Car,
	AlertOctagon,
	BadgeAlert,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { siteText } from '../config';

export default function ServicesSection() {
	const [expandedServices, setExpandedServices] = useState<number[]>([]);

	const toggleServiceExpansion = (index: number) => {
		setExpandedServices((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	return (
		<motion.section
			id="services"
			className="py-16 bg-white"
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
					תחומי התמחות
				</motion.h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{[
						{
							icon: Wine,
							title: siteText.services.drunkDriving.title,
							description: siteText.services.drunkDriving.description,
						},
						{
							icon: User,
							title: siteText.services.newDriver.title,
							description: siteText.services.newDriver.description,
						},
						{
							icon: FileText,
							title: siteText.services.trafficTickets.title,
							description: siteText.services.trafficTickets.description,
						},
						{
							icon: Car,
							title: siteText.services.carAccidents.title,
							description: siteText.services.carAccidents.description,
						},
						{
							icon: AlertOctagon,
							title: siteText.services.administrativeImmobilization.title,
							description:
								siteText.services.administrativeImmobilization.description,
						},
						{
							icon: BadgeAlert,
							title: siteText.services.administrativeSuspension.title,
							description:
								siteText.services.administrativeSuspension.description,
						},
					].map((item, index) => (
						<motion.div
							key={index}
							className="bg-[#F8EFE5] p-6 rounded-lg text-center hover:bg-[#F8EFE5]/80 transition-colors duration-300"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.2, duration: 0.6 }}
							whileHover={{ scale: 1.05 }}>
							<item.icon className="w-12 h-12 text-[#C68A3B] mb-4 mx-auto" />
							<h3 className="text-xl font-bold text-[#23494E]">{item.title}</h3>
							<div className="text-sm text-gray-600 mt-2">
								{expandedServices.includes(index)
									? item.description
									: item.description.slice(0, 100) + '...'}
								<button
									onClick={() => toggleServiceExpansion(index)}
									className="block mx-auto mt-2 text-[#C68A3B] font-bold hover:underline">
									{expandedServices.includes(index) ? 'הצג פחות' : 'קרא עוד'}
								</button>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
