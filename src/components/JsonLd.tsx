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
  "name": "JonkersAI",
  "description": "Transformeer uw telefonische klantenservice met AI.Callers. 24/7 beschikbare AI telefoonsystemen die natuurlijke gesprekken voeren en uw bedrijfsprocessen optimaliseren.",
  "url": "https://jonkersai.nl",
  "logo": "https://jonkersai.nl/terminal.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+31-6-12345678",
    "contactType": "customer service",
    "availableLanguage": "Dutch"
  },
  "sameAs": [
    "https://linkedin.com/company/jonkersai",
    "https://twitter.com/jonkersai"
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
  "name": "AI.Callers",
  "description": "AI telefoonsystemen voor bedrijven die 24/7 natuurlijke gesprekken voeren",
  "provider": {
    "@type": "Organization",
    "name": "JonkersAI",
    "url": "https://jonkersai.nl"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Nederland"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Telefonie Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Klantenservice",
          "description": "24/7 AI telefoonsysteem voor klantenservice"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Afspraak Planning",
          "description": "Automatische afspraak planning via AI telefoon"
        }
      }
    ]
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "JonkersAI",
  "url": "https://jonkersai.nl",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://jonkersai.nl/blog?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};