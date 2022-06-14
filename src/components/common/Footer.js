import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid fixed-bottom text-center " id="footer">
      &copy; Autoticket {new Date().getFullYear().toString()}
    </div>
  );
};

export default Footer;
