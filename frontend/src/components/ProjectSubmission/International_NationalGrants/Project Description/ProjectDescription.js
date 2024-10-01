import React, { useState } from "react";
import "./projectdescription.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";
import NavBar from "../../../shared-components/navbar/NavBar";
import axios from "axios";

const ProjectDescription = ({onSave}) => {
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

 
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError(""); // Clear any previous error
      onSave(selectedFile); // Pass the file to the parent component
    } else {
      setFile(null);
      setFileName("");
    }
  };

  const validateForm = () => {
    if (!file) {
      setError("Please provide a project description or upload a file.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = async () => {
    if (!file) {
      setError("Please upload a file.");
      return;
  }
   
  };



  return (
    <div className="projectdescription-container">
      <Sidebar />
      <div className="projectdescription">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="projectdescription-card">
          <h3>International/National Grants | Project Description</h3>
          <div className="projectdescription-bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="projectsummary-upload">
            <p>Upload Project Description file:</p>
            <div className="file-input-wrapper">
              <input
                type="text"
                id="fileName"
                value={fileName || "Choose file..."}
                placeholder="Choose file..."
                readOnly
              />

              <input type="file" id="fileInput" name="projectDescription" className="hidden-file-input" onChange={handleFileChange} />

              <label htmlFor="fileInput" className="browse-button">
                Browse
              </label>
            </div>
          </div>
          <div className="projectdescription-content">
            <h4>Project Description Guidelines:</h4>
            <p>
              In this Section (maximum ten pages, including Tables and Figures),
              describe in detail the research plan for the proposed NRPU
              project.
            </p>

            <p>
              <b>Problem Statement:</b> Describe accurately the problems to be
              addressed and/or opportunities to be pursued by the proposed
              project. Provide a brief survey of the relevant literature clearly
              highlighting the existing gaps and what new information will be
              added to the existing pool of knowledge and describe how the
              proposed project builds on prior research. In case of applied
              research, identify the industry in Pakistan which will get benefit
              from the process/product. Clearly justify how the proposed
              research will contribute to the national economy/social sector.
              The principal Investigator is encouraged to discuss the proposed
              research with the proposed beneficiary and attach supporting
              documentation.
            </p>

            <p>
              <b>Methodology:</b> Describe the project design, conceptual
              framework, procedures, and analyses to be used to accomplish the
              specific aims of the project. The proposals should describe a
              methodology for determining the degree to which a project meets
              its objectives, both while the project is underway and at its
              conclusion. If relevant, include how the data will be collected,
              analyzed, and interpreted as well as any data-sharing plan.
              Describe any new methodology and its advantage over existing
              methodologies. Describe any novel concepts, approaches, tools, or
              technologies for the proposed activity. Discuss the potential
              difficulties and limitations of the proposed procedures and
              alternative approaches to achieve the aims. Describe proposed
              strategy for encouraging and ensuring the participation of women
              in the project. As part of this section, provide a tentative
              sequence or timetable for the project.
            </p>

            <p>
              <b>Scope and objectives:</b> Specify the scope of the project
              accurately and list the specific aims of the project. It is
              important that the specific aims be compatible with the requested
              proposal duration. The proposal should demonstrate that a
              project's objectives are feasible to achieve within the requested
              project duration.
            </p>

            <p>
              <b>Project Team, including partnerships:</b> Describe relevant
              prior efforts by applicants to address the problems identified. If
              you and/or your team have preliminary results, please discuss
              them. Illustrate how the proposed work will build upon existing
              expertise, if applicable. Proposals intended to improve the
              capacity of Pakistani institutions to support technology
              commercialization or industry competitiveness should also explain
              the role that industry representatives played in developing the
              proposal and articulate how the proposed project builds upon other
              measures undertaken by industry to improve competitiveness.
            </p>

            <p>
              <b>Results statement:</b> Clearly and concisely state the final
              results expected from the activity. The ability of the project to
              positively impact the goal area should be obvious.
            </p>

            <p>
              <b>Additional benefits:</b> Explain any other anticipated
              scientific, technological, or economic benefits that will accrue
              to country besides those already articulated in the Results
              Statement.
            </p>

            <p>
              <b>
                Ethical considerations related to the proposed research (If
                Any):
              </b>{" "}
              The proposal should have a description of ethical considerations
              relating to the study. This section should document the issues
              that are likely to raise ethical concerns. It should also describe
              how the Principal Investigator is planning to address it and how
              he/she plans to obtain informed consent from the research
              participants (the informed consent process).
            </p>

            <p>
              Incomplete proposal and exceeding the established page limits may
              not be considered.
            </p>

            <div className="projectdescription-btn">
              <button className="projectdescription-button" onClick={handleSave} disabled={!file}>SAVE</button>
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

export default ProjectDescription;
