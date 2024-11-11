import { useLoaderData } from "react-router-dom";
import Banner from "../Banner/Banner";
import Brand from "../Brand/Brand";
import Footer from "../Footer/Footer";
import Offers from "../Offers/Offers";
import Speciality from "../Speciality/Speciality";

const Home = () => {
  const brands = useLoaderData();

  return (
    <div>
      <Banner></Banner>

      <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4 lg:my-10">
        {brands.map((brand) => (
          <Brand key={brand.id} brand={brand}></Brand>
        ))}
      </div>
      <Offers></Offers>
      <Speciality></Speciality>
      
    </div>
  );
};

export default Home;
