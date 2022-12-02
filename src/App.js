import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/tailwind/index.css";
import ProtectedLogin from "./components/ProtectedLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import TestPage from "./components/Sidebar";
import AcceptancePage from "./pages/AcceptancePage";
import AddEmployee from "./pages/AddEmployee";
import AddPackage from "./pages/AddPackage";
import AdminPage from "./pages/AdminPage";
import DetailPage from "./pages/DetailPage";
import EmployeePage from "./pages/EmployeePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route index={true} element={<HomePage />} />
          <Route path="/acceptance" element={<AcceptancePage />} />
          <Route path="/addPackage" element={<AddPackage />} />
          <Route path="package/:id" element={<DetailPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
        <Route
          path="/login"
          element={
            <ProtectedLogin>
              <LoginPage />
            </ProtectedLogin>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
