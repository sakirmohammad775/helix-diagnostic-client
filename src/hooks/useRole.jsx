import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data = {} } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !loading && !!user?.email, // Only run if user is logged in
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data; 
    },
  });

  return { 
    // Default fallbacks in case data isn't returned correctly
    role: data.role || 'user', 
    status: data.status || 'active', 
    roleLoading 
  };
};

export default useRole;