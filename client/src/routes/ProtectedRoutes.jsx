
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/jwt/jwtService.js"; 

const ProtectedRoutes= () => {
  const token = getAccessToken(); 
  
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;