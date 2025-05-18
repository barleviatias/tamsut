import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SEO from './components/SEO';
import VisionSection from './components/VisionSection';
import AdvantagesSection from './components/AdvantagesSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import AboutMeSection from './components/AboutMeSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';

function App() {
	return (
		<>
			<SEO />
			<div className="min-h-screen bg-[#F8EFE5]">
				<Header />
				<Hero />
				<VisionSection />
				<AdvantagesSection />
				<ServicesSection />
				<TestimonialsSection />
				<AboutMeSection />
				<ContactForm />
				<Footer />
				<FloatingWhatsAppButton />
			</div>
		</>
	);
}

export default App;
