import React, { useState } from "react";
import "./riskmanagementstrategy.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

const RiskManagementStrategy = () => {
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

  console.log(text);

  return (
    <div className="riskmanagementstrategy-container">
      <Sidebar />
      <div className="riskmanagementstrategy">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="riskmanagementstrategy-card">
          <h3>International/National Grants | Risk Management Strategy</h3>
          <div className="riskmanagementstrategy_bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="riskmanagementstrategy-content">
            <div className="textarea">
              <label htmlFor="exampleTextarea">Risk Management Strategy Details:</label>
              <textarea
                id="exampleTextarea"
                value={text}
                placeholder="In this Section (maximum two pages narrative)"
                onChange={handleChange}
                rows="2"
                cols="20"
              />
            </div>

            <p>In this Section (maximum two pages), describe the Risk Management Strategy that will be employed by the proposed project. </p>

            <p>First consider the potential risks that could imperil the progress and success of the proposed project, and describe the strategy and process that will be used to minimize and address these risks.</p>

            <p>Second, describe the strategy that will be used to identify, mitigate and address those unexpected risks that emerge during the project lifetime.</p>

            <p>In both contexts, discuss how the Principal Investigator will work together with the institutional leadership to implement the strategy.</p>
            
            <div className="riskmanagementstrategy_btn">
              <button className="riskmanagementstrategy_button">SAVE</button>
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

export default RiskManagementStrategy;


