/* eslint-disable react/prop-types */
import { CButton } from "@coreui/react";

const buttons = [
  {
    label: "Generate monthly financial report",
    message: "Generate monthly financial report",
  },
  { label: "Customer analysis", message: "Customer analysis" },
  {
    label: "Analyze the data from Google drive",
    message: "Analyze the data from Google drive",
  },
  { label: "Create Deal Book", message: "Create Deal Book" },
];

function Suggestions({ setPrompt, sendCustomiseMessage }) {
  const handleClick = (button) => {
    setPrompt(button.message);
    sendCustomiseMessage(button.message);
  };

  return (
    <div className="col text-left ps-1 suggestions">
      {buttons.map((button, index) => (
        <CButton
          key={index}
          color="secondary"
          variant="outline"
          onClick={() => handleClick(button)}
        >
          {button.label}
        </CButton>
      ))}
    </div>
  );
}

export default Suggestions;
