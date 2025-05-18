import React from 'react';
import { Mail, MessageCircle, Instagram } from 'lucide-react';
import { siteText } from '../config';

export default function SocialHeader() {
	return (
		<div className="bg-[#23494E] text-white py-2">
			<div className="container mx-auto px-4">
				<div className="flex justify-end items-center">
					<a
						href={`mailto:${siteText.contact.email}`}
						className="flex items-center hover:text-[#C68A3B] transition-colors">
						<Mail className="w-4 h-4" />
						<span className="text-sm mr-2">{siteText.contact.email}</span>
					</a>
					<a
						href={`https://wa.me/${siteText.contact.whatsapp}`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center ml-4 hover:text-[#C68A3B] transition-colors">
						<MessageCircle className="w-4 h-4" />
						<span className="text-sm mr-2">WhatsApp</span>
					</a>
					<a
						href={`https://instagram.com/${siteText.contact.instagram}`}
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
