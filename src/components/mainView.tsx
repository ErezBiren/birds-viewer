import { useEffect, useState } from "react";
import { Bird } from "../types/bird";

type MainViewProps = {
  bird?: Bird;
  defaultImage: string;
};

const googleMapsLinkWithCoordinates = "https://www.google.com/maps/search/?api=1&query=";

const MainView = ({ bird, defaultImage }: MainViewProps) => {
  const [googleMapsLink, setGoogleMapsLink] = useState("");

  useEffect(() => {

    if (!bird?.location?.lat || !bird.location?.lng) return;
    const linkWithCoordinates = `${googleMapsLinkWithCoordinates}${bird.location.lat},${bird.location.lng}`;
    setGoogleMapsLink(linkWithCoordinates);
  }, [bird]);

  return (
    <>
      {bird && (
        <div className="flex flex-col items-center w-full gap-10 just">
          <span className="mt-10 text-2xl font-bold" >{bird.name}</span>
          <img
            src={bird.image}
            alt={bird.name}
            className="object-cover w-96 h-96"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = defaultImage;
            }}
          />
          <a
            target="_blank"
            href={googleMapsLink}
            className="text-xl font-medium text-blue-500 hover:underline"
          >
            go to google
          </a>
          <audio controls>
            <source src={bird.sound} type="audio/mpeg" />
          </audio>
          {bird.sound}
        </div>
      )}
    </>
  );
};

export default MainView;
