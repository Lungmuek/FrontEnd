import React from "react";
import "./Poster_item.css";
import Button from "react-bootstrap/Button";

function Poster_item(props) {
  const { title, thumnailurl } = props;
  return (
    <div className="Poster_item">
      <img src={thumnailurl} />
      <h8>{title}</h8>
      <Button variant="danger">ซื้อบัตร</Button>
    </div>
  );
}

export default Poster_item;
