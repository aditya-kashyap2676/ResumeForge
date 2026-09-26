import React, { useContext } from "react";
import { UserContext } from "../../context/useContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children, activeMenu }) => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("DashboardLayout must be inside UserProvider");
  }

  const { user } = context;

  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="container mx-auto pt-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;