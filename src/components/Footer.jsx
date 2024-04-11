import React from "react";

function Footer() {
  const aujd = new Date();
  const year = aujd.getFullYear();
  return (
    <React.StrictMode>
      <footer className="footer">
        <p className="footer-text">Copyright {year} Argent Bank</p>
      </footer>
    </React.StrictMode>
  );
}

export default Footer;
