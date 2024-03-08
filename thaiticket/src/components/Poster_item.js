import React from "react";
import "./Poster_item.css";
import Button from "react-bootstrap/Button";

function Poster_item(props) {
  const { src, title } = props;
  return (
    <div className="Poster_item">
      <img src="/images/2024-na-in-woo.png" />
      <Button variant="danger">ซื้อบัตร</Button>
    </div>
  );
}

export default Poster_item;
