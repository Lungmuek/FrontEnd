import React from "react";
import "./Poster_item.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Poster_item(props) {
  const { event } = props;
  const navigate = useNavigate();

  const handleBuyTicket = () => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      // เรียกใช้ฟังก์ชันที่เปิด Modal Login หากยังไม่ได้ล็อกอิน
      alert("กรุณาเข้าสู่ระบบก่อน");
    } else {
      // เปิดหน้าใหม่เมื่อคลิกซื้อบัตร
      const url = `/event?title=${encodeURIComponent(
        event.title
      )}&thumnailurl=${encodeURIComponent(
        event.thumnailurl
      )}&zone_thumnailurl=${encodeURIComponent(
        event.zone_thumnailurl
      )}&price_thumnailurl=${encodeURIComponent(event.price_thumnailurl)}`;
      navigate(url);
    }
  };

  return (
    <div className="Poster_item">
      <img src={event.thumnailurl} alt="Event Thumbnail" />
      <h8>{event.title}</h8>
      <Button variant="danger" onClick={handleBuyTicket}>
        ซื้อบัตร
      </Button>
    </div>
  );
}

export default Poster_item;
