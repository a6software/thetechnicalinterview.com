import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CheckBoxes from "./CheckBoxes";

describe("lib/components/CheckBoxes", () => {
  test("loads and displays the potential answers", async () => {
    const possibleAnswers = ["a", "b", "c"];

    render(<CheckBoxes possibleAnswers={possibleAnswers} />);

    await waitFor(() => screen.getAllByTestId("checkbox-label"));

    expect(screen.getAllByTestId("checkbox-label").length).toEqual(3);

    screen.getAllByTestId("checkbox-input").map((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });

    screen
      .getAllByTestId("checkbox-question-text")
      .map((checkboxText, index) => {
        expect(checkboxText.textContent).toEqual(possibleAnswers[index]);
      });
  });
});
