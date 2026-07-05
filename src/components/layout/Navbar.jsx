import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import styles from './Navbar.module.css';

const communityLinks = [
  {
    label: 'Discord Hub',
    to: '/discord',
    icon: 'hub',
    desc: 'Server & komunitas gaming',
    accent: '#5865F2',
  },
  {
    label: 'WhatsApp Hub',
    to: '/whatsapp',
    icon: 'chat',
    desc: 'Channel & grup terpilih',
    accent: '#25D366',
  },
  {
    label: 'Instagram Hub',
    to: '/instagram',
    icon: 'photo_camera',
    desc: 'Kreator & konten visual',
    accent: '#E1306C',
  },
  {
    label: 'TikTok Hub',
    to: '/tiktok',
    icon: 'play_circle',
    desc: 'Video & tren viral',
    accent: '#010101',
  },
];

const navLinks = [
  { label: 'Explore', to: '/' },
  { label: 'About', to: '/about' },
];

const Navbar = () => {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown when route changes
  useEffect(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Lock body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Is any community page active?
  const isCommunityActive = communityLinks.some((l) => location.pathname.startsWith(l.to));

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={`${styles.nav} container`}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          NesaVerse
        </Link>

        {/* Desktop Nav */}
        <ul className={styles.navLinks}>
          {/* Explore */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              Explore
            </NavLink>
          </li>

          {/* Communities dropdown */}
          <li className={styles.dropdownItem} ref={dropdownRef}>
            <button
              className={`${styles.dropdownTrigger} ${isCommunityActive ? styles.active : ''} ${dropdownOpen ? styles.triggerOpen : ''}`}
              onClick={() => setDropdownOpen((p) => !p)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              id="community-menu"
            >
              Komunitas
              <span
                className={`material-symbols-outlined ${styles.chevron}`}
                aria-hidden="true"
              >
                expand_more
              </span>
            </button>

            {/* Dropdown panel */}
            <div
              className={`${styles.dropdown} ${dropdownOpen ? styles.dropdownVisible : ''}`}
              role="menu"
              aria-labelledby="community-menu"
            >
              <div className={styles.dropdownGrid}>
                {communityLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    role="menuitem"
                    className={({ isActive }) =>
                      `${styles.dropdownLink} ${isActive ? styles.dropdownLinkActive : ''}`
                    }
                    style={{ '--accent': item.accent }}
                  >
                    <span
                      className={`material-symbols-outlined ${styles.dropdownIcon}`}
                      style={{ color: item.accent, fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.icon}
                    </span>
                    <span className={styles.dropdownText}>
                      <span className={styles.dropdownLabel}>{item.label}</span>
                      <span className={styles.dropdownDesc}>{item.desc}</span>
                    </span>
                  </NavLink>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <span className={styles.dropdownFooterText}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>bolt</span>
                  Bergabung dengan 500+ komunitas terpilih
                </span>
              </div>
            </div>
          </li>

          {/* About */}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              About
            </NavLink>
          </li>
        </ul>

        {/* Actions */}
        <div className={styles.navActions}>
          {/* Dark/Light mode toggle */}
          <button
            className={styles.themeToggle}
            onClick={toggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <span
              className={`material-symbols-outlined ${styles.themeIcon}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>


          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.mobileNavLinks}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="material-symbols-outlined">explore</span>
              Explore
            </NavLink>
          </li>

          {/* Community group */}
          <li className={styles.mobileSectionTitle}>Komunitas</li>
          {communityLinks.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${styles.mobileSubLink} ${isActive ? styles.active : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: item.accent, fontVariationSettings: "'FILL' 1" }}
                >
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="material-symbols-outlined">info</span>
              About
            </NavLink>
          </li>

        </ul>

        {/* Theme toggle in mobile menu */}
        <div className={styles.mobileThemeRow}>
          <span className={styles.mobileThemeLabel}>
            {theme === 'light' ? 'Mode Terang' : 'Mode Gelap'}
          </span>
          <button
            className={styles.mobileThemeBtn}
            onClick={toggle}
            aria-label="Toggle theme"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
            <span>{theme === 'light' ? 'Gelap' : 'Terang'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
