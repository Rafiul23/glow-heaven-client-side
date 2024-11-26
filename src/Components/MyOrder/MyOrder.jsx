import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../SectionTitle/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import ProductCard from "../ProductCard/ProductCard";
import OrderedCard from "./OrderedCard";

const MyOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myOrders } = useQuery({
    queryKey: ["my orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <SectionTitle
        subHeading={"Check it out"}
        heading={"My orders"}
      ></SectionTitle>
      <div className="my-4">
        {
          myOrders?.map((order, index)=> <div className="bg-base-200 space-y-2 p-2" key={index}>
            <h2 className="text-2xl font-medium">SL No: {index + 1}</h2>
            <h2 className="text-2xl font-medium">Email: {order?.email}</h2>
            <p className="text-xl font-medium">Price: $ {order?.price}</p>
            <p className="text-xl">Purchased Date: {order?.date}</p>
            <p className="text-xl">Delivery Status: {order?.status}</p>
            <p className="text-xl">Transaction ID: {order?.transactionId}</p>

            <div className="grid grid-cols-1 gap-4">
              {
                order?.products?.map(product=> <OrderedCard
                product={product}
                key={product._id}
                ></OrderedCard>)
              }
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default MyOrder;
