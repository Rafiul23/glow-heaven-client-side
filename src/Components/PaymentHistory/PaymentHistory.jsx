import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../SectionTitle/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentHistory = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data: myPayments} = useQuery({
        queryKey: ['myPayments', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    })

    return (
        <div>
            <SectionTitle
            subHeading={'Check your order'}
            heading={'Your payment history'}
            ></SectionTitle>

<div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#ffdbac] text-[#800]">
            <tr>
              <th>
                SL No.
              </th>
              <th>Customer Eamil</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {myPayments?.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.email}</td>
                <td>$ {order.price}</td>
                <td>{order.status}</td>
                <td>{order.date}</td>
                <td>{order.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default PaymentHistory;