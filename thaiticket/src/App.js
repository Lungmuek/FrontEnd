import { useState } from "react";
import "./App.css";

import Navbar_com from "./components/navbar";
import Poster_item from "./components/Poster_item";
import events from "./data/events_data";
import { Route } from "react-router-dom";
import Event from "./pages/Event";

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
      <Navbar_com seachText={searchText} setseachText={setseachText} />

      <div className="Eventname">
        <h2>งานแสดงทั้งหมด</h2>
      </div>
      <div className="app-grid">{eventElements}</div>
    </div>
  );
}

export default App;
