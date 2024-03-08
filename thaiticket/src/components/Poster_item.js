import React from "react";
import "./Poster_item.css";
import Button from "react-bootstrap/Button";

function Poster_item(props) {
  const { title, thumnailurl } = props;
  return (
    <div className="Poster_item">
      <img src={thumnailurl} />
      <h7>{title}</h7>
      <Button variant="danger">ซื้อบัตร</Button>
    </div>
  );
}

export default Poster_item;
