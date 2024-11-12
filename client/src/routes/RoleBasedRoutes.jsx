/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { decodeAccessToken } from "../utils/jwt/jwtService.js"; 
import toast from "react-hot-toast";

const RoleBasedRoutes = ({ allowedRoles }) => {
  const token = decodeAccessToken(); 

  if (!token) {
    return <Navigate to="/login" />;
  }

  const { role } = token;

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    toast.error("You are not allowed to access this route!");
    return <Navigate to="/login" />;
  }
};

export default RoleBasedRoutes;
