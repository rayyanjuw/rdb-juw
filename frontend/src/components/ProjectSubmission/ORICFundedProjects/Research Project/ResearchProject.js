// original code : without integrated
// import React, { useState } from "react";
// import "./researchproject.css";
// import Sidebar from "../../../Sidebar/Sidebar";
// import NavBar from "../../../shared-components/navbar/NavBar";
// import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";
// import { useLocation } from "react-router-dom";

// const ResearchProject = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [formData, setFormData] = useState({
//     projectTitle: "",
//     natureOfResearch: [],
//     domainOfResearch: [],
//     shortSummary: "",
//     year: "",
//     fundsRequested: "",
//     summary: "",
//     background: "",
//     objectives: [
//       { description: "", expectedResults: "", benefits: "" },
//       { description: "", expectedResults: "", benefits: "" },
//       { description: "", expectedResults: "", benefits: "" },
//     ],
//     socioEconomicBenefit: "",
//     methodology: "",
//     durations: [
//       { activities: "" },
//       { activities: "" },
//       { activities: "" },
//       { activities: "" },
//     ],
//     priorExperience: "",
//   });

//   console.log(formData);

//   // Handler to update state for inputs
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handler to update checkboxes
//   const handleCheckboxChange = (e) => {
//     const { name, value, checked } = e.target;
//     setFormData((prevData) => {
//       let updatedArray = [...prevData[name]];
//       if (checked) {
//         updatedArray.push(value);
//       } else {
//         updatedArray = updatedArray.filter((item) => item !== value);
//       }
//       return {
//         ...prevData,
//         [name]: updatedArray,
//       };
//     });
//   };

//   // Handler for objectives input change
//   const handleObjectiveChange = (index, field, value) => {
//     setFormData((prevData) => {
//       const updatedObjectives = [...prevData.objectives];
//       updatedObjectives[index] = {
//         ...updatedObjectives[index],
//         [field]: value,
//       };
//       return {
//         ...prevData,
//         objectives: updatedObjectives,
//       };
//     });
//   };

//   // Handler for durations input change
//   const handleDurationChange = (index, value) => {
//     setFormData((prevData) => {
//       const updatedDurations = [...prevData.durations];
//       updatedDurations[index] = {
//         ...updatedDurations[index],
//         activities: value,
//       };
//       return {
//         ...prevData,
//         durations: updatedDurations,
//       };
//     });
//   };

//   const breadCrumps = [
//     {
//       label: "Proposal Cover",
//       path: "/add-oric-funded-projects",
//       // path: "/add-international/national-grants",
//     },
//     {
//       label: "Research Project",
//       path: "/oric-funded-project-research-project",
//     },
//     {
//       label: "Facilities and Funding",
//       path: "/oric-funded-project-facilities-and-funding",
//     },
//     {
//       label: "Justification for The Requested Budget Items",
//       path: "/oric-funded-project-justification-and-budget-items",
//     },
//     {
//       label: "Estimated Budget for Proposed Research Period",
//       path: "/oric-funded-project-estimated-budget-proposed-research-period",
//     },
//   ];

//   return (
//     <>
//       <div className="researchproject-container">
//         <Sidebar />
//         <div className="researchproject">
//           <div className="researchproject_navbar-div">
//             <NavBar />
//           </div>
//           <div className="researchproject-card">
//             <h5>ORIC Funded Project | Research Project</h5>

//             <div className="researchproject-bredcrumb">
//               <Breadcrumb items={breadCrumps} activePath={currentPath} />
//             </div>

//             <div className="researchproject_multiInputFields">
//               <div className="researchproject_title-input">
//                 <label>Project title:</label>
//                 <input
//                   type="text"
//                   name="projectTitle"
//                   value={formData.projectTitle}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="multiCheckBoxes">
//                 <h6>Nature of Proposed Research</h6>
//                 <div className="domain_research_checkbox">
//                   {[
//                     "Basic",
//                     "Applied",
//                     "Community",
//                     "Commercialized",
//                     "Thematic Research",
//                   ].map((item, index) => (
//                     <div className="checkbox-item" key={index}>
//                       <label>
//                         <input
//                           type="checkbox"
//                           name="natureOfResearch"
//                           value={item}
//                           checked={formData.natureOfResearch.includes(item)}
//                           onChange={handleCheckboxChange}
//                         />
//                         {item}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Domain of Proposed Research checkboxes */}
//               <h6 className="research_project_domain">
//                 Domain of Proposed Research
//               </h6>
//               <div className="domain_research_checkbox">
//                 {[
//                   "Arts and Humanities",
//                   "Economic & Social Research",
//                   "Business Administration",
//                   "Pharmacy",
//                   "Life Sciences",
//                   "Natural & Environment sciences",
//                   "Information and Communication Technology",
//                 ].map((domain, index) => (
//                   <div key={index}>
//                     <label>
//                       <input
//                         type="checkbox"
//                         name="domainOfResearch"
//                         value={domain}
//                         checked={formData.domainOfResearch.includes(domain)}
//                         onChange={handleCheckboxChange}
//                       />
//                       {index + 1}. {domain}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="researchproject_textarea">
//               <label htmlFor="shortSummary">
//                 Short summary of the project:
//               </label>
//               <textarea
//                 id="shortSummary"
//                 name="shortSummary"
//                 rows="2"
//                 cols="20"
//                 value={formData.shortSummary}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <h6 className="research_project_duration">Project duration:</h6>
//             <div className="two-inputs">
//               <div className="InputGroup">
//                 <label>Year:</label>
//                 <input
//                   type="text"
//                   name="year"
//                   value={formData.year}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="InputGroup">
//                 <label>Total funds requested (Rs):</label>
//                 <input
//                   type="text"
//                   name="fundsRequested"
//                   value={formData.fundsRequested}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>

//             <div className="researchproject_textarea">
//               <label htmlFor="summary">Summary / Abstract:</label>
//               <textarea
//                 id="summary"
//                 name="summary"
//                 rows="2"
//                 cols="20"
//                 value={formData.summary}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="researchproject_textarea">
//               <label htmlFor="background">
//                 Background of The Problem to be Addressed:
//               </label>
//               <textarea
//                 id="background"
//                 name="background"
//                 rows="2"
//                 cols="20"
//                 value={formData.background}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <h4 className="researchproject_mainheading">
//               Objectives with Expected Outputs
//             </h4>
//             {formData.objectives.map((objective, index) => (
//               <div key={index}>
//                 <h6 className="researchproject_subheading">
//                   {index + 1}. Objective
//                 </h6>
//                 <div className="title-input">
//                   <label>Description:</label>
//                   <input
//                     type="text"
//                     value={objective.description}
//                     onChange={(e) =>
//                       handleObjectiveChange(
//                         index,
//                         "description",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </div>
//                 <div className="two-inputs">
//                   <div className="InputGroup">
//                     <label>Measurable Output / Expected Results:</label>
//                     <input
//                       type="text"
//                       value={objective.expectedResults}
//                       onChange={(e) =>
//                         handleObjectiveChange(
//                           index,
//                           "expectedResults",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </div>
//                   <div className="InputGroup">
//                     <label>Benefits:</label>
//                     <input
//                       type="text"
//                       value={objective.benefits}
//                       onChange={(e) =>
//                         handleObjectiveChange(index, "benefits", e.target.value)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="researchproject_textarea">
//               <label htmlFor="socioEconomicBenefit">
//                 Socio-Economic Benefit of The Proposed Research:
//               </label>
//               <textarea
//                 id="socioEconomicBenefit"
//                 name="socioEconomicBenefit"
//                 rows="2"
//                 cols="20"
//                 value={formData.socioEconomicBenefit}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="researchproject_textarea">
//               <label htmlFor="methodology">Methodology:</label>
//               <textarea
//                 id="methodology"
//                 name="methodology"
//                 rows="2"
//                 cols="20"
//                 value={formData.methodology}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <h4 className="researchproject_mainheading">Project Duration</h4>
//             {formData.durations.map((duration, index) => (
//               <div key={index}>
//                 <div className="title-input">
//                   <label>Duration {index + 1} Activities:</label>
//                   <input
//                     type="text"
//                     value={duration.activities}
//                     onChange={(e) =>
//                       handleDurationChange(index, e.target.value)
//                     }
//                   />
//                 </div>
//               </div>
//             ))}

//             <div className="researchproject_textarea">
//               <label htmlFor="priorExperience">Prior Experience:</label>
//               <textarea
//                 id="priorExperience"
//                 name="priorExperience"
//                 rows="2"
//                 cols="20"
//                 value={formData.priorExperience}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="researchproject_btn">
//               <button className="researchproject_button">SAVE</button>
//             </div>
//           </div>

//           <div className="juw-copyright">
//             <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResearchProject;

import React, { useState } from "react";
import "./researchproject.css";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";
import { useLocation, useNavigate } from "react-router-dom";

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
    objectives: [
      {
        description: "",
        measurableOutput: "",
        benefits: "",
      },
    ],
    expectedSocioBenefit: "",
    methodology: "",
    schedulephasing: Array(3).fill({
      activities: "",
    }),
    priorExperience: "",
  });

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const section = dataset.section;

    if (section === "projectDuration") {
      setResearchProject((prevState) => ({
        ...prevState,
        projectDuration: {
          ...prevState.principalInvestigator,
          [name]: value,
        },
      }));
    } else if (section === "objectives") {
      setResearchProject((prevState) => ({
        ...prevState,
        objectives: {
          ...prevState.facultyDetails,
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
  

  // const handleSubmit = async () => {
  //   try {
  //     const researchProjectData = {
  //         projectTitle: ResearchProject.projectTitle,
  //         natureOfProposedResearch:
  //         ResearchProject.natureOfProposedResearch,
  //         domainOfProposedResearch:
  //         ResearchProject.domainOfProposedResearch,
  //         shortSummary: ResearchProject.shortSummary,
  //         objectives: ResearchProject.objectives,
  //         year: ResearchProject.year,
  //         fundsRequested: ResearchProject.fundsRequested,
  //         summary: ResearchProject.summary,
  //         background: ResearchProject.summary,
  //         socioEconomicBenefit: ResearchProject.socioEconomicBenefit,
  //         methodology: ResearchProject.methodology,
  //         durations: ResearchProject.durations,
  //         priorExperience: ResearchProject.priorExperience,
  //       };

  //     // Call the API function
  //     const createdResearchProject = await createOricFunded(researchProjectData);
  //     navigate("/oric-funded-project-facilities-and-funding")
  //     // Handle success (e.g., display a success message or navigate to another page)
  //     console.log('Research Project created successfully:', createdResearchProject);
  //     alert('Research Project created successfully!');
  //   } catch (error) {
  //     // Handle error (e.g., display an error message)
  //     console.error('Failed to create Research Project:', error);
  //     alert('Error creating Research Project.');
  //   }
  // };

  const handleSave = () => {
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

            <div className="researchproject-bredcrumb">
              <Breadcrumb items={breadCrumps} />
              {/* <Breadcrumb items={breadCrumps} activePath={currentPath} /> */}
            </div>

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
                        />
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="multiCheckBoxes">
  <h6>Nature of Proposed Research</h6>
  {["Basic", "Applied", "Community", "Commercialized", "Thematic Research"].map((item) => (
    <label key={item}>
      <input
        type="checkbox"
        name="natureOfProposedResearch" // This should match the state key
        value={item}
        checked={ResearchProject.natureOfProposedResearch.includes(item)} // Check if item is included
        onChange={handleCheckboxChange} // Use the updated handler
      />
      {item}
    </label>
  ))}
</div> */}

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
                // onChange={handleInputChange}
              />
            </div>

            <h6 className="research_project_duration">Project duration:</h6>
            <div className="two-inputs">
              <div className="InputGroup">
                <label>Year:</label>
                <input
                  type="text"
                  name="projectDuration"
                  // value={formData.year}
                  value={ResearchProject.projectDuration.year}
                  onChange={handleChange}
                  // onChange={handleInputChange}
                />
              </div>
              <div className="InputGroup">
                <label>Total funds requested (Rs):</label>
                <input
                  type="text"
                  name="totalFundsRequested"
                  value={ResearchProject.projectDuration.totalFundsRequested}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="researchproject_textarea">
              <label htmlFor="summary">Summary / Abstract:</label>
              <textarea
                id="summary"
                name="summaryAbstract"
                rows="2"
                cols="20"
                value={ResearchProject.projectDuration.summaryAbstract}
                onChange={handleChange}
              />
            </div>

            <div className="researchproject_textarea">
              <label htmlFor="background">
                Background of The Problem to be Addressed:
              </label>
              <textarea
                id="background"
                name="backgroundoftheProblem"
                rows="2"
                cols="20"
                value={ResearchProject.projectDuration.backgroundoftheProblem}
                onChange={handleChange}
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
                name="socioEconomicBenefit"
                rows="2"
                cols="20"
                value={ResearchProject.socioEconomicBenefit}
                onChange={handleChange}
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
              />
            </div>

            <div className="researchproject_btn">
              <button className="researchproject_button" onClick={handleSave}>
                SAVE
              </button>
            </div>
          </div>

          <div className="juw-copyright">
            <p>© 2024, all rights reserved by Jinnah University for Women.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResearchProject;
