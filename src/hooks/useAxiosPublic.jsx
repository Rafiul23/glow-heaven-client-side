import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://glow-heaven-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
