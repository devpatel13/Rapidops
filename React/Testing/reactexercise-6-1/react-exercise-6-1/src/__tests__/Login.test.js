import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../Pages/Login";

// Helper function to set up the component
const renderComponent = () => {
  return render(
    <Router>
      <Login />
    </Router>
  );
};

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  beforeEach(() => {
    require("react-router-dom").useNavigate.mockReturnValue(jest.fn());

    localStorage.clear();
    jest.clearAllMocks();
    window.alert = jest.fn(); // Mock alert function
  });
  afterEach(() => cleanup());

  test("renders login form", () => {
    renderComponent();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("redirects if already logged in", () => {
    localStorage.setItem("loginas", JSON.stringify("test@example.com"));
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(require("react-router-dom").useNavigate).toHaveBeenCalled();
    expect(require("react-router-dom").useNavigate().mock.calls[0][0]).toBe(
      "/home"
    );
  });

  test("shows error message for empty fields", async () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(
        "Email field is compulsory !\nPassword field is compulsory !\n"
      );
    });
  });

  test("shows error message for invalid email", async () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/E-mail address/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith("Enter valid e-mail !\n");
    });
  });

  test("shows error message for short password", async () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/E-mail address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(
        "Password should be at atleast 5 characters !\n"
      );
    });
  });

  test("shows error message for non-existing user", async () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/E-mail address/i), {
      target: { value: "nonexist@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(
        "User with this e-mail does not exist !\n"
      );
    });
  });

  test("shows error message for incorrect password", async () => {
    const userArray = [
      { email: "test@example.com", password: "correctpassword" },
    ];
    localStorage.setItem("userInfo", JSON.stringify(userArray));

    renderComponent();
    fireEvent.change(screen.getByLabelText(/E-mail address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith("Incorrect password !\n");
    });
  });

  test("logs in successfully", async () => {
    const userArray = [{ email: "test@example.com", password: "password" }];
    localStorage.setItem("userInfo", JSON.stringify(userArray));
    const navigate = jest.fn();

    render(
      <Router>
        <Login />
      </Router>
    );
    fireEvent.change(screen.getByLabelText(/E-mail address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(localStorage.getItem("loginas")).toBe(
        JSON.stringify("test@example.com")
      );
    });

    await waitFor(() => {
      expect(require("react-router-dom").useNavigate).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(require("react-router-dom").useNavigate().mock.calls[0][0]).toBe(
        "/home"
      );
    });
  });
});
