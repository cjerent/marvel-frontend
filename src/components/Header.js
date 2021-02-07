import React from "react";
import logo from "../assets/marvel-logo.png";

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <img src={logo} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
