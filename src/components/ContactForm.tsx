import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { siteText } from '../config';
import { addLeadToBrevo, LeadContact } from '../services/brevoService';
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

			// Send the lead to Brevo
			const success = await addLeadToBrevo(leadData, recaptchaToken);

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

				// No need to reset reCAPTCHA v3 (invisible)
			} else {
				throw new Error('Failed to add contact to Brevo');
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
					</motion.form>
				</motion.div>
			</div>
		</motion.section>
	);
}
