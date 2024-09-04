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

  return (
    <div className="absolute top-0 left-0 w-full h-16 bg-white">
      <img className="logo" src={logo} alt="logo" />
      {/* <img className="h-15 mr-4" src={logo} alt="logo" /> */}
      <span className="app-title">EndoApp</span>
      {/* <span className="text-3xl font-semibold text-[#3b83f6] ml-4"> */}
      <div className="nav-links">
        {/* <div className="ml-auto flex items-center space-x-6"> */}
        <Link to="/"> Home </Link>
        {/* <Link to="/" className="text-[#3b83f6] text-xl font-semibold"> */}
        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link> <Link to="/register"> Signup </Link>
            {/* <Link to="/login" className="text-[#3b83f6] text-xl font-semibold"> */}
          </>
        )}
        {isLoggedIn && <Link to="/analysis-results"> Analysis Results</Link>}
        {/* <Link to="/register" className="text-[#3b83f6] text-xl font-semibold"> */}
        {isLoggedIn && <span onClick={handleLogOut}>Log Out</span>}
        {/* className="text-[#3b83f6] text-xl font-semibold cursor-pointer" */}
      </div>
    </div>
  );
};
