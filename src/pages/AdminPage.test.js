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
        <AdminPage />
      </BrowserRouter>
    );
    expect(admin).toBeDefined();
  });

  it("should render sidebar component in admin page", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AdminPage />
      </BrowserRouter>
    );
    expect(getByTestId("sidebar-comp")).toBeDefined();
  });

  it("should check sidebar component classname", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AdminPage />
      </BrowserRouter>
    );
    expect(getByTestId("sidebar-container")).toHaveClass("ml-24");
  });
});
