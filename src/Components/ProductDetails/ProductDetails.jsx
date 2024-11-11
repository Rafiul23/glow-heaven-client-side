import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  } = product;

  const { user } = useContext(AuthContext);
  const email = user?.email;

  const handleAddCart = () => {
    const cartInfo = {
      email,
      productImg,
      productName,
      brand_name,
      productType,
      price,
      description,
      rating,
    };

    fetch(
      "https://aesthetica-server-site-9lvrk8db1-md-rafiul-islams-projects.vercel.app/carts",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartInfo),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Added to Cart successfully");
        }
      });
  };

  return (
    <div className="card md:flex flex-col card-side bg-base-100 p-4 shadow-xl">
      <div className="flex-1">
        <figure>
          <img src={productImg} />
        </figure>
      </div>
      <div className="flex-1 card-body">
        <h2 className="card-title">{productName}</h2>
        <p>{brand_name}</p>
        <p>{productType}</p>
        <p>{description}</p>
        <p>Rating: {rating} / 5</p>
        <p>Price: ${price}</p>
        <div className="card-actions justify-end">
          <button onClick={handleAddCart} className="btn bg-[#ff81c0] w-full">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
