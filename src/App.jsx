import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';

// Layouts
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DiscordHubPage from './pages/DiscordHubPage';
import WhatsAppHubPage from './pages/WhatsAppHubPage';
import InstagramHubPage from './pages/InstagramHubPage';
import TikTokHubPage from './pages/TikTokHubPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public layout — Navbar + Footer */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="discord" element={<DiscordHubPage />} />
            <Route path="whatsapp" element={<WhatsAppHubPage />} />
            <Route path="instagram" element={<InstagramHubPage />} />
            <Route path="tiktok" element={<TikTokHubPage />} />
          </Route>

          {/* Admin layout — sidebar only */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
          </Route>

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '16px', fontFamily: 'Sora, sans-serif' }}>
                <span style={{ fontSize: '80px' }}>404</span>
                <h1 style={{ fontSize: '28px', color: 'var(--color-primary)' }}>Page Not Found</h1>
                <a href="/" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}>Back to Home</a>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
