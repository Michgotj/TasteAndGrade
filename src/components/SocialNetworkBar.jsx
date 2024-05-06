import React from "react";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

const SocialNetworkBar = () => {
  return (
    <div className="social-network-bar">
      <a
        href="https://twitter.com/GotliebMtj"
        target="_blank"
        rel="noreferrer"
        className="social-icon-link"
      >
        <FaTwitter className="social-icon" />
      </a>
      <a
        href="https://www.facebook.com/michal.gotlieb/?locale=he_IL"
        target="_blank"
        rel="noreferrer"
        className="social-icon-link"
      >
        <FaFacebook className="social-icon" />
      </a>
      <a
        href="https://www.linkedin.com/in/michalgotlieb"
        target="_blank"
        rel="noreferrer"
        className="social-icon-link"
      >
        <FaLinkedin className="social-icon" />
      </a>
    </div>
  );
};

export default SocialNetworkBar;
