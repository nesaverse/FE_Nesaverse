import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.layout}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile top bar */}
      <div className={styles.mobileBar}>
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle sidebar"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <Link to="/" className={styles.mobileLogo}>NesaVerse</Link>
        <Link to="/" className={styles.mobileBack} aria-label="Back to site">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </div>

      {/* Sidebar — desktop collapsible, mobile drawer */}
      <div className={`${styles.sidebarWrapper} ${mobileOpen ? styles.mobileVisible : ''}`}>
        <AdminSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((p) => !p)}
        />
      </div>

      {/* Main content */}
      <main
        className={styles.main}
        style={{ marginLeft: collapsed ? '72px' : '260px' }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
