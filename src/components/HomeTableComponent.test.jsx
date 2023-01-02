/** @jest-environment jsdom */
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import HomeTableComponent from "./HomeTableComponent";

describe("home table component test", () => {
  const lists = [
    {
      0: {
        Product: {
          receiptNumber: "123123123",
          senderName: "Ahmad",
          recipientAddress: "Jl jalan",
          typeProduct: "cosmetics",
          typeService: "medio",
        },
        notes: "barang sedang dalam transit",
      },
    },
  ];

  it("should render home table component", () => {
    const homeTable = render(
      <BrowserRouter>
        <HomeTableComponent lists={lists} />
      </BrowserRouter>
    );
    expect(homeTable).toBeDefined();
  });
});
