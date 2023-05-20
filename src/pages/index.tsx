import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { cls } from "@/utils/tailwindCss";
import { communityList, dummyComic, trendThumbnailList } from "@/data";
import nearStore from "@/store/nearStore";

const genreTabList = [
  "All",
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
  const router = useRouter();
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
    <div className="flex flex-col pt-4 pb-24">
      <div className="flex justify-between p-6">
        <Image
          src="/svgs/hamberger.svg"
          width={18}
          height={20}
          alt="hamberger svg"
        />
        <div className="flex gap-1">
          <Image
            src="/svgs/next-logo.svg"
            width={18}
            height={20}
            alt="next-logo"
          />
          <h1 className="font-bold">what’s next</h1>
        </div>
        <div className="w-4.5" />
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
          {dummyComic.map(({ id, thumbnail, title }) => {
            return (
              <button
                key={id}
                onClick={() => {
                  router.push(`/comics/${id}`);
                }}
                className="h-full px-2 overflow-hidden"
              >
                <Image
                  src={thumbnail}
                  className="rounded-xl object-cover w-full h-full"
                  width={1080}
                  height={1080}
                  alt={title + "-thumbnail"}
                />
              </button>
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

      <div className="flex flex-col gap-6 px-5 py-2">
        <button className="flex justify-between items-center">
          <p className="font-bold text-xl">Community</p>
          <Image
            src="/svgs/arrow-right.svg"
            width={8}
            height={16}
            alt="left arrow"
          />
        </button>
        <div className="flex flex-col gap-2.5">
          {communityList.map(({ title, description, episode, thumbnail }) => (
            <div
              key={title}
              className="flex gap-2.5 p-2.5 pr-5 bg-darkGray rounded-lg"
            >
              <Image
                src={thumbnail}
                className="rounded-lg"
                width={60}
                height={60}
                alt={title + "-thumbnail"}
              />
              <div className="w-full flex flex-col justify-center gap-1">
                <div className="flex justify-between">
                  <p className="font-bold text-lg pr-4 overflow-hidden truncate">
                    {title}
                  </p>
                  <p className="text-sm">p.{episode}</p>
                </div>

                <p className="text-sm font-medium">{description}</p>
              </div>
            </div>
          ))}
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
      <div className="grid grid-cols-3 gap-x-2.5 gap-y-2.5 px-4">
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
