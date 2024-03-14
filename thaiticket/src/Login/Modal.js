import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AppHeader from "../components/Appheader";
import "./Modal.css";

function Modal_pop(props) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setLoggedIn(isLoggedIn);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("username");
    setLoggedIn("false");
    alert("ออกจากระบบสำเร็จ!!!");
  };

  const handleLogin = () => {
    const apiUrl = `http://localhost:8000/login?username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          alert("เข้าสู่ระบบสำเร็จ!!!");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", username);
          localStorage.setItem("account_id", data.account_id);
          setLoggedIn("true");
          handleClose();
        } else {
          alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!");
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อ!");
      });
  };

  return (
    <>
      {loggedIn === "true" ? (
        <Button variant="danger" onClick={handleLogout}>
          ออกจากระบบ
        </Button>
      ) : (
        <Button variant="primary" onClick={handleShow}>
          เข้าสู่ระบบ
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <div className="Logo-header">
          <AppHeader />
        </div>
        <div className="Login">
          <Modal.Title>เข้าสู่ระบบ</Modal.Title>
        </div>
        <Modal.Body>
          <Form>
            <Form.Group className="user" controlId="exampleForm.ControlInput1">
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control
                type="email"
                placeholder="ชื่อผู้ใช้(อีเมล)"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="password">
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control
                type="password"
                placeholder="กรุณากรอกรหัสผ่าน 8 หลัก"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className="login-container">
            <Button
              variant="danger"
              onClick={handleLogin}
              className="login-btn"
            >
              เข้าสู่ระบบ
            </Button>
            <Button variant="link" className="forgot-password-btn">
              ลืมรหัสผ่าน
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modal_pop;
