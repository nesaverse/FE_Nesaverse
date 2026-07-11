import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';

// Layouts
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';

// Guard
import AdminProtectedRoute from './components/AdminProtectedRoute';

// Public Pages
import HomePage           from './pages/HomePage';
import AboutPage          from './pages/AboutPage';
import DiscordHubPage     from './pages/DiscordHubPage';
import WhatsAppHubPage    from './pages/WhatsAppHubPage';
import InstagramHubPage   from './pages/InstagramHubPage';
import TikTokHubPage      from './pages/TikTokHubPage';
import YouTubeHubPage     from './pages/YouTubeHubPage';
import RobloxHubPage      from './pages/RobloxHubPage';
import SEO                from './components/SEO';
import ComingSoonPage     from './pages/ComingSoonPage';

// Admin Pages
import AdminLoginPage     from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminDiscordPage   from './pages/admin/AdminDiscordPage';
import AdminWhatsAppPage  from './pages/admin/AdminWhatsAppPage';
import AdminInstagramPage from './pages/admin/AdminInstagramPage';
import AdminTikTokPage    from './pages/admin/AdminTikTokPage';
import AdminYouTubePage   from './pages/admin/AdminYouTubePage';
import AdminRobloxPage    from './pages/admin/AdminRobloxPage';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public layout — Navbar + Footer */}
          <Route element={<Layout />}>
            <Route index          element={<HomePage />} />
            <Route path="about"   element={<AboutPage />} />
            <Route path="discord" element={<DiscordHubPage />} />
            <Route path="whatsapp"element={<WhatsAppHubPage />} />
            <Route path="instagram"element={<InstagramHubPage />} />
            <Route path="tiktok"  element={<TikTokHubPage />} />
            <Route path="youtube" element={<YouTubeHubPage />} />
            <Route path="roblox"      element={<RobloxHubPage />} />
            <Route path="coming-soon"  element={<ComingSoonPage />} />
            <Route path="donate"       element={<Navigate to="/coming-soon" replace />} />
          </Route>

          {/* Admin login — no navbar */}
          <Route path="admin/login" element={<AdminLoginPage />} />

          {/* Admin dashboard — protected, sidebar only */}
          <Route
            path="admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index               element={<AdminDashboardPage />} />
            <Route path="discord"      element={<AdminDiscordPage />} />
            <Route path="whatsapp"     element={<AdminWhatsAppPage />} />
            <Route path="instagram"    element={<AdminInstagramPage />} />
            <Route path="tiktok"       element={<AdminTikTokPage />} />
            <Route path="youtube"      element={<AdminYouTubePage />} />
            <Route path="roblox"       element={<AdminRobloxPage />} />
          </Route>

          {/* Error / 404 page */}
          <Route
            path="error"
            element={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '16px', fontFamily: 'Sora, sans-serif' }}>
                <SEO title="Page Not Found" description="Halaman tidak ditemukan di NesaVerse." />
                <span style={{ fontSize: '80px' }}>404</span>
                <h1 style={{ fontSize: '28px', color: 'var(--color-primary)' }}>Page Not Found</h1>
                <a href="/" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}>Back to Home</a>
              </div>
            }
          />

          {/* 404 fallback — redirect to /error */}
          <Route
            path="*"
            element={<Navigate to="/error" replace />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
