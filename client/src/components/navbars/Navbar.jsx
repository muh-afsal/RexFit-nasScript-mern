/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser  } from "../../redux/actions/authActions.js"; 
import { logout  } from "../../redux/reducers/userSlice.js"; 
import ThemeToggle from "../common/ThemeToggle";
import RexFitLogo from "../common/RexFitLogo.jsx";

const Navbar = ({ categoryName }) => {
  const dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileImage = "https://res.cloudinary.com/djo6yu43t/image/upload/v1725124534/IMG_20240831_224439_v7rnsg.jpg";

 

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser ());
    dispatch(logout());
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="w-full bg-neutral-200 absolute dark:bg-dark-bg h-16 flex shadow-md z-50 top-0 left-0 dark:border-b  dark:border-neutral-700">
      <div className="w-[70%] h-full flex items-center p-6">
      
        <h1 className="md:ml-7 font-bold text-xl  w-max flex items-center dark:text-white">
        <div  className="  md:mr-44 md:pl-9">
           <RexFitLogo/>
        </div>
        </h1>
        <h1 className="ml-4 lg:text-xl  text-base font-bold  dark:text-white">
          {categoryName}
        </h1>
      </div>
      <div className="lg:w-[50%] w-max  h-full flex justify-end items-center md:p-6 bg--400">
        <div className="flex items-center md:w-[150px] w-[50px] justify-around"> 
          <ThemeToggle />
        </div>

        <div
          onClick={toggleDropdown}
          className="w-10 h-10 bg-neutral-700-400 rounded overflow-hidden shadow-md"
        >
          <img
            className="object-cover w-full h-full"
            src={profileImage}
            alt=""
          />
        </div>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-4 mt-[150px] w-48 bg-neutral-100 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 rounded shadow-lg z-10"
          >
            <ul className="py-2 px-1">
              <li className="px-4 py-2 hover:bg-white text-neutral-500 dark:text-neutral-300 dark:hover:bg-neutral-700 rounded-md cursor-pointer">
                Profile
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-red-400 text-neutral-500 dark:text-neutral-300 dark:hover:bg-red-400 rounded-md cursor-pointer"
              >
                Log out
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;