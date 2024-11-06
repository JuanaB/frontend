import React from "react";
import "../styles/CustomButton.css";

const CustomButton = ({ text, onClick }) => {
  return (
    <button className="button-85" onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomButton;
