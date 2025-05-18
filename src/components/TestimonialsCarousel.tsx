import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { siteText } from '../config';

export default function TestimonialsCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);

	const testimonials = siteText.testimonials;

	useEffect(() => {
		const interval = setInterval(() => {
			handleNext();
		}, 7000); // Increased interval for better readability

		return () => clearInterval(interval);
	}, [currentIndex]);

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchStart(e.targetTouches[0].clientX);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (touchStart - touchEnd > 75) {
			handleNext();
		}
		if (touchStart - touchEnd < -75) {
			handlePrevious();
		}
	};

	return (
		<div
			className="relative max-w-3xl mx-auto px-12"
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}>
			<div className="overflow-hidden">
				<div className="transition-opacity duration-500">
					<div className="bg-white/10 p-6 rounded-lg">
						<blockquote className="text-lg italic">
							"{testimonials[currentIndex].text}"
							<footer className="mt-4 font-bold text-[#C68A3B]">
								- {testimonials[currentIndex].author},{' '}
								{testimonials[currentIndex].role}
							</footer>
						</blockquote>
					</div>
				</div>
			</div>

			<button
				onClick={handlePrevious}
				className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#C68A3B] p-2 rounded-full text-white hover:bg-[#C68A3B]/80 transition-colors"
				aria-label="המלצה קודמת">
				<ChevronLeft className="w-6 h-6" />
			</button>

			<button
				onClick={handleNext}
				className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#C68A3B] p-2 rounded-full text-white hover:bg-[#C68A3B]/80 transition-colors"
				aria-label="המלצה הבאה">
				<ChevronRight className="w-6 h-6" />
			</button>

			<div className="flex justify-center mt-6">
				{testimonials.map((_, index) => (
					<button
						key={index}
						className={`w-3 h-3 rounded-full transition-colors ${
							index === currentIndex ? 'bg-[#C68A3B]' : 'bg-white/30'
						} ${index !== 0 ? 'mr-2' : ''}`}
						onClick={() => setCurrentIndex(index)}
						aria-label={`עבור להמלצה ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
