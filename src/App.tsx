import { useState, useEffect } from "react";
import "./App.css";
import MainView from "./components/mainView";
import SideBar from "./components/sideBar";
import { Bird } from "./types/bird";
import birdDefaultImage from "./assets/birdDefaultImage.jpg";

const DEFAULT_FETCH_AMOUNT = 5;

function App() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [selectedBird, setSelectedBird] = useState<Bird | undefined>();
  const [fetchAmount, setFetchAmount] = useState(DEFAULT_FETCH_AMOUNT)

  useEffect(() => {
    fetchBirds();
  }, []);

  async function fetchBirds() {
    try {
      const response = await fetch("https://zapari.any.do/birds/" + fetchAmount);
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
    <div className="flex flex-row">
      <div className="w-1/5 h-screen pt-10 overflow-y-auto bg-gray-200">
        <SideBar
          items={birds}
          onSelectedItemChanged={selectedItemChanged}
          defaultImage={birdDefaultImage}
        />
      </div>

      <MainView bird={selectedBird} defaultImage={birdDefaultImage} />
    </div>
  );
}

export default App;
