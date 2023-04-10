import { useState, useEffect } from "react";
import { auth } from "../../firebase.init";
import { Row, Col, Button } from "react-bootstrap";

const Events = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const getEvents = async () => {
    try {
      const email = await auth.currentUser.email;
      const idToken = await auth.currentUser.getIdToken(
        /* forceRefresh */ true
      );
      const response = await fetch(
        `http://localhost:5000/registered-events?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: idToken,
          },
        }
      );
      const events = await response.json();
      setRegisteredEvents(events);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleCancel = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/cancel-registered-event`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const cancelledEvent = await response.json();
      console.log(cancelledEvent);
      alert("Cancelled: " + cancelledEvent.event);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      <Row xs={1} md={2}>
        {registeredEvents.map((regEvent) => {
          const { _id, event, date, img } = regEvent;
          return (
            <Col key={_id} className="p-3">
              <Row className="h-100 align-items-center shadow shadow-sm rounded p-1">
                <Col xs={4}>
                  <img src={img} alt="bannar" className="w-100" />
                </Col>
                <Col xs={8} className="lh-1">
                  <p className="fw-bold">{event}</p>
                  <p>{date}</p>
                  <div className="text-end">
                    <Button variant="light" onClick={() => handleCancel(_id)}>
                      Cancel
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Events;
