import { Row, Col, Button } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { SlPeople } from "react-icons/sl";
import { useState, useEffect } from "react";
import {auth} from "../../firebase.init";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
   setIsAdmin(idTokenResult.claims.role === "admin" ? true : false);
  } else {
    setIsAdmin(false);
  }
});
  }, []);
  console.log(isAdmin);
  const handleRequest = async () => {
    try {
      const uid = await auth.currentUser.uid;
      const response = await fetch(
        `http://localhost:5000/admin-request`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({uid})
        }
      );
      const result = await response.json();
      console.log(result.message);
      // signOut to login again
      signOut(auth).then(() => {
  alert("Dear Admin, Please login to continue.");
}).catch((error) => {
  alert(error.code);
});
// error of try
    } catch (e) {
      alert(e.message);
    }
  };
  
  return (
    <div>
    { isAdmin ?
      <Row>
        <Col xs={12} md={3} lg={2} className="lh-lg">
          <img
            src="https://i.imgur.com/tqV0UFx.png"
            alt="logo"
            height="50"
            className="my-3 mx-auto d-block"
          />
          <NavLink to="/admin" className="text-decoration-none d-block">
            <SlPeople /> Volunteer List
          </NavLink>
          <NavLink
            to="/admin/addEvent"
            className="text-decoration-none d-block"
          >
            <BiPlus /> Add Event
          </NavLink>
        </Col>
        <Col xs={12} md={9} lg={10}>
          <Outlet />
        </Col>
      </Row>
      :
      <section className="text-center">
      <h3>You Are Not Admin</h3>
      <Button onClick={handleRequest}>Request to be Admin</Button>
      </section>
    }
    </div>
  );
};

export default Admin;
