import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // if you "http://localhost:5173/"
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;