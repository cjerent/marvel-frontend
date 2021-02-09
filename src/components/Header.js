import React from "react";
import logo from "../assets/marvel-logo.png";
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();
  return (
    <header>
      <div className="wrapper">
        <img onClick={() => history.push("/")} src={logo} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
