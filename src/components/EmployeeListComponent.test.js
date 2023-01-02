/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import EmployeeListComponent from "./EmployeeListComponent";

describe("table componenet test", () => {
  const lists = [
    {
      id: 1,
      firstname: "agus",
      lastname: "julian",
      email: "ajul@mail.com",
      phoneNumber: "0812102902",
      role: "courier",
    },
    {
      id: 2,
      firstname: "ryan",
      lastname: "julian",
      email: "rijul@mail.com",
      phoneNumber: "a09102390",
      role: "courier",
    },
  ];

  it("should rendertable component null", () => {
    const table = render(<EmployeeListComponent />);
    expect(table).toBeDefined();
  });

  it("should rendertable component", () => {
    const table = render(<EmployeeListComponent lists={lists} />);
    expect(table).toBeDefined();
  });
});
