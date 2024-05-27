import React, { useState } from "react";
import "./StepBar.css";

export default function StepBar({ currentStep, totalSteps }) {
  return (
    <div className="step-bar">
      {[...Array(totalSteps).keys()].map((step, index) => (
        <div key={index}>
          {index + 1 < currentStep ? (
            <i className="fa fa-check-circle"></i>
          ) : null}
          Step:{step + 1}
        </div>
      ))}
    </div>
  );
}
