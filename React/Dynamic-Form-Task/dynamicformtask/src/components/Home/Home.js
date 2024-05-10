import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    if (stepsCompleted === formData.steps.length) navigate("/submitform");
    const temp = {};
    temp.fields = formData.fields[`step${stepsCompleted + 1}`];
    temp.steps = formData.steps[stepsCompleted];
    temp.currentStep = stepsCompleted + 1;
    setData(temp);
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
