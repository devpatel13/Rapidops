import React, { useEffect, useState } from "react";
import "./DynamicForm.css";

export default function DynamicForm({ data, setStepsCompleted }) {
  // console.log(data);
  const [userResponses, setUserResponses] = useState({});

  // for initial user state
  const initializeUserResponses = () => {
    const temp = {};
    const storedData = JSON.parse(localStorage.getItem("formData") || "{}");
    data.fields.forEach((field) => {
      const tempObj = {
        value:
          // this line checks if there is an entry for the current step in the
          // local storage and if there, it stores it as value and shows it
          storedData[data.steps.step]?.formData[field.name] ||
          field.default_value ||
          "",
        validation: field.validation,
        default_value: field.default_value || "",
        regEx: field.validation ? field.regEx || "" : "",
      };
      temp[field.name] = tempObj;
    });
    setUserResponses(temp);
  };

  useEffect(() => {
    initializeUserResponses();
  }, [data.currentStep]);

  // handles the submit event, having two action: next and previous.
  // the function on 'next' will iterate the userResponse and if validation is true and regEx provided
  // then form subnitted.

  // NOTE: If validation true and RegEx not provided, then execution is not stopped and data
  // is considered as valid
  const handleSubmit = (action) => {
    const formData = {};

    if (action === "next") {
      for (const responseKey in userResponses) {
        const response = userResponses[responseKey];
        const value = response && response.value;

        if (value !== undefined) {
          if (response.validation && response.regEx instanceof RegExp) {
            if (!response.regEx.test(value)) {
              alert(`Invalid data for: ${responseKey}`);
              return;
            }
          }
          formData[responseKey] =
            value !== undefined && value !== ""
              ? value
              : response.default_value;
        }
      }
      let savedData = localStorage.getItem("formData");
      savedData = savedData ? JSON.parse(savedData) : {};
      localStorage.setItem(
        "formData",
        JSON.stringify({
          ...savedData,
          [data.steps.step]: {
            formData: formData,
            title: data.steps?.title || "Details",
          },
        })
      );

      setStepsCompleted(data.currentStep);
    } else {
      setStepsCompleted(data.currentStep - 2);
    }
  };

  const handleChange = (e) => {
    const { value, checked, type, name } = e.target;
    if (type === "checkbox") {
      const updatedValue = checked
        ? [...userResponses[name].value, value]
        : userResponses[name].value.filter((item) => item !== value);
      setUserResponses((prevState) => ({
        ...prevState,
        [name]: {
          value: updatedValue,
          validation: [name].validation,
          regEx: [name].regEx,
        },
      }));
      console.log(updatedValue);
    } else {
      setUserResponses((prevState) => ({
        ...prevState,
        [name]: {
          value: e.target.value !== "" ? e.target.value : "",
          validation: userResponses[name].validation || false,
          regEx: userResponses[name].regEx || "",
          default_value: userResponses[name].default_value || "",
        },
      }));
    }
  };

  return (
    <div>
      <h2>{data.steps.title}</h2>
      <p>{data.steps.description}</p>
      <form>
        {data.fields.map((field, index) => {
          if (field.field_type === "checkbox" || field.field_type === "radio") {
            if (field.options === undefined) {
              return (
                <div className="formField" key={index}>
                  <div key={"emptyCheckbox"}>
                    <input
                      type={field.field_type}
                      id={"emptyCheckbox"}
                      name={field.name}
                      value={field?.default_value || true}
                      onChange={handleChange}
                    />
                    <label htmlFor={"emptyCheckbox"}>{field.label}</label>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="formField" key={index}>
                  {field?.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type={field.field_type}
                        id={option}
                        name={field.name}
                        value={option}
                        onChange={handleChange}
                        defaultChecked={
                          userResponses[field.name] ? true : false
                        }
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}
                </div>
              );
            }
          } else if (field.field_type === "select") {
            return (
              <div className="formField" key={index}>
                <label htmlFor={field.name}>{field.label}</label>
                <select
                  id={field.name}
                  name={field.name}
                  value={
                    userResponses[field.name]?.value || field.default_value
                  }
                  onChange={handleChange}
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else {
            return (
              <div className="formField" key={index}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.field_type}
                  id={field.name}
                  name={field.name}
                  value={userResponses[field.name]?.value || ""}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                />
              </div>
            );
          }
        })}
      </form>
      <div className="buttonGroup" style={{ marginTop: "20px" }}>
        {data.currentStep > 1 && !data.isLastPage ? (
          <button
            type="button"
            form="dynamicForm"
            onClick={() => handleSubmit("prev")}
          >
            Previous
          </button>
        ) : null}

        <button
          type="button"
          form="dynamicForm"
          onClick={() => handleSubmit("next")}
        >
          {data.isLastPage ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
