import { Parallax } from "react-parallax";

const CoverImage = ({ img, title }) => {
  return (
    <div>
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={img}
        bgImageAlt="image"
        strength={-200}
        bgImageStyle={{
          objectFit: "cover", 
          objectPosition: "center", 
        }}
      >
        
        <div className="w-full" style={{ paddingTop: "56.25%" /* 16:9 aspect ratio */ }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[90%] max-w-[900px] bg-black opacity-60 text-white p-5 text-center">
              <h1 className="text-lg md:text-3xl lg:text-5xl font-bold uppercase">{title}</h1>
              <p className="mt-2 text-sm md:text-base lg:text-lg uppercase">
                Choose your favorite products from {title}
              </p>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default CoverImage;
