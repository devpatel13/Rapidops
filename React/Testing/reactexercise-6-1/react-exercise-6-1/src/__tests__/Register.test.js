import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../Pages/Register";
import "../setupTests";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Register Component", () => {
  beforeEach(() => {
    require("react-router-dom").useNavigate.mockReturnValue(jest.fn());

    localStorage.clear();
    jest.clearAllMocks();
    window.alert = jest.fn(); // Mock alert function
  });

  afterEach(() => cleanup());

  test("shows error message for empty fields", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(
        "Username is compulsory !\nEmail is compulsory !\nPassword is compulsory !\n"
      );
    });
  });

  test("shows error message for invalid email format", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "abc" },
    });

    fireEvent.change(screen.getByLabelText(/E-mail address/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-type Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith("Enter valid e-mail !\n");
    });
  });

  test("shows error message for short username", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "ab" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(
        "Username should be at least 3 characters !\nEmail is compulsory !\nPassword is compulsory !\n"
      );
    });
  });

  test("shows error message for short password", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "abc" },
    });

    fireEvent.change(screen.getByLabelText(/E-mail address/i), {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(
        "Password should be at least 5 characters !\nRe-type Password is compulsory !\n"
      );
    });
  });

  test("shows error message for mismatched passwords", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "abc" },
    });

    fireEvent.change(screen.getByLabelText(/E-mail address/i), {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: { value: "password" },
    });

    fireEvent.change(screen.getByPlaceholderText("Re-type Password"), {
      target: { value: "different" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(
        "Password and Confirm password should be same !\n"
      );
    });
  });

  test("shows error message for existing username", async () => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify([
        {
          username: "existing",
          email: "existing@example.com",
          password: "password",
        },
      ])
    );

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "existing" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(
        "Username already exist, try with other username !\nEmail is compulsory !\nPassword is compulsory !\n"
      );
    });
  });

  test("shows error message for existing email", async () => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify([
        {
          username: "existing",
          email: "existing@example.com",
          password: "password",
        },
      ])
    );

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "newuser" },
    });

    fireEvent.change(screen.getByLabelText(/E-mail address/i), {
      target: { value: "existing@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(
        "User exist with this e-mail, register with other e-mail !\nPassword is compulsory !\n"
      );
    });
  });

  test("registers successfully and navigates to home page", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "newuser" },
    });

    fireEvent.change(screen.getByLabelText(/E-mail address/i), {
      target: { value: "newuser@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: { value: "password" },
    });

    fireEvent.change(screen.getByPlaceholderText("Re-type Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(localStorage.getItem("loginas")).toBe(
        JSON.stringify("newuser@example.com")
      );
    });
    await waitFor(() => {
      expect(localStorage.getItem("userInfo")).toEqual(
        expect.stringContaining(
          JSON.stringify({
            username: "newuser",
            email: "newuser@example.com",
            password: "password",
          })
        )
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
