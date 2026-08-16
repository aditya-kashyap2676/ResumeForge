import React, { useState } from "react";
import Header from "../components/LandingPage/Header";
import Hero from "../components/LandingPage/Hero";
import Features from "../components/LandingPage/Feature";
import Footer from "../components/LandingPage/Footer";

const Landingpage = () => {
  const [openAuthmodal, setOpenAuthmodal] = useState(false);
  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      <div className="px-4 py-6">
        <Header setOpenAuthmodal={setOpenAuthmodal}/>
        <Hero setOpenAuthmodal={setOpenAuthmodal}/>
        <Features />
        <Footer />
      </div>
    </div>
  );
};
export default Landingpage;