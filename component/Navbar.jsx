import React from "react";
import "../app.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
      <div className="header">
        <div className="logo">
          <img src="http://localhost:8080/image/Group%208.svg" alt="" className="gambar" />
        </div>
        <div className="navbar">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#certificate">Certificate</a>
          <Link to="/admin">Login</Link>
        </div>
      </div>
  );
}
