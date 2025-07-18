import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

// Common structured data schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SocialFlows",
  "description": "Revolutioneer uw restaurant met SocialFlows Voice AI assistenten. Automatiseer reserveringen, bestellingen en klantenservice met geavanceerde spraaktechnologie.",
  "url": "https://socialflows.nl",
  "logo": "https://socialflows.nl/terminal.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+31-20-123-4567",
    "contactType": "customer service",
    "availableLanguage": "Dutch"
  },
  "sameAs": [
    "https://linkedin.com/company/socialflows",
    "https://twitter.com/socialflows"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NL",
    "addressLocality": "Nederland"
  }
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SocialFlows",
  "description": "Voice AI assistenten voor restaurants met automatische reserveringen en bestellingen",
  "provider": {
    "@type": "Organization",
    "name": "SocialFlows",
    "url": "https://socialflows.nl"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Nederland"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Voice AI Restaurant Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Automatische Reserveringen",
          "description": "AI-gestuurde telefonische reserveringen"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Telefoonbestellingen",
          "description": "Automatische bestellingen via AI assistent"
        }
      }
    ]
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SocialFlows",
  "url": "https://socialflows.nl",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://socialflows.nl?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};