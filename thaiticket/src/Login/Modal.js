import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AppHeader from "../components/Appheader";
import "./Modal.css";

function Modal_pop() {
  const [show, setShow] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ฟังก์ชันตรวจสอบข้อมูลการเข้าสู่ระบบ
  const handleLogin = () => {
    // ตรวจสอบชื่อผู้ใช้และรหัสผ่าน
    if (username === "admin" && password === "password") {
      // เข้าสู่ระบบสำเร็จ
      alert("เข้าสู่ระบบสำเร็จ!");
      handleClose(); // ซ่อน Modal หลังจากเข้าสู่ระบบสำเร็จ
    } else {
      // เข้าสู่ระบบไม่สำเร็จ
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        เข้าสู่ระบบ
      </Button>

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
