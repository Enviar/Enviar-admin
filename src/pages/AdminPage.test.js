/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AdminPage from "./AdminPage";

describe("admin test", () => {
    it("should render Admin page", () => {
      const admin = render(
        <BrowserRouter>
          <AdminPage/>
        </BrowserRouter>
      );
      expect(admin).toBeDefined();
    });
    
});