import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./../../redux/authSlice";

function HeaderLinks() {
  const sampleLocation = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const SignOut = () => {
    dispatch(logout());
  };

  if (isAuthenticated) {
    return (
      <React.StrictMode>
        <div>
          <Link Name="main-nav-item" to={sampleLocation.pathname}>
            <i className="fa fa-user-circle"></i>&nbsp;
            {user.firstName}
          </Link>
          &nbsp;
          <Link className="main-nav-item" to="/" onClick={SignOut}>
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
            <i className="fa fa-user-circle"></i>&nbsp;Sign In
          </Link>
        </div>
      </React.StrictMode>
    );
  }
}

export default HeaderLinks;
