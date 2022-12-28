/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("home page test", () => {
    it("should render home page", () => {
      const home = render(
        <BrowserRouter>
          <HomePage/>
        </BrowserRouter>
      );
      expect(home).toBeDefined();
    });
    
});