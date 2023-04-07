import { Button, Container } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from "../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result.user);
    navigate(location?.state.from);
  }).catch((error) => {
    console.log(error);
  });
  };

return (
  <section className="text-center mt-5">
     <img src="https://i.imgur.com/tqV0UFx.png" alt="logo" height="50" />
  <Container className="border m-3 px-3 py-5 text-center lh-lg ">
  <h3>Login With</h3>
    <Button variant="white" className="rounded-pill border w-100" onClick = { handleGoogleLogin } >
    <FcGoogle /> Continue With Google 
    </Button>
    <p>Don't Have an account? <Link >Create an account</Link></p>
  </Container>
  </section>
);
};

export default Login;