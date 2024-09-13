import React, { useState } from "react";
import "./addgrants.css";
import Sidebar from "../../Sidebar/Sidebar";
import NavBar from "../../shared-components/navbar/NavBar";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../shared-components/breadcrumps/BreadCrumps";

const AddGrants = () => {
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

  const [proposalCover, setProposalCover] = useState({
    ProposalReferenceNo: "",
    TitleofProject: "",
    DurationofProject: "",
    TotalBudgetRequested: "",
    ThemeofProposedResearch: [],
    DisciplineofProposedResearch: [],
  });

  const [principleInvestigator, setPrincipleInvestigator] = useState({
    InstitutionName: "",
    StreetAddress: "",
    City: "",
    Name: "",
    Position_or_Title: "",
    Department: "",
    TellNo: "",
    Email: "",
    CNIC_PassportNo: "",
  });

  const [faculty, setFaculty] = useState({
    InstitutionName: "",
    StreetAddress: "",
    City: "",
    Name: "",
    Position_or_Title: "",
    Department: "",
    TellNo: "",
    Email: "",
    CNIC_PassportNo: "",
  });

  console.log(proposalCover);
  console.log(principleInvestigator);
  console.log(faculty);

  // Handle change for text inputs
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    const section = e.target.dataset.section;

    if (section === "proposalCover") {
      setProposalCover((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (section === "principleInvestigator") {
      setPrincipleInvestigator((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (section === "faculty") {
      setFaculty((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle change for checkboxes
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const section = e.target.dataset.section;

    if (section === "proposalCover") {
      setProposalCover((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value),
      }));
    }
  };

  return (
    <div className="addgrants-container">
      <Sidebar />
      <div className="addgrants">
        {/* <div className="navbar-div">
          <NavBar />
        </div> */}
        <div className="addgrant_navbar-div">
          <NavBar />
        </div>
        <div className="addgrants-card">
          <h5>International/National Grants | Proposal Cover</h5>
          <div className="addgrants_bredcrumb">
          {/* <div className="addgrants_bred-crumb"> */}
          {/* <div className="nav.bredcrumb"> */}
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="addgrants_multiInputFields">
            <div className="title-input">
              <label>*Proposal Reference No:</label>
              <input
                value={proposalCover.ProposalReferenceNo}
                type="text"
                placeholder="(Not for completion by applicant)"
                name="ProposalReferenceNo"
                data-section="proposalCover"
                onChange={handleTextChange}
              />
            </div>
            <div className="InputGroup">
              <label>*Title of Project:</label>
              <input
                type="text"
                value={proposalCover.TitleofProject}
                name="TitleofProject"
                placeholder="NRPU:"
                data-section="proposalCover"
                onChange={handleTextChange}
              />
            </div>
            <div className="InputGroup">
              <label>Duration of Project:</label>
              <input
                type="text"
                value={proposalCover.DurationofProject}
                name="DurationofProject"
                placeholder="In months"
                data-section="proposalCover"
                onChange={handleTextChange}
              />
            </div>
            <div className="InputGroup">
              <label>Total Budget Requested:</label>
              <input
                type="text"
                value={proposalCover.TotalBudgetRequested}
                name="TotalBudgetRequested"
                placeholder="PKR million"
                data-section="proposalCover"
                onChange={handleTextChange}
              />
            </div>
            <div className="multiCheckBoxes">
              <h6>Theme of Proposed Research:</h6>
              <div className="theme_research_checkbox">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="ThemeofProposedResearch"
                      value="Basic"
                      checked={proposalCover.ThemeofProposedResearch.includes(
                        "Basic"
                      )}
                      data-section="proposalCover"
                      onChange={handleCheckboxChange}
                    />
                    Basic
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="ThemeofProposedResearch"
                      value="Applied"
                      checked={proposalCover.ThemeofProposedResearch.includes(
                        "Applied"
                      )}
                      data-section="proposalCover"
                      onChange={handleCheckboxChange}
                    />
                    Applied
                  </label>
                </div>
              </div>

              <div className="discipline_research_checkbox">
                <h6>Discipline of Proposed Research:</h6>
                {[
                  "Agriculture Sciences",
                  "Arts & Humanities",
                  "Biological and Health Sciences",
                  "Management Sciences",
                  "Education and Human Resources",
                  "Engineering and Technology",
                  "Mathematical and Physical Sciences",
                  "Social, Behavioral and Economical Sciences",
                ].map((discipline) => (
                  <div key={discipline}>
                    <label>
                      <input
                        type="checkbox"
                        name="DisciplineofProposedResearch"
                        value={discipline}
                        checked={proposalCover.DisciplineofProposedResearch.includes(
                          discipline
                        )}
                        data-section="proposalCover"
                        onChange={handleCheckboxChange}
                      />
                      {discipline}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="addgrants_multiInputFields">
              <h4>Principal Investigator Details:</h4>
              {Object.keys(principleInvestigator).map((key) => (
                <div className="InputGroup" key={key}>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    :
                  </label>
                  <input
                    type="text"
                    value={principleInvestigator[key]}
                    name={key}
                    data-section="principleInvestigator"
                    onChange={handleTextChange}
                  />
                </div>
              ))}
            </div>

            <div className="addgrants_multiInputFields">
              <h4>Faculty Details:</h4>
              {Object.keys(faculty).map((key) => (
                <div className="InputGroup" key={key}>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    :
                  </label>
                  <input
                    type="text"
                    value={faculty[key]}
                    name={key}
                    data-section="faculty"
                    onChange={handleTextChange}
                  />
                </div>
              ))}
            </div>

            <div>
              <div className="addgrant_save-btn">
                <button className="addgrant_savebut">Save</button>
              </div>
            </div>
          </div>
        </div>
        <div className="juw_copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default AddGrants;
