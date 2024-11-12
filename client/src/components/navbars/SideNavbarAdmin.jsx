import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Dumbbell, Users, Speech } from "lucide-react";

const SideNavbarMember = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    setIsDarkMode(darkMode === "true");

    const savedIcon = localStorage.getItem("selectedIcon");
    if (savedIcon) {
      setSelectedIcon(savedIcon);
    } else {
      const mainPath = location.pathname.split("/").filter(Boolean)[0]; 
      console.log(mainPath);
      
      setSelectedIcon(mainPath);
      localStorage.setItem("selectedIcon", mainPath);
    }
  }, [location.pathname]);

  const iconColor = (iconName) =>
    selectedIcon === iconName ? "#318CE7" : isDarkMode ? "#989898" : "#505050";

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    localStorage.setItem("selectedIcon", iconName);
  };

  return (
    <div className="dark:bg-dark-bg  w-full h-screen flex flex-col justify-center items-center ">
      <div className="h-full w-full border-r dark:border-neutral-800 border-neutral-300 ">
        <div className="h-[90%] w-full flex flex-row items-center ">
          <ul className="gap-12 w-full flex-col items-center p-5">
            <Link to="/admin">
              <li
                onClick={() => handleIconClick("admin")}
                className={`w-full mb-5 h-14 rounded-lg gap-4 flex md:p-5 transition duration-300 ${selectedIcon === "admin" ? "bg-rex-green" : ""} items-center justify-center md:justify-start md:pl-2 lg:pl-9 `}
              >
                <LayoutDashboard color={iconColor("admin")} size={23} />
                <h1 className={`xl:text-base text-sm font-semibold hidden md:block ${selectedIcon === "admin" ? "text-black" : ""}`}>Dashboard</h1>
              </li>
            </Link>
            <Link to="/admin/clients">
              <li
                onClick={() => handleIconClick("clients")}
                className={`w-full mb-5 h-14 rounded-lg gap-4 flex md:p-5 transition duration-300 ${selectedIcon === "clients" ? "bg-rex-green" : ""} items-center justify-center md:justify-start md:pl-2 lg:pl-9 `}
              >
                <Users color={iconColor("clients")} size={23} />
                <h1 className={`xl:text-base text-sm font-semibold hidden md:block ${selectedIcon === "clients" ? "text-black" : ""}`}>Manage Clients</h1>
              </li>
            </Link>
            <Link to="/admin/trainers">
              <li
                onClick={() => handleIconClick("trainers")}
                className={`w-full mb-5 h-14 rounded-lg gap-4 flex md:p-5 transition duration-300 ${selectedIcon === "trainers" ? "bg-rex-green" : ""} items-center justify-center md:justify-start md:pl-2 lg:pl-9 `}
              >
                <Speech color={iconColor("trainers")} size={23} />
                <h1 className={`xl:text-base text-sm font-semibold hidden md:block ${selectedIcon === "trainers" ? "text-black" : ""}`}>Manage Trainers</h1>
              </li>
            </Link>
            <Link to="/admin/classes">
              <li
                onClick={() => handleIconClick("classes")}
                className={`w-full mb-5 h-14 rounded-lg gap-4 flex md:p-5 transition duration-300 ${selectedIcon === "classes" ? "bg-rex-green" : ""} items-center justify-center md:justify-start md:pl-2 lg:pl-9 `}
              >
                <Dumbbell color={iconColor("classes")} size={23} />
                <h1 className={`xl:text-base text-sm font-semibold hidden md:block ${selectedIcon === "classes" ? "text-black" : ""}`}>Manage Classes</h1>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNavbarMember;
