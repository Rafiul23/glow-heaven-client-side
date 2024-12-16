import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCartShopping } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const ProductDetails = () => {
  const product = useLoaderData();

  const {
    productImg,
    productName,
    brand_name,
    productType,
    price,
    description,
    rating,
    _id
  } = product;

  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();
  const {refetch} = useCart();

  const handleAddToCart = () => {
    const cartInfo = {
      email,
      productImg,
      productName,
      brand_name,
      productType,
      price,
      productId: _id
    };

    axiosSecure.post("/carts", cartInfo)
      .then((res) => {
        if(res.data.insertedId) {
          refetch();
          toast.success("Added to Cart successfully");
        }
      });
  };

  return (
    <div className="bg-white shadow-lg hover:shadow-[0px_4px_15px_0px_rgba(192,88,243,0.4)] transition-shadow duration-300 flex md:flex-row flex-col  gap-4 overflow-hidden">
      <div className="flex-1 flex justify-center items-center">
        <figure>
          <img
            src={productImg}
            className="w-[300px] h-[300px]"
            alt={productName}
          />
        </figure>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {productName}
          </h2>
          <p className="text-gray-600 mb-1">
            Brand: <span className="font-medium">{brand_name}</span>
          </p>
          <p className="text-gray-600 mb-1">
            Type: <span className="font-medium">{productType}</span>
          </p>
          <p className="text-gray-600 mb-1">
            Price: <span className="text-green-600 font-bold">${price}</span>
          </p>
          <p className="text-gray-600 mb-1">
            Product's Details:{" "}
            <span className="font-medium">{description}</span>
          </p>
          <p className="text-gray-600">
            Rating:{" "}
            <span className="font-medium text-yellow-600">{rating} / 5</span>
          </p>
          <button
            onClick={handleAddToCart}
            className="btn w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition-colors duration-300"
          >
            ADD TO CART <FaCartShopping className="text-xl"></FaCartShopping>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
