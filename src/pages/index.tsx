import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";

import nearStore from "@/store/nearStore";
import { cls } from "@/utils/tailwindCss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const genreTabList = [
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

const suggestTabList = ["Trending", "Top"];

const feaetureThumbnailList = [
  "/images/main.png",
  "/images/main.png",
  "/images/main.png",
];

const trendThumbnailList = [
  "/images/trend1.png",
  "/images/trend2.png",
  "/images/trend3.png",
  "/images/trend4.png",
  "/images/trend5.png",
  "/images/trend6.png",
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
  const [currentGenreTab, setCurrentGenreTab] = useState<string>(
    genreTabList[0]
  );
  const [currentSuggestTab, setCurrentSuggetsTab] = useState<string>(
    suggestTabList[0]
  );

  const handleChangeCurrentGenreTab = (genre: string) => {
    setCurrentGenreTab(genre);
  };

  const handleChangeCurrentSuggestTab = (suggest: string) => {
    setCurrentSuggetsTab(suggest);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-6 pt-3">
        <Image
          src="/svgs/hamberger.svg"
          width={18}
          height={20}
          alt="hamberger svg"
        />
        <h1 className="font-bold">what’s next</h1>
        <Image src="/svgs/plus.svg" width={18} height={20} alt="plu svg" />
      </div>
      <div className="pr-5 h-full overflow-y-auto whitespace-nowrap scrollbar-hide">
        {genreTabList.map((feature) => {
          const isSelected = currentGenreTab === feature;

          return (
            <button
              key={feature}
              type="button"
              className={cls(
                "font-bold ml-5 text-lg pb-2",
                isSelected ? "text-white border-b-4 border-gray" : "text-gray"
              )}
              onClick={() => {
                handleChangeCurrentGenreTab(feature);
              }}
            >
              {feature}
            </button>
          );
        })}
      </div>

      <div className="relative pt-6">
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
        <Image
          className="absolute -top-1/4 left-0 -z-10 w-80 h-80"
          width={300}
          height={320}
          src="/images/blue-circle.png"
          alt="blue-circle"
        />
        <Image
          className="absolute -bottom-1/4 right-0 -z-10 w-80 h-80"
          width={300}
          height={320}
          src="/images/red-circle.png"
          alt="red-circle"
        />
      </div>

      <p className="font-bold px-5 py-5 text-2xl leading-10">
        Welcome, writer!
        <br />
        Please write the next story
      </p>

      <div className="flex flex-col gap-6 px-6 py-2">
        <button className="flex justify-between items-center">
          <p className="font-bold text-xl">Community</p>
          <Image
            src="/svgs/arrow-right.svg"
            width={8}
            height={16}
            alt="left arrow"
          />
        </button>
        <div className="flex flex-col gap-6">
          <div className="flex gap-2">
            <div>
              <Image
                src="/images/community.png"
                className="rounded-lg"
                width={50}
                height={50}
                alt="community1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold">Name P.21</p>
              <p className="text-sm">Content Content Content Content...</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <Image
                src="/images/community.png"
                className="rounded-lg"
                width={50}
                height={50}
                alt="community1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold">Name P.10</p>
              <p className="text-sm">Content Content Content Content...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 pb-4">
        {suggestTabList.map((suggestTab) => {
          const isSelected = currentSuggestTab === suggestTab;

          return (
            <button
              key={suggestTab}
              type="button"
              className={cls(
                "font-bold ml-5 text-lg",
                isSelected ? "text-white" : "text-gray"
              )}
              onClick={() => {
                handleChangeCurrentSuggestTab(suggestTab);
              }}
            >
              {suggestTab}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-2 px-4">
        {trendThumbnailList.map((thumbnail) => {
          return (
            <div key={thumbnail}>
              <Image
                src={thumbnail}
                className="rounded"
                width={300}
                height={300}
                alt="trend-thumbnail"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
