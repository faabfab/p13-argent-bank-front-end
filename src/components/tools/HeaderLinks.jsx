import React from "react";
import { Link, useLocation } from "react-router-dom";

function HeaderLinks() {
  const sampleLocation = useLocation();
  if (sampleLocation.pathname.includes("/user/")) {
    return (
      <React.StrictMode>
        <div>
          <Link Name="main-nav-item" to={sampleLocation.pathname}>
            <i className="fa fa-user-circle"></i>
            Tony
          </Link>
          <Link className="main-nav-item" to="/">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      </React.StrictMode>
    );
  } else {
    return (
      <React.StrictMode>
        <div>
          <Link to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </React.StrictMode>
    );
  }
}

export default HeaderLinks;
