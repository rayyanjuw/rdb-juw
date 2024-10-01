import React, { useState } from "react";
import "./justificationforbudget.css";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";
import NavBar from "../../../shared-components/navbar/NavBar";
import Sidebar from "../../../Sidebar/Sidebar";
import { toast } from "react-toastify";



// const JustificationForBudget = (handleSubmit) => {
const JustificationForBudget = ({onSave}) => {
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
    scientificEquipment: "",
      // [{ item: "", justification: "" }],
    travel: "N/A"
  })

 


  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    setJustification((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSave = () => {

    const { scientificEquipment, travel } = justification;

    // Check if scientific equipment is empty
    if (!scientificEquipment.trim()) {
      toast.error('Please provide Scientific Equipment (if any)');
      return; // Stop the save operation if validation fails
    }

    if (typeof onSave === 'function') {
        onSave(justification); // This will trigger the parent's handleSaveAndNext
    } else {
        // console.error('onSave is not a function');
    }
};

  return (
    <div className="justificationforbudget-container">
      <Sidebar />
      <div className="justificationforbudget">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="justificationforbudget-card">
          <h3>ORIC Funded Project | Justification for The Requested Budget Items</h3>
          <p>Proposal Cover / Research Project / Facilities and Funding / Justification for The Requested Budget Items / Estimated Budget for Proposed Research Period</p>
          <div className="justificationforbudget-content">
            <h3>Justification for The Requested Budget Items</h3>
            <div className="justificationforbudget-textarea">
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
                required
              />
            </div>

            <div className="justificationforbudget-title-input">
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

            <div className="justificationforbudget-btn">
              <button className="justificationforbudget-button" onClick={handleSave}>
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

