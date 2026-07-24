import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://helix-diagnostic-server.vercel.app", // Matches your Express server port
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;