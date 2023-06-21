import InfiniteScroll from "react-infinite-scroll-component";
import { Bird } from "../types/bird";
import { useState, useEffect } from "react";
import fetchNextBirds from "../api/zapariApi";
import SideBarHeader from "./SideBarHeader";
import SideBarItem from "./SideBarItem";

const DEFAULT_TOTAL_AMOUNT = 5;
const MAX_ITEMS_PER_FETCH = 5; // 2 items per fetch so it would be easy to see the change every scroll

type SideBarProps = {
  defaultImage: string;
  bird?: Bird;
  onSelectedItemChanged: (selectedItem: Bird) => void;
};

const SideBar = ({
  bird,
  onSelectedItemChanged,
  defaultImage,
}: SideBarProps) => {
  const [birds, setBirds] = useState<Bird[] | undefined>([]);
  const [totalAmount, setTotalAmount] = useState(DEFAULT_TOTAL_AMOUNT);

  useEffect(() => {
    fetchMoreBirds();
  }, []);

  useEffect(() => {
    // remove birds from the list if total now is smaller
    if (birds && totalAmount < birds?.length) {
      const redundantItemsAmount = birds?.length - totalAmount;
      setBirds((prev) => prev?.splice(-redundantItemsAmount));
    }
  }, [birds?.length, totalAmount]);

  async function fetchMoreBirds() {
    const remainedItemsToFetch = totalAmount - (birds?.length ?? 0);

    // calculate how much items should we fetch
    const amount =
      remainedItemsToFetch > MAX_ITEMS_PER_FETCH
        ? MAX_ITEMS_PER_FETCH
        : remainedItemsToFetch;
    const newBirds = await fetchNextBirds(amount);

    setBirds((prev) => {
      const res = prev?.concat([...newBirds]);

      // first time we fetch, select the first element
      if (prev?.length === 0 && res && res?.length > 0) {
        onSelectedItemChanged(res[0]);
      }
      return res;
    });
  }

  return (
    <div
      id="scrollableDiv"
      className="w-1/5 h-screen overflow-y-auto bg-gray-200"
    >
      <SideBarHeader
        totalAmount={totalAmount}
        birds={birds}
        onTotalChanged={(newTotal) => {
          setTotalAmount(newTotal);
        }}
      />
      <InfiniteScroll
        next={fetchMoreBirds}
        hasMore={!birds?.length ? true : birds?.length < totalAmount}
        loader={<h4>Loading...</h4>}
        dataLength={birds?.length ?? 0}
        scrollableTarget="scrollableDiv"
      >
        {birds?.map((item: Bird) => (
          <div
            key={item.id}
            className={`flex flex-col items-center gap-2 m-5 cursor-pointer w-100px h-100px p-5 ${
              bird?.id === item?.id ? "bg-green-400" : "bg-transparent"
            }`}
            onClick={() => {
              onSelectedItemChanged(item);
            }}
          >
            <SideBarItem item={item} defaultImage={defaultImage} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default SideBar;
