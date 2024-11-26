import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../SectionTitle/SectionTitle";
import OrderedCard from "../MyOrder/OrderedCard";
import Swal from "sweetalert2";

const ManageOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: allOrders, refetch } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allOrders`);
      return res.data;
    },
  });

  const handleConfirmDelivery = (_id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/orders/${_id}`).then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Success!",
                text: "Delivey status has been updated.",
                icon: "success",
              });
            }
          });
        }
      });
  }

  return (
    <div>
      <SectionTitle
        heading={"manage all orders"}
        subHeading={"Here is all orders"}
      ></SectionTitle>
      <div className="my-4">
        {allOrders?.map((order, index) => (
          <div className="bg-base-200 p-2" key={index}>
           <div className="flex md:flex-row flex-col justify-between">
           <div className="space-y-4">
            <h2 className="text-2xl font-medium">SL No: {index + 1}</h2>
            <h2 className="text-2xl font-medium">Email: {order?.email}</h2>
            <p className="text-xl font-medium">Price: $ {order?.price}</p>
            <p className="text-xl">Purchased Date: {order?.date}</p>
            <p className="text-xl">Delivery Status: {order?.status}</p>
            <p className="text-xl">Transaction ID: {order?.transactionId}</p>
            </div>
           
            <div>
            {
                order.status === 'pending' ? <button onClick={()=> handleConfirmDelivery(order._id)} className="btn mt-4 rounded-xl py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition-colors duration-300">
                Confirm Delivery
              </button> : <button disabled className="btn mt-4 rounded-xl py-2">
               Delivered
            </button>
            }
            </div>
           </div>

            <div className="grid grid-cols-1 my-4 gap-4">
              {order?.products?.map((product) => (
                <OrderedCard product={product} key={product._id}></OrderedCard>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrder;
