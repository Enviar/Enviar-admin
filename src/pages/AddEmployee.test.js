/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AddEmployee from "./AddEmployee";

describe("Add Employee test", () => {
    it("should render AddEmployee page", () => {
      const addEmployee = render(
        <BrowserRouter>
          <AddEmployee/>
        </BrowserRouter>
      );
      expect(addEmployee).toBeDefined();
    });
    
});