import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './Layout.module.css';
import useVisitorTracking from '../../hooks/useVisitorTracking';

const Layout = () => {
  useVisitorTracking(); // 🔥 real visitor count — fires once per session

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NesaVerse",
    "url": "https://nesaverse.vercel.app",
    "description": "NesaVerse is the backbone of digital expression. Home for creators, clans, and communities.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nesaverse.vercel.app/discord?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className={styles.layout}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
