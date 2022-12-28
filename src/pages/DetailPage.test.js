/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import DetailPage from "./DetailPage";

describe("detail page test", () => {
    it("should render detail page", () => {
      const detail = render(
        <BrowserRouter>
          <DetailPage/>
        </BrowserRouter>
      );
      expect(detail).toBeDefined();
    });
    
});