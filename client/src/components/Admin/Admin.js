import { Row, Col } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const Admin = () => {
return (
  <div>
    <Row >
    <Col xs={4}>
    <NavLink to="/admin">Volunteer List</NavLink>
    <br />
    <NavLink to="/admin/addEvent">Add Event</NavLink>
    </Col>
    <Col xs={8}><Outlet/></Col>
    </Row>
  </div>
);
};

export default Admin;