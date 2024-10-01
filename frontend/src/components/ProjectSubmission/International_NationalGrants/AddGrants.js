import React, { useState } from "react";
import "./addgrants.css";
import Sidebar from "../../Sidebar/Sidebar";
import NavBar from "../../shared-components/navbar/NavBar";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../shared-components/breadcrumps/BreadCrumps";

const defaultOnSave = (proposalCover) => {
  // You can handle the save logic here
};

const AddGrants = ({ onSave  }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  // const history = useHistory();


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
    proposalReferenceNo: "",
    titleOfProject: "",
    durationOfProject: "",
    totalBudgetRequested: "",
    themeOfProposedResearch: "",
    disciplineOfProposedResearch: "",
    principalInvestigator: {
      institutionName: "",
      streetAddress: "",
      city: "",
      name: "",
      positionTitle: "",
      department: "",
      tel: "",
      email: "",
      cnic: "",
    },
    facultyDetails: {
      institutionName: "",
      streetAddress: "",
      city: "",
      name: "",
      positionTitle: "",
      department: "",
      tel: "",
      email: "",
      cnic: "",
    },
  });

  // Handle the form submission
  // Handle changes in form fields
  // Handle changes in form fields
 
  // Initialize state
 
 
  // const handleChange = (e) => {
  //   const { name, value, dataset, type, checked } = e.target;
  //   const section = dataset.section;
  //   const subSection = dataset.subsection;

  //   if (section === "proposalCover") {
  //     if (subSection) {
  //       // Update nested fields
  //       setProposalCover((prevState) => ({
  //         ...prevState,
  //         [subSection]: {
  //           ...prevState[subSection],
  //           [name]: value,
  //         },
  //       }));
  //     } else {
  //         setProposalCover((prevState) => ({
  //           ...prevState,
  //           [name]: value,
  //         }));
  //       }
  //     }
  //   }
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const section = dataset.section;
  
    if (section === "principalInvestigator") {
      setProposalCover(prevState => ({
        ...prevState,
        principalInvestigator: {
          ...prevState.principalInvestigator,
          [name]: value
        }
      }));
    } else if (section === "facultyDetails") {
      setProposalCover(prevState => ({
        ...prevState,
        facultyDetails: {
          ...prevState.facultyDetails,
          [name]: value
        }
      }));
    } else {
      setProposalCover(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  
 

   // Handle checkbox changes for array-based fields
   const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const section = e.target.dataset.section;

    if (section === "proposalCover") {
      setProposalCover(prevState => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter(item => item !== value)
      }));
    }
  };

  
  
  const handleSave = () => {
    if (typeof onSave === 'function') {
        onSave(proposalCover);
    } else {

    }
};

  

  return (
    <div className="addgrants-container">
      <Sidebar />
      <div className="addgrants">
        {/* <div className="navbar-div">
          <NavBar />
        </div> */}
        <div className="addgrant-navbar-div">
          <NavBar />
        </div>
        <div className="addgrants-card">
          <h5>International/National Grants | Proposal Cover</h5>
          <div className="addgrants-bredcrumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="addgrants-multiinputfields">
            <div className="title-input">
              <label>*Proposal Reference No:</label>
              <input
                value={proposalCover.proposalReferenceNo}
                type="text"
                placeholder="(Not for completion by applicant)"
                name="proposalReferenceNo"
                data-section="proposalCover"
                onChange={handleChange}
              />
            </div>
            <div className="inputgroup">
              <label>*Title of Project:</label>
              <input
                type="text"
                value={proposalCover.titleOfProject}
                name="titleOfProject"
                placeholder="NRPU:"
                data-section="proposalCover"
                onChange={handleChange}
              />
            </div>
            <div className="inputgroup">
              <label>Duration of Project:</label>
              <input
                type="text"
                value={proposalCover.durationOfProject}
                name="durationOfProject"
                placeholder="In months"
                data-section="proposalCover"
                onChange={handleChange}
              />
            </div>
            <div className="inputgroup">
              <label>Total Budget Requested:</label>
              <input
                type="text"
                value={proposalCover.totalBudgetRequested}
                name="totalBudgetRequested"
                placeholder="PKR million"
                data-section="proposalCover"
                onChange={handleChange}
              />
            </div>
            <div className="multicheckboxes">
              <h6>Theme of Proposed Research:</h6>
              {/* <div className="theme_research_checkbox">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="ThemeofProposedResearch"
                      value="Basic"
                      checked={proposalCover.themeOfProposedResearch.includes(
                        "Basic"
                      )}
                      data-section="proposalCover"
                      onChange={handleChange}
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
                      checked={proposalCover.themeOfProposedResearch.includes(
                        "Applied"
                      )}
                      data-section="proposalCover"
                      onChange={handleChange}
                    />
                    Applied
                  </label>
                </div>
              </div> */}
              <div className="theme-research-checkbox">
                {['Basic', 'Applied'].map((theme) => (
                  <div key={theme}>
                    <label>
                      <input
                        type="checkbox"
                        name="themeOfProposedResearch"
                        value={theme}
                        checked={proposalCover.themeOfProposedResearch.includes(theme)}
                        data-section="proposalCover"
                        onChange={handleCheckboxChange}
                      />
                      {theme}
                    </label>
                  </div>
                ))}
              </div>

              <div className="discipline-research-checkbox">
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
                        name="disciplineOfProposedResearch"
                        value={discipline}
                        checked={proposalCover.disciplineOfProposedResearch.includes(
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

            <div className="addgrants-multiinputfields">
              <h4>Principal Investigator Details:</h4>
              {Object.keys(proposalCover.principalInvestigator).map((key) => (
                <div className="inputgroup" key={key}>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    :
                  </label>
                  <input
                    type="text"
                    value={proposalCover.principalInvestigator[key]}
                    name={key}
                    data-section="principalInvestigator"
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <div className="addgrants-multiinputfields">
              <h4>Faculty Details:</h4>
              {Object.keys(proposalCover.facultyDetails).map((key) => (
                <div className="inputgroup" key={key}>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    :
                  </label>
                  <input
                    type="text"
                    value={proposalCover.facultyDetails[key]}
                    name={key}
                    data-section="facultyDetails"
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <div>
              <div className="addgrant-save-btn">
                <button className="addgrant-savebut" onClick={handleSave}>
                  Save
                </button>
              </div>
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

export default AddGrants;
