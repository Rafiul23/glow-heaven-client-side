import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { HiCurrencyDollar } from "react-icons/hi";
import { FaCarSide, FaCartShopping, FaUsers } from "react-icons/fa6";

const AdminHome = () => {
    const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user?.photoURL);
  const { data: stats = [] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStats");
      return res.data;
    },
  });
    return (
        <div className="py-4">
           <div className="p-2 flex justify-between items-center">
           <h1 className="text-4xl font-bold">Hi {user?.displayName}! Welcome Back!</h1> 
           <img src={user?.photoURL} alt=""  className="w-[100px] h-[100px] rounded-full"/>
           </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 my-5">
            <div className="h-[200px] w-full flex flex-col justify-center items-center text-white bg-purple-500">
            <HiCurrencyDollar className="text-4xl" />
            <h3 className="text-2xl font-bold">Revenue</h3>
            <p className="text-3xl">{stats?.revenue}</p>
            </div>
            <div className="h-[200px] w-full flex flex-col justify-center items-center text-white bg-green-500">
            <FaCartShopping className="text-4xl"/>
            <h3 className="text-2xl font-bold">Products</h3>
            <p className="text-3xl">{stats?.products}</p>
            </div>
            <div className="h-[200px] w-full flex flex-col justify-center items-center text-white bg-amber-500">
            <FaUsers className="text-4xl" />
            <h3 className="text-2xl font-bold"> Users</h3>
            <p className="text-3xl">{stats?.users}</p>
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

export default AdminHome;