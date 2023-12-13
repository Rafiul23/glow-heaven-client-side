import offer_1 from '../assets/offer_1.jpg';
import offer_2 from '../assets/offer_2.jpg';
import offer_3 from '../assets/offer_3.jpg';
import { motion } from 'framer-motion';

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
         <div className="my-20 p-5">
            <h2 className='text-center text-violet-600 font-bold my-4 text-3xl'>Discount offers are going on</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-lg w-full h-[300px] bg-green-500">
                <h2 className="text-center font-bold text-3xl mt-4">25% discount on Dior products</h2>
                <img src={offer_1} className='rounded-full mx-auto w-[150px] h-[150px] mt-4 my-auto' alt="" />
            </div>
            <div className="rounded-lg w-full h-[300px] bg-amber-500">
                <h2 className="text-center font-bold text-3xl mt-4">15% discount on Chanel products</h2>
                <img src={offer_2} className='rounded-full mx-auto w-[150px] h-[150px] mt-4 my-auto' alt="" />
            </div>
            <div className="rounded-lg w-full h-[300px] bg-violet-400">
                <h2 className="text-center font-bold text-3xl mt-4">20% discount on M.A.C products</h2>
                <img src={offer_3} className='rounded-full mx-auto w-[150px] h-[150px] mt-4 my-auto' alt="" />
            </div>
            </div>
        </div>
       </motion.div>
    );
};

export default Offers;