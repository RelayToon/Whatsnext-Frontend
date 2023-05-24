import { useCallback, useState } from "react";
import Image from "next/image";

import {
  communityList,
  genreTabList,
  trendThumbnailList,
  dummyComic,
  suggestTabList,
} from "@/data";
import { Slider } from "@/components/Slider";
import { NavTab, TabItem } from "@/components/Tab";
import { ToonCard } from "@/components/Toon";

const Home = () => {
  const [currentGenreTab, setCurrentGenreTab] = useState<string | number>(
    genreTabList[0]
  );
  const [currentSuggestTab, setCurrentSuggetsTab] = useState<string | number>(
    suggestTabList[0]
  );

  const handleChangeCurrentGenreTab = useCallback((id: string | number) => {
    setCurrentGenreTab(id);
  }, []);

  const handleChangeCurrentSuggestTab = useCallback((id: string | number) => {
    setCurrentSuggetsTab(id);
  }, []);

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

      <div className="h-full overflow-y-auto whitespace-nowrap scrollbar-hide">
        <NavTab
          tabs={genreTabList.map((genreTab) => ({
            id: genreTab,
            title: genreTab,
          }))}
          currentTab={{ id: currentGenreTab, title: currentGenreTab + "" }}
          onChangeTab={handleChangeCurrentGenreTab}
        />
      </div>

      <div className="relative pt-6">
        <Slider items={dummyComic} route="comics" />
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
            <ToonCard
              key={title + episode}
              title={title}
              description={description}
              episode={episode}
              thumbnail={thumbnail}
            />
          ))}
        </div>
      </div>

      <div className="pt-10 pb-4">
        {suggestTabList.map((suggestTab) => {
          const isActive = currentSuggestTab === suggestTab;

          return (
            <TabItem
              key={suggestTab}
              id={suggestTab}
              title={suggestTab}
              isActive={isActive}
              onChange={handleChangeCurrentSuggestTab}
            />
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
