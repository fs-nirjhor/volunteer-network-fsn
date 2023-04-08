import { Row, Col } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { SlPeople } from "react-icons/sl";

const Admin = () => {
return (
  <div>
    <Row >
    <Col xs={12} md={3} lg={2} className="lh-lg">
    <img src="https://i.imgur.com/tqV0UFx.png" alt="logo" height="50" className="my-3 mx-auto d-block"/>
    <NavLink to="/admin" className="text-decoration-none d-block"><SlPeople/> Volunteer List</NavLink>
    <NavLink to="/admin/addEvent" className="text-decoration-none d-block"><BiPlus/> Add Event</NavLink>
    </Col>
    <Col xs={12} md={9} lg={10}><Outlet/></Col>
    </Row>
  </div>
);
};

export default Admin;