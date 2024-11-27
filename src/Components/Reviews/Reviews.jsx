import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Reviews = () => {
    const axiosPublic = useAxiosPublic();

    const {data: reviews=[]} = useQuery({
        queryKey: ['reviews'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/reviews');
            return res.data;
        }
    });

    return (
        <div>
            <SectionTitle
            subHeading={"Check our client's reviews"}
            heading={"What our clients say"}
            ></SectionTitle>
            <Swiper
        
        spaceBetween={30}
        autoplay={{delay: 2000, disableOnInteraction: false}}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
            1024: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 1
              },
          }}
        className="mySwiper"
      >
        {
            reviews?.map(review => <SwiperSlide key={review?._id}>
                <div className="flex gap-4 my-10 border-purple-400 p-4 h-[300px] rounded-xl border-2">
                    <div className="w-1/3 flex-1 flex justify-center items-center">
                        <img src={review.image} className="w-[150px] h-[150px] rounded-full" alt="" />
                    </div>
                    <div className="space-y-4 w-2/3 flex-1 my-auto">
                        <h3 className="text-xl font-bold">Name: {review.name}</h3>
                        <Rating style={{ maxWidth: 250 }} readOnly={true} value={review.rating} />
                        <p>{review.details}</p>
                    </div>
                </div>
            </SwiperSlide>)
        }
        
      </Swiper>
        </div>
    );
};

export default Reviews;