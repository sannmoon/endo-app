import "./Navbar.css";
import logo from "../../assets/logo.jpg";

import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div className="navi-bar">
      <img className="logo" src={logo} alt="logo" />
      <span className="app-title">EndoApp</span>
      <div className="nav-links">
        <Link to="/"> Home </Link>
        <Link to="/login">Login</Link>
        <Link to="/register"> Register </Link>
      </div>
    </div>
  );
};
