import slider_1 from '../../public/slider_1.jpg';
import slider_2 from '../../public/slider_2.jpg';
import slider_3 from '../../public/slider_3.png';

const Banner = () => {
    return (
        <div>
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <img src={slider_1} className="w-full lg:h-[550px]" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img src={slider_2} className="w-full lg:h-[550px]" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src={slider_3} className="w-full lg:h-[550px]" />
                </div>
               
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
            </div>
        </div>
    );
};

export default Banner;