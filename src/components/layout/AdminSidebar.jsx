import { NavLink, Link, useNavigate } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

/* ── Platform Brand Icon (Font Awesome) ─────────────────── */
const BrandIcon = ({ platform, size = 18 }) => {
  const map = {
    discord:   { cls: 'fa-brands fa-discord',   color: '#5865F2' },
    whatsapp:  { cls: 'fa-brands fa-whatsapp',  color: '#25D366' },
    instagram: { cls: 'fa-brands fa-instagram', color: '#E1306C' },
    tiktok:    { cls: 'fa-brands fa-tiktok',    color: '#010101', darkColor: '#ffffff' },
    youtube:   { cls: 'fa-brands fa-youtube',   color: '#FF0000' },
    roblox:    { cls: 'fa-solid fa-gamepad',    color: '#00A2FF' }, // Roblox uses custom icon
  };
  const { cls, color } = map[platform] ?? { cls: 'fa-solid fa-circle', color: '#888' };
  return <i className={cls} style={{ fontSize: size, color, width: size, textAlign: 'center' }} />;
};

const navSections = [
  {
    label: 'Overview',
    items: [{ icon: 'analytics', label: 'Analytics', to: '/admin', isMS: true }],
  },
  {
    label: 'Manage Platforms',
    items: [
      { platform: 'discord',   label: 'Discord',   to: '/admin/discord'   },
      { platform: 'whatsapp',  label: 'WhatsApp',  to: '/admin/whatsapp'  },
      { platform: 'instagram', label: 'Instagram', to: '/admin/instagram' },
      { platform: 'tiktok',   label: 'TikTok',    to: '/admin/tiktok'   },
      { platform: 'youtube',   label: 'YouTube',   to: '/admin/youtube'   },
      { platform: 'roblox',   label: 'Roblox',    to: '/admin/roblox'   },
    ],
  },
];

const AdminSidebar = ({ collapsed, onToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Logo */}
      <div className={styles.sidebarHeader}>
        {!collapsed && (
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>N</span>
            NesaVerse
          </Link>
        )}
        {collapsed && <Link to="/" className={styles.logoCollapsed}>N</Link>}
        <button className={styles.collapseBtn} onClick={onToggle} aria-label="Toggle sidebar">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            {collapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>
      </div>

      {/* Admin Badge */}
      {!collapsed && (
        <div className={styles.adminBadge}>
          <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>shield</span>
          Admin Panel
        </div>
      )}

      {/* Nav Sections */}
      <nav className={styles.nav}>
        {navSections.map((section) => (
          <div key={section.label} className={styles.section}>
            {!collapsed && <p className={styles.sectionLabel}>{section.label}</p>}
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                <span className={styles.navIcon}>
                  {item.isMS ? (
                    <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1", color: 'var(--color-primary)' }}>
                      {item.icon}
                    </span>
                  ) : (
                    <BrandIcon platform={item.platform} size={18} />
                  )}
                </span>
                {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className={styles.sidebarBottom}>
        <Link to="/" className={styles.viewSiteBtn} title={collapsed ? 'View Site' : undefined}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
          {!collapsed && <span>View Site</span>}
        </Link>

        <button className={styles.logoutBtn} onClick={handleLogout} title={collapsed ? 'Logout' : undefined}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
          {!collapsed && <span>Logout</span>}
        </button>

        {!collapsed && (
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px', color: '#fff' }}>
                person
              </span>
            </div>
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>Administrator</p>
              <p className={styles.profileRole}>Root Access</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
