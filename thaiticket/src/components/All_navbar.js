import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
import AppHeader from "./Appheader";
import "./navbar.css";
import Modal from "../Login/Modal";
import Link from "react-router-dom";

function Navbar_com() {
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
              <Nav.Link href="/">หน้าแรก</Nav.Link>
              <Nav.Link href="#" disabled></Nav.Link>
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
