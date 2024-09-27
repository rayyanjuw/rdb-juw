// original code : without integrated : 1
// import React, { useState } from "react";
// import "./AddORICFundedProjects.css";
// import Sidebar from "../../Sidebar/Sidebar";
// import NavBar from "../../shared-components/navbar/NavBar";
// import { useLocation } from "react-router-dom";
// import Breadcrumb from "../../shared-components/breadcrumps/BreadCrumps";

// const AddORICFundedProjects = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const InitalFundedProject = {
//     title: "",
//     nameOfPI: "",
//     nameOfFaculty: "",
//     totalBudgetRequested: "",
//   };

//   const [AddFundedProjects, setFundedProjects] = useState(InitalFundedProject);

//   console.log(AddFundedProjects);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFundedProjects((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const breadCrumps = [
//     {
//       label: "Proposal Cover",
//       path: "/add-oric-funded-projects",
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
//     <div className="addoricfundedproject_container">
//       <Sidebar />
//       <div className="add-oricfundedproject">
//         <div className="addoric_navbar-div">
//           <h4>Submission | Intellectual Property</h4>
//           <NavBar />
//         </div>
//         <div className="add-oricfundedproject-card">
//           <h4>ORIC Funded Project | Proposal Cover</h4>
//           <div className="researchproject-bredcrumb">
//             <Breadcrumb items={breadCrumps} activePath={currentPath} />
//           </div>
//           <div className="add-oricfundedproject_multiInputFields">
//             {/* <div className="addoric_title-input"> */}
//             <div className="addoric_InputGroup">
//               <label>Title:</label>
//               <input
//                 type="text"
//                 value={AddFundedProjects.title}
//                 name="title"
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="addoric_InputGroup">
//               <label>Name of PI:</label>
//               <input
//                 type="text"
//                 value={AddFundedProjects.nameOfPI}
//                 name="nameOfPI"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="addoric_two-inputs">
//               <div className="addoric_InputGroup">
//                 <label>Name of Faculty:</label>
//                 <input
//                   type="text"
//                   value={AddFundedProjects.nameOfFaculty}
//                   name="nameOfFaculty"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="addoric_InputGroup">
//                 <label>Total Budget requested:</label>
//                 <input
//                   type="number"
//                   value={AddFundedProjects.totalBudgetRequested}
//                   name="totalBudgetRequested"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="AOF_save-btn">
//               <button className="AOF_savebut">Save</button>
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

// export default AddORICFundedProjects;

// multistepsform
// import React, {useState} from "react";
// import "./AddORICFundedProjects.css";
// import Sidebar from "../../Sidebar/Sidebar";
// import NavBar from "../../shared-components/navbar/NavBar";
// import { useLocation } from "react-router-dom";
// import Breadcrumb from "../../shared-components/breadcrumps/BreadCrumps";

// const AddORICFundedProjects = ({ formData, handleInputChange }) => {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const InitalFundedProject = {
//     title: "",
//     nameOfPI: "",
//     nameOfFaculty: "",
//     totalBudgetRequested: "",
//   };

//   const [AddFundedProjects, setFundedProjects] = useState(InitalFundedProject);

//   const breadCrumps = [
//     {
//       label: "Proposal Cover",
//       path: "/add-oric-funded-projects",
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
//     <div className="addoricfundedproject_container">
//       <Sidebar />
//       <div className="add-oricfundedproject">
//         <div className="addoric_navbar-div">
//           <h4>Submission | Intellectual Property</h4>
//           <NavBar />
//         </div>
//         <div className="add-oricfundedproject-card">
//           <h4>ORIC Funded Project | Proposal Cover</h4>
//           <div className="researchproject-bredcrumb">
//             <Breadcrumb items={breadCrumps} activePath={currentPath} />
//           </div>
//           <div className="add-oricfundedproject_multiInputFields">
//             <div className="addoric_InputGroup">
//               <label>Title:</label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 name="title"
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="addoric_InputGroup">
//               <label>Name of PI:</label>
//               <input
//                 type="text"
//                 value={formData.nameOfPI}
//                 name="nameOfPI"
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="addoric_two-inputs">
//               <div className="addoric_InputGroup">
//                 <label>Name of Faculty:</label>
//                 <input
//                   type="text"
//                   value={formData.nameOfFaculty}
//                   name="nameOfFaculty"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="addoric_InputGroup">
//                 <label>Total Budget Requested:</label>
//                 <input
//                   type="number"
//                   value={formData.totalBudgetRequested}
//                   name="totalBudgetRequested"
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div className="AOF_save-btn">
//               <button className="AOF_savebut">Save</button>
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

// export default AddORICFundedProjects;




// multistepform updated
import React, { useState, useEffect } from "react";
import "./AddORICFundedProjects.css";
import Sidebar from "../../Sidebar/Sidebar";
import NavBar from "../../shared-components/navbar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../shared-components/breadcrumps/BreadCrumps";
import { toast } from "react-toastify";
// import { createOricFunded } from "../../../api/Api";

const AddORICFundedProjects = ({ onSave }) => {

  // const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [proposalCover, setProposalCover] = useState({
      title: "",
      nameOfPI: "",
      nameOfFaculty: "",
      totalBudgetRequested: "",
    })

    const handleChange = (e) => {
      const { name, value } = e.target;
      setProposalCover(prevState => ({
        ...prevState,
        [name]: value
      }));
    }


    const handleSave = () => {
      if (!proposalCover.title || !proposalCover.nameOfPI || !proposalCover.nameOfFaculty || !proposalCover.totalBudgetRequested) {
        toast.error("All fields are required!");
        return;
      }
      onSave(proposalCover);
    }


    


  const breadCrumps = [
    {
      label: "Proposal Cover",
      // path: "/add-oric-funded-projects",
      // path: "/add-oric",
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
    <div className="addoricfundedproject-container">
      <Sidebar />
      <div className="add-oricfundedproject">
        <div className="addoric-navbar-div">
          <h4>Submission | Intellectual Property</h4>
          <NavBar />
        </div>
        <div className="add-oricfundedproject-card">
          <h4>ORIC Funded Project | Proposal Cover</h4>

          <p>Proposal Cover / Research Project / Facilities and Funding / Justification for The Requested Budget Items / Estimated Budget for Proposed Research Period</p>

          
          <div className="add-oricfundedproject-multiinputfields">
            <div className="addoric-inputgroup">
              <label>Title:</label>
              <input
                type="text"
                value={proposalCover.title}
                name="title"
                // onChange={handleInputChange}
                onChange={handleChange}
                required
              />
            </div>
            <div className="addoric-inputgroup">
              <label>Name of PI:</label>
              <input
                type="text"
                value={proposalCover.nameOfPI}
                name="nameOfPI"
                onChange={handleChange}
                // onChange={handleInputChange}
                required
              />
            </div>
            <div className="addoric-two-inputs">
              <div className="addoric-inputgroup">
                <label>Name of Faculty:</label>
                <input
                  type="text"
                  value={proposalCover.nameOfFaculty}
                  name="nameOfFaculty"
                  onChange={handleChange}
                  required
                  // onChange={handleInputChange}
                />
              </div>
              <div className="addoric-inputgroup">
                <label>Total Budget Requested:</label>
                <input
                  type="number"
                  value={proposalCover.totalBudgetRequested}
                  name="totalBudgetRequested"
                  onChange={handleChange}
                  required
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="aof-save-btn">
              <button className="aof-savebut" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
        <div className="ao-juw-copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default AddORICFundedProjects;


