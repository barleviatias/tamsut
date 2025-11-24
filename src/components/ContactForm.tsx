import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { siteText, env } from '../config';
import { addLeadToHubSpot, LeadContact } from '../services/hubspotService';
import {
	trackFormSubmission,
	trackContactAttempt,
} from '../services/googleAnalytics';

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		details: '',
		// Honeypot fields (hidden from users)
		website: '',
		url: '',
		company: '',
	});

	const [formStatus, setFormStatus] = useState({
		submitting: false,
		success: false,
		error: false,
		message: '',
	});

	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormStatus({
			submitting: true,
			success: false,
			error: false,
			message: '',
		});

		// Execute reCAPTCHA v3
		if (!executeRecaptcha) {
			setFormStatus({
				submitting: false,
				success: false,
				error: true,
				message: 'reCAPTCHA לא זמין כעת',
			});
			return;
		}

		let recaptchaToken: string;
		try {
			recaptchaToken = await executeRecaptcha('contact_form');
		} catch (error) {
			console.error('reCAPTCHA execution failed:', error);
			setFormStatus({
				submitting: false,
				success: false,
				error: true,
				message: 'שגיאה באימות האבטחה',
			});
			return;
		}

		// Check honeypot fields
		if (formData.website || formData.url || formData.company) {
			console.log('Bot detected via honeypot');
			setFormStatus({
				submitting: false,
				success: false,
				error: true,
				message: 'שגיאה בשליחת הטופס',
			});
			return;
		}

		try {
			// Prepare lead contact data (excluding honeypot fields)
			const leadData: LeadContact = {
				name: formData.name,
				phone: formData.phone,
				email: formData.email,
				details: formData.details,
				source: 'website-contact-form',
			};

			// Send the lead to HubSpot
			const success = await addLeadToHubSpot(leadData, recaptchaToken);

			if (success) {
				// Track successful form submission
				trackFormSubmission('contact-form');
				trackContactAttempt('form');

				setFormStatus({
					submitting: false,
					success: true,
					error: false,
					message: siteText.contactSection.form.success,
				});

				// Reset the form after successful submission
				setFormData({
					name: '',
					phone: '',
					email: '',
					details: '',
					website: '',
					url: '',
					company: '',
				});

				// Redirect to WhatsApp after a short delay
				setTimeout(() => {
					const whatsappPhone = env.WHATSAPP_PHONE;
					const message = encodeURIComponent('שלום, מלאתי טופס צור קשר באתר');
					window.open(`https://wa.me/${whatsappPhone}?text=${message}`, '_blank');
				}, 1500);

				// No need to reset reCAPTCHA v3 (invisible)
			} else {
				throw new Error('Failed to add contact to HubSpot');
			}
		} catch (error) {
			console.error('Form submission error:', error);
			setFormStatus({
				submitting: false,
				success: false,
				error: true,
				message: siteText.contactSection.form.error,
			});
		}
	};

	return (
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

					{formStatus.success && (
						<div
							className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
							role="alert">
							<span className="block sm:inline">{formStatus.message}</span>
						</div>
					)}

					{formStatus.error && (
						<div
							className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
							role="alert">
							<span className="block sm:inline">{formStatus.message}</span>
						</div>
					)}

					<motion.form
						onSubmit={handleSubmit}
						className="space-y-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 0.6 }}>

						{/* Honeypot fields - hidden from users but visible to bots */}
						<div style={{ display: 'none' }}>
							<input
								type="text"
								name="website"
								value={formData.website}
								onChange={(e) =>
									setFormData({ ...formData, website: e.target.value })
								}
								tabIndex={-1}
								autoComplete="off"
							/>
							<input
								type="url"
								name="url"
								value={formData.url}
								onChange={(e) =>
									setFormData({ ...formData, url: e.target.value })
								}
								tabIndex={-1}
								autoComplete="off"
							/>
							<input
								type="text"
								name="company"
								value={formData.company}
								onChange={(e) =>
									setFormData({ ...formData, company: e.target.value })
								}
								tabIndex={-1}
								autoComplete="off"
							/>
						</div>

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
							<label htmlFor="email" className="block text-gray-700 mb-2">
								אימייל (אופציונלי)
							</label>
							<input
								type="email"
								id="email"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CAE9D]"
							/>
						</div>
						<div>
							<label htmlFor="details" className="block text-gray-700 mb-2">
								פרטי הפניה
							</label>
							<textarea
								id="details"
								value={formData.details}
								onChange={(e) =>
									setFormData({ ...formData, details: e.target.value })
								}
								rows={4}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CAE9D] resize-none"
							/>
						</div>

						{/* reCAPTCHA v3 runs invisibly in the background */}

						<div className="flex flex-col gap-3">
							<button
								type="submit"
								disabled={formStatus.submitting}
								className={`w-full bg-[#C68A3B] text-white py-3 px-6 rounded-lg transition-colors ${
									formStatus.submitting
										? 'opacity-70 cursor-not-allowed'
										: 'hover:bg-[#C68A3B]/90'
								}`}>
								{formStatus.submitting
									? 'שולח...'
									: siteText.contactSection.form.submit}
							</button>

							<div className="flex items-center gap-3">
								<div className="flex-1 h-px bg-gray-300"></div>
								<span className="text-gray-500 text-sm">או</span>
								<div className="flex-1 h-px bg-gray-300"></div>
							</div>

							<button
								type="button"
								onClick={() => {
									const whatsappPhone = env.WHATSAPP_PHONE;
									const message = encodeURIComponent('שלום, אני מעוניין/ת לקבל ייעוץ משפטי');
									window.open(`https://wa.me/${whatsappPhone}?text=${message}`, '_blank');
								}}
								className="w-full bg-[#25D366] text-white py-3 px-6 rounded-lg transition-colors hover:bg-[#20BA5A] flex items-center justify-center gap-2">
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
								</svg>
								<span>שלח הודעה בוואטסאפ</span>
							</button>
						</div>
					</motion.form>
				</motion.div>
			</div>
		</motion.section>
	);
}
