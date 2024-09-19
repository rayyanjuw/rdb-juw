import React, { useState } from "react";
import "./physicalresources.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

const PhysicalResources = () => {
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
    <div className="physicalresources-container">
      <Sidebar />
      <div className="physicalresources">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="physicalresources-card">
          <h3>International/National Grants | Physical Resources and Facilities</h3>
          <div className="physicalresources_bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="physicalresources-content">
            <div className="textarea">
              <label htmlFor="exampleTextarea">Physical Resources and Facilities Details:</label>
              <textarea
                id="exampleTextarea"
                value={text}
                placeholder="In this Section (maximum two pages narrative)"
                onChange={handleChange}
                rows="2"
                cols="20"
              />
            </div>

            <p>In this Section (maximum two pages), describe the physical resources and facilities that are available to the proposed project. Be sure to comment on how these resources and facilities will enable the work plan of the proposed project to be accomplished.  Please mention Equipment available for the research project in the host university/institution and which is not available.</p>

            <p>This information is used to assess the capability of the organizational resources available to implement and/or develop your project. Identify the facilities to be used (Laboratory, Animal, Computer, Office, Clinical and Other). If appropriate, indicate their capacities, pertinent capabilities, relative proximity and extent of availability to the project. Describe only those resources that are directly applicable to the proposed work.  </p>

            <p>In this Section, be sure to identify major anticipated equipment expenditures as part of the proposed project. Include preliminary cost estimates and a plan for maintenance costs both during the lifetime of the proposed project and after the project funding concludes</p>    
            
            <div className="physicalresources_btn">
              <button className="physicalresources_button">SAVE</button>
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

export default PhysicalResources;

