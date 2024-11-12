import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "../redux/reducers/userSlice.js";

const ProtectedRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  console.log(isAuthenticated,user,'llllllllllllllllllllllllll');
  

  return isAuthenticated && user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
