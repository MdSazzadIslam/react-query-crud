import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="footer_title">
        Copyright &copy; {new Date().getFullYear()} Md. Sazzadul Islam. All
        Rights Reserved.
        <a
          href="https://github.com/MdSazzadIslam"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </h4>
    </div>
  );
};

export default Footer;
