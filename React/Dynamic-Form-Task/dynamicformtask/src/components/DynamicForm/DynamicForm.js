import React, { useEffect, useState } from "react";
import "./DynamicForm.css";
import userEvent from "@testing-library/user-event";

export default function DynamicForm({ data, setStepsCompleted }) {
  console.log(data);
  const [formFields, setFormFields] = useState({
    name: "",
    label: "",
    field_type: "",
    options: [],
    default_value: "",
    placeholder: "",
    validation: true,
  });
  const [userResponses, setUserResponses] = useState({});

  useEffect(() => {
    const temp = {};
    // console.log(data.fields);
    data.fields.map((field) => {
      const tempArr = [];
      tempArr.push(field?.default_value || null);
      tempArr.push(field.validation);
      if (field.validation) tempArr.push(field?.regEx || "");
      temp[field.name] = tempArr;
    });
    setUserResponses(temp);
  }, []);

  const handleSubmit = (action) => {
    const temp = {};
    if (action === "next") {
      for (const response in userResponses) {
        if (userResponses[response][1]) {
          if (userResponses[response][2] instanceof RegExp) {
            if (!userResponses[response][2].test(userResponses[response][0])) {
              alert(`Invalid data for: ${response}`);
              return;
            } else temp[response] = userResponses[response][0];
          } else {
            console.log(
              `Invalid RegEx provided for ${response}, data validated`
            );
            temp[response] = userResponses[response][0];
          }
        } else temp[response] = userResponses[response][0];
      }
      localStorage.setItem(data.steps.step, JSON.stringify(temp));
      setStepsCompleted(data.currentStep);
    } else console.log("prev", userResponses);
  };

  const handleChange = (e) => {
    const { value, checked, type } = e.target;
    if (type === "checkbox") {
      const updatedValue = checked
        ? [...userResponses[e.target.name][0], value]
        : userResponses[e.target.name][0].filter((item) => item !== value);
      setUserResponses((prevState) => ({
        ...prevState,
        [e.target.name]: [updatedValue, [e.target.name][1]],
      }));
      console.log(updatedValue);
    } else {
      setUserResponses((prevState) => ({
        ...prevState,
        [e.target.name]: [e.target.value, [e.target.name][1]],
      }));
      console.log(value);
    }
  };

  return (
    <div>
      <h2>{data.steps.title}</h2>
      <p>{data.steps.description}</p>
      <form>
        {data.fields.map((field, index) => {
          if (field.field_type === "checkbox" || field.field_type === "radio") {
            if (data.options === undefined) {
              return (
                <div className="formField" key={index}>
                  <div key={"emptyCheckbox"}>
                    <input
                      type={field.field_type}
                      id={"emptyCheckbox"}
                      name={field.name}
                      value={"emptyCheckbox"}
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
                  value={field.default_value}
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
                  value={userResponses[field.name]?.[0] || ""}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                />
              </div>
            );
          }
        })}
      </form>
      <div className="buttonGroup" style={{ marginTop: "20px" }}>
        {data.current > 1 ? (
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
          Next
        </button>
      </div>
    </div>
  );
}

// const data = {
//   name: "paymentMethod",

//   label: "Payment Method",

//   field_type: "select",

//   options: ["Credit Card", "PayPal", "Bank Transfer"],

//   default_value: "Credit Card",

//   placeholder: "Select Payment Method",

//   validation: true,
// };

// if (
//   formFields.field_type === "checkbox" ||
//   formFields.field_type === "radio"
// ) {
//   return (
//     <div className="formField">
//       {formFields.options.map((option, index) => (
//         <div key={index}>
//           <input
//             type={formFields.field_type}
//             id={option}
//             name={formFields.name}
//             value={option}
//             onChange={handleChange}
//           />
//           <label htmlFor={option}>{option}</label>
//         </div>
//       ))}
//     </div>
//   );
// } else if (formFields.field_type === "select") {
//   return (
//     <div>
//       <label htmlFor={formFields.name}>{formFields.label}</label>
//       <select
//         id={formFields.name}
//         name={formFields.name}
//         value={formFields.default_value}
//         onChange={handleChange}
//       >
//         <option value="">{formFields.placeholder}</option>
//         {formFields.options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// } else {
//   return (
//     <div className="formField">
//       <div>
//         <label htmlFor={formFields.name}>{formFields.label}</label>
//         <input
//           type={formFields.field_type}
//           id={formFields.name}
//           name={formFields.name}
//           value={userResponses}
//           placeholder={formFields.placeholder}
//           onChange={handleChange}
//         />
//       </div>
//     </div>
//   );
// }
