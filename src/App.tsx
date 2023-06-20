import { useState, useEffect } from "react";
import "./App.css";
import MainView from "./components/mainView";
import SideBar from "./components/sideBar";
import { Bird } from "./types/bird";
import birdDefaultImage from "./assets/birdDefaultImage.jpg";

function App() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [selectedBird, setSelectedBird] = useState<Bird | undefined>();

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

      if (!data.items) {
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

  function selectedItemChanged(item: Bird) {
    setSelectedBird(item);
  }

  return (
    <>
      <div className="flex flex-row gap-5 m-0 h-vh">
        <SideBar
          items={birds}
          onSelectedItemChanged={selectedItemChanged}
          defaultImage={birdDefaultImage}
        />
        <MainView bird={selectedBird} defaultImage={birdDefaultImage}/>
      </div>
    </>
  );
}

export default App;
