import React, { useState } from "react";
import All_navbar from "../components/All_navbar";
import { NavLink, useLocation } from "react-router-dom";
import "./show.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Show() {
  const location = useLocation();
  const event_name = new URLSearchParams(location.search).get("title");
  const event_thumnailurl = new URLSearchParams(location.search).get(
    "thumnailurl"
  );
  const event_zone = new URLSearchParams(location.search).get(
    "zone_thumnailurl"
  );
  const event_price = new URLSearchParams(location.search).get(
    "price_thumnailurl"
  );
  const show_list_string = new URLSearchParams(location.search).get(
    "show_list"
  );
  const show_list_decoded = decodeURIComponent(show_list_string);
  const show_list = JSON.parse(show_list_decoded);
  console.log(show_list);

  const [zoneSeat, setZoneSeat] = useState([]);

  // สร้าง state เพื่อเก็บรายการรอบการแสดงที่เลือก
  const [showRound, setShowRound] = useState("");
  const [showModal, setShowModal] = useState(false); // State สำหรับการแสดง modal

  // ฟังก์ชันเมื่อมีการเปลี่ยนแปลงใน dropdown
  const handleShowRoundChange = (event) => {
    setShowRound(event.target.value);
  };

  // ฟังก์ชันเมื่อคลิกปุ่ม "ที่นั่งว่าง"
  const handleEmptySeatClick = () => {
    if (!showRound) {
      alert("โปรดเลือกรอบการแสดง");
      return;
    }

    const [showDate, showTime] = showRound.split(",");

    fetch(
      `http://localhost:8000/select-show?event_name=${encodeURIComponent(
        event_name
      )}&show_date=${encodeURIComponent(
        showDate
      )}&show_time=${encodeURIComponent(showTime)}`
    )
      .then((response) => {
        // ตรวจสอบสถานะของการเรียก API
        if (!response.ok) {
          throw new Error("เกิดข้อผิดพลาดในการเรียก API");
        }
        return response.json();
      })
      .then((data) => {
        setZoneSeat(data.zone_available_seat);
      })
      .catch((error) => {
        // ดำเนินการเมื่อเกิดข้อผิดพลาดในการเรียก API
        console.error("Error:", error);
      });

    setShowModal(true); // เปิด modal เมื่อคลิกที่ปุ่ม
  };

  // ฟังก์ชันเมื่อปิด modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const checkNumberColor = (number) => {
    return number === 0 ? "red-number" : "green-number";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <All_navbar />
      <div style={{ display: "flex", flex: 1 }} className="Top-left">
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
          }}
        >
          <div className="text">
            <span>ขั้นตอนที่</span>
            <h2>1/3</h2>
            <span>เลือกรอบ &</span>
            <span>โซนการแสดง</span>
          </div>
        </div>
        <div style={{ flex: 2, backgroundColor: "rgba(128, 128, 128, 0.6)" }}>
          <div className="grid">
            <div className="image-container">
              <img src={event_thumnailurl} alt="Event Thumbnail" />
            </div>
            <div className="details-container">
              <p>{event_name}</p>

              <select value={showRound} onChange={handleShowRoundChange}>
                <option value="">โปรดเลือกรอบการแสดง</option>
                {show_list &&
                  show_list.map((show, index) => {
                    return (
                      <option value={show.show_date + "," + show.show_time}>
                        {show.show_date} {show.show_time}
                      </option>
                    );
                  })}
              </select>
              <Button
                onClick={handleEmptySeatClick}
                style={{ backgroundColor: "white", color: "black" }}
                className="seat-free-btn"
              >
                ที่นั่งว่าง
              </Button>
              {/* ปุ่ม "ที่นั่งว่าง" */}
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 4, backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title className="ModalTitle">ที่นั่งว่าง</Modal.Title>
          </Modal.Header>
          <Modal.Body className="ModalContent">
            <table className="seat-table">
              <thead>
                <tr>
                  <th>โซน</th>
                  <th>ที่นั่งว่าง</th>
                </tr>
              </thead>
              <tbody>
                {zoneSeat &&
                  zoneSeat.map((zone, index) => (
                    <tr key={index}>
                      <td>{zone.zone_name}</td>
                      <td>
                        <NavLink
                          to={`/zoneseat?zone=${
                            zone.zone_name
                          }&event_name=${event_name}
                          &event_thumnail=${event_thumnailurl}
                          &show_date=${showRound.split(",")[0]}&show_time=${
                            showRound.split(",")[1]
                          }
                          `}
                          className="button-no-decoration"
                        >
                          <Button
                            variant="link"
                            style={{
                              color:
                                zone.available_seat === 0 ? "red" : "green",
                            }}
                          >
                            {zone.available_seat}
                          </Button>
                        </NavLink>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              ปิด
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="picture-down">
          <img src={event_zone} />
          <img src={event_price} />
        </div>
      </div>
    </div>
  );
}

export default Show;
