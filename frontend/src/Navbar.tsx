import "./App.css";
import Uterus from "./uterus.jpg";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div className="navi-bar">
      <img className="uterus-img" src={Uterus} alt="uterus img" />
      <a href="" className="endo-app">
        EndoApp
      </a>
      <div className="nav-links">
        <Link to="/"> Home </Link>
        <Link to="/register"> Register </Link>
      </div>
    </div>
  );
};
