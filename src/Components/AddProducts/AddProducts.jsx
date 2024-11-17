import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaPlus } from "react-icons/fa6";

const AddProducts = () => {

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async(data)=>{
        
    }
  const handleAddProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const productImg = form.productImg.value;
    const productName = form.name.value;
    const brand_name = form.brand_name.value;
    const productType = form.type.value;
    const price = form.price.value;
    const description = form.description.value;
    const rating = form.rating.value;

    form.productImg.value = "";
    form.name.value = "";
    form.brand_name.value = "";
    form.type.value = "";
    form.price.value = "";
    form.description.value = "";
    form.rating.value = "";

    const newProduct = {
      productImg,
      productName,
      brand_name,
      productType,
      price,
      description,
      rating,
    };

    fetch(
      "https://aesthetica-server-site-9lvrk8db1-md-rafiul-islams-projects.vercel.app/products",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Product added successfully");
        }
      });
  };

  return (
    <>
    <SectionTitle
    subHeading={'New product arrived?'}
    heading={'Add a product'}
    ></SectionTitle>
      <div className="bg-base-200 p-4 mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* product name */}
        <div className="my-4 flex gap-4">
            <div className="w-full md:w-1/2">
            <label className="form-control w-3/4 ">
            <div className="label">
              <span className="label-text font-semibold">Name of product*</span>
            </div>
          </label>
          <input
              type="text"
              {...register("name")}
              placeholder="name of product"
              required
              className="input input-bordered w-full"
            />
            </div>
            {/* rating */}
            <div className="w-full md:w-1/2">
            <label className="form-control w-3/4 ">
            <div className="label">
              <span className="label-text font-semibold">Rating*</span>
            </div>
          </label>
          <input
              type="number"
              {...register("rating")}
              placeholder="rating od product"
              required
              className="input input-bordered w-full"
            />
            </div>
        </div>
          <div className="flex gap-4">
            {/* brand */}
          <div className="w-full md:w-1/2">
          <label className="form-control w-3/4 ">
            <div className="label">
              <span className="label-text font-semibold">Select Brand</span>
            </div>
          </label>
          <select
            className="select select-bordered w-full "
            defaultValue={'default'}
            {...register("brand")}
          >
            <option value={'default'} disabled>Select a brand</option>
            <option value="Golden_Rose">Golden_Rose</option>

            <option value="Dior">Dior</option>
            <option value="Chanel">Chanel</option>
            <option value="e.l.f">e.l.f</option>
            <option value="M.A.C">M.A.C</option>
            <option value="MAYBELLINE">MAYBELLINE</option>
          </select>
          </div>

          <div className="w-full md:w-1/2">
          {/* price */}
          <label className="form-control w-3/4 ">
            <div className="label">
              <span className="label-text font-semibold">Price*</span>
            </div>
          </label>
          <input
              type="number"
              {...register("price")}
              placeholder="price of recipe"
              required
              className="input input-bordered w-full"
            />
            </div>  
          </div>

          <div className="w-full my-4">
          <label className="form-control">
            <div className="label">
              <span className="label-text font-semibold">Product Description*</span>
            </div>
          </label>
          <textarea  className="textarea textarea-bordered textarea-lg w-full" {...register("description")} required ></textarea>
          </div>
          
          <div className="my-4">
          <label className="form-control">
            <div className="label">
              <span className="label-text font-semibold">Product Image*</span>
            </div>
          </label>
          <input type="file" className="file-input file-input-bordered w-full max-w-xs" required />
          </div>
          <button className="btn bg-[#ffdbac] text-[#800]" >
           <FaPlus></FaPlus> Add Product 
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProducts;
