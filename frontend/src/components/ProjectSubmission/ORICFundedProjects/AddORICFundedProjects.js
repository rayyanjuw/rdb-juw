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
// import { createOricFunded } from "../../../api/Api";

const AddORICFundedProjects = ({ formData, handleInputChange, handleSubmit }) => {
  // const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;



  // const [AddFundedProjects, setFundedProjects] = useState({
  //   title: formData?.proposalCover?.title || "",
  //   nameOfPI: formData?.proposalCover?.nameOfPI || "",
  //   nameOfFaculty: formData?.proposalCover?.nameOfFaculty || "",
  //   totalBudgetRequested: formData?.proposalCover?.totalBudgetRequested || "",
  //   // title: formData.title || "",
  //   // nameOfPI: formData.nameOfPI || "",
  //   // nameOfFaculty: formData.nameOfFaculty || "",
  //   // totalBudgetRequested: formData.totalBudgetRequested || "",
  // });
  const [AddFundedProjects, setAddFundedProjects] = useState({
    title: formData?.title || "",
    nameOfPI: formData?.nameOfPI || "",
    nameOfFaculty: formData?.nameOfFaculty || "",
    totalBudgetRequested: formData?.totalBudgetRequested || "",
  });

  useEffect(() => {
    setAddFundedProjects({
      title: formData?.title || "",
      nameOfPI: formData?.nameOfPI || "",
      nameOfFaculty: formData?.nameOfFaculty || "",
      totalBudgetRequested: formData?.totalBudgetRequested || "",
    });
  }, [formData]);

  // console.log(AddFundedProjects)

  // useEffect(() => {
  //   setFundedProjects({
  //     title: formData?.proposalCover?.title || "",
  //     nameOfPI: formData?.proposalCover?.nameOfPI || "",
  //     nameOfFaculty: formData?.proposalCover?.nameOfFaculty || "",
  //     totalBudgetRequested: formData?.proposalCover?.totalBudgetRequested || "",
  //     // title: formData.title || "",
  //     // nameOfPI: formData.nameOfPI || "",
  //     // nameOfFaculty: formData.nameOfFaculty || "",
  //     // totalBudgetRequested: formData.totalBudgetRequested || "",
  //   });
  // }, [formData]);

  // const handleLocalChange = (e) => {
  //   const { name, value } = e.target;
  //   setFundedProjects((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
    
  //   handleInputChange(e);
  // };

  // const handleLocalChange = (e) => {
  //   const { name, value } = e.target;
  //   setFundedProjects((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));


  //   if (handleInputChange) {
  //     handleInputChange(e); 
  //   } else {
  //     console.error("handleInputChange is not a function");
  //   }
  // };
  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    setAddFundedProjects((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Call handleInputChange from parent to update the global formData
    if (handleInputChange) {
      handleInputChange(e); 
    } else {
      console.error("handleInputChange is not a function");
    }
  };

// const handleSubmit = async () => {
//   try {
//     // const proposalCoverData = {
//     //   title: AddFundedProjects.title,
//     //   nameOfPI: AddFundedProjects.nameOfPI,
//     //   nameOfFaculty: AddFundedProjects.nameOfFaculty,
//     //   totalBudgetRequested: AddFundedProjects.totalBudgetRequested,
//     // };
//     const proposalCoverData = AddFundedProjects;
//     const createdProject = await createOricFunded({
//       proposalCoverData,
//       // Pass other data as needed
//     });
    

//     // Call the API function
//     // const createdProject = await createOricFunded(proposalCoverData);
//     navigate("/oric-funded-project-research-project")
//     // Handle success (e.g., display a success message or navigate to another page)
//     console.log('Project created successfully:', createdProject);
//     alert('ORIC Funded Project created successfully!');
//   } catch (error) {
//     // Handle error (e.g., display an error message)
//     console.error('Failed to create ORIC Funded Project:', error);
//     alert('Error creating ORIC Funded Project.');
//   }
// };




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
    <div className="addoricfundedproject_container">
      <Sidebar />
      <div className="add-oricfundedproject">
        <div className="addoric_navbar-div">
          <h4>Submission | Intellectual Property</h4>
          <NavBar />
        </div>
        <div className="add-oricfundedproject-card">
          <h4>ORIC Funded Project | Proposal Cover</h4>

          {/* <div className="add-oricfundedproject-bredcrumb"> */}
            {/* <Breadcrumb items={breadCrumps}/> */}
            {/* <Breadcrumb items={breadCrumps} activePath={currentPath} /> */}
          <p>Proposal Cover / Research Project / Facilities and Funding / Justification for The Requested Budget Items / Estimated Budget for Proposed Research Period</p>
          {/* </div> */}
          
          <div className="add-oricfundedproject_multiInputFields">
            <div className="addoric_InputGroup">
              <label>Title:</label>
              <input
                type="text"
                value={AddFundedProjects.title}
                name="title"
                // onChange={handleInputChange}
                onChange={handleLocalChange}
              />
            </div>
            <div className="addoric_InputGroup">
              <label>Name of PI:</label>
              <input
                type="text"
                value={AddFundedProjects.nameOfPI}
                name="nameOfPI"
                onChange={handleLocalChange}
                // onChange={handleInputChange}
              />
            </div>
            <div className="addoric_two-inputs">
              <div className="addoric_InputGroup">
                <label>Name of Faculty:</label>
                <input
                  type="text"
                  value={AddFundedProjects.nameOfFaculty}
                  name="nameOfFaculty"
                  onChange={handleLocalChange}
                  // onChange={handleInputChange}
                />
              </div>
              <div className="addoric_InputGroup">
                <label>Total Budget Requested:</label>
                <input
                  type="number"
                  value={AddFundedProjects.totalBudgetRequested}
                  name="totalBudgetRequested"
                  onChange={handleLocalChange}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="AOF_save-btn">
              <button className="AOF_savebut" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
        <div className="AO_juw_copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default AddORICFundedProjects;

















// import React, { useState, useEffect } from "react";
// import "./AddORICFundedProjects.css";
// import Sidebar from "../../Sidebar/Sidebar";
// import NavBar from "../../shared-components/navbar/NavBar";
// import { useLocation } from "react-router-dom";
// import Breadcrumb from "../../shared-components/breadcrumps/BreadCrumps";
// import { createOricFunded } from "../../../api/Api";

// const AddORICFundedProjects = ({ formData, handleInputChange }) => {
//   const [AddFundedProjects, setFundedProjects] = useState({
//     title: formData?.proposalCover?.title || "",
//     nameOfPI: formData?.proposalCover?.nameOfPI || "",
//     nameOfFaculty: formData?.proposalCover?.nameOfFaculty || "",
//     totalBudgetRequested: formData?.proposalCover?.totalBudgetRequested || "",
//   });

//   useEffect(() => {
//     setFundedProjects({
//       title: formData?.proposalCover?.title || "",
//       nameOfPI: formData?.proposalCover?.nameOfPI || "",
//       nameOfFaculty: formData?.proposalCover?.nameOfFaculty || "",
//       totalBudgetRequested: formData?.proposalCover?.totalBudgetRequested || "",
//     });
//   }, [formData]);

//   const handleLocalChange = (e) => {
//     const { name, value } = e.target;
//     setFundedProjects((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     handleInputChange(e);
//   };

//   // Handle form submission and API call
//   const handleSubmit = async () => {
//     try {
//       const proposalCoverData = {
//         title: AddFundedProjects.title,
//         nameOfPI: AddFundedProjects.nameOfPI,
//         nameOfFaculty: AddFundedProjects.nameOfFaculty,
//         totalBudgetRequested: AddFundedProjects.totalBudgetRequested,
//       };

//       // Call the API function
//       const createdProject = await createOricFunded(proposalCoverData);

//       // Handle success (e.g., display a success message or navigate to another page)
//       console.log('Project created successfully:', createdProject);
//       alert('ORIC Funded Project created successfully!');
//     } catch (error) {
//       // Handle error (e.g., display an error message)
//       console.error('Failed to create ORIC Funded Project:', error);
//       alert('Error creating ORIC Funded Project.');
//     }
//   };

//   return (
//     <div className="addoricfundedproject_container">
//       <div className="add-oricfundedproject">
//         <div className="add-oricfundedproject-card">
//           <h4>ORIC Funded Project | Proposal Cover</h4>
//           <div className="add-oricfundedproject_multiInputFields">
//             <div className="addoric_InputGroup">
//               <label>Title:</label>
//               <input
//                 type="text"
//                 value={AddFundedProjects.title}
//                 name="title"
//                 onChange={handleLocalChange}
//               />
//             </div>
//             <div className="addoric_InputGroup">
//               <label>Name of PI:</label>
//               <input
//                 type="text"
//                 value={AddFundedProjects.nameOfPI}
//                 name="nameOfPI"
//                 onChange={handleLocalChange}
//               />
//             </div>
//             <div className="addoric_two-inputs">
//               <div className="addoric_InputGroup">
//                 <label>Name of Faculty:</label>
//                 <input
//                   type="text"
//                   value={AddFundedProjects.nameOfFaculty}
//                   name="nameOfFaculty"
//                   onChange={handleLocalChange}
//                 />
//               </div>
//               <div className="addoric_InputGroup">
//                 <label>Total Budget Requested:</label>
//                 <input
//                   type="number"
//                   value={AddFundedProjects.totalBudgetRequested}
//                   name="totalBudgetRequested"
//                   onChange={handleLocalChange}
//                 />
//               </div>
//             </div>
//             <div className="AOF_save-btn">
//               <button className="AOF_savebut" onClick={handleSubmit}>Save</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddORICFundedProjects;














// res send but data not saving
// import React, { useState } from "react";
// import "./AddORICFundedProjects.css";
// import Sidebar from "../../Sidebar/Sidebar";
// import NavBar from "../../shared-components/navbar/NavBar";
// import { useLocation } from "react-router-dom";
// import Breadcrumb from "../../shared-components/breadcrumps/BreadCrumps";
// import { createOricFunded } from "../../../api/Api";

// const AddORICFundedProjects = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const initialFundedProject = {
//     title: "",
//     nameOfPI: "",
//     nameOfFaculty: "",
//     totalBudgetRequested: "",
//   };

//   const [addFundedProjects, setFundedProjects] = useState(initialFundedProject);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFundedProjects((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await createOricFunded();
//       setSuccessMessage("ORIC Funded Project created successfully");
//       console.log(response);
//     } catch (error) {
//       setErrorMessage("Failed to create ORIC Funded Project");
//       console.error(error.response ? error.response.data : error.message);
//     }
//   };

//   const breadCrumps = [
//     { label: "Proposal Cover", path: "/add-oric-funded-projects" },
//     { label: "Research Project", path: "/oric-funded-project-research-project" },
//     { label: "Facilities and Funding", path: "/oric-funded-project-facilities-and-funding" },
//     { label: "Justification for The Requested Budget Items", path: "/oric-funded-project-justification-and-budget-items" },
//     { label: "Estimated Budget for Proposed Research Period", path: "/oric-funded-project-estimated-budget-proposed-research-period" },
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
//           <form onSubmit={handleSubmit}>
//             <div className="add-oricfundedproject_multiInputFields">
//               <div className="addoric_InputGroup">
//                 <label>Title:</label>
//                 <input
//                   type="text"
//                   value={addFundedProjects.title}
//                   name="title"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="addoric_InputGroup">
//                 <label>Name of PI:</label>
//                 <input
//                   type="text"
//                   value={addFundedProjects.nameOfPI}
//                   name="nameOfPI"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="addoric_two-inputs">
//                 <div className="addoric_InputGroup">
//                   <label>Name of Faculty:</label>
//                   <input
//                     type="text"
//                     value={addFundedProjects.nameOfFaculty}
//                     name="nameOfFaculty"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="addoric_InputGroup">
//                   <label>Total Budget requested:</label>
//                   <input
//                     type="number"
//                     value={addFundedProjects.totalBudgetRequested}
//                     name="totalBudgetRequested"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="AOF_save-btn">
//                 <button className="AOF_savebut" type="submit">Save</button>
//               </div>
//             </div>
//           </form>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//           {successMessage && <p className="success-message">{successMessage}</p>}
//         </div>
//         <div className="juw_copyright">
//           <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddORICFundedProjects;
