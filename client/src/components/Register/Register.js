import { FloatingLabel, Form, Container, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import {VolunteerContext} from "../../App";
import { useParams } from "react-router-dom";

function Register() {
  const [loggedUser] = useContext(VolunteerContext); 
  const [event, setEvent] = useState({});
  
  const {id} = useParams();
  // send Registration data to server
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);
  fetch(`http://localhost:5000/add-registration`, {
      method: "POST", 
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.log(error.message));
  };
 //get Events data from server 
 useEffect(() => {
   fetch(`http://localhost:5000/events/${id}`)
.then(res => res.json())
.then(data => {
  setEvent(data);
})
.catch(error => console.log(error.message));
 }, [id]);
 
  return (
    <section className="text-center mt-5">
      <img src="https://i.imgur.com/tqV0UFx.png" alt="logo" height="50" />
      <Container className="p-5 m-3 border border-2 border-secondary bg-white">
        <h4 className="mb-5">Register as a Volunteer</h4>
        <Form onSubmit={handleSubmit} >
          <FloatingLabel controlId="floatingName" label="Full Name">
            <Form.Control type="text" placeholder="Full Name" className="mb-3" name="name" defaultValue={loggedUser.displayName} readOnly />
          </FloatingLabel>
          <FloatingLabel controlId="floatingEmail" label="Username or Email" className="mb-3">
            <Form.Control type="email" placeholder="name@example.com" name="email" defaultValue={loggedUser.email} readOnly/>
          </FloatingLabel>
          <FloatingLabel controlId="floatingDate" label="Date" className="mb-3">
            <Form.Control type="Date" placeholder="Date" name="date"  required/>
          </FloatingLabel>
          <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
            <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" required/>
          </FloatingLabel>
          <FloatingLabel controlId="floatingEvent" label="Event" className="mb-4">
            <Form.Control type="text" placeholder="Event" name="event" defaultValue={event.title} readOnly/>
          </FloatingLabel>
          <Button variant="primary" type="submit" className="w-100">
            Registration
          </Button>
        </Form>
      </Container>
    </section>
  );
}

export default Register;
