import React, { useEffect, useState } from "react";
import "./SubmitForm.css";

export default function SubmitForm() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    console.log(storedData);
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="user-data-container" data-testid="submitform-component">
      <h2>User Data</h2>
      <div className="data-container">
        {userData ? (
          Object.entries(userData).map(
            ([stepKey, stepData], index) =>
              Object.keys(stepData?.formData || 0).length > 0 && (
                <div key={index} className="step-container">
                  <h3>{stepData.title}</h3>
                  <div className="content">
                    {Object.entries(stepData.formData).map(
                      ([key, value], idx) => (
                        <div key={idx}>
                          <span className="key">{key}:</span>{" "}
                          <span className="value">
                            {Array.isArray(value) ? value.join(", ") : value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
          )
        ) : (
          <p>No data found in local storage.</p>
        )}
      </div>
    </div>
  );
}
