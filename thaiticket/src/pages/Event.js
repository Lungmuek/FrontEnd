import HeadEvent from "../components/HeadEvent";
import Navbar_com from "../components/navbar";
import events from "../data/events_data";
const Event = (data) => {
  console.log(data);
  return (
    <div>
      <Navbar_com />
      <HeadEvent />
    </div>
  );
};

export default Event;
