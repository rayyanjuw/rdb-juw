import React from 'react'
import { useState } from 'react'
import AddGrants from '../AddGrants';
import ExecutiveSummary from '../Executive Summary/ExecutiveSummary';
import ProjectDescription from '../Project Description/ProjectDescription';


const NationalGrants = () => {
    const [step, setStep] = useState(1);
    const [grantData, setGrantData] = useState({
        proposalCover: {},
    executiveSummary: {},
    projectDescription: {},
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

    const handleInputChange = (section, data) => {
        setFormData(prevState => ({
            ...prevState,
            [section]: data
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
  const handleSaveAndNext = (data) => {
    console.log("Saving data:", data);
    handleSave(data);
    nextStep();
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
        <ProjectDescription  onSave={(data) => handleSaveAndNext(data)}
       />
    )}
    </>
  )
}

export default NationalGrants
