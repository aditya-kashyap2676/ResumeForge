

import React, { useContext, useState } from "react";
import Header from "../components/LandingPage/Header";
import Hero from "../components/LandingPage/Hero";
import Features from "../components/LandingPage/Feature";
import Footer from "../components/LandingPage/Footer";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Modal from "../components/Modals/Modal";
import { UserContext } from "../context/useContext";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthmodal, setOpenAuthmodal] = useState(false);
  const [currentpage, setCurrentpage] = useState("login");

  return (
    <div className="w-full min-h-dvh bg-white overflow-x-hidden flex flex-col justify-between">
      {/* Main Content Area */}
      <div className="w-full">
        <Header setOpenAuthmodal={setOpenAuthmodal} />
        <Hero setOpenAuthmodal={setOpenAuthmodal} />
        <Features />
      </div>

      {/* Footer Always Bottom */}
      <Footer />

      {/* Auth Modal */}
      <Modal
        isopen={openAuthmodal}
        onclose={() => {
          setOpenAuthmodal(false);
          setCurrentpage("login");
        }}
        hideheader
      >
        <div className="w-full max-w-md mx-auto">
          {currentpage === "login" && <Login setCurrentpage={setCurrentpage} />}
          {currentpage === "signup" && <Signup setCurrentpage={setCurrentpage} />}
        </div>
      </Modal>
    </div>
  );
};

export default Landingpage;