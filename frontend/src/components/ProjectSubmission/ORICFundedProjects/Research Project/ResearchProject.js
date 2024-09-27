import React, { useState } from "react";
import "./researchproject.css";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import { createOricFunded } from "../../../../api/Api";

const ResearchProject = ({ onSave }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [ResearchProject, setResearchProject] = useState({
    projectTitle: "",
    natureOfProposedResearch: [],
    domainOfProposedResearch: [],
    shortSummary: "",
    projectDuration: {
      year: "",
      totalFundsRequested: "",
      summaryAbstract: "",
      backgroundoftheProblem: "",
    },
    objectives: Array(3).fill({
      description: "",
      measurableOutput: "",
      benefits: "",
    }),
    expectedSocioBenefit: "",
    methodology: "",
    schedulephasing: Array(3).fill({
      activities: "",
    }),
    priorExperience: "",
  });

  const handleChange = (e) => {
    // const { name, value, dataset } = e.target;
    const { name, value: originalValue, dataset } = e.target;
    const section = dataset.section;

    let value = originalValue;

    if (
      name === "year" ||
      name === "totalFundsRequested"
    ) {
      value = value.replace(/[^0-9.]/g, ''); 
    }


    if (section === "projectDuration") {
      setResearchProject((prevState) => ({
        ...prevState,
        projectDuration: {
          ...prevState.projectDuration,
          [name]: value,
        },
      }));
    } else if (section === "objectives") {
      setResearchProject((prevState) => ({
        ...prevState,
        objectives: {
          ...prevState.objectives,
          [name]: value,
        },
      }));
    } else {
      setResearchProject((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle checkbox changes for array-based fields
  // Handle checkbox changes for multi-select fields
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    setResearchProject((prevState) => ({
      ...prevState,
      [name]: checked
        ? [...prevState[name], value] // Add value if checked
        : prevState[name].filter((item) => item !== value), // Remove value if unchecked
    }));
  };

  // Handle changes in objectives
  const handleObjectiveChange = (index, field, value) => {
    setResearchProject((prevState) => {
      const updatedObjectives = [...prevState.objectives];
      updatedObjectives[index][field] = value;
      return { ...prevState, objectives: updatedObjectives };
    });
  };

  // Handle changes in project duration activities
  const handleDurationChange = (index, value) => {
    setResearchProject((prevState) => {
      const updatedSchedule = [...prevState.schedulephasing]; // Make a copy of the existing array
      updatedSchedule[index] = { activities: value }; // Update the activities of the specific index
      return {
        ...prevState,
        schedulephasing: updatedSchedule, // Return the updated array
      };
    });
  };

  const handleSave = () => {
    console.log("ResearchProject:", ResearchProject);

    const isEmpty = (value) => value === "" || value === null || value === undefined;

    if (
      isEmpty(ResearchProject.projectTitle) ||
      ResearchProject.natureOfProposedResearch.length === 0 ||
      ResearchProject.domainOfProposedResearch.length === 0 ||
      isEmpty(ResearchProject.shortSummary) ||
      isEmpty(ResearchProject.projectDuration.year) ||
      isEmpty(ResearchProject.projectDuration.totalFundsRequested) ||
      isEmpty(ResearchProject.projectDuration.summaryAbstract) ||
      isEmpty(ResearchProject.projectDuration.backgroundoftheProblem) ||
      ResearchProject.objectives.some(
        (objective) =>
          isEmpty(objective.description) ||
          isEmpty(objective.measurableOutput) ||
          isEmpty(objective.benefits)
      ) ||
      isEmpty(ResearchProject.expectedSocioBenefit) ||
      isEmpty(ResearchProject.methodology) ||
      ResearchProject.schedulephasing.some((schedule) => isEmpty(schedule.activities)) ||
      isEmpty(ResearchProject.priorExperience)
    ) {
      console.error("Please fill in all the required fields.");
      toast.error("Please fill in all the required fields.");
      return; 
    }


    if (typeof onSave === "function") {
      onSave(ResearchProject); // This will trigger the parent's handleSaveAndNext
    } else {
      console.error("onSave is not a function");
    }
  };


  



  const breadCrumps = [
    {
      label: "Proposal Cover",
      // path: "/add-oric-funded-projects",
      // path: "/add-international/national-grants",
    },
    {
      label: "Research Project",
      // path: "/oric-funded-project-research-project",
    },
    {
      label: "Facilities and Funding",
      // path: "/oric-funded-project-facilities-and-funding",
    },
    {
      label: "Justification for The Requested Budget Items",
      // path: "/oric-funded-project-justification-and-budget-items",
    },
    {
      label: "Estimated Budget for Proposed Research Period",
      // path: "/oric-funded-project-estimated-budget-proposed-research-period",
    },
  ];

  return (
    <>
      <div className="researchproject-container">
        <Sidebar />
        <div className="researchproject">
          <div className="researchproject_navbar-div">
            <NavBar />
          </div>
          <div className="researchproject-card">
            <h5>ORIC Funded Project | Research Project</h5>
            <p>Proposal Cover / Research Project / Facilities and Funding / Justification for The Requested Budget Items / Estimated Budget for Proposed Research Period</p>
            {/* <div className="researchproject-bredcrumb"> */}
              {/* <Breadcrumb items={breadCrumps} /> */}
              {/* <Breadcrumb items={breadCrumps} activePath={currentPath} /> */}
            {/* </div> */}

            <div className="researchproject_multiInputFields">
              <div className="researchproject_title-input">
                <label>Project title:</label>
                <input
                  type="text"
                  name="projectTitle"
                  // value={formData.projectTitle}
                  value={ResearchProject.projectTitle}
                  // onChange={handleInputChange}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="multiCheckBoxes">
                <h6>Nature of Proposed Research</h6>
                <div className="domain_research_checkbox">
                  {[
                    "Basic",
                    "Applied",
                    "Community",
                    "Commercialized",
                    "Thematic Research",
                  ].map((item) => (
                    <div className="checkbox-item" key={item}>
                      <label>
                        <input
                          type="checkbox"
                          name="natureOfProposedResearch"
                          value={item}
                          // checked={formData.natureOfResearch.includes(item)}
                          checked={ResearchProject.natureOfProposedResearch.includes(
                            item
                          )}
                          onChange={handleCheckboxChange}
                          required
                        />
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <h6 className="research_project_domain">
                Domain of Proposed Research
              </h6>
              <div className="domain_research_checkbox">
                {[
                  "Arts and Humanities",
                  "Economic & Social Research",
                  "Business Administration",
                  "Pharmacy",
                  "Life Sciences",
                  "Natural & Environment sciences",
                  "Information and Communication Technology",
                ].map((domain) => (
                  <div key={domain}>
                    <label>
                      <input
                        type="checkbox"
                        name="domainOfProposedResearch"
                        value={domain}
                        // checked={formData.domainOfResearch.includes(domain)}
                        checked={ResearchProject.domainOfProposedResearch.includes(
                          domain
                        )}
                        onChange={handleCheckboxChange}
                        required
                      />
                      {domain}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="researchproject_textarea">
              <label htmlFor="shortSummary">
                Short summary of the project:
              </label>
              <textarea
                id="shortSummary"
                name="shortSummary"
                rows="2"
                cols="20"
                // value={formData.shortSummary}
                value={ResearchProject.shortSummary}
                onChange={handleChange}
                required
                // onChange={handleInputChange}
              />
            </div>

            <h6 className="research_project_duration">Project duration:</h6>
            <div className="two-inputs">
              <div className="InputGroup">
                <label>Year:</label>
                <input
                  type="text"
                  name="year"
                  data-section="projectDuration"
                  placeholder="e.g: 2017"
                  value={ResearchProject.projectDuration.year}
                  onChange={handleChange}
                  required
                  // onChange={handleInputChange}
                />
              </div>
              <div className="InputGroup">
                <label>Total funds requested (Rs):</label>
                <input
                  type="text"
                  name="totalFundsRequested"
                  data-section="projectDuration"
                  value={ResearchProject.projectDuration.totalFundsRequested}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="researchproject_textarea">
              <label htmlFor="summary">Summary / Abstract:</label>
              <textarea
                id="summary"
                name="summaryAbstract"
                data-section="projectDuration"
                rows="2"
                cols="20"
                value={ResearchProject.projectDuration.summaryAbstract}
                onChange={handleChange}
                required
              />
            </div>

            <div className="researchproject_textarea">
              <label htmlFor="background">
                Background of The Problem to be Addressed:
              </label>
              <textarea
                id="background"
                name="backgroundoftheProblem"
                data-section="projectDuration"
                rows="2"
                cols="20"
                value={ResearchProject.projectDuration.backgroundoftheProblem}
                onChange={handleChange}
                required
              />
            </div>

            <h4 className="researchproject_mainheading">
              Objectives with Expected Outputs
            </h4>
            {ResearchProject.objectives.map((objective, index) => (
              <div key={index}>
                <h6 className="researchproject_subheading">
                  {index + 1}. Objective
                </h6>
                <div className="title-input">
                  <label>Description:</label>
                  <input
                    type="text"
                    value={ResearchProject.objectives.description}
                    onChange={(e) =>
                      handleObjectiveChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                <div className="two-inputs">
                  <div className="InputGroup">
                    <label>Measurable Output / Expected Results:</label>
                    <input
                      type="text"
                      value={ResearchProject.objectives.measurableOutput}
                      onChange={(e) =>
                        handleObjectiveChange(
                          index,
                          "measurableOutput",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <div className="InputGroup">
                    <label>Benefits:</label>
                    <input
                      type="text"
                      value={ResearchProject.objectives.benefits}
                      onChange={(e) =>
                        handleObjectiveChange(index, "benefits", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <h4 className="researchproject_mainheading">
              Expected Socio-Economic Benefit
            </h4>
            <div className="researchproject_textarea">
              <label htmlFor="socioEconomicBenefit">
                Socio-Economic Benefit of The Proposed Research:
              </label>
              <textarea
                id="socioEconomicBenefit"
                // name="socioEconomicBenefit"
                name="expectedSocioBenefit"
                rows="2"
                cols="20"
                value={ResearchProject.expectedSocioBenefit}
                // value={ResearchProject.socioEconomicBenefit}
                onChange={handleChange}
                required
              />
            </div>

            <h4 className="researchproject_mainheading">Methodology:</h4>
            <div className="researchproject_textarea">
              <label htmlFor="methodology">Methodology:</label>
              <textarea
                id="methodology"
                name="methodology"
                rows="2"
                cols="20"
                value={ResearchProject.methodology}
                onChange={handleChange}
                required
              />
            </div>

            {/* <h4 className="researchproject_mainheading">Schedule/ Phasing</h4>
            {ResearchProject.schedulephasing && ResearchProject.schedulephasing.map((Schedule, index) => {
              const quarterLabel = `${
                index + 1 === 1
                  ? "1st"
                  : index + 1 === 2
                  ? "2nd"
                  : index + 1 === 3
                  ? "3rd"
                  : index + 1 === 4
                  ? "4th"
                  : `${index + 1}th`
              } Quarter`;

              return (
                <div key={index}>
                  <h6 className="researchproject_subheading">
                    {index + 1}. Duration/ Time period {quarterLabel}
                  </h6>
                  <div className="title-input">
                    <label>Activities:</label>
                    <input
                      type="text"
                      value={Schedule.activities}
                      onChange={(e) =>
                        handleDurationChange(index, e.target.value)
                      }
                    />
                  </div>
                </div>
              );
            })} */}

            <h4 className="researchproject_mainheading">Schedule/ Phasing</h4>
            {ResearchProject.schedulephasing &&
              ResearchProject.schedulephasing.map((Schedule, index) => {
                const quarterLabel = `${
                  index + 1 === 1
                    ? "1st"
                    : index + 1 === 2
                    ? "2nd"
                    : index + 1 === 3
                    ? "3rd"
                    : index + 1 === 4
                    ? "4th"
                    : `${index + 1}th`
                } Quarter`;

                return (
                  <div key={index}>
                    <h6 className="researchproject_subheading">
                      {index + 1}. Duration/ Time period {quarterLabel}
                    </h6>
                    <div className="title-input">
                      <label>Activities:</label>
                      <input
                        type="text"
                        value={Schedule.activities} // Access activities from the Schedule item
                        onChange={
                          (e) => handleDurationChange(index, e.target.value) // Pass the correct index and value
                        }
                        required
                      />
                    </div>
                  </div>
                );
              })}

            <div className="researchproject_textarea">
              <h4 className="researchproject_mainheading">
                Researcher’s Prior Experience in Relation to Current Project
              </h4>
              <label htmlFor="priorExperience">
                Researcher’s Prior Experience in Relation to Current Project
                Details:
              </label>
              <textarea
                id="priorExperience"
                name="priorExperience"
                rows="2"
                cols="20"
                value={ResearchProject.priorExperience}
                onChange={handleChange}
                required
              />
            </div>

            <div className="researchproject_btn">
              <button className="researchproject_button" onClick={handleSave}>
                SAVE
              </button>
            </div>
          </div>
          <div className="researchproject_juw-copyright">
            <p>© 2024, all rights reserved by Jinnah University for Women.</p>
          </div>
      </div>
      </div>
    </>
  );
};

export default ResearchProject;
