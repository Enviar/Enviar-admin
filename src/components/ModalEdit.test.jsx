/** @jest-environment jsdom */
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ModalEdit from "./ModalEdit";

describe("modal edit component test", () => {
  it("handle submit in modal edit", async () => {
    const submit = render(
      <BrowserRouter>
        <ModalEdit />
      </BrowserRouter>
    );
    expect(submit).toBeDefined();
  });

  it("handle submit in modal edit", async () => {
    const setShow = jest.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <ModalEdit show={true} setShow={setShow} />
      </BrowserRouter>
    );
    fireEvent.click(getByTestId("edit-modal"));
    expect(setShow).toHaveBeenCalled();
  });
});
