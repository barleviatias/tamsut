import React from 'react';
import { Helmet } from 'react-helmet';
import { siteText, env } from '../config';

interface SEOProps {
	title?: string;
	description?: string;
	keywords?: string;
	author?: string;
	image?: string;
	url?: string;
	type?: string;
}

const SEO: React.FC<SEOProps> = ({
	title = siteText.meta.title,
	description = siteText.meta.description,
	keywords = siteText.meta.keywords,
	author = siteText.meta.author,
	image = 'https://tamsut-law.co.il/linkImg.jpeg',
	url = 'https://tamsut-law.co.il/',
	type = 'website',
}) => {
	const fullTitle = title.includes('תומר תמסות')
		? title
		: `${title} | תומר תמסות - משרד עורכי דין לתעבורה`;

	return (
		<Helmet>
			{/* Basic Meta Tags */}
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta name="author" content={author} />
			<meta
				name="robots"
				content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
			/>
			<meta name="googlebot" content="index, follow" />
			<link rel="canonical" href={url} />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content={type} />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta
				property="og:image:alt"
				content={`${siteText.company.name} - ${siteText.company.tagline}`}
			/>
			<meta property="og:locale" content="he_IL" />
			<meta
				property="og:site_name"
				content="תומר תמסות - משרד עורכי דין לתעבורה"
			/>

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:url" content={url} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />
			<meta
				name="twitter:image:alt"
				content={`${siteText.company.name} - ${siteText.company.tagline}`}
			/>

			{/* Additional Meta Tags for Better SEO */}
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta name="language" content="Hebrew" />
			<meta name="revisit-after" content="7 days" />
			<meta name="distribution" content="web" />
			<meta name="rating" content="general" />
			<meta name="geo.region" content="IL" />
			<meta name="geo.placename" content="Tel Aviv" />
			<meta name="theme-color" content="#23494E" />

			{/* Business-specific meta tags */}
			<meta name="business:contact_data:street_address" content="תל אביב" />
			<meta name="business:contact_data:locality" content="תל אביב" />
			<meta name="business:contact_data:region" content="תל אביב" />
			<meta name="business:contact_data:postal_code" content="" />
			<meta name="business:contact_data:country_name" content="Israel" />
			<meta
				name="business:contact_data:email"
				content={siteText.contact.email}
			/>
			<meta
				name="business:contact_data:phone_number"
				content={siteText.contact.phone}
			/>
			<meta
				name="business:contact_data:website"
				content="https://tamsot-law.co.il"
			/>

			{/* Favicons and touch icons */}
			<link rel="icon" type="image/x-icon" href="/favicon.ico" />
			<link rel="apple-touch-icon" sizes="180x180" href="/logo192.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/logo192.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/logo192.png" />
			<link rel="manifest" href="/manifest.json" />

			{/* Preconnect to external domains for performance */}
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link
				rel="preconnect"
				href="https://fonts.gstatic.com"
				crossOrigin="anonymous"
			/>

			{/* DNS prefetch for better performance */}
			<link rel="dns-prefetch" href="//www.google-analytics.com" />
			<link rel="dns-prefetch" href="//fonts.googleapis.com" />
			<link rel="dns-prefetch" href="//www.googletagmanager.com" />

			{/* Google Tag Manager - HEAD */}
			<script>
				{`
					(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GTM-PDJP4NWF');
				`}
			</script>

			{/* GTM Container ID: GTM-PDJP4NWF */}
		</Helmet>
	);
};

export default SEO;
