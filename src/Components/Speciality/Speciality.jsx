import { motion } from 'framer-motion';
import SectionTitle from './../SectionTitle/SectionTitle';

const Speciality = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
    };
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="my-10 p-4">
                <SectionTitle
                    heading={'Our Speciality'}
                    subHeading={'Check our speciality'}
                ></SectionTitle>

                <div className="grid bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 grid-cols-1 md:grid-cols-3 gap-4">
                   
                    <div className="flex justify-center items-center w-full h-[200px] md:h-[250px] rounded-xl">
                        <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold text-center">
                            100% Authentic Products
                        </h2>
                    </div>

                   
                    <div className="flex justify-center items-center w-full h-[100px] md:h-[250px] rounded-xl">
                        <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold text-center">
                            500+ Beauty Products
                        </h2>
                    </div>

                    
                    <div className="flex justify-center items-center w-full h-[200px] md:h-[250px] rounded-xl">
                        <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold text-center">
                            Free Beauty Consultancy
                        </h2>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Speciality;
