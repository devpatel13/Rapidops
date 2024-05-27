import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SubmitForm from "../components/SubmitForm/SubmitForm";

describe("SubmitForm Component", () => {
  test("displays user data from localStorage", () => {
    const storedData = {
      step1: {
        title: "Step 1",
        formData: {
          name: "John Doe",
          email: "john@example.com",
          age: 30,
        },
      },
      step2: {
        title: "Step 2",
        formData: {
          country: "USA",
          interests: ["Reading", "Coding"],
        },
      },
    };
    localStorage.setItem("formData", JSON.stringify(storedData));

    render(<SubmitForm />);

    expect(screen.getByText(/User Data/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 2/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/30/i)).toBeInTheDocument();
    expect(screen.getByText(/USA/i)).toBeInTheDocument();
  });

  test("displays no data message when localStorage is empty", () => {
    localStorage.clear();

    render(<SubmitForm />);

    expect(
      screen.getByText("No data found in local storage.")
    ).toBeInTheDocument();
  });
});
