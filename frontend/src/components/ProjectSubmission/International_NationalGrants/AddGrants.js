// original
import React, { useState } from "react";
import "./addgrants.css";
import Sidebar from "../../Sidebar/Sidebar";
import NavBar from "../../shared-components/navbar/NavBar";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../shared-components/breadcrumps/BreadCrumps";
import { toast } from "react-toastify";

const defaultOnSave = (proposalCover) => {
  // You can handle the save logic here
};

const AddGrants = ({ onSave }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  // const history = useHistory();

  const breadCrumps = [
    { label: "Proposal Cover" },
    {
      label: "Executive Summary",
      
    },
    {
      label: "Academic/Sectoral Collaborators",
     
    },
    {
      label: "Project Description",
      
    },
    {
      label: "Project Management",
     
    },
    {
      label: "Implementation Timeline",
      
    },
    {
      label: "Physical Resources and Facilities",
      
    },
    {
      label: "Scientific Personnel",
      
    },
    {
      label: "Principal Investigators availed research grant details",
      
    },
    {
      label: "Risk Management Strategy",
     
    },
    {
      label: "List of References",
     
    },
    {
      label: "Proposed Project Budget",
      
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

  const [checkboxError, setCheckboxError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [cnicError, setCnicError] = useState(false);
  // Define error states for Faculty Details
  const [facultyEmailError, setFacultyEmailError] = useState(false);
  const [facultyCnicError, setFacultyCnicError] = useState(false);

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
  // const handleChange = (e) => {
  //   const { name, value, dataset } = e.target;
  //   const section = dataset.section;

  //   if (section === "principalInvestigator") {
  //     setProposalCover(prevState => ({
  //       ...prevState,
  //       principalInvestigator: {
  //         ...prevState.principalInvestigator,
  //         [name]: value
  //       }
  //     }));
  //   } else if (section === "facultyDetails") {
  //     setProposalCover(prevState => ({
  //       ...prevState,
  //       facultyDetails: {
  //         ...prevState.facultyDetails,
  //         [name]: value
  //       }
  //     }));
  //   } else {
  //     setProposalCover(prevState => ({
  //       ...prevState,
  //       [name]: value
  //     }));
  //   }
  // };

  // orignla
  // const handleChange = (e) => {
  //   const { name, value, dataset } = e.target;
  //   const section = dataset.section;

  //   // Apply regex for totalBudgetRequested to allow only numbers
  //   if (name === "totalBudgetRequested") {
  //     // This regex allows numbers with optional decimal points
  //     const numberRegex = /^\d*\.?\d*$/;

  //     // Validate the value, update state only if the value matches the regex
  //     if (!numberRegex.test(value)) {
  //       return; // Return early if the value doesn't match the regex
  //     }
  //   }

  //   if (section === "principalInvestigator") {
  //     setProposalCover(prevState => ({
  //       ...prevState,
  //       principalInvestigator: {
  //         ...prevState.principalInvestigator,
  //         [name]: value
  //       }
  //     }));
  //   } else if (section === "facultyDetails") {
  //     setProposalCover(prevState => ({
  //       ...prevState,
  //       facultyDetails: {
  //         ...prevState.facultyDetails,
  //         [name]: value
  //       }
  //     }));
  //   } else {
  //     setProposalCover(prevState => ({
  //       ...prevState,
  //       [name]: value
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const section = dataset.section;

    // Allow typing in the email and CNIC fields for Principal Investigator
    if (section === "principalInvestigator") {
      if (name === "email") {
        // Validate email format for Principal Investigator
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
        setEmailError(!emailRegex.test(value) && value.length > 0); // Set error if invalid
      }

      if (name === "cnic") {
        // Validate CNIC format for Principal Investigator
        const cnicRegex = /^\d{5}-\d{7}-\d$/; // Format: 42501-9234823-0
        setCnicError(!cnicRegex.test(value) && value.length > 0); // Set error if invalid
      }
    }

    // Allow typing in the email and CNIC fields for Faculty Details
    if (section === "facultyDetails") {
      if (name === "email") {
        // Validate email format for Faculty Details
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
        setFacultyEmailError(!emailRegex.test(value) && value.length > 0); // Set error if invalid
      }

      if (name === "cnic") {
        // Validate CNIC format for Faculty Details
        const cnicRegex = /^\d{5}-\d{7}-\d$/; // Format: 42501-9234823-0
        setFacultyCnicError(!cnicRegex.test(value) && value.length > 0); // Set error if invalid
      }
    }

    // Allow typing in the email and CNIC fields
    // if (name === "email") {
    //   setProposalCover((prevState) => ({
    //     ...prevState,
    //     principalInvestigator: {
    //       ...prevState.principalInvestigator,
    //       [name]: value,
    //     },
    //   }));

    //   // Validate email format
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    //   setEmailError(!emailRegex.test(value)); // Set error if invalid
    // }

    // if (name === "cnic") {
    //   setProposalCover((prevState) => ({
    //     ...prevState,
    //     principalInvestigator: {
    //       ...prevState.principalInvestigator,
    //       [name]: value,
    //     },
    //   }));

    //   // Validate CNIC format
    //   const cnicRegex = /^\d{5}-\d{7}-\d$/; // Format: 42501-9234823-0
    //   setCnicError(!cnicRegex.test(value)); // Set error if invalid
    // }

    // Apply regex for totalBudgetRequested to allow only numbers
    if (name === "totalBudgetRequested") {
      const numberRegex = /^\d*\.?\d*$/;

      if (!numberRegex.test(value)) {
        return; // Return early if the value doesn't match the regex
      }
    }

    // Remaining handleChange logic...
    if (section === "principalInvestigator") {
      setProposalCover((prevState) => ({
        ...prevState,
        principalInvestigator: {
          ...prevState.principalInvestigator,
          [name]: value,
        },
      }));
    } else if (section === "facultyDetails") {
      setProposalCover((prevState) => ({
        ...prevState,
        facultyDetails: {
          ...prevState.facultyDetails,
          [name]: value,
        },
      }));
    } else {
      setProposalCover((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // const handleCheckboxChange = (e) => {
  //   const { name, value, checked } = e.target;
  //   const section = e.target.dataset.section;

  //   if (section === "proposalCover") {
  //     let updatedThemes;

  //     if (checked) {
  //       // Add the selected checkbox value
  //       updatedThemes = [...proposalCover[name], value];
  //     } else {
  //       // Remove the unselected checkbox value
  //       updatedThemes = proposalCover[name].filter((item) => item !== value);
  //     }

  //     // Validation: Ensure that only one checkbox is selected
  //     if (updatedThemes.length > 1) {
  //       setCheckboxError(
  //         "Please select only one option: 'Basic' or 'Applied'."
  //       );
  //     } else {
  //       setCheckboxError(""); // Clear the error if valid
  //     }

  //     setProposalCover((prevState) => ({
  //       ...prevState,
  //       [name]: updatedThemes,
  //     }));
  //   }
  // };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const section = e.target.dataset.section;

    if (section === "proposalCover") {
      let updatedValues;

      if (checked) {
        // Add the selected checkbox value
        updatedValues = [...proposalCover[name], value];
      } else {
        // Remove the unselected checkbox value
        updatedValues = proposalCover[name].filter((item) => item !== value);
      }

      // Apply validation only for the themeOfProposedResearch checkboxes
      if (name === "themeOfProposedResearch") {
        // Validation: Ensure that only one checkbox is selected
        if (updatedValues.length > 1) {
          setCheckboxError(
            "Please select only one option: 'Basic' or 'Applied'."
          );
        } else {
          setCheckboxError(""); // Clear the error if valid
        }
      } else {
        // Clear error for other sections if needed
        setCheckboxError("");
      }

      setProposalCover((prevState) => ({
        ...prevState,
        [name]: updatedValues,
      }));
    }
  };

  const handleSave = () => {
    if (typeof onSave === "function") {
      onSave(proposalCover);
    } else {
    }
  };

  // correct code to validate all field
  // const handleSave = () => {
  //   // Destructure the proposalCover state for easier access
  //   const {
  //     proposalReferenceNo,
  //     titleOfProject,
  //     durationOfProject,
  //     totalBudgetRequested,
  //     themeOfProposedResearch,
  //     disciplineOfProposedResearch,
  //     principalInvestigator,
  //     facultyDetails,
  //   } = proposalCover;

  //   // Check for top-level fields
  //   if (!proposalReferenceNo || !titleOfProject || !durationOfProject ||
  //       !totalBudgetRequested || !themeOfProposedResearch || !disciplineOfProposedResearch) {
  //     toast.error("All top-level fields are required!");
  //     return;
  //   }

  //   // Validate principal investigator fields
  //   if (!principalInvestigator.name || !principalInvestigator.positionTitle ||
  //       !principalInvestigator.department || !principalInvestigator.tel ||
  //       !principalInvestigator.email || !principalInvestigator.cnic) {
  //     toast.error("All Principal Investigator fields are required!");
  //     return;
  //   }

  //   // Validate faculty details fields
  //   if (!facultyDetails.name || !facultyDetails.positionTitle ||
  //       !facultyDetails.department || !facultyDetails.tel ||
  //       !facultyDetails.email || !facultyDetails.cnic) {
  //     toast.error("All Faculty Details fields are required!");
  //     return;
  //   }

  //   // Call onSave if it is a function
  //   if (typeof onSave === "function") {
  //     onSave(proposalCover);
  //   } else {
  //     toast.error("onSave is not a valid function.");
  //   }
  // };

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
              <div className="theme-research-checkbox d-flex align-items-center gap-4">
                {['Basic', 'Applied'].map((theme) => (
                  <div className="checkbox-item d-flex align-items-center" key={theme}>
                    
                      <input
                        type="checkbox"
                        name="themeOfProposedResearch"
                        value={theme}
                        className="w-auto"
                        checked={proposalCover.themeOfProposedResearch.includes(theme)}
                        data-section="proposalCover"
                        onChange={handleCheckboxChange}
                      />
                      {theme}
                    
                  </div>
                ))}
              </div>
              {checkboxError && <p style={{ color: "red" }}>{checkboxError}</p>}

              <div className="discipline-research-checkboxs">
                <h6>Discipline of Proposed Research:</h6>
                <div className="domain-research-checkbox d-flex align-items-center col-gap-2 pb-4 flex-wrap">
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
                  <div className="checkbox-item d-flex align-items-center " key={discipline}>
                    
                      <input
                        type="checkbox"
                        name="disciplineOfProposedResearch"
                        value={discipline}
                         className="w-auto"
                        checked={proposalCover.disciplineOfProposedResearch.includes(
                          discipline
                        )}
                        data-section="proposalCover"
                        onChange={handleCheckboxChange}
                      />
                      {discipline}
                    
                  </div>
                ))}
                </div>
              </div>
            </div>

            {/* <div className="addgrants-multiinputfields">
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
            </div> */}

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
                  {/* Conditional rendering for error messages */}
                  {key === "email" && emailError && (
                    <span className="error" style={{ color: "red" }}>
                      Invalid email format
                    </span>
                  )}
                  {key === "cnic" && cnicError && (
                    <span className="error" style={{ color: "red" }}>
                      Invalid CNIC format: 42000-0000000-0
                    </span>
                  )}
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
                  {/* Conditional rendering for error messages for Faculty Details */}
                  {key === "email" && facultyEmailError && (
                    <span className="error" style={{ color: "red" }}>
                      Invalid email format
                    </span>
                  )}
                  {key === "cnic" && facultyCnicError && (
                    <span className="error" style={{ color: "red" }}>
                      Invalid CNIC format: 42000-0000000-0
                    </span>
                  )}
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
