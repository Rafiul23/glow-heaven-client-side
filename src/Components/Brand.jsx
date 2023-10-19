import { Link } from "react-router-dom";


const Brand = ({ brand }) => {

    const {brand_img, brand_name} = brand;

    return (
        <div className="card card-compact shadow-xl">
            <figure><img src={brand_img} className="w-full h-[250px]" /></figure>
            <div className="card-body bg-[#a2dee9]">
               <Link to={`/details/${brand_name}`}>
               <h2 className="card-title font-bold text-2xl">{brand_name}</h2>
               </Link>
            </div>
        </div>
    );
};

export default Brand;