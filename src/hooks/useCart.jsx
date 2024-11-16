import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCart = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: Carts=[], refetch} = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        }
    })
    return {Carts, refetch};
};

export default useCart;