import React, { useState } from "react";
import Header from "../components/LandingPage/Header";
import Hero from "../components/LandingPage/Hero";
import Features from "../components/LandingPage/Feature";
import Footer from "../components/LandingPage/Footer";
import Login from "../Pages/Auth/Login"
import Signup from "../Pages/Auth/Signup"
import Modal from "../components/Modals/Modal";
const Landingpage = () => {
  const [openAuthmodal, setOpenAuthmodal] = useState(false);
  const [currentpage, setCurrentpage] = useState("login")
  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      <div className="px-4 py-6">
        <Header setOpenAuthmodal={setOpenAuthmodal} />
        <Hero setOpenAuthmodal={setOpenAuthmodal} />
        <Features />
        <Footer />

        <Modal
          isopen={openAuthmodal}
          onclose={() => {
            setOpenAuthmodal(false)
            setCurrentpage("login")
          }} hideheader>
          <div>
            {currentpage === "login" && <Login setCurrentpage={setCurrentpage} />}
            {currentpage === "signup" && <Signup setCurrentpage={setCurrentpage} />}
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default Landingpage;