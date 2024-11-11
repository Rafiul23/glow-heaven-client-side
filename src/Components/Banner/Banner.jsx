import slider_1 from "../../assets/slider_1.png";
import slider_2 from "../../assets/slider_2.png";
import slider_3 from "../../assets/slider_3.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
const Banner = () => {
  return (
    <div>
      <Swiper pagination={true} autoplay={true} modules={[Pagination, Autoplay]} className="mySwiper">
        <SwiperSlide>
            <img src={slider_1} className="h-[500px]" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={slider_2} className="h-[500px]" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={slider_3} className="h-[500px]" alt="" />
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
};

export default Banner;
