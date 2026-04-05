import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

const defaultImage = '/hero-bg.png';
const siteName = 'ArchAcademy';
const baseUrl = 'https://archacademy.com';

const SEO: React.FC<SEOProps> = ({
  title,
  description = 'ArchAcademy - Yazılım mühendislerinin kıdemli mimari rollerine geçişi için premium, yüksek performanslı eğitim portalı. Clean Architecture, DDD, Microservices ve daha fazlası.',
  keywords = 'yazılım mimarisi, clean architecture, ddd, microservices, event-driven, hexagonal architecture, yazılım eğitimi',
  canonicalUrl,
  image = defaultImage,
  type = 'website',
  publishedTime,
  modifiedTime,
}) => {
  const pageTitle = title ? `${title} | ArchAcademy` : 'ArchAcademy | The Senior Architect Portal';
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return (
    <Helmet>
      {/* Temel Meta Etiketleri */}
      <title>{pageTitle}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ArchAcademy" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="tr_TR" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Ek Meta Etiketleri */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
    </Helmet>
  );
};

export default SEO;