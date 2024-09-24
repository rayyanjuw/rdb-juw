import React, { useState } from "react";
import "./justificationforbudget.css";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";
import NavBar from "../../../shared-components/navbar/NavBar";
import Sidebar from "../../../Sidebar/Sidebar";

// const JustificationForBudget = (handleSubmit) => {
const JustificationForBudget = ({ formData, handleInputChange, handleSubmit}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadCrumps = [
    {
      label: "Proposal Cover",
      // path: "/add-oric-funded-projects",
      // path: "/add-oric-funded-projects",
      // path: "/add-international/national-grants",
    },
    {
      label: "Research Project",
      // path: "/oric-funded-project-research-project",
    },
    {
      label: "Facilities and Funding",
      // path: "/oric-funded-project-facilities-and-funding",
    },
    {
      label: "Justification for The Requested Budget Items",
      // path: "/oric-funded-project-justification-and-budget-items",
    },
    {
      label: "Estimated Budget for Proposed Research Period",
      // path: "/oric-funded-project-estimated-budget-proposed-research-period",
    },
  ];
  const [justification, setJustification] = useState({
    scientificEquipment: formData?.justificationForBudgetItems?.scientificEquipment || "",
      // [{ item: "", justification: "" }],
    travel: formData?.justificationForBudgetItems?.travel || ""
  })

  console.log(justification)


  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    setJustification((prevState) => ({
      ...prevState,
      [name]: value,
    }));


    if (handleInputChange) {
      handleInputChange(e); 
    } else {
      console.error("handleInputChange is not a function");
    }
  };

  // const [formData, setFormData] = useState({
  //   ScientificEquipment : "", 
  //   Travel : "N/A",   
  // });

  // console.log(formData)



  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleSave = () => {
  //   // Logic to handle form submission or saving data
  //   console.log("Form Data:", formData);
  // };

  return (
    <div className="justificationForBudget-container">
      <Sidebar />
      <div className="justificationForBudget">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="justificationForBudget-card">
          <h3>ORIC Funded Project | Justification for The Requested Budget Items</h3>
          <p>Proposal Cover / Research Project / Facilities and Funding / Justification for The Requested Budget Items / Estimated Budget for Proposed Research Period</p>
          {/* <div className="justificationForBudget_bred-crumb"> */}
            {/* <Breadcrumb items={breadCrumps}/> */}
            {/* <Breadcrumb items={breadCrumps} activePath={currentPath} /> */}
          {/* </div> */}
          <div className="justificationForBudget-content">
            <h3>Justification for The Requested Budget Items</h3>
            <div className="justificationForBudget_textarea">
              <label htmlFor="exampleTextarea">
              Scientific Equipment (if any):
              </label>
              <textarea
                id="exampleTextarea"
                name="scientificEquipment"
                value={justification.scientificEquipment}
                onChange={handleLocalChange}
                rows="2"
                cols="20"
              />
            </div>

            <div className="justificationForBudget_title-input">
              <label>Travel (if required):</label>
              <input
                type="text"
                name="travel"
                value={justification.travel}
                // onChange={handleInputChange}
                onChange={handleLocalChange}
                placeholder="N/A"
                disabled
              />
            </div>

            <div className="justificationForBudget_btn">
              <button className="justificationForBudget_button" onClick={handleSubmit}>
                SAVE
              </button>
            </div>
          </div>
        </div>
        <div className="juw-copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default JustificationForBudget;

