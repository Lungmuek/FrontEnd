import React from "react";
import "./Poster_item.css";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

function Poster_item(props) {
  const { event } = props;

  return (
    <div className="Poster_item">
      <img src={event.thumnailurl} alt="Event Thumbnail" />
      <h8>{event.title}</h8>
      <NavLink
        className="์NavLink"
        to={`/event?title=${encodeURIComponent(
          event.title
        )}&thumnailurl=${encodeURIComponent(event.thumnailurl)}`}
      >
        <Button variant="danger">ซื้อบัตร</Button>
      </NavLink>
    </div>
  );
}

export default Poster_item;
