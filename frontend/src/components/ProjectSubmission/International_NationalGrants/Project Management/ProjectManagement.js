import React, { useState } from "react";
import "./projectmanagement.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

const ProjectManagement = ({onSave}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadCrumps = [
    { label: "Proposal Cover", path: "/add-international/national-grants" },
    {
      label: "Executive Summary",
      path: "/add-international/national-grants-executive-summary",
    },
    {
      label: "Academic/Sectoral Collaborators",
      path: "/international/national-grants-academic/Sectoral-collaborators",
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
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
    if (event.target.value.length < 10) {
      setError("Description must be at least 10 characters long.");
    } else {
      setError("");
    }
  };

  const handleSave = () => {
    if (text.length < 10) {
      setError("Description must be at least 10 characters long.");
      return;
    }
    onSave(text);
  };

  return (
    <div className="projectmanagement-container">
      <Sidebar />
      <div className="projectmanagement">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="projectmanagement-card">
          <h3>International/National Grants | Project Management</h3>
          <div className="projectmanagement-bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="projectmanagement-content">
            <div className="textarea">
              <label htmlFor="exampleTextarea">Project Management Details:</label>
              <textarea
                id="exampleTextarea"
                value={text}
                onChange={handleChange}
                rows="2"
                cols="20"
              />
                 {error && <p className="error-text">{error}</p>}
            </div>

            <p>In this Section (maximum one page), describe the anticipated Project Management structure for the proposed project.  An organogram may be employed.</p>

            <p>Discuss how the Principal Investigator plans to motivate and incentivize collaborators – academic and sectoral - to fulfill their commitments to the research agenda.  How will the research results, and challenges that emerge, be communicated to the Principal Investigators and the rest of the research team?</p>

            <p>As the leader of the host institution, the University Vice-Chancellor has a crucial role in the success of the proposed project.  What support will the university leadership provide to the proposed project?</p>    
            
            <div className="projectmanagement-btn">
              <button className="projectmanagement-button" onClick={handleSave}>SAVE</button>
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

export default ProjectManagement;
