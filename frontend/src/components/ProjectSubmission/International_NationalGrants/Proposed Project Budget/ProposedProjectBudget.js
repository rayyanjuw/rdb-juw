import React, { useState } from "react";
import "./proposedprojectbudget.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

const ProposedProjectBudget = ({onSave}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadCrumps = [
    { label: "Proposal Cover", path: "/add-international/national-grants" },
    {
      label: "Executive Summary",
      path: "/add-international/national-grants-executive-summary",
    },
    { label: "Academic/Sectoral Collaborators", 
      path: "/international/national-grants-academic/Sectoral-collaborators" 
    },
    {
      label: "Project Description",
      path: "/international/national-grants-project-description",
    },
    {
      label: "Project Management",
      path: "/international/national-grants-project-management",
    },
    {
      label: "Implementation Timeline",
      path: "/international/national-grants-implementation-timeline",
    },
    {
      label: "Physical Resources and Facilities",
      path: "/international/national-grants-physical-resources-and-facilities",
    },
    {
      label: "Scientific Personnel",
      path: "/international/national-grants-scientific-personnel",
    },
    {
      label: "Principal Investigators availed research grant details",
      path: "/international/national-grants-principal-investigators-availed-research-grant-details",
    },
    {
      label: "Risk Management Strategy",
      path: "/international/national-grants-risk-management-strategy",
    },
    {
      label: "List of References",
      path: "/international/national-grants-list-of-references",
    },
    {
      label: "Proposed Project Budget",
      path: "/international/national-grants-proposed-project-budget",
    },
  ];

  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    onSave(text); // Send the data to the parent component
  };

  return (
    <div className="proposedprojectbudget-container">
      <Sidebar />
      <div className="proposedprojectbudget">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="proposedprojectbudget-card">
          <h3>International/National Grants | Proposed Project Budget</h3>
          <div className="proposedprojectbudget-bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="proposedprojectbudget-content">
            <div className="textarea">
              <label htmlFor="exampleTextarea">Proposed Project Budget Details:</label>
              <textarea
                id="exampleTextarea"
                value={text}
                placeholder="In this Section (maximum two pages narrative)"
                onChange={handleChange}
                rows="2"
                cols="20"
              />
            </div>

            <p>Complete the Budget Table provided below.  Additional rows may be added in each category as required. Please refer to Budget Guidelines available on HEC Website for details of each budget head.</p>

            <ul>
                <li>For Personnel Costs, identify the total annual costs for each individual to be charged to the proposed NRPU project, and in the narrative indicated below show the months charged for each individual.</li>
                <li>For Faculty members, identify the faculty member by name</li>
                <li>“Other Personnel” may include technicians, IT specialists, etc. Identify the role of each “Other Personnel” listed.</li>
                <li>For Major Equipment, identify the proposed equipment and the anticipated cost. Provide details in the narrative indicated below.</li>
                <li>Provide a broad description of the supplies that will be</li>
                <li>For Travel, provide details of anticipated travel in the narrative indicated below.</li>
                <li>For Other Costs, describe in some detail any other costs in the Budget narrative indicated below.</li>
                <li>Overhead rates should reflect the official rate for the higher education institution as indicated in the Budget narrative.</li>
            </ul>

            <p>In addition to the Budget Sheet, this section can include a narrative (maximum two pages) that provides further details on the proposed budget.</p>
            
            <div className="proposedprojectbudget-btn">
              <button className="proposedprojectbudget-button" onClick={handleSave}>SAVE</button>
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

export default ProposedProjectBudget;




