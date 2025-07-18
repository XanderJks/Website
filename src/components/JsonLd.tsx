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
  "description": "Automatiseer uw social media marketing met SocialFlows. Intelligente content planning, automatische posting en geavanceerde analytics voor alle social media platforms.",
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
  "description": "Social media automatisering voor bedrijven met intelligente content planning en analytics",
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
    "name": "Social Media Automatisering Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Content Planning",
          "description": "Intelligente content planning en scheduling"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Social Media Analytics",
          "description": "Geavanceerde analytics en rapportages"
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