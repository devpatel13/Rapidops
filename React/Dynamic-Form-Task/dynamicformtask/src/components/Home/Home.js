import React, { useEffect, useLayoutEffect, useState } from "react";
import formData from "../utils/FormData";
import ProgressBar from "../ProgressBar/ProgressBar";
import StepBar from "../StepBar/StepBar";
import DynamicForm from "../DynamicForm/DynamicForm";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [stepsCompleted, setStepsCompleted] = useState(0);
  const progressPercentage = (stepsCompleted / formData.steps.length) * 100;
  const [data, setData] = useState({ fields: [], steps: "" });
  const navigate = useNavigate();

  // to check if the form if submitted when '/' is hit, so the form is not displayed again
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData") || "{}");
    if (storedData.isFormSubmitted) {
      navigate("/submitForm");
    }
  }, [navigate]);

  // data that will be sent to the DynamicForm is updated here
  const updateFormData = () => {
    const temp = {
      fields: formData.fields[`step${stepsCompleted + 1}`] || [],
      steps: formData.steps[stepsCompleted] || "",
      currentStep: stepsCompleted + 1,
      isLastPage: stepsCompleted === formData.steps.length - 1,
    };
    setData(temp);
  };

  // checks whether the steps are completed, if not then the new step data is passed to DynamicForm
  // if steps are completed then user redirected to SubmitForm page
  useEffect(() => {
    if (stepsCompleted >= formData.steps.length) {
      const storedData = JSON.parse(localStorage.getItem("formData") || "{}");
      if (!storedData.isFormSubmitted) {
        localStorage.setItem(
          "formData",
          JSON.stringify({ ...storedData, isFormSubmitted: true })
        );
        navigate("/submitForm");
      } else {
        alert("Error storing the data");
        setStepsCompleted(0);
      }
    } else {
      updateFormData();
    }
  }, [stepsCompleted]);

  return (
    <>
      <div className="header">
        <ProgressBar progressPercentage={progressPercentage} />
        <StepBar
          currentStep={stepsCompleted + 1}
          totalSteps={formData.steps.length}
        />
      </div>
      <div className="container">
        <div className="formBox">
          <DynamicForm data={data} setStepsCompleted={setStepsCompleted} />
        </div>
      </div>
    </>
  );
}
