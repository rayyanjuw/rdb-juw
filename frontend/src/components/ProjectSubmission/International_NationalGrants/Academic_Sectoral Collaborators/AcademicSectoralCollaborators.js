import React, { useState } from "react";
import "./academicsectoralcollaborators.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

const AcademicSectoralCollaborators = () => {
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

  console.log(formData);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCollaborators = [...formData.academicCollaboratorsDetails];
    const updatedSectoralContributors = [
      ...formData.sectoralCollaboratorsDetails,
    ];
    updatedSectoralContributors[index][name] = value;
    setFormData({
      ...formData,
      academicCollaboratorsDetails: updatedCollaborators,
      sectoralCollaboratorsDetails: updatedSectoralContributors,
    });
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
          <div className="ascollaborators_bred-crumb">
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
                  <div
                    className="ascollaborators_multiInputFields"
                    key={index}
                  >
                    <div className="ascollaborators_InputGroup">
                      <p>{index + 1}. Academic Collaborator Details:</p>
                      <label>Name of Collaborator:</label>
                      <input
                        type="text"
                        name="nameofcollaborator"
                        value={academicCollaboratorsDetail.nameofcollaborator}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div className="ascollaborators_InputGroup">
                      <label>Institution of Collaborator:</label>
                      <input
                        type="text"
                        name="institutionofcollaborator"
                        value={
                          academicCollaboratorsDetail.institutionofcollaborator
                        }
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>

                    <div className="ascollaborators_two-inputs">
                      <div className="ascollaborators_InputGroup">
                        <label>Location:</label>
                        <input
                          type="text"
                          name="location"
                          value={academicCollaboratorsDetail.location}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                      <div className="ascollaborators_InputGroup">
                        <label>
                          Focus of collaboration: education or research:
                        </label>
                        <input
                          type="text"
                          name="focusofcollaboration"
                          value={
                            academicCollaboratorsDetail.focusofcollaboration
                          }
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                    </div>

                    <div className="ascollaborators_two-inputs">
                      <div className="ascollaborators_InputGroup">
                        <label>Tel. #:</label>
                        <input
                          type="text"
                          name="tellno"
                          value={academicCollaboratorsDetail.tellno}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                      <div className="ascollaborators_InputGroup">
                        <label>Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={academicCollaboratorsDetail.email}
                          onChange={(e) => handleChange(e, index)}
                        />
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
                  <div
                    className="ascollaborators_multiInputFields"
                    key={index}
                  >
                    <div className="ascollaborators_InputGroup">
                      <p>{index + 1}. Sectoral Collaborator Details</p>
                      <label>Company/Organization Name:</label>
                      <input
                        type="text"
                        name="companyname"
                        value={sectoralCollaboratorsDetail.companyname}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div className="ascollaborators_InputGroup">
                      <label>Location:</label>
                      <input
                        type="text"
                        name="location"
                        value={sectoralCollaboratorsDetail.location}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>

                    <div className="ascollaborators_two-inputs">
                      <div className="ascollaborators_InputGroup">
                        <label>Name of Collaborator:</label>
                        <input
                          type="text"
                          name="nameofcollaborator"
                          value={sectoralCollaboratorsDetail.nameofcollaborator}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                      <div className="ascollaborators_InputGroup">
                        <label>Position/Title:</label>
                        <input
                          type="text"
                          name="position"
                          value={sectoralCollaboratorsDetail.position}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                    </div>

                    <div className="ascollaborators_two-inputs">
                      <div className="ascollaborators_InputGroup">
                        <label>Tel. #:</label>
                        <input
                          type="text"
                          name="tellno"
                          value={sectoralCollaboratorsDetail.tellno}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                      <div className="ascollaborators_InputGroup">
                        <label>Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={sectoralCollaboratorsDetail.email}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                    </div>
                    <div className="ascollaborators_InputGroup">
                        <label>Anticipated Contribution to Project Goals:</label>
                        <input
                          type="text"
                          name="ProjectGoalsAnticipatedContribution"
                          value={sectoralCollaboratorsDetail.ProjectGoalsAnticipatedContribution}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                      <div className="ascollaborators_InputGroup">
                        <label>Anticipated Annual Financial Contribution:</label>
                        <input
                          type="text"
                          name="AnnualFinancialContribution"
                          value={sectoralCollaboratorsDetail.AnnualFinancialContribution}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                  </div>
                )
              )}
            

            <div className="ascollaborators_btn">
              <button className="ascollaborators_button">SAVE</button>
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
