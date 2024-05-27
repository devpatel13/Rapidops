import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DynamicForm from "../components/DynamicForm/DynamicForm";

describe("DynamicForm Component", () => {
  const mockData = {
    steps: {
      step: "step1",
      title: "Step 1",
      description: "Description for Step 1",
    },
    currentStep: 1,
    fields: [
      {
        name: "name",
        label: "Name",
        field_type: "text",
        placeholder: "Enter your name",
        default_value: "",
      },
      {
        name: "email",
        label: "Email",
        field_type: "email",
        placeholder: "Enter your email",
        default_value: "",
      },
      {
        name: "age",
        label: "Age",
        field_type: "number",
        placeholder: "Enter your age",
        default_value: 18,
      },
    ],
    isLastPage: false,
  };

  test("renders form fields correctly", () => {
    render(<DynamicForm data={mockData} />);

    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Description for Step 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
  });

  test("handles input change correctly", () => {
    render(<DynamicForm data={mockData} />);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const ageInput = screen.getByLabelText("Age");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(ageInput, { target: { value: "30" } });

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(ageInput).toHaveValue(30);
  });

  test("renders checkbox input when options are undefined", () => {
    const mockData = {
      steps: {
        step: "step1",
        title: "Step 1",
        description: "Description for Step 1",
      },
      currentStep: 1,
      fields: [
        {
          name: "checkboxField",
          label: "Checkbox Field",
          field_type: "checkbox",
          options: undefined,
        },
        // Add more fields as needed
      ],
      isLastPage: false,
    };
    const { getByLabelText } = render(
      <DynamicForm data={mockData} setStepsCompleted={() => {}} />
    );

    const checkboxInput = screen.getByLabelText("Checkbox Field");
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput.type).toBe("checkbox");

    // Optionally, you can assert other attributes or properties of the rendered elements
    // For example, you might want to check the ID, name, or default value of the input
    expect(checkboxInput.id).toBe("emptyCheckbox");
    expect(checkboxInput.name).toBe("checkboxField");
    // Add more assertions as needed
  });

  test("checkbox inputs have correct attributes", () => {
    const mockData = {
      steps: {
        step: "step1",
        title: "Step 1",
        description: "Description for Step 1",
      },
      currentStep: 1,
      fields: [
        {
          name: "checkboxField",
          label: "Checkbox Field",
          field_type: "checkbox",
          options: ["Option 1", "Option 2"],
        },
        // Add more fields as needed
      ],
      isLastPage: false,
    };
    render(<DynamicForm data={mockData} setStepsCompleted={() => {}} />);

    mockData.fields[0].options.forEach((option) => {
      const checkboxInput = screen.getByLabelText(option);
      expect(checkboxInput.id).toBe(option);
      expect(checkboxInput.name).toBe("checkboxField");
      expect(checkboxInput.value).toBe(option);
      // Add more assertions as needed
    });
  });

  test("handles checkbox input change correctly", () => {
    // Mock data for DynamicForm component
    const data = {
      steps: { title: "Step 1", description: "Description for Step 1" },
      fields: [
        {
          name: "checkboxField",
          field_type: "checkbox",
          label: "Checkbox Field",
        },
      ],
    };

    render(<DynamicForm data={data} setStepsCompleted={() => {}} />);

    // Simulate checkbox input change
    const checkboxInput = screen.getByLabelText("Checkbox Field");
    fireEvent.click(checkboxInput);

    expect(checkboxInput).toBeChecked();
  });

  test("handles form submission with validation and regEx correctly", () => {
    const mockData = {
      steps: {
        step: "step1",
        title: "Step 1",
        description: "Description for Step 1",
      },
      currentStep: 1,
      fields: [
        {
          name: "name",
          label: "Name",
          field_type: "text",
          placeholder: "Enter your name",
          default_value: "",
          validation: true,
          regEx: /^[A-Za-z]+$/,
        },
        {
          name: "age",
          label: "Age",
          field_type: "number",
          placeholder: "Enter your age",
          default_value: 18,
        },
      ],
      isLastPage: false,
    };
    const setStepsCompleted = jest.fn();
    render(
      <DynamicForm data={mockData} setStepsCompleted={setStepsCompleted} />
    );

    const nameInput = screen.getByLabelText("Name");
    const ageInput = screen.getByLabelText("Age");
    const nextButton = screen.getByText("Next");

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(ageInput, { target: { value: "30" } });

    fireEvent.click(nextButton);

    // Expect form submission to occur
    expect(setStepsCompleted).toHaveBeenCalledWith(1);
  });

  test("handles invalid data submission with validation and regEx correctly", () => {
    const mockData = {
      steps: {
        step: "step1",
        title: "Step 1",
        description: "Description for Step 1",
      },
      currentStep: 1,
      fields: [
        {
          name: "name",
          label: "Name",
          field_type: "text",
          placeholder: "Enter your name",
          default_value: "",
          validation: true,
          regEx: /^[A-Za-z]+$/,
        },
      ],
      isLastPage: false,
    };
    const setStepsCompleted = jest.fn();
    render(
      <DynamicForm data={mockData} setStepsCompleted={setStepsCompleted} />
    );

    const nameInput = screen.getByLabelText("Name");
    const nextButton = screen.getByText("Next");

    fireEvent.change(nameInput, { target: { value: "John123" } });

    const mockAlert = jest.spyOn(window, "alert").mockImplementation();

    fireEvent.click(nextButton);

    expect(mockAlert).toHaveBeenCalledWith("Invalid data for: name");

    // Restore the original window.alert method
    mockAlert.mockRestore();

    // Expect form submission to not occur
    expect(setStepsCompleted).not.toHaveBeenCalled();
  });

  test("submits form data correctly", () => {
    const setStepsCompleted = jest.fn();
    render(
      <DynamicForm data={mockData} setStepsCompleted={setStepsCompleted} />
    );

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const ageInput = screen.getByLabelText("Age");
    const submitButton = screen.getByText("Next");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(ageInput, { target: { value: "30" } });

    fireEvent.click(submitButton);

    expect(setStepsCompleted).toHaveBeenCalledWith(1);
  });

  test("renders Previous button if currentStep > 1", () => {
    const mockDataWithPrevButton = { ...mockData, currentStep: 2 };

    render(<DynamicForm data={mockDataWithPrevButton} />);

    expect(screen.getByText("Previous")).toBeInTheDocument();
  });

  test("renders Submit button if it is last page", () => {
    const mockDataLastPage = { ...mockData, isLastPage: true };

    render(<DynamicForm data={mockDataLastPage} />);

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});
