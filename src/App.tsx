import { useState } from "react";
import "./App.css";
import MainView from "./components/mainView";
import SideBar from "./components/sideBar";
import { Bird } from "./types/bird";
import birdDefaultImage from "./assets/birdDefaultImage.jpg";

function App() {
  const [selectedBird, setSelectedBird] = useState<Bird | undefined>();

  function selectedItemChanged(item: Bird) {
    setSelectedBird(item);
  }

  return (
    <>
      <div className="flex flex-row">
        <SideBar
          bird={selectedBird}
          onSelectedItemChanged={selectedItemChanged}
          defaultImage={birdDefaultImage}
        />

        <MainView bird={selectedBird} defaultImage={birdDefaultImage} />
      </div>
    </>
  );
}

export default App;
