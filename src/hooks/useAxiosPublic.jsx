import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:5000', // Matches your Express server port
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;