import { Bird } from "../types/bird";

type SideBarItemProps = {
    item:Bird,
     defaultImage:string,
}

const SideBarItem = ({ item, defaultImage }:SideBarItemProps) => {
  return (
    <div className="flex flex-col items-center">
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
  );
};

export default SideBarItem;
