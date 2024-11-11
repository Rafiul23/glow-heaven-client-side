import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const Brand = ({ brand }) => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
    };

    const { brand_img, brand_name } = brand;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="card card-compact shadow-xl">
                <figure><img src={brand_img} className="w-full h-[250px]" /></figure>
                <div className="card-body bg-[#a2dee9]">
                    <Link to={`/details/${brand_name}`}>
                        <h2 className="card-title font-bold text-2xl">{brand_name}</h2>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Brand;