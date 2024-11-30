import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { HiCurrencyDollar } from "react-icons/hi";
import { FaCarSide } from "react-icons/fa6";

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["users-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userStats?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div className="py-4">
      <h1 className="text-4xl font-bold">
        Hi {user?.displayName}! Welcome Back!
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-5">
        <div className="h-[200px] w-full flex flex-col justify-center items-center text-white bg-purple-500">
          <HiCurrencyDollar className="text-4xl" />
          <h3 className="text-2xl font-bold">Payments</h3>
          <p className="text-3xl">{stats?.revenue}</p>
        </div>

        <div className="h-[200px] w-full flex flex-col justify-center items-center text-white bg-pink-500">
          <FaCarSide className="text-4xl" />
          <h3 className="text-2xl font-bold">Orders</h3>
          <p className="text-3xl">{stats?.orders}</p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
