import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => setIsOpen(!isOpen);
  return (
    <>
      <div className={`duration-300 ${isOpen ? "ml-72" : "ml-24"}`}>
        <Outlet />
        <Sidebar handleTrigger={handleTrigger} isOpenState={isOpen} />
      </div>
    </>
  );
}
