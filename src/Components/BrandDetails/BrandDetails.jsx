import { useState } from "react";
import Banner from "../Banner/Banner";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";

const BrandDetails = () => {
  const [notFound, setNotFound] = useState("");
  const brandProducts = useLoaderData();

  if (brandProducts.length === 0) {
    setNotFound("Products not available");
  }

  return (
    <div>
      <Banner></Banner>
      <div className="grid mt-5 grid-cols-1 md:grid-cols-2 gap-4">
        {brandProducts &&
          brandProducts.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
      </div>
      {brandProducts.length === 0 && (
        <p className="text-center mt-10 font-bold text-red-500">{notFound}</p>
      )}
    </div>
  );
};

export default BrandDetails;
