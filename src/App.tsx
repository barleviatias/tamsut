import React, { useState, useEffect } from 'react';
import {
	Phone,
	Mail,
	MapPin,
	Shield,
	Scale,
	Clock,
	UserCheck,
	Car,
	AlertTriangle,
	FileText,
	ChevronRight,
	ChevronLeft,
	Instagram,
	MessageCircle,
	ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import SEO from './components/SEO';

function SocialHeader() {
	return (
		<div className="bg-[#23494E] text-white py-2">
			<div className="container mx-auto px-4">
				<div className="flex justify-end items-center">
					<a
						href="mailto:tomer@tamsot-law.co.il"
						className="flex items-center hover:text-[#C68A3B] transition-colors">
						<Mail className="w-4 h-4" />
						<span className="text-sm mr-2">tomer@tamsot-law.co.il</span>
					</a>
					<a
						href="https://wa.me/972541234567"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center ml-4 hover:text-[#C68A3B] transition-colors">
						<MessageCircle className="w-4 h-4" />
						<span className="text-sm mr-2">WhatsApp</span>
					</a>
					<a
						href="https://instagram.com/tomer.tamsot"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center ml-4 hover:text-[#C68A3B] transition-colors">
						<Instagram className="w-4 h-4" />
						<span className="text-sm mr-2">Instagram</span>
					</a>
				</div>
			</div>
		</div>
	);
}

function Logo() {
	return (
		<div className="flex flex-col items-center mb-8">
			<div className="w-24 h-24 text-[#C68A3B] mb-4">
				<Scale className="w-full h-full" />
			</div>
			<div className="text-center">
				<h2 className="text-4xl font-bold text-[#23494E] mb-2">תומר תמסות</h2>
				<p className="text-xl text-[#8CAE9D]">משרד עורכי דין לתעבורה</p>
			</div>
		</div>
	);
}

const testimonials = [
	{
		id: 1,
		text: 'תומר ליווה אותי בתיק מורכב של שלילת רישיון. הוא היה מקצועי, קשוב ותמיד זמין. בזכותו הצלחנו להגיע לתוצאה הטובה ביותר האפשרית.',
		author: 'דני כהן',
		role: 'לקוח',
	},
	{
		id: 2,
		text: 'קיבלתי שירות מעולה ויחס אישי. תומר הצליח להפחית משמעותית את הקנס ולבטל את הנקודות. ממליץ בחום!',
		author: 'יוסי לוי',
		role: 'לקוח',
	},
	{
		id: 3,
		text: 'הייתי במצב מאוד מורכב עם הרבה נקודות ושלילת רישיון. תומר עזר לי להבין את המצב המשפטי ולקבל את התוצאה הטובה ביותר.',
		author: 'רונית דוד',
		role: 'לקוחה',
	},
	{
		id: 4,
		text: 'מקצועיות ללא פשרות, יחס אישי, והכי חשוב - תוצאות מעולות. תומר הוא עורך דין שאפשר לסמוך עליו ב-100%.',
		author: 'אבי כהן',
		role: 'לקוח',
	},
];

function TestimonialsCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);

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

function FloatingWhatsAppButton() {
	return (
		<motion.a
			href="https://wa.me/972541234567"
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-8 right-8 z-50"
			initial={{ opacity: 0, scale: 0.8, x: 20 }}
			animate={{ opacity: 1, scale: 1, x: 0 }}
			transition={{ duration: 0.5, delay: 1 }}
			whileHover={{ scale: 1.1, x: -5 }}
			whileTap={{ scale: 0.95 }}>
			<div className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
				<svg
					className="w-8 h-8"
					viewBox="0 0 24 24"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
				</svg>
				<span className="absolute right-full mr-3 bg-white text-[#25D366] px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
					צור קשר בוואטסאפ
				</span>
			</div>
		</motion.a>
	);
}

function App() {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		type: 'license_suspension',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
	};

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'LegalService',
		name: 'תומר תמסות - משרד עורכי דין לתעבורה',
		description:
			'משרד עורכי דין המתמחה בייצוג נהגים בבתי משפט לתעבורה, טיפול בשלילות רישיון, והפחתת נקודות',
		image: 'https://tamsot-law.co.il/assets/images/tomer.jpg',
		url: 'https://tamsot-law.co.il',
		telephone: '+972541234567',
		email: 'tomer@tamsot-law.co.il',
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'IL',
		},
		areaServed: 'ישראל',
		priceRange: '₪₪',
		openingHours: 'Mo-Fr 09:00-18:00',
		sameAs: ['https://instagram.com/tomer.tamsot'],
	};

	return (
		<>
			<SEO
				title="תומר תמסות - משרד עורכי דין לתעבורה"
				description="משרד עורכי דין המתמחה בייצוג נהגים בבתי משפט לתעבורה, טיפול בשלילות רישיון, והפחתת נקודות"
				structuredData={structuredData}
			/>
			<div className="min-h-screen bg-[#F8EFE5]">
				<Header />
				<Hero />

				{/* Vision Section */}
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
							<h2 className="text-3xl font-bold text-[#23494E] mb-6">
								החזון שלנו
							</h2>
							<motion.p
								className="text-lg text-gray-700 leading-relaxed mb-6"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.4, duration: 0.6 }}>
								"לשנות את הדרך בה אנשים חווים את מערכת המשפט לתעבורה, תוך שילוב
								של שקיפות, תמיכה והכוונה מקצועית."
							</motion.p>
							<motion.p
								className="text-md text-gray-600"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.6, duration: 0.6 }}>
								אנו מאמינים כי כל אדם זכאי להגנה משפטית מקצועית ולליווי אישי
								בהתמודדות עם מערכת המשפט. המשרד שלנו מתמחה במתן מענה מקיף לכל
								סוגי העבירות בתחום התעבורה, תוך שמירה על האינטרסים של לקוחותינו
								ומציאת הפתרון המיטבי עבורם.
							</motion.p>
						</motion.div>
					</div>
				</motion.section>

				{/* Advantages Section */}
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
										'ניסיון עשיר כתובע משטרתי וחוקר במצ"ח, המעניק לנו יתרון משמעותי בהבנת המערכת מבפנים',
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
									<p className="text-gray-600 text-center">
										{item.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</motion.section>

				{/* Services Section */}
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
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
							{[
								{
									icon: Car,
									title: 'שלילת רישיון',
									description: 'טיפול מקצועי בהליכי שלילת רישיון נהיגה',
								},
								{
									icon: AlertTriangle,
									title: 'נקודות',
									description: 'ייעוץ וטיפול בצבירת נקודות ופסילת רישיון',
								},
								{
									icon: FileText,
									title: 'קנסות',
									description: 'סיוע בהפחתת קנסות והסדרי תשלומים',
								},
								{
									icon: Scale,
									title: 'כתבי אישום',
									description: 'ייצוג מקצועי בבית המשפט לתעבורה',
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
									<h3 className="text-xl font-bold text-[#23494E]">
										{item.title}
									</h3>
									<p className="text-sm text-gray-600 mt-2">
										{item.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</motion.section>

				{/* Testimonials Section */}
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

				{/* About Me Section */}
				<motion.section
					id="about-me"
					className="py-16 bg-[#F8EFE5]"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<div className="container mx-auto px-4">
						<div className="max-w-5xl mx-auto">
							<div className="flex flex-col md:flex-row items-center gap-12">
								<motion.div
									className="w-full md:w-1/2"
									initial={{ opacity: 0, x: -50 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.8 }}>
									<img
										src="/assets/images/tomer.jpg"
										alt="תומר תמסות"
										className="w-full h-auto rounded-lg shadow-xl"
									/>
								</motion.div>
								<motion.div
									className="w-full md:w-1/2"
									initial={{ opacity: 0, x: 50 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.8 }}>
									<h2 className="text-3xl font-bold text-[#23494E] mb-6">
										אודותיי
									</h2>
									<p className="text-lg text-gray-700 leading-relaxed mb-6">
										עורך דין תומר תמסות, בעל ניסיון עשיר בתחום המשפט התעבורתי.
										שירת כתובע משטרתי וחוקר במצ"ח, מה שמעניק לו יתרון משמעותי
										בהבנת המערכת מבפנים.
									</p>
									<p className="text-lg text-gray-700 leading-relaxed mb-6">
										המשרד שלי מתמחה בייצוג לקוחות בהליכים משפטיים בתחום התעבורה,
										עם דגש על יחס אישי, שקיפות מלאה ותוצאות מיטביות.
									</p>
									<div className="flex flex-wrap gap-4">
										<div className="flex items-center gap-2">
											<Scale className="w-6 h-6 text-[#C68A3B]" />
											<span className="text-gray-700">עורך דין מוסמך</span>
										</div>
										<div className="flex items-center gap-2">
											<Shield className="w-6 h-6 text-[#C68A3B]" />
											<span className="text-gray-700">ניסיון עשיר</span>
										</div>
										<div className="flex items-center gap-2">
											<UserCheck className="w-6 h-6 text-[#C68A3B]" />
											<span className="text-gray-700">יחס אישי</span>
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</div>
				</motion.section>

				{/* Contact Form */}
				<motion.section
					id="contact"
					className="py-16 bg-white"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<div className="container mx-auto px-4">
						<motion.div
							className="max-w-xl mx-auto"
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}>
							<h2 className="text-3xl font-bold text-center text-[#23494E] mb-8">
								צור קשר
							</h2>
							<p className="text-center text-gray-600 mb-8">
								השאירו פרטים ונחזור אליכם בהקדם לייעוץ ראשוני ללא עלות
							</p>
							<motion.form
								onSubmit={handleSubmit}
								className="space-y-6"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.2, duration: 0.6 }}>
								<div>
									<label htmlFor="name" className="block text-gray-700 mb-2">
										שם מלא
									</label>
									<input
										type="text"
										id="name"
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CAE9D]"
										required
									/>
								</div>
								<div>
									<label htmlFor="phone" className="block text-gray-700 mb-2">
										טלפון
									</label>
									<input
										type="tel"
										id="phone"
										value={formData.phone}
										onChange={(e) =>
											setFormData({ ...formData, phone: e.target.value })
										}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CAE9D]"
										required
									/>
								</div>
								<div>
									<label htmlFor="type" className="block text-gray-700 mb-2">
										סוג הפנייה
									</label>
									<select
										id="type"
										value={formData.type}
										onChange={(e) =>
											setFormData({ ...formData, type: e.target.value })
										}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CAE9D]">
										<option value="license_suspension">שלילת רישיון</option>
										<option value="points">נקודות</option>
										<option value="fines">קנסות</option>
										<option value="indictment">כתב אישום</option>
									</select>
								</div>
								<button
									type="submit"
									className="w-full bg-[#C68A3B] text-white py-3 px-6 rounded-lg hover:bg-[#C68A3B]/90 transition-colors">
									שלח פנייה
								</button>
							</motion.form>
						</motion.div>
					</div>
				</motion.section>

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
								אנו מתחייבים לשמירה על פרטיותך ולשקיפות מלאה לאורך כל התהליך.
								המשרד שלנו דוגל במקצועיות, אמינות ושירות אישי לכל לקוח.
							</p>
							<div className="flex justify-center items-center mb-4">
								<div className="flex flex-col items-center mr-8">
									<Phone className="w-6 h-6 mb-2" />
									<span>054-1234567</span>
								</div>
								<div className="flex flex-col items-center ml-8 mr-8">
									<Mail className="w-6 h-6 mb-2" />
									<span>tomer@tamsot-law.co.il</span>
								</div>
								<div className="flex flex-col items-center ml-8">
									<MapPin className="w-6 h-6 mb-2" />
									<span>רחוב הרצל 1, תל אביב</span>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.footer>

				{/* Floating WhatsApp Button */}
				<FloatingWhatsAppButton />
			</div>
		</>
	);
}

export default App;
