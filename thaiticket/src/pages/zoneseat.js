import React, { useState, useEffect } from "react";
import All_navbar from "../components/All_navbar";
import { useLocation, useNavigate } from "react-router-dom"; // เพิ่ม useNavigate
import "./zoneseat.css";

function Zoneseat() {
  const location = useLocation();
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อเดินทางไปยังหน้าอื่น
  const params = new URLSearchParams(location.search);

  // ดึงค่าจาก URL parameters ที่ส่งมาจากหน้า Show
  const event_name = params.get("event_name");
  const event_thumnailurl = params.get("event_thumnail");
  const show_date = params.get("show_date");
  const show_time = params.get("show_time");
  const zone = params.get("zone");

  const [ticket_price, setTicketPrice] = useState(null);
  const [seat_count, setSeatCount] = useState(null);
  const [seat_numbers, setSeatNumbers] = useState([]);

  const [seats, setSeats] = useState([]);
  const [accountAddress, setAccountAddress] = useState(null);
  const [isSpecial, setIsSpecial] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/select-zone?account_id=${localStorage.getItem(
      "account_id"
    )}&
event_name=${encodeURIComponent(event_name)}&
show_date=${encodeURIComponent(show_date)}&
show_time=${encodeURIComponent(show_time)}&
zone_name=${encodeURIComponent(zone)}`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setSeats(data.zone_seat);
        setAccountAddress(data.account_address);
        setIsSpecial(data.is_special);
        setTicketPrice(data.zone_price);
      });
  }, []); // ใช้ useEffect ด้วย dependency array เป็น [] เพื่อให้ฟังก์ชั่นดึงข้อมูลเริ่มต้นเมื่อ component โหลดเสร็จ

  console.log(isSpecial);

  const renderSeatRowButtons = (rowName, seatsInRow) => {
    return (
      <div className="seat-row" key={rowName}>
        <span>{rowName}</span>
        <div className="seat-buttons">
          {seatsInRow.map((seat, index) => (
            <div
              key={seat.seat_no}
              className={`seat-button ${
                seat.status === "available"
                  ? "available"
                  : seat.status === "reserved"
                  ? "reserved"
                  : "unavailable"
              } ${seat.isSelected ? "selected" : ""}`}
              onClick={() => handleSeatSelection(seat)}
              disabled={seat.status !== "available" || seat.isSelected} // เพิ่ม disabled เมื่อที่นั่งถูกเลือกแล้ว
            >
              {seat.seat_no.split("-")[1]}{" "}
            </div>
          ))}
        </div>
      </div>
    );
  };
  // สร้างการจัดกลุ่มของที่นั่งตามแถว
  const groupSeatsByRow = (seats) => {
    const rows = {};
    seats.forEach((seat) => {
      const [rowName] = seat.seat_no.split("-");
      if (!rows[rowName]) {
        rows[rowName] = [];
      }
      rows[rowName].push(seat);
    });
    return rows;
  };

  // แบ่งที่นั่งเป็นแถว
  const seatsByRow = groupSeatsByRow(seats);

  // ฟังก์ชันสำหรับการเลือกที่นั่ง
  const handleSeatSelection = (selectedSeat) => {
    const updatedSeats = [...seats];
    const updatedSeatIndex = updatedSeats.findIndex(
      (seat) => seat.seat_no === selectedSeat.seat_no
    );

    if (updatedSeatIndex !== -1) {
      // ตรวจสอบว่าที่นั่งที่กำลังเลือกอยู่ในสถานะ available
      if (updatedSeats[updatedSeatIndex].status === "available") {
        updatedSeats[updatedSeatIndex] = {
          ...updatedSeats[updatedSeatIndex],
          isSelected: !updatedSeats[updatedSeatIndex].isSelected,
        };

        // อัพเดทที่นั่งที่ถูกเลือก
        const selectedSeatNumbers = updatedSeats
          .filter((seat) => seat.isSelected)
          .map((seat) => seat.seat_no);
        setSeatNumbers(selectedSeatNumbers);
        setSeatCount(selectedSeatNumbers.length);
        setSeats(updatedSeats);
      }
    }
  };

  const handleConfirmSeats = () => {
    if (seat_numbers.length === 0) {
      alert("กรุณาเลือกที่นั่งค่ะ");
      return;
    } else alert("ยืนยันการจองเรียบร้อยค่ะ");
    // สร้าง URL พร้อมกับ parameters ที่จะส่งไปยัง API
    const apiUrl = `http://localhost:8000/select-seat?account_id=${localStorage.getItem(
      "account_id"
    )}&event_name=${encodeURIComponent(
      event_name
    )}&show_date=${encodeURIComponent(
      show_date
    )}&show_time=${encodeURIComponent(
      show_time
    )}&zone_name=${encodeURIComponent(zone)}&seat_selected=${encodeURIComponent(
      seat_numbers.join(",")
    )}`;

    // ทำการ fetch ข้อมูลโดยใช้ method GET
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // แปลง response เป็น JSON
      })
      .then((data) => {
        // กระบวนการจัดการข้อมูลที่ได้รับกลับจาก API
        console.log(data); // เป็นตัวอย่างการแสดงข้อมูลที่ได้รับกลับมาใน console
        // เด้งกลับไปหน้าแรก (home page)
        navigate("/"); // ใช้ navigate เพื่อเดินทางไปยังหน้าอื่น
      })
      .catch((error) => {
        // กระบวนการจัดการเมื่อเกิด error
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  return (
    <div>
      <All_navbar />
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
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
              <h2>2/3</h2>
              <span>เลือกที่นั่ง</span>
            </div>
          </div>
          <div style={{ flex: 3, backgroundColor: "rgba(128, 128, 128, 0.6)" }}>
            <div className="grid">
              <div className="image-container">
                <img src={event_thumnailurl} alt="Event Thumbnail" />
              </div>
              <div className="details-container">
                <p>{event_name}</p>
                <p>
                  รอบการแสดง: {show_date} {show_time}
                </p>
                <p>โซนที่เลือก: {zone}</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 5, backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
          <div className="seat-container">
            <p style={{ color: "white" }}>
              สีขาว: ที่นั่งที่เลือก <span style={{ color: "red" }}>สีแดง</span>
              : ที่นั่งไม่ว่าง{" "}
              <span style={{ color: "lightgreen" }}> สีเขียว</span>: ว่างอยู่
            </p>
            {Object.entries(seatsByRow).map(([rowName, seatsInRow]) =>
              renderSeatRowButtons(rowName, seatsInRow)
            )}
            <div className="booking-details">
              <h3>รายละเอียดการจอง</h3>
              <p>
                รอบการแสดง: {show_date} {show_time}
              </p>
              <p>โซนที่นั่ง: {zone}</p>
              <p>ราคาบัตร: {ticket_price}</p>
              <p>จำนวนที่นั่ง: {seat_count}</p>
              <p>เลขที่นั่ง: {seat_numbers.join(", ")}</p>
              <p>
                ราคาทั้งหมด:{" "}
                {isSpecial
                  ? seat_count * ticket_price * 0.9 + " (ลดราคา 10%)"
                  : seat_count * ticket_price}
              </p>
              <button className="confirm-button" onClick={handleConfirmSeats}>
                ยืนยันที่นั่ง
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Zoneseat;
