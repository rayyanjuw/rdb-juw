import React, { useState } from "react";
import "./listofreferences.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

const ListofReferences = ({onSave}) => {
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
    const referenceList = text.split("\n").map(item => item.trim()).filter(item => item !== ""); // Remove empty entries

  if (referenceList.length === 0) {
   
    return;
  }
    onSave({text}); // Call the parent's function with the text data
  };

  return (
    <div className="listofreferences-container">
      <Sidebar />
      <div className="listofreferences">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="listofreferences-card">
          <h3>International/National Grants | List of References</h3>
          <div className="listofreferences-bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="listofreferences-content">
            <div className="textarea">
              <label htmlFor="exampleTextarea">List of References:</label>
              <textarea
                id="exampleTextarea"
                value={text}
                placeholder=" 1. 
                2. 
                3.  
                4.  
                5."
                onChange={handleChange}
                rows="5"
                cols="20"
              />
            </div>

            <p>Proposals should follow accepted academic practice in citing references throughout the proposal. References should numbered sequentially, and listed separately as a required attachment to the proposal.  References should be reported in a standard form, and include: the names of all authors; the article and journal title; book title; volume and page numbers; and year of publication. If available, a Digital Object Identifier (DOI) may be provided.</p>
   
            <div className="listofreferences-btn">
              <button className="listofreferences-button" onClick={handleSave}>SAVE</button>
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

export default ListofReferences;




