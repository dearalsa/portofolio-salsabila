import React from "react";
import About from "../component/About";
import Certificate from "../component/Certificate";
import Home from "../component/Home";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Mainpage = () => {
  return (
    <div class="layout">
      <div className="line">
      <div className="line1">
      <Navbar />
      <Home />
      <About />
      <Certificate />
      <Footer />
    </div>
    </div>
    </div>
  );
};

export default Mainpage;
