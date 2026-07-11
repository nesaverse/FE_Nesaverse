import useSEO from '../hooks/useSEO';

/**
 * Reusable SEO component for pages.
 * Simply pass the metadata props and it will update the document head.
 */
const SEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard,
  canonicalUrl,
}) => {
  useSEO({
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterCard,
    canonicalUrl,
  });

  return null;
};

export default SEO;
