import { Bird } from "../types/bird";

type SideBarProps = {
  items: Bird[];
  defaultImage: string;
  bird?: Bird;
  onSelectedItemChanged: (selectedItem: Bird) => void;
};

const SideBar = ({
  items,
  bird,
  onSelectedItemChanged,
  defaultImage,
}: SideBarProps) => {
  return (
    <div className="flex flex-col items-center gap-10">
      {items?.map((item: Bird) => (
        <div
          key={item.name}
          className={`flex flex-col items-center gap-2 m-5 cursor-pointer w-100px h-100px p-5 ${
            bird?.name === item?.name ? "bg-green-500" : "bg-transparent"
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
    </div>
  );
};

export default SideBar;
