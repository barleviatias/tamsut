import React from 'react';
import { Scale } from 'lucide-react';
import { siteText } from '../config';

export default function Logo() {
	return (
		<div className="flex flex-col items-center mb-8">
			<div className="w-24 h-24 text-[#C68A3B] mb-4">
				<Scale className="w-full h-full" />
			</div>
			<div className="text-center">
				<h2 className="text-4xl font-bold text-[#23494E] mb-2">
					{siteText.company.name}
				</h2>
				<p className="text-xl text-[#8CAE9D]">{siteText.company.tagline}</p>
			</div>
		</div>
	);
}
