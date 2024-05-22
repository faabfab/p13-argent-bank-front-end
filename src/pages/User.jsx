import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import "./../css/edit_name.scss";

function User() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const editName = () => {
    const first = document.getElementById("firstName");
    const last = document.getElementById("lastName");
    first.value = "";
    last.value = "";
    const editName = document.getElementById("edit_name");
    editName.classList.toggle("hidden");
    const changeName = document.getElementById("change_name");
    changeName.classList.toggle("hidden");
  };

  const Save = async (first, last) => {
    // console.log(user.token);
    // console.log(first, last);
    const bodyContent = `{ "firstName": "${first}", "lastName": "${last}"}`;
    const autorisation = `Bearer ${user.token}`;
    const requestOptions2 = {
      method: "PUT",
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
    const resData = await response.json();
    if (resData.status === 200) {
      const userData = {
        token: `${user.token}`,
        email: `${user.email}`,
        firstName: `${first}`,
        lastName: `${last}`,
      };
      dispatch(login(userData));
      editName();
    } else {
      const error = document.getElementById("save-error");
      error.textContent = resData.status;
      error.removeAttribute("class");
    }
    return resData;
  };

  const saveName = () => {
    const first = document.getElementById("firstName");
    const last = document.getElementById("lastName");
    if (!first.value && !last.value) {
      editName();
    }
    if (first.value && !last.value) {
      Save(first.value, user.lastName);
    }
    if (last.value && !first.value) {
      Save(user.firstName, last.value);
    }
    if (last.value && first.value) {
      Save(first.value, last.value);
    }
  };

  if (isAuthenticated) {
    return (
      <React.StrictMode>
        <main className="main bg-dark">
          <div className="header">
            <h1>Welcome back</h1>
            <br />
            <div id="edit_name">
              <h1>
                {user.firstName} {user.lastName}!
              </h1>
              <button className="edit-button" onClick={editName}>
                Edit name
              </button>
            </div>
            <div id="change_name" className="hidden">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder={user.firstName}
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder={user.lastName}
              />
              <button onClick={saveName}>Save</button>
              <button onClick={editName}>Cancel</button>
              <div id="save-error" className="hidden"></div>
            </div>
          </div>
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </main>
      </React.StrictMode>
    );
  }
  return <div className="erreur">Erreur</div>;
}

export default User;
