import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";

import nearStore from "@/store/nearStore";
import { cls } from "@/utils/tailwindCss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const featureList = [
  "ALL",
  "Top",
  "Fantasy",
  "Drama",
  "Romance",
  "Action",
  "sports",
  "Game",
  "Comic",
];

const feaetureThumbnailList = [
  "/images/main.png",
  "/images/main.png",
  "/images/main.png",
];

const settings = {
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  pauseOnHover: true,
  arrows: false,
  centerMode: true,
  centerPadding: "20px",
  focusOnSelect: true,
};

const Home = () => {
  const { wallet } = nearStore();
  const [currentFeature, setCurrentFeature] = useState<string>(featureList[0]);

  const handleFeatureButton = (feature: string) => {
    setCurrentFeature(feature);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-6 pt-3">
        <Image
          src="images/hamberger.svg"
          width={18}
          height={20}
          alt="hamberger svg"
        />
        <h1 className="font-bold">what’s next</h1>
        <Image src="images/plus.svg" width={18} height={20} alt="plu svg" />
      </div>
      <div className="pr-5 h-full overflow-y-auto whitespace-nowrap scrollbar-hide">
        {featureList.map((feature) => {
          const isSelected = currentFeature === feature;

          return (
            <button
              key={feature}
              type="button"
              className={cls(
                "font-bold ml-5 text-lg pb-2",
                isSelected ? "text-white border-b-4 border-gray" : "text-gray"
              )}
              onClick={() => {
                handleFeatureButton(feature);
              }}
            >
              {feature}
            </button>
          );
        })}
      </div>

      <div className="py-6">
        <Slider {...settings}>
          {feaetureThumbnailList.map((thumbnailSrc) => {
            return (
              <div key={thumbnailSrc} className="px-2">
                <Image
                  src={thumbnailSrc}
                  className="rounded-xl"
                  width={1080}
                  height={1080}
                  alt={"thumbnailSrc"}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
