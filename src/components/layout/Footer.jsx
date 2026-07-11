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
              <a href="https://nesaverse.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Website">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a href="https://discord.gg/nesaverse" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Community">
                <span className="material-symbols-outlined">group</span>
              </a>
              <a href="https://github.com/nesaverse" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
                <span className="material-symbols-outlined">rocket_launch</span>
              </a>
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
            <p>
              © 2026 NesaVerse x{" "}
              <a
                href="https://github.com/Hanfik27"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                FullTuru Dev
              </a>
            </p>
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
