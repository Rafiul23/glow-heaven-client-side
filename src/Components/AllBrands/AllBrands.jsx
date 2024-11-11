import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Brand from "../Brand/Brand";

const AllBrands = () => {
   
    const {data: Brands=[]} = useQuery({
        queryKey: ['brands'],
        queryFn: async()=>{
            const res = await axios.get('http://localhost:5000/brands');
            return res.data;
        }
    })

    return (
        <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4 lg:my-10">
        {Brands.map((brand) => (
          <Brand key={brand._id} brand={brand}></Brand>
        ))}
      </div>
    );
};

export default AllBrands;