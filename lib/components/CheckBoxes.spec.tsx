import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CheckBoxes from "./CheckBoxes";

const TEST_ID = {
  CHECKBOX: {
    LABEL: "checkbox-label",
    INPUT: "checkbox-input",
    QUESTION_TEXT: "checkbox-question-text",
  },
};

describe("lib/components/CheckBoxes", () => {
  test("loads and displays the potential answers", async () => {
    const possibleAnswers = ["a", "b", "c"];

    render(<CheckBoxes possibleAnswers={possibleAnswers} />);

    const labels = screen.getAllByTestId(TEST_ID.CHECKBOX.LABEL);

    await waitFor(() => labels);

    expect(labels.length).toEqual(3);

    screen.getAllByTestId(TEST_ID.CHECKBOX.INPUT).forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });

    screen
      .getAllByTestId(TEST_ID.CHECKBOX.QUESTION_TEXT)
      .forEach((checkboxText, index) => {
        expect(checkboxText.textContent).toEqual(possibleAnswers[index]);
      });
  });

  ["a", "b", "c"].forEach((possibleAnswer, index, possibleAnswers) => {
    test(`can toggle individual checkbox - ${possibleAnswer}`, () => {
      render(<CheckBoxes possibleAnswers={possibleAnswers} />);

      const interestingCheckbox = screen.getByDisplayValue(possibleAnswer);
      const otherCheckboxes = screen
        .getAllByTestId(TEST_ID.CHECKBOX.INPUT)
        .filter((cb) => cb.getAttribute("name") !== `answer-${possibleAnswer}`);

      // check
      fireEvent.click(interestingCheckbox);
      expect(interestingCheckbox).toBeChecked();
      otherCheckboxes.forEach((otherCheckbox) => {
        expect(otherCheckbox).not.toBeChecked();
      });

      // uncheck
      fireEvent.click(interestingCheckbox);
      [interestingCheckbox, ...otherCheckboxes].forEach((checkbox) => {
        expect(checkbox).not.toBeChecked();
      });
    });
  });

  test("can toggle all checkboxes", async () => {
    const possibleAnswers = ["a", "b", "c"];

    render(<CheckBoxes possibleAnswers={possibleAnswers} />);

    const checkboxes = screen.getAllByTestId(TEST_ID.CHECKBOX.INPUT);

    // check
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
      fireEvent.click(checkbox);
    });
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });

    // uncheck
    checkboxes.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });
});
