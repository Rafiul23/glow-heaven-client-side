import { useLoaderData } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import SectionTitle from '../SectionTitle/SectionTitle';
const image_hosting_key = import.meta.env.VITE_ImageBB_API_key;
const image_hosting_api = 
`https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProducts = () => {

    const product = useLoaderData();

    const { _id, productImg, productName, brand_name, productType, price, description, rating } = product;

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async(data) => {
        console.log(data);
        const imageFile = {image: data.image[0]};
        const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
       
        if(imageRes.data.success){
            const updatedItem = {
                productName: data.name,
                brand_name: data.brand,
                price: parseFloat(data.price),
                rating: parseFloat(data.rating),
                description: data.description,
                productType: data.productType,
                productImg: imageRes.data.data.display_url
            };
    
            const productRes = await axiosSecure.put(`/products/${_id}`, updatedItem);
            if(productRes.data.modifiedCount > 0){
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} has been added`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
      };

    return (
        <>
        <SectionTitle
        subHeading={'Something changed?'}
        heading={'Update a product'}
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
                  defaultValue={productName}
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
                  defaultValue={rating}
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
                defaultValue={brand_name}
                {...register("brand")}
              >
                <option value={brand_name} disabled>{brand_name}</option>
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
                  defaultValue={price}
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
              <textarea defaultValue={description} className="textarea textarea-bordered textarea-lg w-full" {...register("description")} required ></textarea>
              </div>
              
              <div className="my-4">
              <label className="form-control">
                <div className="label">
                  <span className="label-text font-semibold">Product Image*</span>
                </div>
              </label>
              <input type="file" {...register('image')} className="file-input file-input-bordered w-full max-w-xs" required />
              </div>
              <div className="md:w-1/2 w-full mb-5">
                <label className="form-control w-3/4 ">
                <div className="label">
                  <span className="label-text font-semibold">Type of product*</span>
                </div>
              </label>
              <input
                  type="text"
                  {...register("productType")}
                  defaultValue={productType}
                  placeholder="Type of product"
                  required
                  className="input input-bordered w-full"
                />
                </div>
              <button className="btn bg-[#ffdbac] text-[#800]" >
               <FaEdit></FaEdit> Update Product 
              </button>
            </form>
          </div>
        </>
    );
};

export default UpdateProducts;