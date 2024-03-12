import React, { useState } from "react";
import "./Poster_item.css";
import Button from "react-bootstrap/Button";
import { Link, NavLink } from "react-router-dom";

function Poster_item(props) {
  const { event } = props;
  return (
    <div className="Poster_item">
      <img src={event.thumnailurl} />
      <h8>{event.title}</h8>
      <NavLink classname="Poster_item" to="/event">
        <Button variant="danger">ซื้อบัตร</Button>
      </NavLink>
    </div>
  );
}

export default Poster_item;