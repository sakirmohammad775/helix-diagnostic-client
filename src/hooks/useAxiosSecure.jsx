import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000', // Update to your deployment URL when live
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Attach authorization header
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token') || user?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for unauthorized or blocked access
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const statusCode = error.response?.status || error.status;
        if (statusCode === 401 || statusCode === 403) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;