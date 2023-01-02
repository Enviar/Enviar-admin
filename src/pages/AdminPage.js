import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);
  const handleTrigger = () => setIsOpen(!isOpen);

  return (
    <div
      className={`duration-300 ${isOpen ? "ml-72" : "ml-24"}`}
      data-testid="sidebar-container"
    >
      <Outlet />
      <Sidebar
        handleTrigger={handleTrigger}
        isOpenState={isOpen}
        data-testid="sidebar-comp"
      />
    </div>
  );
}
