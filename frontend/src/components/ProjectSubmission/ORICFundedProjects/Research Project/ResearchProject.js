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


const ResearchProject = ({ formData, handleInputChange, handleSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [ResearchProject, setResearchProject] = useState({
    projectTitle: formData?.researchProject?.projectTitle || "",
    natureOfProposedResearch:
      formData?.researchProject?.natureOfProposedResearch || [],
    domainOfProposedResearch:
      formData?.researchProject?.domainOfProposedResearch || [],
    shortSummary: formData?.researchProject?.shortSummary || "",
    objectives: formData?.researchProject?.objectives || [
      { description: "", measurableOutput: "", benefits: "" },
      { description: "", measurableOutput: "", benefits: "" },
      { description: "", measurableOutput: "", benefits: "" },
    ],
    // year: formData?.researchProject?.year || "",
    projectDuration: formData?.researchProject?.projectDuration || "",
    fundsRequested: formData?.researchProject?.fundsRequested || "",
    summary: formData?.researchProject?.summary || "",
    background: formData?.researchProject?.summary || "",
    socioEconomicBenefit: formData?.researchProject?.socioEconomicBenefit || "",
    methodology: formData?.researchProject?.methodology || "",
    durations: formData?.researchProject?.durations || [
      { activities: "" },
      { activities: "" },
      { activities: "" },
      { activities: "" },
    ],
    priorExperience: formData?.researchProject?.priorExperience || "",
  });

  console.log(ResearchProject);

  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    setResearchProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));


    if (handleInputChange) {
      handleInputChange(e); 
    } else {
      console.error("handleInputChange is not a function");
    }
  };



  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setResearchProject((prevState) => {
      let updatedArray = [...prevState[name]];
      if (checked) {
        updatedArray.push(value);
      } else {
        updatedArray = updatedArray.filter((item) => item !== value);
      }
      return {
        ...prevState,
        [name]: updatedArray,
      };
    });
  };


  const handleObjectiveChange = (index, field, value) => {
    setResearchProject((prevState) => {
      const updatedObjectives = [...prevState.objectives];
      updatedObjectives[index] = {
        ...updatedObjectives[index],
        [field]: value,
      };
      return {
        ...prevState,
        objectives: updatedObjectives,
      };
    });
  };



  const handleDurationChange = (index, value) => {
    setResearchProject((prevState) => {
      const updatedDurations = [...prevState.durations];
      updatedDurations[index] = {
        ...updatedDurations[index],
        activities: value,
      };
      return {
        ...prevState,
        durations: updatedDurations,
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
              <Breadcrumb items={breadCrumps}/>
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
                  onChange={handleLocalChange}
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
                  ].map((item, index) => (
                    <div className="checkbox-item" key={index}>
                      <label>
                        <input
                          type="checkbox"
                          name="natureOfProposedResearch"
                          value={item}
                          // checked={formData.natureOfResearch.includes(item)}
                          checked={ResearchProject.natureOfProposedResearch.includes(item)}
                          onChange={handleCheckboxChange}
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
                ].map((domain, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="checkbox"
                        name="domainOfProposedResearch"
                        value={domain}
                        // checked={formData.domainOfResearch.includes(domain)}
                        checked={ResearchProject.domainOfProposedResearch.includes(domain)}
                        onChange={handleCheckboxChange}
                      />
                      {index + 1}. {domain}
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
                onChange={handleLocalChange}
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
                  value={ResearchProject.projectDuration}
                  onChange={handleLocalChange}
                  // onChange={handleInputChange}
                />
              </div>
              <div className="InputGroup">
                <label>Total funds requested (Rs):</label>
                <input
                  type="text"
                  name="fundsRequested"
                  value={ResearchProject.fundsRequested}
                  onChange={handleLocalChange}
                />
              </div>
            </div>

            <div className="researchproject_textarea">
              <label htmlFor="summary">Summary / Abstract:</label>
              <textarea
                id="summary"
                name="summary"
                rows="2"
                cols="20"
                value={ResearchProject.summary}
                onChange={handleLocalChange}
              />
            </div>

            <div className="researchproject_textarea">
              <label htmlFor="background">
                Background of The Problem to be Addressed:
              </label>
              <textarea
                id="background"
                name="background"
                rows="2"
                cols="20"
                value={ResearchProject.background}
                onChange={handleLocalChange}
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
                onChange={handleLocalChange}
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
                onChange={handleLocalChange}
              />
            </div>

            <h4 className="researchproject_mainheading">Schedule/ Phasing</h4>
            {ResearchProject.durations.map((duration, index) => {
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
                      value={ResearchProject.durations.activities}
                      onChange={(e) =>
                        handleDurationChange(index, e.target.value)
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
                onChange={handleLocalChange}
              />
            </div>

            <div className="researchproject_btn">
              <button className="researchproject_button" onClick={handleSubmit}>SAVE</button>
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










