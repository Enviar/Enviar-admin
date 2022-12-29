/** @jest-environment jsdom */
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import list from "./HomeTableComponent";

describe("home table component test", () => {
    it("should render home table component", () => {
     const homeTable = render(
        <BrowserRouter>
          <list/>
        </BrowserRouter>
      );
      expect(homeTable).toBeDefined();
    });
});
