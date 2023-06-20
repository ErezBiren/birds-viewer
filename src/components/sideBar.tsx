import { Bird } from "../types/bird";

type SideBarProps = {
  items: Bird[];
  defaultImage: string;
  onSelectedItemChanged: (selectedItem: Bird) => void;
};

const SideBar = ({
  items,
  onSelectedItemChanged,
  defaultImage,
}: SideBarProps) => {
  return (
    <div className="flex flex-col items-center gap-10">
      {items?.map((item: Bird) => (
        <div
          key={item.name}
          className="flex flex-col items-center gap-2 cursor-pointer w-100px h-100px"
          onClick={() => {
            onSelectedItemChanged(item);
          }}
        >
          <span className="font-bold">{item.name}</span>
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-100 h-100"
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
