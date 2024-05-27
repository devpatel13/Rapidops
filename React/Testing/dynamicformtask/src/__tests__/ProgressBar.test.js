import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProgressBar from "../components/ProgressBar/ProgressBar";

describe("ProgressBar Component", () => {
  test("renders without crashing", () => {
    const { container } = render(<ProgressBar progressPercentage={50} />);
    expect(container).toBeInTheDocument();
  });

  test("renders with correct progress percentage", () => {
    const { container } = render(<ProgressBar progressPercentage={50} />);
    const progressBar = container.querySelector(".progress-bar");
    expect(progressBar).toHaveStyle("width: 50%");
  });

  test("renders 0% progress correctly", () => {
    const { container } = render(<ProgressBar progressPercentage={0} />);
    const progressBar = container.querySelector(".progress-bar");
    expect(progressBar).toHaveStyle("width: 0%");
  });

  test("renders 100% progress correctly", () => {
    const { container } = render(<ProgressBar progressPercentage={100} />);
    const progressBar = container.querySelector(".progress-bar");
    expect(progressBar).toHaveStyle("width: 100%");
  });

  test("handles progress greater than 100%", () => {
    const { container } = render(<ProgressBar progressPercentage={150} />);
    const progressBar = container.querySelector(".progress-bar");
    expect(progressBar).toHaveStyle("width: 150%");
  });

  test("handles progress less than 0%", () => {
    const { container } = render(<ProgressBar progressPercentage={-50} />);
    const progressBar = container.querySelector(".progress-bar");
    expect(progressBar).toHaveStyle("width: -50%");
  });

  test("handles non-integer progress", () => {
    const { container } = render(<ProgressBar progressPercentage={33.33} />);
    const progressBar = container.querySelector(".progress-bar");
    expect(progressBar).toHaveStyle("width: 33.33%");
  });
});
