import Search from "../Search/Search";
import { useState, useEffect } from "react";
import SingleEvent from "../SingleEvent/SingleEvent";
import { Row } from "react-bootstrap";

const Home = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch(`https://volunteer-network-fsn-server.onrender.com/events`)
    .then(res => res.json())
    .then(data => {
      setEvents(data);
    })
    .catch(error => alert(error.message));
  }, []);

return (
  <div className="mt-3">
  <h3 className="text-center">I GROW BY HELPING PEOPLE IN NEED</h3>
    <Search/>
    <Row>
      {
        events.map(event => <SingleEvent event={event} key={event.id}/>)
      }
    </Row>
  </div>
);
};

export default Home;