import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, MessagesSquare, CalendarDays } from "lucide-react";

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
            <Link to="/member">
              <li
                onClick={() => handleIconClick("member")}
                className={`w-full mb-5 h-14 rounded-lg gap-4 flex md:p-5 transition duration-300 ${selectedIcon === "member" ? "bg-rex-green" : ""} items-center justify-center md:justify-start md:pl-2 lg:pl-9 `}
              >
                <LayoutDashboard color={iconColor("member")} size={23} />
                <h1 className={`xl:text-base text-sm font-semibold hidden md:block ${selectedIcon === "member" ? "text-black" : ""}`}>Dashboard</h1>
              </li>
            </Link>
            <Link to="/member/progress">
              <li
                onClick={() => handleIconClick("progress")}
                className={`w-full mb-5 h-14 rounded-lg gap-4 flex md:p-5 transition duration-300 ${selectedIcon === "progress" ? "bg-rex-green" : ""} items-center justify-center md:justify-start md:pl-2 lg:pl-9 `}
              >
                <CalendarDays color={iconColor("progress")} size={23} />
                <h1 className={`xl:text-base text-sm font-semibold hidden md:block ${selectedIcon === "progress" ? "text-black" : ""}`}>My progress</h1>
              </li>
            </Link>
            <Link to="/member/chat">
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
