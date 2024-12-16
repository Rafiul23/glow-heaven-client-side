import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Brand from "../Brand/Brand";
import SectionTitle from "../SectionTitle/SectionTitle";

const AllBrands = () => {
  const { data: Brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await axios.get(
        "https://glow-heaven-server.vercel.app/brands"
      );
      return res.data;
    },
  });

  return (
    <>
      <SectionTitle
        subHeading={"Check it out"}
        heading={"Our brands"}
      ></SectionTitle>
      <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4 lg:my-10">
        {Brands.map((brand) => (
          <Brand key={brand._id} brand={brand}></Brand>
        ))}
      </div>
    </>
  );
};

export default AllBrands;
