// import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbars/Navbar";
// import { CLIENT_API } from "../../redux/actions/authActions";
import SideNavbarMember from "../../components/navbars/SideNavbarMember";

const MemberLayout = () => {


  return (
    <>
      <div className="w-full h-screen">
        <Navbar categoryName="Welcome Back" />
       
        <div className="h-full w-full flex-row  flex ">
          <div className="w-[70px]  md:w-[20%] h-full ">

            <SideNavbarMember />
          </div>
          <div className="h-full w-full md:w-[80%]  pt-16">
              <Outlet />
            </div>
        </div>
      </div>
    </>
  );
};

export default MemberLayout;
