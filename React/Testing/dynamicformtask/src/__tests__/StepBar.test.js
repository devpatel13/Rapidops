import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StepBar from "../components/StepBar/StepBar";

describe("StepBar Component", () => {
  test("renders without crashing", () => {
    render(<StepBar currentStep={1} totalSteps={3} />);
    expect(screen.getByText("Step:1")).toBeInTheDocument();
  });

  test("renders the correct number of steps", () => {
    render(<StepBar currentStep={1} totalSteps={3} />);
    const steps = screen.getAllByText(/Step:/);
    expect(steps.length).toBe(3);
  });

  test("displays check icon for completed steps", () => {
    render(<StepBar currentStep={2} totalSteps={3} />);
    const checkIcons = screen.getAllByText(
      (_, element) =>
        element.tagName.toLowerCase() === "i" &&
        element.classList.contains("fa-check-circle")
    );
    expect(checkIcons.length).toBe(1);
  });

  test("displays multiple check icons for multiple completed steps", () => {
    render(<StepBar currentStep={4} totalSteps={5} />);
    const checkIcons = screen.getAllByText(
      (_, element) =>
        element.tagName.toLowerCase() === "i" &&
        element.classList.contains("fa-check-circle")
    );
    expect(checkIcons.length).toBe(3);
  });

  test("does not display check icons for incomplete steps", () => {
    render(<StepBar currentStep={1} totalSteps={3} />);
    const checkIcons = screen.queryAllByRole("img", {
      className: "fa-check-circle",
    });
    expect(checkIcons.length).toBe(0);
  });

  test("handles zero total steps correctly", () => {
    render(<StepBar currentStep={1} totalSteps={0} />);
    const steps = screen.queryAllByText(/Step:/);
    expect(steps.length).toBe(0);
  });

  test("handles current step greater than total steps", () => {
    render(<StepBar currentStep={5} totalSteps={3} />);
    const checkIcons = screen.getAllByText(
      (_, element) =>
        element.tagName.toLowerCase() === "i" &&
        element.classList.contains("fa-check-circle")
    );
    expect(checkIcons.length).toBe(3);
  });

  test("handles negative current step correctly", () => {
    render(<StepBar currentStep={-1} totalSteps={3} />);
    const checkIcons = screen.queryAllByRole("img", {
      className: "fa-check-circle",
    });
    expect(checkIcons.length).toBe(0);
  });
});
