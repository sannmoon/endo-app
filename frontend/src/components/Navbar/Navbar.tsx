import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../../App";

export const Navbar = () => {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(AppContent);
  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navi-bar">
      <img className="logo" src={logo} alt="logo" />
      <span className="app-title">EndoApp</span>
      <div className="nav-links">
        <Link to="/"> Home </Link>
        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link> <Link to="/register"> Signup </Link>
          </>
        )}
        {isLoggedIn && <span onClick={handleLogOut}>Log Out</span>}
      </div>
    </div>
  );
};
