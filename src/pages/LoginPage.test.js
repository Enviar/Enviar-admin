/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";

describe("login page test", () => {
    it("should render login page", () => {
      const login = render(
        <BrowserRouter>
          <LoginPage/>
        </BrowserRouter>
      );
      expect(login).toBeDefined();
    });
    
});