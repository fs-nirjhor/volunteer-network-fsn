import { Button, Form, Row, Col } from "react-bootstrap";

const AddEvent = () => {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);
  fetch(`http://localhost:5000/add-event`, {
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
return (
  <div>
    <h4>Add Event</h4>
        <Form onSubmit={handleSubmit} >
        <Row xs={1} md={2}>
       <Col>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Event Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" name="title" required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" style={{ height: '100px' }} placeholder="Enter Description" name="description" required/>
      </Form.Group>
       </Col>
       <Col >
      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Event Date</Form.Label>
        <Form.Control type="date" placeholder="Enter Date" name="date" required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="bannar">
        <Form.Label>Bannar</Form.Label>
        <Form.Control type="text" placeholder="Bannar URL" name="img" required/>
      </Form.Group>
       </Col>
       </Row>
      <Button variant="primary" type="submit" >Submit</Button>
    </Form>
  </div>
);
};

export default AddEvent;