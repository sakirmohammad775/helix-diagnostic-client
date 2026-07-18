import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaSpinner } from 'react-icons/fa';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <FaSpinner className="animate-spin text-3xl text-[#3ca4f4]" />
      </div>
    );
  }

  if (user) {
    return children;
  }

  // Preserve location history so login can return the user right back here
  return <Navigate to="/login" state={{ from: location }} replace />;
}