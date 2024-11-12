// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../src/redux/actions/authActions";
import {
  selectAuthState,
} from "../src/redux/reducers/userSlice.js";
import { getAccessToken } from "./utils/jwt/jwtService.js";

const AppWrapper = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAuthState);



const tocken=getAccessToken()
  useEffect(() => {
    if (!isAuthenticated && tocken) {
      dispatch(fetchUser());
    }
  }, [isAuthenticated, dispatch]);



  return <AppRoutes />;
};

const App = () => {
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="h-screen dark:bg-dark-bg text-black dark:text-white">
          <AppWrapper />
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
