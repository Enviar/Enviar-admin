/** @jest-environment jsdom */
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import handleSubmit from "./ModalEdit"; 

describe("modal edit component test", () => {
    it("handle submit in modal edit", async () => {
        const submit = render (
            <BrowserRouter>
              <handleSubmit />
            </BrowserRouter>
        )
        expect(submit).toBeDefined()
      });
});
