import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

describe("ErrorBoundary Component", () => {
  // Mock child component that throws an error
  const ChildComponent = () => {
    throw new Error("Test error");
  };

  test("displays fallback UI when an error occurs in the child component", () => {
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    // Assert that the fallback UI is rendered
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(
      screen.getByText("We apologize for the inconvenience.")
    ).toBeInTheDocument();
  });

  test("does not display fallback UI when no error occurs in the child component", () => {
    // Mock child component that does not throw an error
    const ChildComponentNoError = () => <div>No error occurred</div>;

    render(
      <ErrorBoundary>
        <ChildComponentNoError />
      </ErrorBoundary>
    );

    // Assert that the child component renders normally
    expect(screen.getByText("No error occurred")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong.")).not.toBeInTheDocument();
  });
});
