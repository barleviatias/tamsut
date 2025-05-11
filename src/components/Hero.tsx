import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteText } from '../config';

const Hero: React.FC = () => {
	return (
		<header
			className="relative bg-[#23494E] text-white overflow-hidden min-h-[90vh]"
			role="banner">
			{/* Background decorative elements */}
			<div className="absolute inset-0" aria-hidden="true">
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#23494E] to-[#1a363a] opacity-90"></div>
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#C68A3B] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
					<div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#8CAE9D] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
					<div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-[#C5BFAD] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
				</div>
			</div>

			<div className="container mx-auto px-4 pt-12 sm:pt-20 relative z-10 items-end">
				<div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
					<motion.div
						className="w-full md:w-1/2"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}>
						<div className="relative h-full">
							{/* Blob shape container */}
							<div
								className="absolute inset-0 bg-gradient-to-br from-[#C68A3B]/30 to-[#23494E]/30 rounded-t-[3rem] md:rounded-t-[5rem]"
								aria-hidden="true"></div>
							<div className="relative z-10 h-full">
								<div className="w-full h-full overflow-hidden md:rounded-t-[5rem]">
									<img
										src="/assets/images/tomer-no-bg.png"
										alt={`${siteText.company.name} - ${siteText.company.tagline}`}
										className="w-full h-full object-cover object-top scale-110"
										style={{ maxHeight: '90vh' }}
										width="1000"
										height="1000"
									/>
								</div>
							</div>
							{/* Decorative elements */}
							<div
								className="absolute -top-4 -right-4 w-40 h-40 bg-[#C68A3B]/20 rounded-full blur-lg"
								aria-hidden="true"></div>
							<div
								className="absolute -bottom-4 -left-4 w-48 h-48 bg-[#8CAE9D]/20 rounded-full blur-lg"
								aria-hidden="true"></div>
						</div>
					</motion.div>

					<motion.div
						className="w-full md:w-1/2 text-center md:text-right"
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}>
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
							{siteText.hero.title} <br />
							<span className="text-[#C68A3B]">{siteText.hero.subtitle}</span>
						</h1>
						<p className="text-xl sm:text-2xl mb-8 sm:mb-10 text-gray-200 leading-relaxed max-w-2xl md:mr-0 mr-auto ml-auto">
							{siteText.hero.description}
						</p>
						<motion.a
							href="#contact"
							className="inline-flex items-center justify-center gap-3 bg-[#C68A3B] text-white px-8 sm:px-10 py-4 rounded-lg text-lg font-medium hover:bg-[#B57A2B] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							aria-label={siteText.hero.cta}>
							{siteText.hero.cta}
							<ArrowLeft className="h-6 w-6" aria-hidden="true" />
						</motion.a>
					</motion.div>
				</div>
			</div>
		</header>
	);
};

export default Hero;
