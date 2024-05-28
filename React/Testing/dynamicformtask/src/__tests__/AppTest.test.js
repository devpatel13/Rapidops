import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

// Mocking the components
jest.mock("../components/Home/Home", () => () => (
  <div data-testid="home-component">Home Component</div>
));
jest.mock("../components/SubmitForm/SubmitForm", () => () => (
  <div data-testid="submitform-component">SubmitForm Component</div>
));
jest.mock("../components/ErrorBoundary/ErrorBoundary", () => ({ children }) => (
  <div data-testid="error-boundary">{children}</div>
));

describe("App", () => {
  test("renders Home component for the root path", () => {
    window.history.pushState({}, "Test page", "/");
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if Home component is present
    expect(screen.getByTestId("home-component")).toBeInTheDocument();
  });

  test("renders SubmitForm component for the submitform path", () => {
    window.history.pushState({}, "Test page", "/submitform");
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if SubmitForm component is present
    expect(screen.getByTestId("submitform-component")).toBeInTheDocument();
  });

  test("renders 404 page for an unknown path", () => {
    window.history.pushState({}, "Test page", "/unknownpath");
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if 404 message is present
    expect(screen.getByText("404: Page Not Found")).toBeInTheDocument();
  });
});
