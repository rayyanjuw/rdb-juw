import React, { useState } from "react";
import "./availedresearchgrants.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

const AvailedResearchGrants = ({ onSave}) => {
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


  const [formData, setFormData] = useState({
    scientificPersonnelDetails: "",
    projects: Array(3).fill({
      
        title: "",
        initiationDate: "",
        completionDate: "",
        amountAwarded: "",
        fundingSource: "",
     
      // {
      //   title: "",
      //   initiationDate: "",
      //   completionDate: "",
      //   amountAwarded: "",
      //   fundingSource: "",
      // },
      // {
      //   title: "",
      //   initiationDate: "",
      //   completionDate: "",
      //   amountAwarded: "",
      //   fundingSource: "",
      // },
    })
  });




  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [name]: value,
    };
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleSave = () => {
    onSave(formData);
  };



  return (
    <div className="availedresearchgrants-container">
      <Sidebar />
      <div className="availedresearchgrants">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="availedresearchgrants-card">
          <h3>
            International/National Grants | Principal Investigator’s availed
            research grant details
          </h3>
          <div className="availedresearchgrants-bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="availedresearchgrants-content">
            <p>
              In this section PI will provide one-page summary of each research
              project completed, on-going or Submitted (to HEC or any other
              funding agency) as PI or Co-PI.
            </p>
            <div className="textarea">
              <label htmlFor="scientificPersonnelDetails">
                Scientific Personnel Details:
              </label>
              <textarea
                id="scientificPersonnelDetails"
                name="scientificPersonnelDetails"
                value={formData.scientificPersonnelDetails}
                onChange={(e) => setFormData({ ...formData, scientificPersonnelDetails: e.target.value })}
                rows="2"
                cols="20"
              />
            </div>

            <p>In the table below please provide the following information:</p>

            {formData.projects.map((project, index) => (
              <div
                className="availedresearchgrants-multiinputfields"
                key={index}
              >
                <div className="availedresearchgrants-inputgroup">
                  <p>{index + 1}. Project (If any)</p>
                  <label>Title of Project:</label>
                  <input
                    type="text"
                    name="title"
                    value={project.title}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="availedresearchgrants-two-inputs">
                  <div className="availedresearchgrants-inputgroup">
                    <label>Initiation date:</label>
                    <input
                      type="date"
                      name="initiationDate"
                      value={project.initiationDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="availedresearchgrants-inputgroup">
                    <label>Completion date:</label>
                    <input
                      type="date"
                      name="completionDate"
                      value={project.completionDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>

                <div className="availedresearchgrants-two-inputs">
                  <div className="availedresearchgrants-inputgroup">
                    <label>Amount(s) awarded:</label>
                    <input
                      type="text"
                      name="amountAwarded"
                      value={project.amountAwarded}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="availedresearchgrants-inputgroup">
                    <label>Funding source(s):</label>
                    <input
                      type="text"
                      name="fundingSource"
                      value={project.fundingSource}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="availedresearchgrants-btn">
              <button className="availedresearchgrants-button" onClick={handleSave}>SAVE</button>
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

export default AvailedResearchGrants;

