import "./App.css";
import MainView from "./components/mainView";
import SideBar from "./components/sideBar";

function App() {
  return (
    <>
      <div className="flex flex-row gap-5 m-0 h-vh">
        <SideBar />
        <MainView/>
      </div>
    </>
  );
}

export default App;
