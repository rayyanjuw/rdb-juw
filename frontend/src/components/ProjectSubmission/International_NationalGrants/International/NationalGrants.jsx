import React from 'react'
import { useState } from 'react'
import AddGrants from '../AddGrants';
import ExecutiveSummary from '../Executive Summary/ExecutiveSummary';
import ProjectDescription from '../Project Description/ProjectDescription';
import AcademicSectoralCollaborators from '../Academic_Sectoral Collaborators/AcademicSectoralCollaborators';
import ProjectManagement from '../Project Management/ProjectManagement';
import ImplementationTimeline from '../Implementation Timeline/ImplementationTimeline';
import PhysicalResources from '../Physical Resources and Facilities/PhysicalResources';
import ScientificPersonnel from '../Scientific Personnel/ScientificPersonnel';
import AvailedResearchGrants from '../Principal Investigator’s availed research grant details/AvailedResearchGrants';
import RiskManagementStrategy from '../Risk Management Strategy/RiskManagementStrategy';
import ListofReferences from '../List of References/ListofReferences';
import ProposedProjectBudget from '../Proposed Project Budget/ProposedProjectBudget';
import axios from 'axios';

const NationalGrants = () => {
    const [step, setStep] = useState(1);
    const [grantData, setGrantData] = useState({
        proposalCover: {},
    executiveSummary: "",
    academicSectoralCollaborators: {},
    projectDescription: {},
    ProjectManagement: {},
    implementationTimeline: {},
    scientificPersonnel: {},
    principalInvestigator: {},
    riskManagementStrategy: {},
    listOfReferences: {},
    proposedProjectBudget: {}
    }); // Store all form data

    const [formData, setFormData] = useState({
        proposalCover: {},
        executiveSummary: {},
    })

      // Function to handle saving data from a step
  const handleSave = (data) => {
    setGrantData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

   

   
  // Function to go to the next step
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Function to go to the previous step
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Function to handle saving and moving to the next step
  const handleSaveAndNext = async (data) => {
    console.log("Saving data:", data);
    handleSave(data);
      // Check if it's the last step
      if (step === 12) {
        try {
          const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/nationalGrant/create', grantData, {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
            console.log("Data being sent to API:", grantData);
            console.log('Data submitted successfully:', response.data);
            // Handle successful response (e.g., navigate to a success page)
        } catch (error) {
            console.error('Error submitting data:', error);
            // Handle error (e.g., show an error message)
        }
    } else {
        nextStep();
    }
  };


    
  return (
    <>
    {step === 1 && (

      <AddGrants 
    //   onSave={handleSaveAndNext}
      onSave={(data) => handleSaveAndNext({ proposalCover: data })} 
      />
    )}
    {step === 2 && (
        <ExecutiveSummary onSave={(data) => handleSaveAndNext({executiveSummary: data})}
      />
    )}
    {step === 3 && (
        <AcademicSectoralCollaborators  onSave={(data) => handleSaveAndNext({academicSectoralCollaborators: data})}
       />
    )}
    {step === 4 && (
        <ProjectDescription  onSave={(data) => handleSaveAndNext({projectDescription: data})}
       />
    )}
    {step === 5 && (
        <ProjectManagement onSave={(data) => handleSaveAndNext({ProjectManagement: data})}
       />
    )}
    {step === 6 && (
        <ImplementationTimeline onSave={(data) => handleSaveAndNext({implementationTimeline: data})}
       />
    )}
    {step === 7 && (
        <PhysicalResources onSave={(data) => handleSaveAndNext({implementationTimeline: data})}
       />
    )}
    {step === 8 && (
        <ScientificPersonnel onSave={(data) => handleSaveAndNext({scientificPersonnel: data})}
       />
    )}
    {step === 9 && (
        <AvailedResearchGrants onSave={(data) => handleSaveAndNext({principalInvestigator: data})}
       />
    )}
    {step === 10 && (
        <RiskManagementStrategy onSave={(data) => handleSaveAndNext({riskManagementStrategy: data})}
       />
    )}
    {step === 11 && (
        <ListofReferences onSave={(data) => handleSaveAndNext({listOfReferences: data})}
       />
    )}
    {step === 12 && (
        <ProposedProjectBudget onSave={(data) => handleSaveAndNext({proposedProjectBudget: data})}
       />
    )}
    </>
  )
}

export default NationalGrants
