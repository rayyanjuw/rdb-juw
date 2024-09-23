import React, { useState, useEffect } from "react";
import AddORICFundedProjects from "../AddORICFundedProjects";
import ResearchProject from "../Research Project/ResearchProject";
import FacilitiesAndFunding from "../Facilities and Funding/FacilitiesAndFunding";
import JustificationForBudget from "../Justification For Budget/JustificationForBudget";
import EstimatedBudgetForPRP from "../EstimatedBudgetForPRP/EstimatedBudgetForPRP";
import axios from "axios";
import { createOricFunded } from "../../../../api/Api";

const MultiStepForm = () => {
  const [step, setStep] = useState(2);

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

  // const [formData, setFormData] = useState({
  //   title: "",
  //   proposalCover: {
  //     title: "",
  //     nameOfPI: "",
  //     nameOfFaculty: "",
  //     totalBudgetRequested: "",
  //   },
  //   researchProject: {
  //     projectTitle: "",
  //    natureOfProposedResearch: '',
  //           domainOfProposedResearch: {
  //               domain: '',
  //               shortSummary: ''
  //           },
  //           projectDuration: {
  //             Year: '',
  //             Totatfunds: '',
  //             summaryabstract: '',
  //             BackgroundProblem: ''
  //         },
  //     // projectDuration: "",
  //     shortSummary: "",
  //     objectives: [
  //       { description: "", measurableOutput: "", benefits: "" },
  //     ],
  //     sociaEconomicBenefit: '',
  //     methodology: '',
  //     schedule: [{ activities: '' }, { activities: '' }],
  //     priorExperience: ''
  //   },
  //   facilitiesAndFunding: { facilitiesAvailable: "", otherSourceOfFunding: "" },
  //   justificationForBudgetItems: {
  //     scientificEquipment: [{  justification: "" }],
  //     travel: "",
  //   },
  //   estimatedBudget: {
  //     // permanentEquipment: [
  //     //   {  item: "Hot Plates", qty: "", unitPrice: "", amount: "" },
  //     //   { item: "Computer", qty: "", unitPrice: "", amount: "" },
  //     //   {  item: "Printer", qty: "", unitPrice: "", amount: "" },
  //     // ],
  //     permanentEquipment: [{
  //       hotplates: { qty: "", unitPrice: "", amount: "" },
  //       computer: { qty: "", unitPrice: "", amount: "" },
  //       printer: { qty: "", unitPrice: "", amount: "" },
  //     }],
  //     localTravel: { amount: "" },
  //     paperrimAmount: { amount: "" },
  //     literatureAndOtherAmount: { amount: "" },
  //     othercostAmount: { amount: "" },
  //   },
  // });
  // estimatedBudget: {permanentEquipment: [{item: "", qty: "", unitPrice: "", amount: ""}], localTravel: {amount: ""}}

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
      // Handle successful response (e.g., navigate to a success page)
    } catch (error) {
      console.error("Error submitting data:", error);
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
