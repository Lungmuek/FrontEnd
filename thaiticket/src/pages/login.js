import { useState } from "react";
import Poster_item from "../components/Poster_item";
import events from "../data/events_data";
import { Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AppHeader from "../components/Appheader";
import "./login.css";

function App() {
  const [searchText, setseachText] = useState("");
  const [event, setEvent] = useState([]);

  const fliterTexts = events.filter((event_now) => {
    return event_now.title.toLowerCase().includes(searchText.toLowerCase());
  });

  const eventElements = fliterTexts.map((eventt, index) => {
    return <Poster_item key={index} event={eventt} />;
  });

  return (
    <div className="app">
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
                <Nav.Link href="/login">หน้าแรก</Nav.Link>
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
                <img
                  src="./images/avatar.png"
                  alt="Avatar"
                  className="avatar-img"
                />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="Eventname">
        <h2>งานแสดงทั้งหมด</h2>
      </div>
      <div className="app-grid">{eventElements}</div>
    </div>
  );
}

export default App;
