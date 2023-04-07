import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LogButton from "../LogButton/LogButton";

const Header = () => {
return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src="https://i.imgur.com/tqV0UFx.png" alt="logo" 
              height="30" />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
           <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/donation">Donation</Nav.Link>
            <Nav.Link as={NavLink} to="/events">Events</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
            <Button variant="dark" as={NavLink} to="/admin" className="m-1">Admin</Button>
            <LogButton/>
           {/*
            <Button variant="primary" as={NavLink} to="/register" className="m-1">Register</Button>
           */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
);
};

export default Header;