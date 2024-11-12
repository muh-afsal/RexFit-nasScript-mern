
import { Navigate, Outlet } from "react-router-dom";
import { decodeAccessToken } from "../utils/jwt/jwtService.js"; 

const ProtectedRoutes= () => {
  const token = decodeAccessToken(); 
  
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
