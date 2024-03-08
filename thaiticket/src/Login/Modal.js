import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AppHeader from "../components/Appheader";
import "./Modal.css";

function Modal_pop() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              />
            </Form.Group>
            <Form.Group className="password">
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control
                type="password"
                placeholder="กรุณากรอกรหัสผ่าน 8 หลัก"
                autoFocus
              />
            </Form.Group>
          </Form>
          <div className="login-container">
            <Button variant="danger" onClick={handleShow} className="login-btn">
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
