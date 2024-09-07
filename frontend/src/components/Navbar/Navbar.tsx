import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../../App";

export const Navbar = () => {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(AppContent);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const NavLink = ({ label, to }: { label: string; to: string }) => (
    <Link
      className="text-[#3b83f6] no-underline mx-5 font-semibold text-2xl hover:underline "
      to={to}
    >
      {label}
    </Link>
  );

  return (
    <div className="absolute top-0 left-0 w-full h-16 bg-white">
      <img
        className="max-w-0 h-15 mt-0.5 mr-0 mb-px ml-[27px]"
        src={logo}
        alt="logo"
      />
      <span className="absolute top-0 left-0 text-3xl font-semibold no-underline py-4 pr-4 pl-[90px] text-[#3b83f6]">
        EndoApp
      </span>
      <div className="absolute top-0 right-0 my-0 mx-2.5 p-5">
        <NavLink label="Home" to="/" />
        {!isLoggedIn && (
          <>
            <NavLink label="Login" to="/login" />
            <NavLink label="Signup" to="/register" />
          </>
        )}
        {isLoggedIn && (
          <NavLink label=" Analysis Results" to="/analysis-results" />
        )}
        {isLoggedIn && (
          <span className="nav-links" onClick={handleLogOut}>
            Log Out
          </span>
        )}
      </div>
    </div>
  );
};
