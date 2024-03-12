import HeadEvent from "../components/HeadEvent";
import All_navbar from "../components/All_navbar";
import React, { useEffect, useState } from "react";
import events from "../data/events_data";
import "./Event.css";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
function Event() {
  const location = useLocation();
  const event_name = new URLSearchParams(location.search).get("title");
  const event_thumnailurl = new URLSearchParams(location.search).get(
    "thumnailurl"
  );
  const fetch_url =
    "http://localhost:8000/select-event?event_name=" + event_name;
  const [price, setPrice] = useState([]);
  const [event_date, setEventDate] = useState("");
  const [event_intro, setEventIntro] = useState("");
  const [ticket_date, setTicketDate] = useState("");
  const [hall_name, setHallName] = useState("");

  useEffect(() => {
    fetch(fetch_url)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setPrice(data.zone_price);
        setEventDate(data.event_date);
        setTicketDate(data.event_ticket_sale_date);
        setHallName(data.hall_name);
      });
  }, []);

  return (
    <div className="Nav">
      <All_navbar />
      <div className="billboard">
        <div className="bg">
          <img src="/images/bg_blur-black.jpg" alt="bg-blur"></img>
        </div>
        <div className="billboard-details">
          <div className="poster-btn">
            <img src={event_thumnailurl} alt="event-poster" />
            <NavLink className="์NavLink">
              <Button variant="danger">ซื้อบัตร</Button>
            </NavLink>
          </div>
          <div className="billboard-txt">
            <h1>{event_name}</h1>
            <p>
              วันที่แสดง
              <br />
              <span>{event_date && event_date}</span>
            </p>
            <p>
              สถานที่
              <br />
              <h8>{hall_name && hall_name}</h8>
            </p>
            <p>ประตูเปิด</p>
            <p>
              วันเปิดจำหน่าย
              <br />
              <span>{ticket_date && ticket_date}</span>
            </p>
            <p>
              ราคาบัตร <br></br>
              <span>{price && price}</span>
            </p>
            <p>
              Ticket status
              <br />
              <span>Available</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
