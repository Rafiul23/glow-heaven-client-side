import { useLoaderData } from "react-router-dom";
import Banner from "../Banner/Banner";
import Brand from "../Brand/Brand";
import Footer from "../Footer/Footer";
import Offers from "../Offers/Offers";
import Speciality from "../Speciality/Speciality";
import AllBrands from "../AllBrands/AllBrands";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  const brands = useLoaderData();

  return (
    <div>
      <Banner></Banner>
      <AllBrands></AllBrands>
      <Offers></Offers>
      <Speciality></Speciality>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
