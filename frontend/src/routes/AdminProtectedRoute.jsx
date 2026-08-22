import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function AdminProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          <span className="font-semibold text-sm text-slate-500">Checking credentials...</span>
        </div>
      </div>
    );
  }

  const isAdmin = user && 
                  user.email === 'meera.ldrp.7@gmail.com' && 
                  getattr(user, 'role', '').toLowerCase() === 'admin';

  function getattr(obj, prop, def) {
    return obj && obj[prop] !== undefined ? obj[prop] : def;
  }

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
}

export default AdminProtectedRoute;
