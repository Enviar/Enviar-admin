/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

describe("Sidebar component test", () => {
  it("should render sidebar component", () => {
    const sidebar = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(sidebar).toBeDefined();
  });

  it("should render sidebar component collapsed", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Sidebar isOpenState={true} />
      </BrowserRouter>
    );
    expect(getByTestId("sidebar-comp")).toHaveClass("w-[260px]");
  });

  it("should render sidebar component closed", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Sidebar isOpenState={false} />
      </BrowserRouter>
    );
    expect(getByTestId("sidebar-comp")).toHaveClass("w-[70px]");
  });

  it("should render sidebar component closed", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Sidebar isOpenState={false} />
      </BrowserRouter>
    );
    expect(getByTestId("logout-btn")).toHaveClass("w-[75%]");
  });

  it("should render sidebar component closed", () => {
    const logout = jest.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <Sidebar isOpenState={true} handleTrigger={logout} />
      </BrowserRouter>
    );
    const btn = getByTestId("logout-btn");
    fireEvent.click(btn);
    expect(logout).toHaveBeenCalledTimes(0);
  });
});
