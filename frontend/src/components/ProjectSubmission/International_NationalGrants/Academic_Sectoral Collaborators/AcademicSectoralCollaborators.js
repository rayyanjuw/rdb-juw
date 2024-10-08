import React, { useState } from "react";
import "./academicsectoralcollaborators.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

const AcademicSectoralCollaborators = ({ onSave }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [emailError, setEmailError] = useState("");
  const [sectoralEmailErrors, setSectoralEmailErrors] = useState([]);

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

  const [formData, setFormData] = useState({
    // scientificPersonnelDetails: "",
    sectoralCollaborators: "",
    // projects: [
    academicCollaboratorsDetails: [
      {
        nameofcollaborator: "",
        institutionofcollaborator: "",
        location: "",
        focusofcollaboration: "",
        tellno: "",
        email: "",
      },
      {
        nameofcollaborator: "",
        institutionofcollaborator: "",
        location: "",
        focusofcollaboration: "",
        tellno: "",
        email: "",
      },
    ],
    sectoralCollaboratorsDetails: [
      {
        companyname: "",
        location: "",
        nameofcollaborator: "",
        position: "",
        tellno: "",
        email: "",
        ProjectGoalsAnticipatedContribution: "",
        AnnualFinancialContribution: "",
      },
      {
        companyname: "",
        location: "",
        nameofcollaborator: "",
        position: "",
        tellno: "",
        email: "",
        ProjectGoalsAnticipatedContribution: "",
        AnnualFinancialContribution: "",
      },
    ],
  });

  const handleChange = (e, index, isAcademic) => {
    const { name, value } = e.target;

    // Perform validation (if needed)
    // if (name === "email") {
    //   validateEmail(value);
    // }
    // if (name === "email") {
    //   validateEmail(value, index);
    // }

    // Perform email validation for academic or sectoral collaborators
    if (name === "email") {
      if (isAcademic) {
        // Validate email for academic collaborator
        validateEmail(value, index);
      } else {
        // Validate email for sectoral collaborator
        validateSectoralEmail(value, index);
      }
    }

    if (isAcademic) {
      const updatedCollaborators = [...formData.academicCollaboratorsDetails];
      updatedCollaborators[index][name] = value;
      setFormData({
        ...formData,
        academicCollaboratorsDetails: updatedCollaborators,
      });
    } else {
      const updatedSectoralContributors = [
        ...formData.sectoralCollaboratorsDetails,
      ];
      updatedSectoralContributors[index][name] = value;
      setFormData({
        ...formData,
        sectoralCollaboratorsDetails: updatedSectoralContributors,
      });
    }
  };

  const handleSave = () => {
    if (typeof onSave === "function") {
      onSave(formData); // This will trigger the parent's handleSaveAndNext
    } else {
      // console.error('onSave is not a function');
    }
  };

  // const validateEmail = (email) => {
  //   // Regular expression to validate the email format
  //   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //   // Show error only if email is invalid and field is not empty
  //   if (email && !emailPattern.test(email)) {
  //     setEmailError("Please enter a valid email address.");
  //   } else {
  //     setEmailError(""); // Clear error when valid
  //   }
  // };

  const validateEmail = (email, index) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let newError = [...emailError];

    // Validate the email and update the specific index in the error array
    if (email && !emailPattern.test(email)) {
      newError[index] = "Please enter a valid email address.";
    } else {
      newError[index] = "";
    }

    setEmailError(newError); // Update the state with the new error array
  };

  // const validateSectoralEmail = (email, index, emailType) => {
  //   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   let newErrors = [...sectoralEmailErrors];

  //   // Check for valid email and assign error message based on the email field type ('primary' or 'secondary')
  //   if (email && !emailPattern.test(email)) {
  //     newErrors[index] = {
  //       ...newErrors[index],
  //       [emailType]: "Please enter a valid email address.",
  //     };
  //   } else {
  //     newErrors[index] = {
  //       ...newErrors[index],
  //       [emailType]: "",
  //     };
  //   }

  //   setSectoralEmailErrors(newErrors); // Update the state with the new error array
  // };

  // Validation function for sectoral email
  // const validateSectoralEmail = (email, index) => {
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const updatedErrors = { ...sectoralEmailErrors };

  //   // If email is invalid, show error message only for the respective index
  //   if (!emailPattern.test(email)) {
  //     updatedErrors[index] = {
  //       ...updatedErrors[index],
  //       email: "Invalid email address",
  //     };
  //   } else {
  //     delete updatedErrors[index]; // Remove error if email is valid
  //   }

  //   setSectoralEmailErrors(updatedErrors); // Update error state
  // };


  // Validation function for sectoral email
  const validateSectoralEmail = (email, index) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const updatedErrors = { ...sectoralEmailErrors };

    // If email is empty, do not show any error
    if (email.trim() === "") {
      delete updatedErrors[index]; // Remove any existing error for this index
    } else if (!emailPattern.test(email)) {
      // If email is invalid, show error message only for the respective index
      updatedErrors[index] = {
        ...updatedErrors[index],
        // email: "Invalid email address",
        email: "Please enter a valid email address.",
      };
    } else {
      delete updatedErrors[index]; // Remove error if email is valid
    }

    setSectoralEmailErrors(updatedErrors); // Update error state
  };

  return (
    <div className="ascollaborators-container">
      <Sidebar />
      <div className="ascollaborators">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="ascollaborators-card">
          <h3>
            International/National Grants | Academic/Sectoral Collaborators
          </h3>
          <div className="ascollaborators-bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="ascollaborators-content">
            <div className="textarea">
              <label htmlFor="academic/sectoralCollaborators">
                Academic/Sectoral Collaborators (if any):
              </label>
              <textarea
                id="sectoralCollaborators"
                name="sectoralCollaborators"
                value={formData.sectoralCollaborators}
                placeholder="In this Section (maximum three pages narrative)"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectoralCollaborators: e.target.value,
                  })
                }
                rows="2"
                cols="20"
              />
            </div>

            <p>
              1. <b>Academic Collaborators:</b> Describe the role of academic
              collaborators at other higher education institutions in Pakistan
              for the proposed project. Identify their research skills and
              describe the anticipated role in the research agenda for the
              project.
            </p>

            <p>
              2. <b>Sectoral2 Collaborators:</b> Describe the role of sectoral
              collaborators in the project. Identify the relevant expertise that
              the collaborators possess, and describe the anticipated role in
              the project (for example, disciplinary expertise, providing access
              to experimental equipment, sharing software, or providing
              technical expertise that does not exist in the PI’s institutions)
            </p>

            <div className="collaborators-heading">
              {/* <div className="academic-collaborators-heading"> */}
              <h4>1. ACADEMIC COLLABORATORS (IF ANY)</h4>
              <p>
                All confirmed Academic Collaborators (if any) should be
                identified in this Table
              </p>
            </div>
            {formData.academicCollaboratorsDetails.map(
              (academicCollaboratorsDetail, index) => (
                <div className="ascollaborators-multiinputfields" key={index}>
                  <div className="ascollaborators-inputgroup">
                    <p>{index + 1}. Academic Collaborator Details:</p>
                    <label>Name of Collaborator:</label>
                    <input
                      type="text"
                      name="nameofcollaborator"
                      value={academicCollaboratorsDetail.nameofcollaborator}
                      onChange={(e) => handleChange(e, index, true)}
                    />
                  </div>
                  <div className="ascollaborators-inputgroup">
                    <label>Institution of Collaborator:</label>
                    <input
                      type="text"
                      name="institutionofcollaborator"
                      value={
                        academicCollaboratorsDetail.institutionofcollaborator
                      }
                      onChange={(e) => handleChange(e, index, true)}
                    />
                  </div>

                  <div className="ascollaborators-two-inputs">
                    <div className="ascollaborators-inputgroup">
                      <label>Location:</label>
                      <input
                        type="text"
                        name="location"
                        value={academicCollaboratorsDetail.location}
                        onChange={(e) => handleChange(e, index, true)}
                      />
                    </div>
                    <div className="ascollaborators-inputgroup">
                      <label>
                        Focus of collaboration: education or research:
                      </label>
                      <input
                        type="text"
                        name="focusofcollaboration"
                        value={academicCollaboratorsDetail.focusofcollaboration}
                        onChange={(e) => handleChange(e, index, true)}
                      />
                    </div>
                  </div>

                  <div className="ascollaborators-two-inputs">
                    <div className="ascollaborators-inputgroup">
                      <label>Tel. #:</label>
                      <input
                        type="tel"
                        name="tellno"
                        value={academicCollaboratorsDetail.tellno}
                        onChange={(e) => handleChange(e, index, true)}
                      />
                    </div>
                    <div className="ascollaborators-inputgroup">
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={academicCollaboratorsDetail.email}
                        onChange={(e) => handleChange(e, index, true)}
                        // onBlur={(e) => validateEmail(e.target.value)}
                        onBlur={(e) => validateEmail(e.target.value, index)} // Pass the index to validate the specific field
                      />
                      {emailError && (
                        <span className="error-message">
                          {emailError[index]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}

            <div className="collaborators-heading">
              <h4>2. SECTORAL COLLABORATORS</h4>
              <p>
                All confirmed Sectoral Collaborators should be identified in
                this Table. In addition Letters of Commitment may be attached to
                the proposal.
              </p>
            </div>
            {formData.sectoralCollaboratorsDetails.map(
              (sectoralCollaboratorsDetail, index) => (
                <div className="ascollaborators-multiinputfields" key={index}>
                  <div className="ascollaborators-inputgroup">
                    <p>{index + 1}. Sectoral Collaborator Details</p>
                    <label>Company/Organization Name:</label>
                    <input
                      type="text"
                      name="companyname"
                      value={sectoralCollaboratorsDetail.companyname}
                      onChange={(e) => handleChange(e, index, false)}
                    />
                  </div>
                  <div className="ascollaborators-inputgroup">
                    <label>Location:</label>
                    <input
                      type="text"
                      name="location"
                      value={sectoralCollaboratorsDetail.location}
                      onChange={(e) => handleChange(e, index, false)}
                    />
                  </div>

                  <div className="ascollaborators-two-inputs">
                    <div className="ascollaborators-inputgroup">
                      <label>Name of Collaborator:</label>
                      <input
                        type="text"
                        name="nameofcollaborator"
                        value={sectoralCollaboratorsDetail.nameofcollaborator}
                        onChange={(e) => handleChange(e, index, false)}
                      />
                    </div>
                    <div className="ascollaborators-inputgroup">
                      <label>Position/Title:</label>
                      <input
                        type="text"
                        name="position"
                        value={sectoralCollaboratorsDetail.position}
                        onChange={(e) => handleChange(e, index, false)}
                      />
                    </div>
                  </div>

                  <div className="ascollaborators-two-inputs">
                    <div className="ascollaborators-inputgroup">
                      <label>Tel. #:</label>
                      <input
                        type="text"
                        name="tellno"
                        value={sectoralCollaboratorsDetail.tellno}
                        onChange={(e) => handleChange(e, index, false)}
                      />
                    </div>
                    <div className="ascollaborators-inputgroup">
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={sectoralCollaboratorsDetail.email}
                        onChange={(e) => handleChange(e, index, false)}
                        onBlur={(e) =>
                          validateSectoralEmail(e.target.value, index)
                        }
                      />
                      {sectoralEmailErrors[index]?.email && (
                        <span className="error-message">
                          {sectoralEmailErrors[index].email}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ascollaborators-inputgroup">
                    <label>Anticipated Contribution to Project Goals:</label>
                    <input
                      type="text"
                      name="ProjectGoalsAnticipatedContribution"
                      value={
                        sectoralCollaboratorsDetail.ProjectGoalsAnticipatedContribution
                      }
                      onChange={(e) => handleChange(e, index, false)}
                    />
                  </div>
                  <div className="ascollaborators-inputgroup">
                    <label>Anticipated Annual Financial Contribution:</label>
                    <input
                      type="text"
                      name="AnnualFinancialContribution"
                      value={
                        sectoralCollaboratorsDetail.AnnualFinancialContribution
                      }
                      onChange={(e) => handleChange(e, index, false)}
                    />
                  </div>
                </div>
              )
            )}

            <div className="ascollaborators-btn">
              <button className="ascollaborators-button" onClick={handleSave}>
                SAVE
              </button>
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

export default AcademicSectoralCollaborators;
