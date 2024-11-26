import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {
    _id,
    productImg,
    productName,
    brand_name,
    productType,
    price,
    rating,
  } = product;

  return (
    <div className="border-pink-600 border-b-2 border-0 rounded-b-lg bg-white shadow-lg hover:shadow-[0px_4px_15px_0px_rgba(192,88,243,0.4)] transition-shadow duration-300 flex gap-4 overflow-hidden">
      <div className="flex-1 flex justify-center items-center border-0 border-l-2 border-purple-600 rounded-l-lg">
        <img src={productImg} className="w-[300px] h-[300px]" alt={productName} />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
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
          <p className="text-gray-600">
            Rating:{" "}
            <span className="font-medium text-yellow-600">{rating} / 5</span>
          </p>
        </div>
        <div className="mt-4">
          <Link to={`/productDetails/${_id}`}>
            <button className="btn w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition-colors duration-300">
              View Details <FaArrowRight></FaArrowRight>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
