import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SingleCompApproach from "../exercise/exercise2/SingleCompApproach";
import App from "../App";

// Mocking alert to avoid displaying alert boxes during tests
global.alert = jest.fn();

describe("App Component", () => {
  // Test if the App component renders correctly
  test("renders SingleCompApproach component", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });
});

describe("SingleCompApproach Component", () => {
  afterEach(() => cleanup());

  // Test if the component renders correctly
  test("renders correctly", () => {
    render(<SingleCompApproach />);
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  // Test if a name is added correctly
  test("adds a name correctly", () => {
    render(<SingleCompApproach />);
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
  });

  //   // Test if the correct name is populated in the input fields when the "Edit" button is clicked
  test("edits a name correctly", () => {
    render(<SingleCompApproach />);
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.click(screen.getByText("Add"));
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByPlaceholderText("John")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Doe")).toBeInTheDocument();
  });

  //   // Test if a name is updated correctly
  test("updates a name correctly", () => {
    render(<SingleCompApproach />);
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.click(screen.getByText("Add"));
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByPlaceholderText("John"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByPlaceholderText("Doe"), {
      target: { value: "Smith" },
    });
    fireEvent.click(screen.getByText("Update"));
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Smith")).toBeInTheDocument();
    expect(screen.queryByText("John")).not.toBeInTheDocument();
    expect(screen.queryByText("Doe")).not.toBeInTheDocument();
  });

  // Test if the component handles empty input fields during update
  test("prevents updating with empty names", () => {
    render(<SingleCompApproach />);
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.click(screen.getByText("Add"));
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByPlaceholderText("John"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Doe"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Update"));
    expect(global.alert).toHaveBeenCalledWith("Name cannot be null");
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.queryByText("Update")).toHaveAttribute("hidden");
  });

  //   // Test if a name is deleted correctly
  test("deletes a name correctly", () => {
    render(<SingleCompApproach />);
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.click(screen.getByText("Add"));
    fireEvent.click(screen.getByText("Delete"));
    expect(screen.queryByText("John")).not.toBeInTheDocument();
    expect(screen.queryByText("Doe")).not.toBeInTheDocument();
  });

  //   // Test if the component prevents adding names when the input fields are empty
  test("prevents adding empty names", () => {
    render(<SingleCompApproach />);
    fireEvent.click(screen.getByText("Add"));
    expect(global.alert).toHaveBeenCalledWith("Name cannot be null");
  });

  //   // Test if the component prevents adding duplicate names
  test("prevents adding duplicate names", () => {
    render(<SingleCompApproach />);
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.click(screen.getByText("Add"));
    expect(global.alert).toHaveBeenCalledWith("Name already Exists");
  });
});
