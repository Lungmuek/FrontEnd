import "./App.css";

import Navbar_com from "./components/navbar";
import Poster_item from "./components/Poster_item";

function App() {
  return (
    <div className="app">
      <Navbar_com />
      <div className="Eventname">
        <h2>งานแสดงทั้งหมด</h2>
      </div>
      <div className="app-grid">
        <div>
          <Poster_item
            title="2024 NA IN WOO Fan Meeting in Bangkok ''Touch my heart''"
            thumnailurl="/images/2024-na-in-woo.png"
          />
        </div>
        <div>
          <Poster_item
            title="Music @ Mahidol"
            thumnailurl="/images/music-at-mahidol-2024.png"
          />
        </div>
        <div>
          <Poster_item
            title="Tom Jones : Ages & Stage Tour - Bangkok"
            thumnailurl="/images/tom-jones.png"
          />
        </div>
        <div>
          <Poster_item
            title="est Cola Presents JEFF SATUR: SPACE SHUTTLE NO.8 ASIA TOUR IN BANGKOK "
            thumnailurl="/images/space-no-8-shuttle-asia-tour.png"
          />
        </div>
        <div>
          <Poster_item
            title="One Piece ''The Great Era of Piracy''
            Exhibition Asia Tour"
            thumnailurl="/images/one-piece-the-great.png"
          />
        </div>
        <div>
          <Poster_item
            title="The Sign 1st Fan Meeting : Lost in the jungle"
            thumnailurl="/images/the-sign-1st-fan-meeting-lost-in-the-jungle.png"
          />
        </div>
        <div>
          <Poster_item
            title="Vir Das : Mind Fool Tour in Bangkok"
            thumnailurl="/images/vir-das-mind-fool-tour-in-bangkok.png"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
