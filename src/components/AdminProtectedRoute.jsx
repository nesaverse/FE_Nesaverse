import { Navigate, useLocation } from 'react-router-dom';

/**
 * Wraps protected admin routes.
 * Auth is persisted in sessionStorage (key: nv_admin_auth).
 * If not authenticated, redirects to /admin/login and saves
 * the attempted path so we can redirect back after login.
 */
const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = sessionStorage.getItem('nv_admin_auth') === 'true';

  if (!isAuth) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminProtectedRoute;
