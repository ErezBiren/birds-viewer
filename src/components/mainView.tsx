import { Bird } from "../types/bird";

type MainViewProps = {
  bird?: Bird;
  defaultImage: string;
};

const MainView = ({ bird,defaultImage }: MainViewProps) => {
  return (
    <>
      {bird && (
        <div className="w-full bg-green-200">
          <span>{bird.name}</span>
          <img
            src={bird.image}
            alt={bird.name}
            className="object-cover w-100 h-100"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = defaultImage;
            }}
          />
        </div>
      )}
    </>
  );
};

export default MainView;
