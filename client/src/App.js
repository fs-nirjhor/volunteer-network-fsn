import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Events from "./components/Events/Events";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Admin from "./components/Admin/Admin";
import AddEvent from "./components/AddEvent/AddEvent";
import VolunteerList from "./components/VolunteerList/VolunteerList";
import { useState, useEffect } from "react";
import {auth} from "./firebase.init";
import { onAuthStateChanged } from "firebase/auth";
import { createContext } from "react";

export const VolunteerContext = createContext();

function App() {
const [loggedUser, setLoggedUser] = useState({});
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
  if (user) {
    setLoggedUser(user);
  } else {
    setLoggedUser({});
  }
});
}, []);
  return (
    <VolunteerContext.Provider value={[loggedUser,setLoggedUser]}>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute isValid={!!loggedUser.email}/>} >
          <Route path="/register" element={<Register />} />
          <Route path="/register/:id" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admin" element={<Admin/>}>
          <Route index element={<VolunteerList/>} />
          <Route path="/admin/addEvent" element={<AddEvent/>} />
          </Route>
          </Route>
          <Route path="*" element={<h1 className="text-center mt-5">Page Not Found (404)</h1>}/>
        </Routes>
      </Container>
    </VolunteerContext.Provider>
  );
}

export default App;
