// import React, { useState } from "react";
// import "./researchproject.css";
// import Sidebar from "../../../Sidebar/Sidebar";
// import NavBar from "../../../shared-components/navbar/NavBar";

// const ResearchProject = () => {
//   // const [title, setTitle] = useState("")
//   //   const [researchproject, setResearchProject] = useState({
//   //     title: "",
//   //     NatureofProposedResearch: "",
//   //     DomainofProposedResearch: "",
//   //     ShortsummaryoftheProject: "",
//   //   });

//   const SchedulePhasing = () => ({
//     Activities: "",
//   });

//   const [duration1, setDuration1] = useState(SchedulePhasing());
//   const [duration2, setDuration2] = useState(SchedulePhasing());
//   const [duration3, setDuration3] = useState(SchedulePhasing());
//   const [duration4, setDuration4] = useState(SchedulePhasing());

//   const durations = [
//     { state: duration1, setState: setDuration1 },
//     { state: duration2, setState: setDuration2 },
//     { state: duration3, setState: setDuration3 },
//     { state: duration4, setState: setDuration4 },
//   ];

//   const title = [
//     "Duration/ Time period 1st Quarter",
//     "Duration/ Time period 2nd Quarter",
//     "Duration/ Time period 3rd Quarter",
//     "Duration/ Time period 4th Quarter",
//   ];

//   console.log(durations);

//   return (
//     <div className="researchproject-container">
//       <Sidebar />
//       <div className="researchproject">
//         {/* <div className="navbar-div">
//           <NavBar />
//         </div> */}
//         <div className="researchproject_navbar-div">
//           <NavBar />
//         </div>
//         <div className="researchproject-card">
//           <h5>International/National Grants | Research Project</h5>
//           <p>
//             Proposal Cover / Research Project / Facilities and Funding /
//             Justification for The Requested Budget Items / Estimated Budget for
//             Proposed Research Period
//           </p>
//           <div className="researchproject_multiInputFields">
//             <div className="title-input">
//               <label>Project title:</label>
//               <input
//                 // value={proposalCover.ProposalReferenceNo}
//                 type="text"
//                 name="ProposalReferenceNo"
//                 data-section="proposalCover"
//                 // onChange={handleTextChange}
//               />
//             </div>
//             <div className="multiCheckBoxes">
//               <h6>Nature of Proposed Research</h6>
//               <div className="theme_research_checkbox">
//                 <div>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="ThemeofProposedResearch"
//                       value="Basic"
//                       //   checked={proposalCover.ThemeofProposedResearch.includes(
//                       //     "Basic"
//                       //   )}
//                       data-section="proposalCover"
//                       //   onChange={handleCheckboxChange}
//                     />
//                     1. Basic
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="ThemeofProposedResearch"
//                       value="Applied"
//                       //   checked={proposalCover.ThemeofProposedResearch.includes(
//                       //     "Applied"
//                       //   )}
//                       data-section="proposalCover"
//                       //   onChange={handleCheckboxChange}
//                     />
//                     2. Applied
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="ThemeofProposedResearch"
//                       value="Applied"
//                       //   checked={proposalCover.ThemeofProposedResearch.includes(
//                       //     "Applied"
//                       //   )}
//                       data-section="proposalCover"
//                       //   onChange={handleCheckboxChange}
//                     />
//                     3. Community
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="ThemeofProposedResearch"
//                       value="Applied"
//                       //   checked={proposalCover.ThemeofProposedResearch.includes(
//                       //     "Applied"
//                       //   )}
//                       data-section="proposalCover"
//                       //   onChange={handleCheckboxChange}
//                     />
//                     4. Commercialized
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="ThemeofProposedResearch"
//                       value="Applied"
//                       //   checked={proposalCover.ThemeofProposedResearch.includes(
//                       //     "Applied"
//                       //   )}
//                       data-section="proposalCover"
//                       //   onChange={handleCheckboxChange}
//                     />
//                     5. Thematic Research
//                   </label>
//                 </div>
//               </div>

//               <div className="theme_research_checkbox">
//                 <div>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="ThemeofProposedResearch"
//                       value="Basic"
//                       //   checked={proposalCover.ThemeofProposedResearch.includes(
//                       //     "Basic"
//                       //   )}
//                       data-section="proposalCover"
//                       //   onChange={handleCheckboxChange}
//                     />
//                     1. Arts and Humanities
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="ThemeofProposedResearch"
//                       value="Applied"
//                       //   checked={proposalCover.ThemeofProposedResearch.includes(
//                       //     "Applied"
//                       //   )}
//                       data-section="proposalCover"
//                       //   onChange={handleCheckboxChange}
//                     />
//                     2. Economic & Social Research
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="ThemeofProposedResearch"
//                       value="Applied"
//                       //   checked={proposalCover.ThemeofProposedResearch.includes(
//                       //     "Applied"
//                       //   )}
//                       data-section="proposalCover"
//                       //   onChange={handleCheckboxChange}
//                     />
//                     3. Business Administration
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="ThemeofProposedResearch"
//                       value="Applied"
//                       //   checked={proposalCover.ThemeofProposedResearch.includes(
//                       //     "Applied"
//                       //   )}
//                       data-section="proposalCover"
//                       //   onChange={handleCheckboxChange}
//                     />
//                     4. Pharmacy
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="ThemeofProposedResearch"
//                       value="Applied"
//                       //   checked={proposalCover.ThemeofProposedResearch.includes(
//                       //     "Applied"
//                       //   )}
//                       data-section="proposalCover"
//                       //   onChange={handleCheckboxChange}
//                     />
//                     5. Life Sciences
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="ThemeofProposedResearch"
//                       value="Applied"
//                       //   checked={proposalCover.ThemeofProposedResearch.includes(
//                       //     "Applied"
//                       //   )}
//                       data-section="proposalCover"
//                       //   onChange={handleCheckboxChange}
//                     />
//                     6. Natural & Environment sciences
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="ThemeofProposedResearch"
//                       value="Applied"
//                       //   checked={proposalCover.ThemeofProposedResearch.includes(
//                       //     "Applied"
//                       //   )}
//                       data-section="proposalCover"
//                       //   onChange={handleCheckboxChange}
//                     />
//                     7. Information and Communication Technology
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="InputGroup">
//               {/* <label>Field of The Invention:</label> */}
//               <textarea
//                 rows="3"
//                 //   value={addintellectualproperty.fieldofinvention}
//                 //   placeholder="(Not more than 50 words. Either it should describe your method of production or process or combination of both)"
//                 name="fieldofinvention"
//                 //   onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="two-inputs">
//               <div className="InputGroup">
//                 <label>Year:</label>
//                 <input
//                   type="text"
//                   // value={addintellectualproperty.OwnerIp}
//                   name="OwnerIp"
//                   // onChange={handleChange}
//                 />
//               </div>
//               <div className="InputGroup">
//                 <label>Total funds requested (Rs) :</label>
//                 <input
//                   type="text"
//                   // value={addintellectualproperty.address}
//                   name="address"
//                   // onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="textarea">
//               <label htmlFor="exampleTextarea">Summary / Abstract:</label>
//               <textarea
//                 id="exampleTextarea"
//                 // value={text}
//                 // onChange={handleChange}
//                 rows="2"
//                 cols="20"
//               />
//             </div>
//             <div className="textarea">
//               <label htmlFor="exampleTextarea">
//                 Background of The Problem to be Addressed:
//               </label>
//               <textarea
//                 id="exampleTextarea"
//                 // value={text}
//                 // onChange={handleChange}
//                 rows="2"
//                 cols="20"
//               />
//             </div>

//             {/* addintellectualproperty */}
//             <h6 className="edit_honorandaward_subheading">1. Objective</h6>
//             <div className="title-input">
//               <label>description:</label>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 //   value={addintellectualproperty.title}
//                 name="title"
//                 //   onChange={handleChange}
//               />
//             </div>

//             <div className="two-inputs">
//               <div className="InputGroup">
//                 <label>Measurable Output / Expected Results:</label>
//                 <input
//                   type="text"
//                   // value={addintellectualproperty.OwnerIp}
//                   name="OwnerIp"
//                   // onChange={handleChange}
//                 />
//               </div>
//               <div className="InputGroup">
//                 <label>Benefits:</label>
//                 <input
//                   type="text"
//                   // value={addintellectualproperty.address}
//                   name="address"
//                   // onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <h6 className="edit_honorandaward_subheading">2. Objective</h6>
//             <div className="title-input">
//               <label>description:</label>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 //   value={addintellectualproperty.title}
//                 name="title"
//                 //   onChange={handleChange}
//               />
//             </div>

//             <div className="two-inputs">
//               <div className="InputGroup">
//                 <label>Measurable Output / Expected Results:</label>
//                 <input
//                   type="text"
//                   // value={addintellectualproperty.OwnerIp}
//                   name="OwnerIp"
//                   // onChange={handleChange}
//                 />
//               </div>
//               <div className="InputGroup">
//                 <label>Benefits:</label>
//                 <input
//                   type="text"
//                   // value={addintellectualproperty.address}
//                   name="address"
//                   // onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <h6 className="edit_honorandaward_subheading">3. Objective</h6>
//             <div className="title-input">
//               <label>description:</label>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 //   value={addintellectualproperty.title}
//                 name="title"
//                 //   onChange={handleChange}
//               />
//             </div>

//             <div className="two-inputs">
//               <div className="InputGroup">
//                 <label>Measurable Output / Expected Results:</label>
//                 <input
//                   type="text"
//                   // value={addintellectualproperty.OwnerIp}
//                   name="OwnerIp"
//                   // onChange={handleChange}
//                 />
//               </div>
//               <div className="InputGroup">
//                 <label>Benefits:</label>
//                 <input
//                   type="text"
//                   // value={addintellectualproperty.address}
//                   name="address"
//                   // onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="textarea">
//               <h4>Expected Socio-Economic Benefit</h4>
//               <label htmlFor="exampleTextarea">
//                 Expected Socio-Economic Benefit Details:
//               </label>
//               <textarea
//                 id="exampleTextarea"
//                 // value={text}
//                 // onChange={handleChange}
//                 rows="2"
//                 cols="20"
//               />
//             </div>

//             <div className="textarea">
//               <h4>Methodology</h4>
//               <label htmlFor="exampleTextarea">Methodology:</label>
//               <textarea
//                 id="exampleTextarea"
//                 // value={text}
//                 // onChange={handleChange}
//                 rows="2"
//                 cols="20"
//               />
//             </div>

//             {durations.map(({ state, setState }, index) => (
//               <div className="dashboardCard_card-item" key={index}>
//                 <div className="card-title">
//                   {/* <h4>Publication Details {index + 1}.</h4> */}
//                   <h4>{title[index]}</h4>
//                 </div>
//                 <div className="input-container">
//                   {Object.keys(state).map((key, i) => (
//                     <div key={i} className="dashboardCard_input-group">
//                       <label>Activities</label>
//                       <input
//                         type="text"
//                         value={state[key]}
//                         name={key}
//                         //   onChange={(e) => handleInput(e, setState)}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}

//             <div className="textarea">
//               <h4>
//                 Researcher’s Prior Experience in Relation to Current Project
//               </h4>
//               <label htmlFor="exampleTextarea">
//                 Researcher’s Prior Experience in Relation to Current Project
//                 Details:
//               </label>
//               <textarea
//                 id="exampleTextarea"
//                 // value={text}
//                 // onChange={handleChange}
//                 rows="2"
//                 cols="20"
//               />
//             </div>

//             <div>
//               <div className="addgrant_save-btn">
//                 <button className="addgrant_savebut">Save</button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="juw_copyright">
//           <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResearchProject;

// gpt

// import React, { useState } from "react";
// import "./researchproject.css";
// import Sidebar from "../../../Sidebar/Sidebar";
// import NavBar from "../../../shared-components/navbar/NavBar";

// const ResearchProject = () => {
//   const SchedulePhasing = () => ({
//     Activities: "",
//   });

//   const [duration1, setDuration1] = useState(SchedulePhasing());
//   const [duration2, setDuration2] = useState(SchedulePhasing());
//   const [duration3, setDuration3] = useState(SchedulePhasing());
//   const [duration4, setDuration4] = useState(SchedulePhasing());

//   const durations = [
//     { state: duration1, setState: setDuration1 },
//     { state: duration2, setState: setDuration2 },
//     { state: duration3, setState: setDuration3 },
//     { state: duration4, setState: setDuration4 },
//   ];

//   const title = [
//     "Duration/ Time period 1st Quarter",
//     "Duration/ Time period 2nd Quarter",
//     "Duration/ Time period 3rd Quarter",
//     "Duration/ Time period 4th Quarter",
//   ];

//   return (
//     <div className="researchproject-container">
//       <Sidebar />
//       <div className="researchproject">
//         <div className="researchproject_navbar-div">
//           <NavBar />
//         </div>
//         <div className="researchproject-card">
//           <h5>International/National Grants | Research Project</h5>
//           <p>
//             Proposal Cover / Research Project / Facilities and Funding /
//             Justification for The Requested Budget Items / Estimated Budget for
//             Proposed Research Period
//           </p>

//           {/* Project title input */}
//           <div className="researchproject_multiInputFields">
//             <div className="title-input">
//               <label>Project title:</label>
//               <input
//                 type="text"
//                 name="ProposalReferenceNo"
//                 data-section="proposalCover"
//               />
//             </div>

//             {/* Nature of Proposed Research checkboxes */}
//             <div className="multiCheckBoxes">
//               <h6>Nature of Proposed Research</h6>
//               <div className="theme_research_checkbox">
//                 {["Basic", "Applied", "Community", "Commercialized", "Thematic Research"].map((item, index) => (
//                   <div key={index}>
//                     <label>
//                       <input type="checkbox" name="ThemeofProposedResearch" value={item} />
//                       {index + 1}. {item}
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               {/* Domain of Proposed Research checkboxes */}
//               <h6>Domain of Proposed Research</h6>
//               <div className="theme_research_checkbox">
//                 {[
//                   "Arts and Humanities",
//                   "Economic & Social Research",
//                   "Business Administration",
//                   "Pharmacy",
//                   "Life Sciences",
//                   "Natural & Environment sciences",
//                   "Information and Communication Technology"
//                 ].map((domain, index) => (
//                   <div key={index}>
//                     <label>
//                       <input type="checkbox" name="DomainofProposedResearch" value={domain} />
//                       {index + 1}. {domain}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="textarea">
//               <label htmlFor="summary">Short summary of the project:</label>
//               <textarea id="summary" rows="1" cols="10" />
//             </div>

//             <div className="two-inputs">
//               <div className="InputGroup">
//                 <label>Year:</label>
//                 <input type="text" name="Year" />
//               </div>
//               <div className="InputGroup">
//                 <label>Total funds requested (Rs):</label>
//                 <input type="text" name="FundsRequested" />
//               </div>
//             </div>

//             <div className="textarea">
//               <label htmlFor="summary">Summary / Abstract:</label>
//               <textarea id="summary" rows="2" cols="20" />
//             </div>

//             <div className="textarea">
//               <label htmlFor="background">Background of The Problem to be Addressed:</label>
//               <textarea id="background" rows="2" cols="20" />
//             </div>

//             {/* Objectives */}
//             {[1, 2, 3].map((objective) => (
//               <div key={objective}>
//                 <h6 className="edit_honorandaward_subheading">{objective}. Objective</h6>
//                 <div className="title-input">
//                   <label>Description:</label>
//                   <input type="text" placeholder="Title" name="ObjectiveDescription" />
//                 </div>
//                 <div className="two-inputs">
//                   <div className="InputGroup">
//                     <label>Measurable Output / Expected Results:</label>
//                     <input type="text" name="ExpectedResults" />
//                   </div>
//                   <div className="InputGroup">
//                     <label>Benefits:</label>
//                     <input type="text" name="Benefits" />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Socio-Economic Benefit */}
//             <div className="textarea">
//               <h4>Expected Socio-Economic Benefit</h4>
//               <label htmlFor="socioEconomicBenefit">Expected Socio-Economic Benefit Details:</label>
//               <textarea id="socioEconomicBenefit" rows="2" cols="20" />
//             </div>

//             {/* Methodology */}
//             <div className="textarea">
//               <h4>Methodology</h4>
//               <label htmlFor="methodology">Methodology:</label>
//               <textarea id="methodology" rows="2" cols="20" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResearchProject;

import React, { useState } from "react";
import "./researchproject.css";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";
import { useLocation } from "react-router-dom";

const ResearchProject = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [formData, setFormData] = useState({
    projectTitle: "",
    natureOfResearch: [],
    domainOfResearch: [],
    shortSummary: "",
    year: "",
    fundsRequested: "",
    summary: "",
    background: "",
    objectives: [
      { description: "", expectedResults: "", benefits: "" },
      { description: "", expectedResults: "", benefits: "" },
      { description: "", expectedResults: "", benefits: "" },
    ],
    socioEconomicBenefit: "",
    methodology: "",
    durations: [
      { activities: "" },
      { activities: "" },
      { activities: "" },
      { activities: "" },
    ],
    priorExperience: "",
  });

  console.log(formData);

  // Handler to update state for inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler to update checkboxes
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => {
      let updatedArray = [...prevData[name]];
      if (checked) {
        updatedArray.push(value);
      } else {
        updatedArray = updatedArray.filter((item) => item !== value);
      }
      return {
        ...prevData,
        [name]: updatedArray,
      };
    });
  };

  // Handler for objectives input change
  const handleObjectiveChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedObjectives = [...prevData.objectives];
      updatedObjectives[index] = {
        ...updatedObjectives[index],
        [field]: value,
      };
      return {
        ...prevData,
        objectives: updatedObjectives,
      };
    });
  };

  const breadCrumps = [
    {
      label: "Proposal Cover",
      path: "/add-oric-funded-projects",
      // path: "/add-international/national-grants",
    },
    {
      label: "Research Project",
      path: "/oric-funded-project-research-project",
    },
    {
      label: "Facilities and Funding",
      path: "/oric-funded-project-facilities-and-funding",
    },
    {
      label: "Justification for The Requested Budget Items",
      path: "/oric-funded-project-justification-and-budget-items",
    },
    {
      label: "Estimated Budget for Proposed Research Period",
      path: "/oric-funded-project-estimated-budget-proposed-research-period",
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
              <Breadcrumb items={breadCrumps} activePath={currentPath} />
            </div>

            <div className="researchproject_multiInputFields">
              <div className="researchproject_title-input">
                <label>Project title:</label>
                <input
                  type="text"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
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
                          name="natureOfResearch"
                          value={item}
                          checked={formData.natureOfResearch.includes(item)}
                          onChange={handleCheckboxChange}
                        />
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* {index + 1}. {item} */}

              {/* Domain of Proposed Research checkboxes */}
              <h6 className="research_project_domain">
                Domain of Proposed Research
              </h6>
              {/* <div className="theme_research_checkbox"> */}
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
                        name="domainOfResearch"
                        value={domain}
                        checked={formData.domainOfResearch.includes(domain)}
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
                value={formData.shortSummary}
                onChange={handleInputChange}
              />
            </div>

            <h6 className="research_project_duration">Project duration:</h6>
            {/* <div className="researchproject_two-inputs"> */}
            <div className="two-inputs">
              <div className="InputGroup">
                {/* <div className="researchproject_InputGroup"> */}
                <label>Year:</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                />
              </div>
              <div className="InputGroup">
                <label>Total funds requested (Rs):</label>
                <input
                  type="text"
                  name="fundsRequested"
                  value={formData.fundsRequested}
                  onChange={handleInputChange}
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
                value={formData.summary}
                onChange={handleInputChange}
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
                value={formData.background}
                onChange={handleInputChange}
              />
            </div>

            <h4 className="researchproject_mainheading">
              Objectives with Expected Outputs
            </h4>
            {formData.objectives.map((objective, index) => (
              <div key={index}>
                <h6 className="researchproject_subheading">
                  {index + 1}. Objective
                </h6>
                <div className="title-input">
                  <label>Description:</label>
                  <input
                    type="text"
                    // placeholder="Title"
                    value={objective.description}
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
                      value={objective.expectedResults}
                      onChange={(e) =>
                        handleObjectiveChange(
                          index,
                          "expectedResults",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="InputGroup">
                    <label>Benefits:</label>
                    <input
                      type="text"
                      value={objective.benefits}
                      onChange={(e) =>
                        handleObjectiveChange(index, "benefits", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="researchproject_textarea">
              {/* <h4>Expected Socio-Economic Benefit</h4> */}
              <h4 className="researchproject_mainheading">
                Expected Socio-Economic Benefit
              </h4>
              <label htmlFor="socioEconomicBenefit">
                Expected Socio-Economic Benefit Details:
              </label>
              <textarea
                id="socioEconomicBenefit"
                name="socioEconomicBenefit"
                rows="2"
                cols="20"
                value={formData.socioEconomicBenefit}
                onChange={handleInputChange}
              />
            </div>

            <div className="researchproject_textarea">
              {/* <h4>Methodology</h4> */}
              <h4 className="researchproject_mainheading">Methodology</h4>
              <label htmlFor="methodology">Methodology:</label>
              <textarea
                id="methodology"
                name="methodology"
                rows="2"
                cols="20"
                value={formData.methodology}
                onChange={handleInputChange}
              />
            </div>

            <h4 className="researchproject_mainheading">Schedule/ Phasing</h4>
            {formData.durations.map((duration, index) => {
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
                      value={duration.activities}
                      onChange={(e) =>
                        handleObjectiveChange(
                          index,
                          "activities",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              );
            })}

            <div className="researchproject_textarea">
              {/* <h4>Methodology</h4> */}
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
                value={formData.priorExperience}
                onChange={handleInputChange}
              />
            </div>
            <div className="researchproject_btn">
              <button className="researchproject_button">
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
