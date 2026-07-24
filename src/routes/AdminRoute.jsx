import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden/Forbidden';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  // 1. Prevent evaluation while Auth or Role is still fetching
  if (loading || roleLoading) {
    return <Loading message="Verifying admin credentials..." />;
  }

  // 2. Extra safety: if no user is present at all
  if (!user) {
    return <Forbidden message="You must be logged in as an Admin." />;
  }

  // 3. Check role (with case-insensitive trim safeguard)
  const userRole = typeof role === 'string' ? role.trim().toLowerCase() : '';

  if (userRole === 'admin') {
    return children;
  }

  // If role isn't 'admin', render Forbidden
  return <Forbidden />;
};

export default AdminRoute;