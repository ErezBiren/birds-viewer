import InfiniteScroll from "react-infinite-scroll-component";
import { Bird } from "../types/bird";
import { useState, useEffect } from "react";
import useFetchNextBirds from "../hooks/useFetchNextBirds";
import SettingsLogo from "../assets/settings.svg";
import Modal from "react-modal";

const DEFAULT_TOTAL_AMOUNT = 5;
const MAX_ITEMS_PER_FETCH = 2;

Modal.setAppElement(document.getElementById("root"));

const customStyles = {
  content: {
    width: "50%",
    height: "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(74, 222, 128, 0.7)",
  },
};

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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(DEFAULT_TOTAL_AMOUNT);
  const { fetchNextBirds } = useFetchNextBirds();

  useEffect(() => {
    fetchNextData();
  }, []);

  function closeModal() {
    setIsSettingsOpen(false);
  }

  async function fetchNextData() {
    const remainedItems = totalAmount - (birds?.length ?? 0);

    const amount =
      remainedItems > MAX_ITEMS_PER_FETCH ? MAX_ITEMS_PER_FETCH : remainedItems;
    const newBirds = await fetchNextBirds(amount);
    setBirds((prev) => prev?.concat([...newBirds]));
  }

  return (
    <div
      id="scrollableDiv"
      className="w-1/5 h-screen overflow-y-auto bg-gray-200"
    >
      <div
        className="sticky top-0 flex flex-row items-center self-start gap-10 p-5 bg-gray-300 cursor-pointer"
        onClick={() => setIsSettingsOpen(true)}
      >
        <img
          src={SettingsLogo}
          alt="React Logo"
          className="self-start w-6 cursor-pointer"
        />
        <span className="text-xl"> Rendered Items : {birds?.length} / {totalAmount}</span>
      </div>
      <InfiniteScroll
        next={fetchNextData}
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
            <span className="font-bold">{item.name}</span>
            <img
              src={item.image}
              alt={item.name}
              className="object-cover m-1 w-100 h-100"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = defaultImage;
              }}
            />
          </div>
        ))}
      </InfiniteScroll>
      <Modal
        isOpen={isSettingsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex flex-row gap-4">
          <span>Please set the Total Amount of Items:</span>
          <input
            type="number"
            className="bg-gray-300"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SideBar;
