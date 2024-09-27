import React, { useState, useEffect } from "react";
import AddORICFundedProjects from "../AddORICFundedProjects";
import ResearchProject from "../Research Project/ResearchProject";
import FacilitiesAndFunding from "../Facilities and Funding/FacilitiesAndFunding";
import JustificationForBudget from "../Justification For Budget/JustificationForBudget";
import EstimatedBudgetForPRP from "../EstimatedBudgetForPRP/EstimatedBudgetForPRP";
import axios from "axios";
import { createOricFunded } from "../../../../api/Api";
import { toast } from "react-toastify";
import { jwtDecode } from 'jwt-decode';


const MultiStepForm = () => {
  const [userRole, setUserRole] = useState('');
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    proposalCover: {},
    researchProject: {},
    facilitiesandFunding: {},
    justificationForBudgetItems: {},
    estimatedBudget: {},
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // UseEffect to handle form submission after the last step's data is saved
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
    }
    if (isSubmitting) {
      handleFormSubmit();
    }
  }, [isSubmitting]);

  // Function to handle saving data from a step
  const handleSave = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Function to go to the previous step
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSaveAndNext = (data) => {
    console.log(data);
    handleSave(data);
    if (step === 5) {
      setIsSubmitting(true); // Set the flag to trigger form submission
    } else {
      nextStep();
    }
  };

  const handleFormSubmit = async (data) => {
    if (userRole === 'admin') {
      toast.error("Admin does not create ORIC Funded Data");
      setIsSubmitting(false); // Reset flag if userRole is not admin
      return; // Exit the function
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/oricfundedproject/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data being sent to API:", formData);
      console.log("Data submitted successfully:", response.data);
      toast.success("Data submitted successfully")
      // Handle successful response (e.g., navigate to a success page)
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data")
      // Handle error (e.g., show an error message)
    } finally {
      setIsSubmitting(false); // Reset flag after submission
    }
  };

  return (
    <>
      {step === 1 && (
        <AddORICFundedProjects
          //   onSave={handleSaveAndNext}
          onSave={(data) => handleSaveAndNext({ proposalCover: data })}
        />
      )}
      {step === 2 && (
        <ResearchProject
          onSave={(data) => handleSaveAndNext({ researchProject: data })}
        />
      )}
      {step === 3 && (
        <FacilitiesAndFunding
          onSave={(data) =>
            handleSaveAndNext({ facilitiesandFunding: data })
          }
        />
      )}
      {step === 4 && (
        <JustificationForBudget
          onSave={(data) => handleSaveAndNext({ justificationForBudgetItems: data })}
        />
      )}
      {step === 5 && (
        <EstimatedBudgetForPRP
          onSave={(data) => handleSaveAndNext({ estimatedBudget: data })}
        />
      )}
    </>
  );
};

export default MultiStepForm;
