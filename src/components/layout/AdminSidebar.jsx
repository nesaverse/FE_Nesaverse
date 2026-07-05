import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

const navItems = [
  { icon: 'analytics', label: 'Analytics', to: '/admin' },
  { icon: 'groups', label: 'Communities', to: '/admin/communities' },
  { icon: 'share', label: 'Social Media', to: '/admin/social' },
  { icon: 'person_cancel', label: 'Users', to: '/admin/users' },
  { icon: 'settings', label: 'Settings', to: '/admin/settings' },
];

const AdminSidebar = ({ collapsed, onToggle }) => {
  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Logo */}
      <div className={styles.sidebarHeader}>
        <Link to="/" className={styles.logo}>
          {collapsed ? 'N' : 'NesaVerse'}
        </Link>
        <button className={styles.collapseBtn} onClick={onToggle} aria-label="Toggle sidebar">
          <span className="material-symbols-outlined">
            {collapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>
      </div>

      {/* Nav items */}
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              {item.icon}
            </span>
            {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User profile */}
      {!collapsed && (
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px', color: 'var(--color-on-primary)' }}>
              person
            </span>
          </div>
          <div className={styles.profileInfo}>
            <p className={styles.profileName}>Admin_Overlord</p>
            <p className={styles.profileRole}>Root Access</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;
