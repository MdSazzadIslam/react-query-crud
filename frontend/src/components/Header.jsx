import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} width={40} height={40} alt="logo" />
        </Link>
      </div>
      <div className="nav_menu">
        <Link to="/">List</Link>
        <Link to="/user">Add</Link>
      </div>
    </div>
  );
};

export default Header;
