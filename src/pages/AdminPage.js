import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => setIsOpen(!isOpen);

  // const logout = (e) => {
  //   e.preventDefault();
  //   localStorage.clear();
  //   navigate("/login");
  // };

  return (
    <>
      <div className={`duration-300 ${isOpen ? "ml-72" : "ml-24"}`}>
        <Outlet />
        <Sidebar
          handleTrigger={handleTrigger}
          isOpenState={isOpen}
          // logout={logout}
        />
      </div>
    </>
  );
}
