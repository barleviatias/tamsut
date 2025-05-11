import React from 'react';
import { Helmet } from 'react-helmet';
import { siteText } from '../config';

interface SEOProps {
	title?: string;
	description?: string;
	keywords?: string;
	author?: string;
	image?: string;
}

const SEO: React.FC<SEOProps> = ({
	title = siteText.meta.title,
	description = siteText.meta.description,
	keywords = siteText.meta.keywords,
	author = siteText.meta.author,
	image = '/assets/images/og-image.jpg',
}) => {
	return (
		<Helmet>
			{/* Basic Meta Tags */}
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta name="author" content={author} />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://tamsot-law.co.il/" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />

			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://tamsot-law.co.il/" />
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image" content={image} />

			{/* Extra Meta */}
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta name="language" content="Hebrew" />
			<meta name="revisit-after" content="7 days" />
			<meta name="distribution" content="web" />
			<meta name="robots" content="index, follow" />

			{/* Favicon and touch icons */}
			<link rel="icon" href="/favicon.ico" />
			<link rel="apple-touch-icon" href="/logo192.png" />
		</Helmet>
	);
};

export default SEO;
