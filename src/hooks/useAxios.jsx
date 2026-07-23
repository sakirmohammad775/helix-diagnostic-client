import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5173'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;