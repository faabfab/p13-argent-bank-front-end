import React from "react";
import "./../css/main.css";
import Logo from "./../img/argentBankLogo.png";
import { Link } from "react-router-dom";
import HeaderLinks from "./tools/HeaderLinks";

function Header() {
  return (
    <React.StrictMode>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <HeaderLinks />
      </nav>
    </React.StrictMode>
  );
}

export default Header;
