import React, { Component, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
import AppHeader from "./Appheader";
import "./navbar.css";
import Modal from "../Login/Modal";

function Navbar_com(props) {
  const { searchText, setseachText } = props;
  return (
    <div>
      <Navbar expand="lg" className="Nav_scoll">
        <Container fluid>
          <Navbar.Brand href="#">
            <AppHeader />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">หน้าแรก</Nav.Link>
              <Nav.Link href="#" disabled></Nav.Link>
              <Form className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchText}
                  onChange={(event) => {
                    setseachText(event.target.value);
                  }}
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Nav>
            <Nav>
              <Modal />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbar_com;
