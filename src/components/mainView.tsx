import { useEffect, useState } from "react";
import { Bird } from "../types/bird";

type MainViewProps = {
  bird?: Bird;
  defaultImage: string;
};

const googleMapsLinkWithCoordinates = "http://www.google.com/maps/place/";

const MainView = ({ bird, defaultImage }: MainViewProps) => {
  const [googleMapsLink, setGoogleMapsLink] = useState("");

  useEffect(() => {
    console.log(bird);

    if (!bird?.location?.lat || !bird.location?.lng) return;

    const linkWithCoordinates = `${googleMapsLinkWithCoordinates}/ + ${bird?.location.lat},${bird?.location.lng}`;
    setGoogleMapsLink(linkWithCoordinates);
  }, [bird]);

  console.log(5555);
  console.log(googleMapsLink);

  return (
    <>
      {bird && (
        <div className="flex flex-col w-full gap-0 bg-green-200">
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
          <a
            target="_blank"
            href={googleMapsLink}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            go to google
          </a>
        </div>
      )}
    </>
  );
};

export default MainView;
