import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
	title: string;
	description: string;
	canonicalUrl?: string;
	ogImage?: string;
	ogType?: string;
	twitterCard?: string;
	structuredData?: any;
}

const SEO: React.FC<SEOProps> = ({
	title,
	description,
	canonicalUrl,
	ogImage = '/assets/images/tomer.jpg',
	ogType = 'website',
	twitterCard = 'summary_large_image',
	structuredData,
}) => {
	const siteUrl = 'https://tamsot-law.co.il';
	const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
	const fullOgImage = ogImage.startsWith('http')
		? ogImage
		: `${siteUrl}${ogImage}`;

	return (
		<Helmet>
			{/* Basic Meta Tags */}
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={fullCanonicalUrl} />

			{/* Open Graph Meta Tags */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content={ogType} />
			<meta property="og:url" content={fullCanonicalUrl} />
			<meta property="og:image" content={fullOgImage} />
			<meta
				property="og:site_name"
				content="תומר תמסות - משרד עורכי דין לתעבורה"
			/>

			{/* Twitter Card Meta Tags */}
			<meta name="twitter:card" content={twitterCard} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={fullOgImage} />

			{/* Structured Data */}
			{structuredData && (
				<script type="application/ld+json">
					{JSON.stringify(structuredData)}
				</script>
			)}

			{/* Additional Meta Tags */}
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="language" content="he" />
			<meta name="author" content="תומר תמסות" />
			<meta name="robots" content="index, follow" />
		</Helmet>
	);
};

export default SEO;
