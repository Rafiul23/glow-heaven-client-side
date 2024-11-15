import { motion } from 'framer-motion';
import SectionTitle from '../SectionTitle/SectionTitle';
import './offers.css';

const Offers = () => {
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
        <SectionTitle
        subHeading={'Check our discount offers'}
        heading={'Read carefully to get discount'}
        ></SectionTitle>
        <div className='offer max-w-screen-xl h-[572px] bg-fixed flex flex-col justify-center items-center my-12'>
            <div className='flex flex-col justify-center items-center py-20 px-12 bg-white w-[1096px] h-[330px]'>
                <h2 className="text-3xl py-6">We are offering you 20% discount.</h2>
                <p className='p-6 text-center'>
                Get an **exclusive 20% discount** on purchases over <span className='font-bold text-purple-600'>$1000</span>! Simply use the promo code <span className='font-bold text-pink-600'>MAKEUP1000</span> at checkout to claim your savings.
                </p>
            </div>
        </div>
       </motion.div>
    );
};

export default Offers;