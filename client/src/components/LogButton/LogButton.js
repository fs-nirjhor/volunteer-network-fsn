import { useContext } from "react";
import {VolunteerContext} from "../../App";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth} from "../../firebase.init";


const LogButton = () => {
  const [loggedUser] = useContext(VolunteerContext); 
  
  const handleLogout = () => {
    signOut(auth).then(() => {
  console.log("Sign-out successful.");
}).catch((error) => {
  alert(error.code);
});
  };
return (
  <div>
    { loggedUser.email ? 
      <Button onClick = {handleLogout} className="m-1 w-100">Logout</Button >
      :
      <Button variant="primary" as={NavLink} to="/login" className="m-1 w-100">Login</Button>
    }
  </div>
);
};

export default LogButton;