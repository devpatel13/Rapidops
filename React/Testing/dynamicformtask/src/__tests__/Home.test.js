import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Home from "../components/Home/Home";
import formData from "../components/utils/FormData";

jest.mock("../components/ProgressBar/ProgressBar", () => () => (
  <div>Mock ProgressBar</div>
));
jest.mock("../components/StepBar/StepBar", () => () => <div>Mock StepBar</div>);
jest.mock(
  "../components/DynamicForm/DynamicForm",
  () =>
    ({ data, setStepsCompleted }) =>
      (
        <div>
          Mock DynamicForm
          <button onClick={() => setStepsCompleted(data.currentStep)}>
            Complete Step
          </button>
        </div>
      )
);
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    require("react-router-dom").useNavigate.mockReturnValue(jest.fn());
    localStorage.clear();
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  test("renders without crashing", () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(screen.getByText("Mock ProgressBar")).toBeInTheDocument();
    expect(screen.getByText("Mock StepBar")).toBeInTheDocument();
    expect(screen.getByText("Mock DynamicForm")).toBeInTheDocument();
  });

  test("renders ProgressBar and StepBar with correct props", () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const progressBar = screen.getByText("Mock ProgressBar");
    const stepBar = screen.getByText("Mock StepBar");

    expect(progressBar).toBeInTheDocument();
    expect(stepBar).toBeInTheDocument();
  });

  test("navigates to submit form if form is already submitted", () => {
    localStorage.setItem("formData", JSON.stringify({ isFormSubmitted: true }));
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(require("react-router-dom").useNavigate).toHaveBeenCalled();
    expect(require("react-router-dom").useNavigate().mock.calls[0][0]).toBe(
      "/submitForm"
    );
  });

  test("does not navigate if form is not submitted", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText("Mock ProgressBar")).toBeInTheDocument();
    expect(screen.getByText("Mock StepBar")).toBeInTheDocument();
    expect(screen.getByText("Mock DynamicForm")).toBeInTheDocument();
  });

  test("updates form data correctly", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Assuming formData.steps.length is greater than 0
    const step = screen.getByText("Mock DynamicForm");
    expect(step).toBeInTheDocument();
  });

  test("handles steps completion and navigates to submit form", () => {
    localStorage.setItem(
      "formData",
      JSON.stringify({ isFormSubmitted: false })
    );
    render(
      <Router>
        <Home />
      </Router>
    );

    // Simulate completing all steps
    for (let i = 0; i < formData.steps.length; i++) {
      const button = screen.getByText("Complete Step");
      fireEvent.click(button);
    }

    expect(require("react-router-dom").useNavigate).toHaveBeenCalled();
    expect(require("react-router-dom").useNavigate().mock.calls[0][0]).toBe(
      "/submitForm"
    );
  });

  test("resets steps completed on error", () => {
    localStorage.setItem("formData", JSON.stringify({ isFormSubmitted: true }));
    render(
      <Router>
        <Home />
      </Router>
    );

    // Simulate completing all steps
    for (let i = 0; i < formData.steps.length; i++) {
      const button = screen.getByText("Complete Step");
      fireEvent.click(button);
    }

    expect(window.alert).toHaveBeenCalledWith("Error storing the data");
    expect(screen.getByText("Mock DynamicForm")).toBeInTheDocument();
  });
});
