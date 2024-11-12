import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";
import RexFitLogo from "../common/RexFitLogo";

export default function AuthNavbar() {
  const location = useLocation();

  const navItems = [
    { path: "/signup", label: "SignUp" },
    { path: "/login", label: "Login" }
  ];

  return (
    <header className="shadow-[0px_3px_23px_0px_#00000024] dark:shadow-[0px_-3px_33px_0px_#000000] absolute w-full dark:bg-[#191A1C] bg-gray-300">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <div className="flex justify-between items-center w-full mr-6">
          <RexFitLogo />

          <nav>
            <ul className="flex space-x-2">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <li
                    className={`
                      px-3 py-1 
                      font-semibold 
                      rounded-md 
                      transition-colors 
                      duration-200 
                      ${
                        location.pathname === item.path
                          ? "bg-rex-green text-black "
                          : "text-slate-500 dark:text-white "
                      }
                    `}
                  >
                    {item.label}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}