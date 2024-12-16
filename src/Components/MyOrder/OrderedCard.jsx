import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const OrderedCard = ({product}) => {

    const {
        _id,
        productImg,
        productName,
        brand_name,
        productType,
        price,
      } = product;

    return (
        <div className="border-2 border-purple-500 grid md:grid-cols-3 grid-cols-1 gap-4 py-4">
            <div className="flex justify-center items-center">
                <img src={productImg} className="w-[100px] h-[100px]" alt={productName} />
            </div>
            <div className="py-2 text-center md:text-left">
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
          
        </div>
        <div className="my-auto mx-auto">
          <Link to={`/productDetails/${_id}`}>
            <button className="btn rounded-xl py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition-colors duration-300">
              View Details <FaArrowRight></FaArrowRight>
            </button>
          </Link>
        </div>
        </div>
    );
};

export default OrderedCard;