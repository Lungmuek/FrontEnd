import React from "react";
import "./SeatButton.css";

function SeatButton({ seatNo, status }) {
  let buttonClass = "seat-button";
  if (status === "available") {
    buttonClass += " available";
  } else if (status === "unavailable") {
    buttonClass += " unavailable";
  } else if (status === "selected") {
    buttonClass += " selected";
  }

  return <div className={buttonClass}>{seatNo}</div>;
}

export default SeatButton;
