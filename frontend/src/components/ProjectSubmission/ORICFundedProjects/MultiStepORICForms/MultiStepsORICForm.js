import React, { useState } from "react";
import AddORICFundedProjects from "../AddORICFundedProjects";
import ResearchProject from "../Research Project/ResearchProject";
import FacilitiesAndFunding from "../Facilities and Funding/FacilitiesAndFunding";
import JustificationForBudget from "../Justification For Budget/JustificationForBudget";
import EstimatedBudgetForPRP from "../EstimatedBudgetForPRP/EstimatedBudgetForPRP";
import { createOricFunded } from "../../../../api/Api";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    proposalCover: {
      title: "",
      nameOfPI: "",
      nameOfFaculty: "",
      totalBudgetRequested: "",
    },
    researchProject: {
      projectTitle: "",
     natureOfProposedResearch: '',
            domainOfProposedResearch: {
                domain: '',
                shortSummary: ''
            },
            projectDuration: {
              Year: '',
              Totatfunds: '',
              summaryabstract: '',
              BackgroundProblem: ''
          },
      // projectDuration: "",
      shortSummary: "",
      objectives: [
        { description: "", measurableOutput: "", benefits: "" },
      ],
      sociaEconomicBenefit: '',
      methodology: '',
      schedule: [{ activities: '' }, { activities: '' }],
      priorExperience: ''
    },
    facilitiesAndFunding: { facilitiesAvailable: "", otherSourceOfFunding: "" },
    justificationForBudgetItems: {
      scientificEquipment: [{  justification: "" }],
      travel: "",
    },
    estimatedBudget: {
      // permanentEquipment: [
      //   {  item: "Hot Plates", qty: "", unitPrice: "", amount: "" },
      //   { item: "Computer", qty: "", unitPrice: "", amount: "" },
      //   {  item: "Printer", qty: "", unitPrice: "", amount: "" },
      // ],
      permanentEquipment: [{
        hotplates: { qty: "", unitPrice: "", amount: "" },
        computer: { qty: "", unitPrice: "", amount: "" },
        printer: { qty: "", unitPrice: "", amount: "" },
      }],
      localTravel: { amount: "" },
      paperrimAmount: { amount: "" },
      literatureAndOtherAmount: { amount: "" },
      othercostAmount: { amount: "" },
    },
  });
  // estimatedBudget: {permanentEquipment: [{item: "", qty: "", unitPrice: "", amount: ""}], localTravel: {amount: ""}}

  // const handleparentInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     proposalCover: {
  //       ...prevState?.proposalCover,
  //       [name]: value,
  //     },
  //     researchProject: {
  //       ...prevState?.researchProject,
  //       [name]: value,
  //     },
  //     facilitiesAndFunding: {
  //       ...prevState?.facilitiesAndFunding,
  //       [name]: value,
  //     },
  //     justificationForBudgetItems: {
  //       ...prevState?.justificationForBudgetItems,
  //       [name]: value,
  //     },
  //     estimatedBudget: {
  //       ...prevState?.estimatedBudget,
  //       [name]: value,
  //     },
  //   }));
  // };
  const handleparentInputChange = (event, section) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: value,
      },
    }));
  };

  const handleNestedInputChange = (event, section, nestedKey) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [nestedKey]: {
          ...prevState[section][nestedKey],
          [name]: value,
        },
      },
    }));
  };

  // const handleparentInputChange = (event, section = null) => {
  //   const { name, value } = event.target;

  //   // Determine which section of the formData to update based on the current step
  //   setFormData((prevState) => {
  //     const updatedSection = section ? { [section]: { ...prevState[section], [name]: value } } : {};
  //     return {
  //       ...prevState,
  //       ...updatedSection,
  //     };
  //   });
  // };

  const nextStep = () => {
    setCurrentStep((prevStep) =>
      prevStep < steps.length ? prevStep + 1 : prevStep
    );
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  console.log(currentStep);

  // const nextStep = () => {
  //   setCurrentStep((prevStep) => prevStep + 1);
  // };

  // const prevStep = () => {
  //   setCurrentStep((prevStep) => prevStep - 1);
  // };

  // const handleSubmit = () => {
  //   console.log("Form Data:", formData);
  // };
  const handleSubmit = async () => {
    try {
      const {
        proposalCover,
        researchProject,
        facilitiesAndFunding,
        justificationForBudgetItems,
        estimatedBudget,
      } = formData;

      // Send separate data for each form
      const createdProject = await createOricFunded({
        proposalCoverData: proposalCover,
        researchProjectData: researchProject,
        facilitiesAndFundingData: facilitiesAndFunding,
        justificationForBudgetData: justificationForBudgetItems,
        estimatedBudgetData: estimatedBudget,
      });

      console.log("Project created successfully:", createdProject);
      alert("ORIC Funded Project created successfully!");
    } catch (error) {
      console.error("Failed to create ORIC Funded Project:", error);
      alert("Error creating ORIC Funded Project.");
    }
  };

  const steps = [
    {
      step: 1,
      component: (
        <AddORICFundedProjects
          formData={formData.proposalCover}
          handleInputChange={(e) => handleparentInputChange(e, "proposalCover")}
          handleSubmit={nextStep}
        />
      ),
    },
    {
      step: 2,
      component: (
        <ResearchProject
          formData={formData.researchProject}
          handleInputChange={(e) =>
            handleparentInputChange(e, "researchProject")
          }
          handleSubmit={nextStep}
        />
      ),
    },
    {
      step: 3,
      component: (
        <FacilitiesAndFunding
          formData={formData.facilitiesAndFunding}
          handleInputChange={(e) =>
            handleparentInputChange(e, "facilitiesAndFunding")
          }
          handleSubmit={nextStep}
        />
      ),
    },
    {
      step: 4,
      component: (
        <JustificationForBudget
          formData={formData.justificationForBudgetItems}
          handleInputChange={(e) =>
            handleparentInputChange(e, "justificationForBudgetItems")
          }
          handleSubmit={nextStep}
        />
      ),
    },
    {
      step: 5,
      component: (
        <EstimatedBudgetForPRP
          formData={formData.estimatedBudget}
          handleInputChange={(e) =>
            handleparentInputChange(e, "estimatedBudget")
          }
          handleSubmit={handleSubmit}
        />
      ),
    },
  ];

  //   return (
  //     // <div>
  //     //   {currentStep === 1 && (
  //     //     <AddORICFundedProjects formData={formData} handleInputChange={handleInputChange} handleSubmit={nextStep}/>
  //     //   )}
  //     //   {currentStep === 2 && (
  //     //     <ResearchProject formData={formData} handleInputChange={handleInputChange} handleSubmit={nextStep}/>
  //     //   )}
  //     //   {currentStep === 3 && (
  //     //     <FacilitiesAndFunding formData={formData} handleInputChange={handleInputChange} handleSubmit={nextStep} />
  //     //   )}
  //     //   {currentStep === 4 && (
  //     //     <JustificationForBudget formData={formData} handleInputChange={handleInputChange} handleSubmit={nextStep}/>
  //     //   )}
  //     //   {currentStep === 5 && (
  //     //     <EstimatedBudgetForPRP formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
  //     //   )}

  //     //   {/* <div>
  //     //     {currentStep > 1 && (
  //     //       <button onClick={prevStep}>Previous</button>
  //     //     )}
  //     //     {currentStep < 5 ? (
  //     //       <button onClick={nextStep}>Next</button>
  //     //     ) : (
  //     //       <button onClick={handleSubmit}>Submit</button>
  //     //     )}
  //     //   </div> */}
  //     // </div>
  //     <>

  //       {steps.find(({ step }) => step === currentStep)?.component || <div>Step not found</div>}

  // {/* {steps.find(({ step }) => step === currentStep)?.component} */}
  // {/* {steps[currentStep - 1].component} */}
  //     </>
  //   );
  // };

  return (
    <>
      {/* {steps.find(({ step }) => step === currentStep)?.component} */}
      {steps?.find(({ step }) => step === currentStep)?.component || (
        <div>Step not found</div>
      )}
      <div>
        {currentStep > 1 && <button onClick={prevStep}>Previous</button>}
        {currentStep < steps?.length ? (
          <button onClick={nextStep}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </>
  );
};

export default MultiStepForm;
