/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AddPackage from "./AddPackage";

describe("add package test", () => {
    it("should render AddPackage page", () => {
      const addPackage = render(
        <BrowserRouter>
          <AddPackage/>
        </BrowserRouter>
      );
      expect(addPackage).toBeDefined();
    });
    
});