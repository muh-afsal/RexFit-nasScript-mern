import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Dumbbell, Users, MessagesSquare } from "lucide-react";

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
            <Link to="/trainer">
              <li
                onClick={() => handleIconClick("trainer")}
                className={`w-full mb-5 h-14 rounded-lg gap-4 flex md:p-5 transition duration-300 ${selectedIcon === "trainer" ? "bg-rex-green" : ""} items-center justify-center md:justify-start md:pl-2 lg:pl-9 `}
              >
                <LayoutDashboard color={iconColor("trainer")} size={23} />
                <h1 className={`xl:text-base text-sm font-semibold hidden md:block ${selectedIcon === "trainer" ? "text-black" : ""}`}>Dashboard</h1>
              </li>
            </Link>
            <Link to="/trainer/clients">
              <li
                onClick={() => handleIconClick("clients")}
                className={`w-full mb-5 h-14 rounded-lg gap-4 flex md:p-5 transition duration-300 ${selectedIcon === "clients" ? "bg-rex-green" : ""} items-center justify-center md:justify-start md:pl-2 lg:pl-9 `}
              >
                <Users color={iconColor("clients")} size={23} />
                <h1 className={`xl:text-base text-sm font-semibold hidden md:block ${selectedIcon === "clients" ? "text-black" : ""}`}>Manage Clients</h1>
              </li>
            </Link>
            <Link to="/trainer/programs">
              <li
                onClick={() => handleIconClick("programs")}
                className={`w-full mb-5 h-14 rounded-lg gap-4 flex md:p-5 transition duration-300 ${selectedIcon === "programs" ? "bg-rex-green" : ""} items-center justify-center md:justify-start md:pl-2 lg:pl-9 `}
              >
                <Dumbbell color={iconColor("programs")} size={23} />
                <h1 className={`xl:text-base text-sm font-semibold hidden md:block ${selectedIcon === "programs" ? "text-black" : ""}`}>PT Programs</h1>
              </li>
            </Link>
            <Link to="/trainer/chat">
              <li
                onClick={() => handleIconClick("chat")}
                className={`w-full mb-5 h-14 rounded-lg gap-4 flex md:p-5 transition duration-300 ${selectedIcon === "chat" ? "bg-rex-green" : ""} items-center justify-center md:justify-start md:pl-2 lg:pl-9 `}
              >
                <MessagesSquare color={iconColor("chat")} size={23} />
                <h1 className={`xl:text-base text-sm font-semibold hidden md:block ${selectedIcon === "chat" ? "text-black" : ""}`}>Messages</h1>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNavbarMember;
