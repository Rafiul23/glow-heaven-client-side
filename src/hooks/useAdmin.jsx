import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["admin", user?.email],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data;
    },
  });
  return [isAdmin, isLoading];
};

export default useAdmin;
