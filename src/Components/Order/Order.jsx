import { FaFirstOrder } from "react-icons/fa6";
import SectionTitle from "../SectionTitle/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const Order = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async(data) => {
        console.log(data);
            const productItem = {
                productName: data.name,
                brand_name: data.brand,
                price: parseFloat(data.price),
                rating: parseFloat(data.rating),
                description: data.description,
                productType: data.productType,
                productImg: imageRes.data.data.display_url
            };
    
            const productRes = await axiosSecure.post('/product', productItem);
            if(productRes.data.insertedId){
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} has been added`,
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

          <div className="my-4">
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
          <div className="md:w-1/2 w-full mb-5">
            
          </div>
          <button className="btn bg-[#ffdbac] text-[#800]">
            <FaFirstOrder></FaFirstOrder> Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;
