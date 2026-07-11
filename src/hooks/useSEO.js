import { useEffect } from 'react';

/**
 * Custom hook to dynamically update SEO tags in the document head.
 * Handles document title, description, keywords, OpenGraph, Twitter cards, and canonical links.
 */
const useSEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard = 'summary_large_image',
  canonicalUrl,
} = {}) => {
  useEffect(() => {
    // 1. Update Document Title
    const baseTitle = 'NesaVerse';
    if (title) {
      document.title = title.includes(baseTitle) ? title : `${title} | ${baseTitle}`;
    } else {
      document.title = `${baseTitle} — Home for Digital Communities`;
    }

    // Helper to create or update meta tags
    const updateMetaTag = (attribute, value, attributeType = 'name') => {
      if (!value) return;
      let tag = document.querySelector(`meta[${attributeType}="${attribute}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attributeType, attribute);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    // Helper to create or update link tags
    const updateLinkTag = (rel, href) => {
      if (!href) return;
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    const defaultDesc = 'NesaVerse is the backbone of digital expression. A high-fidelity home for creators, clans, and communities.';
    const defaultKeywords = 'nesaverse, communities, discord servers, whatsapp channels, instagram hubs, tiktok hubs, creators, digital expression';
    const currentUrl = window.location.href;

    // 2. Standard Meta Tags
    updateMetaTag('description', description || defaultDesc);
    updateMetaTag('keywords', keywords || defaultKeywords);

    // 3. OpenGraph Meta Tags (for Discord, WhatsApp, Facebook, LinkedIn, etc.)
    updateMetaTag('og:title', ogTitle || title || 'NesaVerse — Home for Digital Communities', 'property');
    updateMetaTag('og:description', ogDescription || description || defaultDesc, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', ogImage || `${window.location.origin}/favicon.svg`, 'property');
    updateMetaTag('og:url', ogUrl || currentUrl, 'property');

    // 4. Twitter Card Meta Tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', ogTitle || title || 'NesaVerse — Home for Digital Communities');
    updateMetaTag('twitter:description', ogDescription || description || defaultDesc);
    updateMetaTag('twitter:image', ogImage || `${window.location.origin}/favicon.svg`);

    // 5. Canonical URL (avoids duplicate content issues)
    updateLinkTag('canonical', canonicalUrl || currentUrl);

  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, twitterCard, canonicalUrl]);
};

export default useSEO;
