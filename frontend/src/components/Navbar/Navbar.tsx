import logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContent } from "../../App";
import menu from "../../assets/menu.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useContext(AppContent);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const NavLink = ({ label, to }: { label: string; to: string }) => (
    <Link
      className="text-[#3b83f6] no-underline mx-5 font-bold text-2xl hover:underline"
      to={to}
    >
      {label}
    </Link>
  );

  const Menu = () => (
    <>
      <NavLink label="Home" to="/" />
      {!isLoggedIn && (
        <>
          <NavLink label="Login" to="/login" />
          <NavLink label="Signup" to="/register" />
        </>
      )}
      {isLoggedIn && (
        <NavLink label="Analysis Results" to="/analysis-results" />
      )}
      {isLoggedIn && (
        <span
          className="text-[#3b83f6] no-underline mx-5 font-semibold text-2xl hover:underline cursor-pointer"
          onClick={handleLogOut}
        >
          Log Out
        </span>
      )}
    </>
  );

  return (
    <div className="absolute top-0 left-0 w-full h-16 bg-white flex items-center shadow-md">
      <div className="flex">
        <img
          className="max-w-full	h-[60px] mt-0.5 mr-2 mb-px ml-[27px]"
          src={logo}
          alt="logo"
        />
        <span className="text-3xl font-bold no-underline py-3.5 pr-3.5 text-[#3b83f6]">
          EndoApp
        </span>
      </div>

      <div className="hidden md:flex ml-auto">
        <Menu />
      </div>
      <div className={`absolute top-16 right-0 bg-white shadow-md md:hidden`}>
        <div
          className={`${
            open ? "block" : "hidden"
          } flex flex-col md:flex-row items-center md:items-end w-full p-4`}
        >
          <Menu />
        </div>
      </div>
      <div
        className="md:hidden mr-5 cursor-pointer flex items-center ml-auto"
        onClick={() => setOpen(!open)}
      >
        <img className="w-8 h-8" src={menu} alt="menu icon" />
      </div>
    </div>
  );
};
