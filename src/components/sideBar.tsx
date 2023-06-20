import { useEffect, useState } from "react";
import { Bird } from "../types/bird";
import birdImageTemplate from "../assets/imageTemplate.jpg";

const sideBar = () => {
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    fetchBirds();
  }, []);

  async function fetchBirds() {
    try {
      const amount = 5;
      const response = await fetch("https://zapari.any.do/birds/" + amount);
      if (!response.ok) {
        throw new Error("Failed to fetch bird data");
      }

      const data = await response.json();

      if(!data.items){
        throw new Error("No bird items found");
      }

      const uniqueBirdsByName = data.items.reduce(
        (accumulator: Bird[], current: Bird) => {
          if (!accumulator.find((item: Bird) => item.name === current.name)) {
            accumulator.push(current);
          }
          return accumulator;
        },
        []
      );

      setBirds(uniqueBirdsByName);
    } catch (error) {
      //setError(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {birds?.map((bird: Bird) => (
        <div key={bird.name} className="flex flex-col gap-2 w-100px h-100px">
          <span className="font-bold">{bird.name}</span>
          {bird.name ? (
            <img
              src={bird.image ?? birdImageTemplate}
              alt={bird.name}
              className="object-cover w-100 h-100"
            />
          ) : (
            <img
              src={birdImageTemplate}
              alt={bird.name}
              className="object-cover w-100 h-100"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default sideBar;
