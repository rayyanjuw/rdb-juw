import React, { useState } from "react";
import "./scientificpersonnel.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

const ScientificPersonnel = ({onSave}) => {
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
  onSave( text);
 }

  return (
    <div className="scientificpersonnel-container">
      <Sidebar />
      <div className="scientificpersonnel">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="scientificpersonnel-card">
          <h3>International/National Grants | Scientific Personnel</h3>
          <div className="scientificpersonnel-bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="scientificpersonnel-content">
            <div className="textarea">
              <label htmlFor="exampleTextarea">Scientific Personnel Details:</label>
              <textarea
                id="exampleTextarea"
                value={text}
                onChange={handleChange}
                rows="2"
                cols="20"
              />
            </div>

            <p>In this section please provide the details of available of scientific personnel and required scientific personnel. (Engagement of research students is encouraged)</p>
   
            
            <div className="scientificpersonnel-btn">
              <button className="scientificpersonnel-button" onClick={handleSave}>SAVE</button>
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

export default ScientificPersonnel;

