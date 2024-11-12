/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { selectUserRole, selectIsAuthenticated } from "../redux/reducers/userSlice";

const RoleBasedRoutes = ({ allowedRoles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    toast.error("You are not allowed to access this route!");
    return <Navigate to="/login" />;
  }
};

export default RoleBasedRoutes;
