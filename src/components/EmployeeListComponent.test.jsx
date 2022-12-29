/** @jest-environment jsdom */
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import list from "./EmployeeListComponent";

describe("Employee list component test", () => {
    it("should render employee list component", () => {
     const employlist = render(
        <BrowserRouter>
          <list/>
        </BrowserRouter>
      );
      expect(employlist).toBeDefined();
    });
});
