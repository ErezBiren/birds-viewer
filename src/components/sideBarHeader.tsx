import { useState } from "react";
import SettingsLogo from "../assets/settings.svg";
import Modal from "react-modal";
import { Bird } from "../types/bird";

Modal.setAppElement(document.getElementById("root"));

const customStyles = {
  content: {
    width: "50%",
    height: "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(74, 222, 128, 0.7)",
  },
};

type SideBarHeaderProps = {
  totalAmount: number;
  birds?: Bird[];
  onTotalChanged: (newTotal: number) => void;
};

const SideBarHeader = ({
  totalAmount,
  birds,
  onTotalChanged,
}: SideBarHeaderProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  function closeModal() {
    setIsSettingsOpen(false);
  }

  return (
    <>
      <div
        className="sticky top-0 flex flex-row items-center self-start gap-10 p-5 bg-gray-300 cursor-pointer"
        onClick={() => setIsSettingsOpen(true)}
      >
        <img
          src={SettingsLogo}
          alt="React Logo"
          className="self-start w-6 cursor-pointer"
        />
        <span className="text-xl">
          Rendered Items : {birds?.length} / {totalAmount}
        </span>
      </div>
      <Modal
        isOpen={isSettingsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex flex-row gap-4 text-xl">
          <span>Please set the Total Amount of Items:</span>
          <input
            type="number"
            className="pl-2 bg-gray-300"
            value={totalAmount}
            onChange={(e) => onTotalChanged(Number(e.target.value))}
          />
        </div>
      </Modal>
    </>
  );
};

export default SideBarHeader;
