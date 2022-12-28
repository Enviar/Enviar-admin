/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AcceptancePage from "./AcceptancePage";

describe("accaptence page test", () => {
    it("should render accaptence page", () => {
      const acceptance = render(
        <BrowserRouter>
          <AcceptancePage />
        </BrowserRouter>
      );
      expect(acceptance).toBeDefined();
    });
    
});