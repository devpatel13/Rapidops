import {
  render,
  screen,
  fireEvent,
  cleanup,
  getByText,
} from "@testing-library/react";
import Table from "../Table/Table";
import App from "../../App";

describe("App Rendering", () => {
  test("should app render", () => {
    render(<App />);

    expect(screen.getByText("First and last name")).toBeInTheDocument();
  });
});

describe("Add Functionality Testing", () => {
  afterEach(() => cleanup());
  test("should add a name to the list when both first name and last name are provided", () => {
    render(<Table />);

    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const addButton = screen.getByText("Add");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });

    fireEvent.click(addButton);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
  });

  test("should show alert when either first name or last name is empty", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<Table />);

    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const addButton = screen.getByText("Add");

    fireEvent.change(firstNameInput, { target: { value: "" } });
    fireEvent.change(lastNameInput, { target: { value: "" } });

    fireEvent.click(addButton);

    expect(alertMock).toHaveBeenCalled();

    alertMock.mockRestore();
  });

  test("should show alert when the first name and last name are same", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<Table />);

    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const addButton = screen.getByText("Add");

    fireEvent.change(firstNameInput, { target: { value: "Dev" } });
    fireEvent.change(lastNameInput, { target: { value: "Patel" } });
    fireEvent.click(addButton);

    fireEvent.change(firstNameInput, { target: { value: "Dev" } });
    fireEvent.change(lastNameInput, { target: { value: "Patel" } });
    fireEvent.click(addButton);

    expect(alertMock).toHaveBeenCalled();

    alertMock.mockRestore();
  });
});

describe("Update Functionality Testing", () => {
  test("should update the name in the list when both first name and last name are provided", () => {
    render(<Table />);

    // Simulate adding a name first
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const addButton = screen.getByText("Add");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.click(addButton);

    // Now, simulate editing the added name
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const updatedFirstNameInput = screen.getByPlaceholderText("John");
    const updatedLastNameInput = screen.getByPlaceholderText("Doe");
    const updateButton = screen.getByText("Update");

    fireEvent.change(updatedFirstNameInput, { target: { value: "Jane" } });
    fireEvent.change(updatedLastNameInput, { target: { value: "Smith" } });

    fireEvent.click(updateButton);

    // Check if the name is updated in the list
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Smith")).toBeInTheDocument();
  });
  test("should show alert if first name or last name is empty in update", () => {
    render(<Table />);
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    // Simulate adding a name first
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const addButton = screen.getByText("Add");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.click(addButton);

    // Now, simulate editing the added name
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const updatedFirstNameInput = screen.getByPlaceholderText("John");
    const updatedLastNameInput = screen.getByPlaceholderText("Doe");
    const updateButton = screen.getByText("Update");

    fireEvent.change(updatedFirstNameInput, { target: { value: "" } });
    fireEvent.change(updatedLastNameInput, { target: { value: "" } });

    fireEvent.click(updateButton);

    expect(alertMock).toHaveBeenCalled();

    alertMock.mockRestore();
  });
});

describe("Edit Functionality Testing", () => {
  test("should populate input fields with selected name for editing", () => {
    render(<Table />);

    // Simulate adding a name first
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const addButton = screen.getByText("Add");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.click(addButton);

    // Now, simulate clicking the "Edit" button
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    // Check if input fields are populated with selected name
    expect(screen.getByPlaceholderText("John")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Doe")).toBeInTheDocument();
  });

  test("should hide 'Add' button and show 'Update' button when editing a name", () => {
    render(<Table />);

    // Simulate adding a name first
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const addButton = screen.getByText("Add");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.click(addButton);

    // Now, simulate clicking the "Edit" button
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    // Check if 'Add' button is hidden and 'Update' button is shown
    expect(screen.queryByText("Add")).toHaveAttribute("hidden");
    expect(screen.getByText("Update")).toBeInTheDocument();
  });
});

describe("Delete Functionality Testing", () => {
  test("should delete row on button click", () => {
    render(<Table />);
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const addButton = screen.getByText("Add");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.click(addButton);

    // call delete function
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("John")).not.toBeInTheDocument();
    expect(screen.queryByText("Doe")).not.toBeInTheDocument();
  });
});
