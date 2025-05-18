import React from 'react';
import { Scale, Shield, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutMeSection() {
	return (
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
								עורך הדין תומר תמסות עוסק בייעוץ וייצוג משפטי בתחום דיני
								התעבורה, עם ניסיון מעשי עשיר והיכרות מעמיקה עם מערכת המשפט. את
								דרכו החל כחוקר ובוחן תאונות דרכים במסגרת שירותו הצבאי, ובהמשך
								שימש כתובע משטרתי – תפקיד שהעניק לו יתרון משמעותי בהבנת התהליכים
								המשפטיים משני צדי המתרס.
							</p>
							<p className="text-lg text-gray-700 leading-relaxed mb-6">
								המשרד בהובלתו מעניק ייצוג מקצועי ואישי ללקוחות הנמצאים בהליכים
								משפטיים בתחום התעבורה – משלב החקירה והייעוץ הראשוני, ועד לדיון
								בבית המשפט.
							</p>
							<p className="text-lg text-gray-700 leading-relaxed mb-6">
								כל תיק זוכה לטיפול מדויק, אחראי ויצירתי, מתוך מטרה להגיע לפתרון
								מיטבי – לא על אוטומט, אלא בהתאמה אישית לצרכים ולנסיבות של כל
								לקוח
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
	);
}
