import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import golden_rose from '../../assets/golden_rosse.jpg';
import dior from '../../assets/slider_1.png';
import chanel from '../../assets/chanel.jpg';
import elf from '../../assets/e.l.f.jpg';
import mac from '../../assets/mac.jpeg';
import maybelline from '../../assets/maybellin.jpg';
import CoverImage from "../CoverImage/CoverImage";

const BrandDetails = () => {
  const brandProducts = useLoaderData();
  const [notFound, setNotFound] = useState("");
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    if (brandProducts.length === 0) {
      setNotFound("Products not available");
    } else {
      const brandName = brandProducts[0].brand_name;
      switch (brandName) {
        case "Golden_Rose":
          setCoverImage(golden_rose);
          break;
        case "Dior":
          setCoverImage(dior);
          break;
        case "Chanel":
          setCoverImage(chanel);
          break;
        case "e.l.f":
          setCoverImage(elf);
          break;
        case "M.A.C":
          setCoverImage(mac);
          break;
        case "MAYBELLINE":
          setCoverImage(maybelline);
          break;
        default:
          setCoverImage(""); // Set to a default or empty image if needed
      }
    }
  }, [brandProducts]);

  return (
    <div>
      <CoverImage img={coverImage} title={brandProducts[0]?.brand_name} />
      <div className="grid mt-5 grid-cols-1 md:grid-cols-2 gap-4">
        {brandProducts && brandProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {brandProducts.length === 0 && (
        <p className="text-center mt-10 font-bold text-red-500">{notFound}</p>
      )}
    </div>
  );
};

export default BrandDetails;

