import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteText } from '../config';

function Header() {
	return (
		<header className="bg-[#23494E] text-white">
			{/* Top Bar */}
			<div className="bg-[#1a363a] py-2">
				<div className="container mx-auto px-4">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-2">
						<motion.div
							className="flex flex-wrap items-center justify-center sm:justify-start gap-4 w-full sm:w-auto"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}>
							<a
								href={`tel:${siteText.contact.phone}`}
								className="flex items-center hover:text-[#C68A3B] transition-colors">
								<Phone className="w-4 h-4" />
								<span className="text-sm mr-2">{siteText.contact.phone}</span>
							</a>
							<a
								href={`mailto:${siteText.contact.email}`}
								className="flex items-center hover:text-[#C68A3B] transition-colors">
								<Mail className="w-4 h-4" />
								<span className="text-sm mr-2">{siteText.contact.email}</span>
							</a>
						</motion.div>

						<motion.div
							className="flex items-center gap-4 mt-2 sm:mt-0"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}>
							<a
								href={`https://wa.me/${siteText.contact.whatsapp}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center hover:text-[#C68A3B] transition-colors">
								<MessageCircle className="w-4 h-4" />
								<span className="text-sm mr-2">WhatsApp</span>
							</a>
							<a
								href={`https://instagram.com/${siteText.contact.instagram}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center hover:text-[#C68A3B] transition-colors">
								<Instagram className="w-4 h-4" />
								<span className="text-sm mr-2">Instagram</span>
							</a>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Main Header */}
			<div className="py-4">
				<div className="container mx-auto px-4">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
						<motion.div
							className="flex items-center"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}>
							<div className="w-16 h-16">
								<img
									src="/assets/images/logo.png"
									alt={siteText.company.logo.alt}
									className="w-full h-full object-contain"
								/>
							</div>
							<div className="mr-6">
								<h1 className="text-2xl font-bold">{siteText.company.name}</h1>
								<p className="text-sm text-[#8CAE9D]">
									{siteText.company.tagline}
								</p>
							</div>
						</motion.div>

						<motion.nav
							className="hidden md:flex items-center"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}>
							<a
								href="#about"
								className="hover:text-[#C68A3B] transition-colors ml-8">
								{siteText.navigation.vision}
							</a>
							<a
								href="#services"
								className="hover:text-[#C68A3B] transition-colors ml-8">
								{siteText.navigation.services}
							</a>
							<a
								href="#testimonials"
								className="hover:text-[#C68A3B] transition-colors ml-8">
								{siteText.navigation.testimonials}
							</a>
							<a
								href="#about-me"
								className="hover:text-[#C68A3B] transition-colors ml-8">
								{siteText.navigation.about}
							</a>
							<a
								href="#contact"
								className="hover:text-[#C68A3B] transition-colors ml-8">
								{siteText.navigation.contact}
							</a>
						</motion.nav>

						<motion.div
							className="w-full sm:w-auto text-center sm:text-right"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}>
							<a
								href="#contact"
								className="inline-block w-full sm:w-auto bg-[#C68A3B] text-white px-6 py-2 rounded-lg hover:bg-[#B07A2A] transition-colors shadow-lg hover:shadow-xl">
								{siteText.navigation.initialConsult}
							</a>
						</motion.div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
