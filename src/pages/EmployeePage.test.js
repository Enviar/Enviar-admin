/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import EmployeePage from "./EmployeePage";

describe("employee page test", () => {
    it("should render employee page", () => {
      const employee = render(
        <BrowserRouter>
          <EmployeePage/>
        </BrowserRouter>
      );
      expect(employee).toBeDefined();
    });
    
});