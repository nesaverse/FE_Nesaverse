import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const footerLinks = {
  Platform: [
    { label: 'Explore', to: '/' },
    { label: 'Discord Hub', to: '/discord' },
    { label: 'WhatsApp Hub', to: '/whatsapp' },
    { label: 'About', to: '/about' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Community Guidelines', to: '#' },
  ],
  Support: [
    { label: 'API Status', to: '#' },
    { label: 'Help Center', to: '#' },
    { label: 'Developer Portal', to: '#' },
  ],
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>NesaVerse</Link>
          <p className={styles.tagline}>
            Building the future of digital expression. The backbone of communities, clans, and creators.
          </p>
          <div className={styles.socials}>
            <button className={styles.socialBtn} aria-label="Website">
              <span className="material-symbols-outlined">public</span>
            </button>
            <button className={styles.socialBtn} aria-label="Community">
              <span className="material-symbols-outlined">group</span>
            </button>
            <button className={styles.socialBtn} aria-label="Rocket">
              <span className="material-symbols-outlined">rocket_launch</span>
            </button>
          </div>
        </div>

        <div className={styles.links}>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>{section}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={styles.link}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>© 2024 NesaVerse Network. Empowering Digital Expression.</p>
          <span className={styles.systemStatus}>
            <span className={styles.dot} />
            System Online
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
