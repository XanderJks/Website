import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "JonkersAI - AI Telefoonsystemen voor Bedrijven",
  description = "Transformeer uw telefonische klantenservice met AI.Callers. 24/7 beschikbare AI telefoonsystemen die natuurlijke gesprekken voeren en uw bedrijfsprocessen optimaliseren.",
  keywords = "AI telefoon, AI callers, kunstmatige intelligentie, telefoonsysteem, klantenservice, automatisering, Nederland, bedrijfsoplossingen",
  image = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
  url = "https://jonkersai.nl",
  type = "website",
  author = "JonkersAI",
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const fullTitle = title.includes('JonkersAI') ? title : `${title} | JonkersAI`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="nl" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="JonkersAI" />
      <meta property="og:locale" content="nl_NL" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@JonkersAI" />
      <meta name="twitter:creator" content="@JonkersAI" />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? 'Article' : 'Organization',
          ...(type === 'article' ? {
            headline: title,
            description: description,
            image: image,
            author: {
              "@type": "Person",
              name: author
            },
            publisher: {
              "@type": "Organization",
              name: "JonkersAI",
              logo: {
                "@type": "ImageObject",
                url: "https://jonkersai.nl/terminal.svg"
              }
            },
            datePublished: publishedTime,
            dateModified: modifiedTime || publishedTime,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": url
            }
          } : {
            name: "JonkersAI",
            description: description,
            url: "https://jonkersai.nl",
            logo: "https://jonkersai.nl/terminal.svg",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+31-6-12345678",
              contactType: "customer service",
              availableLanguage: "Dutch"
            },
            sameAs: [
              "https://linkedin.com/company/jonkersai",
              "https://twitter.com/jonkersai"
            ],
            address: {
              "@type": "PostalAddress",
              addressCountry: "NL",
              addressLocality: "Nederland"
            }
          })
        })}
      </script>
    </Helmet>
  );
};