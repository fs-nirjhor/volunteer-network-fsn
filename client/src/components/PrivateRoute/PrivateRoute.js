import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({isValid}) => {
  const location = useLocation();
  if (isValid) {
    return <Outlet/> 
  } else {
    return <Navigate replace to="/login" state = {{from: location}}/>
  }
};

export default PrivateRoute;