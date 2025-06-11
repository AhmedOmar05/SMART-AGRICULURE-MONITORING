import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import back from "../assets/gg.jpg";
import AgriSmartTimeline from "./AgriSmartTimeline"; 
import Footer from "./Footer";// assuming you move timeline to its own file

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      {/* Hero Section */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${back})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
            This project lets users log in securely using just their phone number and a one-time password
            </p>
            <Link to="/Auth"  className="btn btn-primary">Dashboard</Link>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <AgriSmartTimeline />
      <Footer/>
    </div>
  );
};

export default LandingPage;
