import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure'; // or useAxiosPublic

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading: isQueryLoading, isPending } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !loading && !!user?.email, // Only query when user email is ready
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data; // Expected: { role: 'admin' }
    },
  });

  // Keep roleLoading TRUE if auth is loading OR query hasn't finished
  const roleLoading = loading || isQueryLoading || isPending;

  return {
    role: data?.role?.toLowerCase() || 'user',
    status: data?.status || 'active',
    roleLoading,
  };
};

export default useRole;