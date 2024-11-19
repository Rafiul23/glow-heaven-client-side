import SectionTitle from "../SectionTitle/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { GiShoppingBag } from "react-icons/gi";
import useAuth from './../../hooks/useAuth';
import useCart from './../../hooks/useCart';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Order = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const navigate = useNavigate();
    const {cart, refetch} = useCart();
    const price = cart?.reduce((sum, item)=> parseFloat(item.price) + sum, 0);
   
    const onSubmit = async(data) => {
      // console.log(data);
        const orderInfo = {
          name: data.name,
          email: data.email,
          house: data.house,
          road: data.road,
          block: data.block,
          area: data.area,
          paymentMethod: data.paymentMethod,
          contact: data.contact,
          cartId: cart?.map(item => item._id),
          productItemId: cart?.map(item => item.productId),
          status: 'pending',
          price
        };    

        const orderRes = await axiosSecure.post('/orders', orderInfo);
        if(orderRes?.data?.orderResult?.insertedId && orderRes?.data?.deleteResult?.deletedCount > 0){
          refetch();
          navigate('/dashboard/myOrder');
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your order is placed successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      };
  return (
    <div>
      <SectionTitle
        subHeading={"Place your order"}
        heading={"order now"}
      ></SectionTitle>
      <div className="bg-base-200 p-4 mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* cutomer name */}
          <div className="my-4 flex gap-4">
            <div className="w-full md:w-1/2">
              <label className="form-control w-3/4 ">
                <div className="label">
                  <span className="label-text font-semibold">
                   Your Name*
                  </span>
                </div>
              </label>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.displayName}
                placeholder="Your Name"
                required
                className="input input-bordered w-full"
              />
            </div>
            {/* rating */}
            <div className="w-full md:w-1/2">
              <label className="form-control w-3/4 ">
                <div className="label">
                  <span className="label-text font-semibold">Your Email*</span>
                </div>
              </label>
              <input
                type="email"
                {...register("email")}
                defaultValue={user?.email}
                placeholder="Your Email"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="flex gap-4">
            {/* house no */}
            <div className="w-full md:w-1/2">
            <label className="form-control w-3/4 ">
                <div className="label">
                  <span className="label-text font-semibold">House No*</span>
                </div>
              </label>
              <input
                type="number"
                {...register("house")}
                placeholder="Your House No"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* road no */}
            <div className="w-full md:w-1/2">
            <label className="form-control w-3/4 ">
                <div className="label">
                  <span className="label-text font-semibold">Road No*</span>
                </div>
              </label>
              <input
                type="number"
                {...register("road")}
                placeholder="Your Road No"
                required
                className="input input-bordered w-full"
              />
          </div>
          </div>


          <div className="flex gap-4 my-4">
            {/* block */}
            <div className="w-full md:w-1/2">
            <label className="form-control w-3/4 ">
                <div className="label">
                  <span className="label-text font-semibold">Block*</span>
                </div>
              </label>
              <input
                type="text"
                {...register("block")}
                placeholder="Block No"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Area */}
            <div className="w-full md:w-1/2">
            <label className="form-control w-3/4 ">
                <div className="label">
                  <span className="label-text font-semibold">Name of Area*</span>
                </div>
              </label>
              <input
                type="text"
                {...register("area")}
                placeholder="Name of Area, ex: Mirpur, Banasree etc."
                required
                className="input input-bordered w-full"
              />
          </div>
          </div>

          <div className="flex gap-4 my-4">
            {/* payment system */}
          <div className="w-full md:w-1/2">
          <label className="form-control w-3/4 ">
            <div className="label">
              <span className="label-text font-semibold">Select Payment Method</span>
            </div>
          </label>
          <select
            className="select select-bordered w-full "
            defaultValue={'default'}
            {...register("paymentMethod")}
          >
            <option value={'default'} disabled>Select a payment method</option>
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Pay by Card</option>
            
          </select>
          </div>
          <div className="w-full md:w-1/2">
          {/* contact no. */}
            <label className="form-control w-3/4 ">
                <div className="label">
                  <span className="label-text font-semibold">Contact No*</span>
                </div>
              </label>
              <input
                type="number"
                {...register("contact")}
                placeholder="Your Contact No"
                required
                className="input input-bordered w-full"
              />
          </div>
          </div>
          <button className="btn bg-[#ffdbac] text-[#800]">
            <GiShoppingBag></GiShoppingBag> Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;
