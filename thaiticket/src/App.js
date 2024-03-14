import { useState, useEffect } from "react";
import "./App.css";

import Navbar_com from "./components/navbar";
import Poster_item from "./components/Poster_item";
import events from "./data/events_data";

function App() {
  const [searchText, setSearchText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // สถานะการล็อกอิน

  useEffect(() => {
    // เรียกใช้ฟังก์ชันเช็คการล็อกอินทุกครั้งที่เปิดแอป
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    // เช็คใน Local Storage ว่ามีค่า isLoggedIn หรือไม่
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  console.log(localStorage.getItem("isLoggedIn"));
  const handleLogout = () => {
    // เมื่อคลิกปุ่มออกจากระบบ
    localStorage.setItem("isLoggedIn", "false"); // กำหนดค่า isLoggedIn เป็น false
    setIsLoggedIn(false); // อัพเดทสถานะ isLoggedIn ให้เป็น false
  };

  const fliterTexts = events.filter((event_now) => {
    return event_now.title.toLowerCase().includes(searchText.toLowerCase());
  });

  const eventElements = fliterTexts.map((eventt, index) => {
    return <Poster_item key={index} event={eventt} isLoggedIn={isLoggedIn} />;
  });

  return (
    <div className="app">
      <Navbar_com
        searchText={searchText}
        setSearchText={setSearchText}
        isLoggedIn={isLoggedIn} // ส่งค่า isLoggedIn ไปยัง Navbar สำหรับการแสดงปุ่มเข้าสู่ระบบหรือออกจากระบบ
        handleLogout={handleLogout} // ส่งฟังก์ชัน handleLogout ไปยัง Navbar เพื่อให้ผู้ใช้สามารถล็อกเอาท์ได้
      />

      <div className="Eventname">
        <h2>งานแสดงทั้งหมด</h2>
      </div>
      <div className="app-grid">{eventElements}</div>
    </div>
  );
}

export default App;
