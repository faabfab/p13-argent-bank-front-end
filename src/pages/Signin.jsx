import React from "react";
import { useState } from "react";
import { validEmail, validPassword } from "./../components/tools/Regex";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./../redux/authSlice";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const Validate = async (e) => {
    e.preventDefault();
    // verification des champs
    !validEmail.test(email) ? setEmailErr(true) : setEmailErr(false);
    !validPassword.test(password) ? setPwdError(true) : setPwdError(false);

    if (validEmail.test(email) && validPassword.test(password)) {
      setEmailErr(false);
      setPwdError(false);
      const bodyContent = `{ "email": "${email}", "password": "${password}"}`;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyContent,
      };
      const response = await fetch(
        "http://localhost:3001/api/v1/user/login",
        requestOptions
      );
      const data = await response.json();
      if (data.status !== 200) {
        const message = document.querySelector("#message");
        message.innerHTML = data.message;
      } else {
        const token = data.body.token;
        const autorisation = `Bearer ${token}`;
        const requestOptions2 = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: autorisation,
          },
          body: bodyContent,
        };
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          requestOptions2
        );
        const data2 = await response.json();
        const userUrl = `/user/${data2.body.id}`;
        const userData = {
          email: `${data2.body.email}`,
          firstName: `${data2.body.firstName}`,
          lastName: `${data2.body.lastName}`,
        };
        dispatch(login(userData));
        //console.log(user);
        navigate(userUrl);
      }
    }
  };
  console.log(user);
  if (!isAuthenticated && user == null) {
    return (
      <React.StrictMode>
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form>
              <div className="input-wrapper">
                <label htmlFor="username">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <button className="sign-in-button" onClick={Validate}>
                Sign In
              </button>
              {emailErr && <p>Your email is invalid</p>}
              {pwdError && <p>Your password is invalid</p>}
              <p id="message"></p>
            </form>
          </section>
        </main>
      </React.StrictMode>
    );
  }
  return <div className="erreur">Erreur</div>;
}

export default Signin;
