import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "https://kit.fontawesome.com/c211974a1b.js";
import "./../css/main.css";

function Layout() {
  return (
    <React.StrictMode>
      <Header />
      <Outlet />
      <Footer />
    </React.StrictMode>
  );
}

export default Layout;
