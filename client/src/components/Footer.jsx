import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="w-full text-center py-6 flex flex-col items-center gap-2"
      style={{ backgroundColor: "#0f0043", color: "#ffffff" }}
    >
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Data Sentinel. All rights reserved.
      </p>

      <div className="flex gap-4 items-center text-white text-lg">
        <a
          href="https://github.com/SpandanaReddy26"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/spandanareddy26/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaLinkedin />
        </a>
      </div>

      <p className="text-xs">Built by Spandana</p>
    </footer>
  );
};

export default Footer;
