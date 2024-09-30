// api integrated
import React, { useState } from "react";
import "./add_researchGrants.css";
import Sidebar from "../../Sidebar/Sidebar";
import NavBar from "../../shared-components/navbar/NavBar";
import Breadcrumb from "../../shared-components/breadcrumps/BreadCrumps";
import { useLocation } from "react-router-dom";
import { createCompletedProject, createFundedProject } from "../../../api/Api";
import { toast } from "react-toastify";



const Add_ResearchGrants = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const initialState = {
    completed: [
      {
        title: "",
        date_of_completion: "",
        agency: "",
        total_award_amount: "",
      },
      {
        title: "",
        date_of_completion: "",
        agency: "",
        total_award_amount: "",
      },
      {
        title: "",
        date_of_completion: "",
        agency: "",
        total_award_amount: "",
      },

    ],
    inReview: [
      {
        title: "",
        date_of_acceptance: "",
        agency: "",
        total_award_amount: "",
      },
      {
        title: "",
        date_of_acceptance: "",
        agency: "",
        total_award_amount: "",
      },
      {
        title: "",
        date_of_acceptance: "",
        agency: "",
        total_award_amount: "",
      },
    ],
  };

  const initialErrors = {
    completed: Array(3).fill({}),
    inReview: Array(3).fill({}),
  };

  // Use useState to manage the form state
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e, section, index, field) => {
    const value = e.target.value;

    // Validate inputs
    let error = "";
    if (field === "date_of_completion" || field === "date_of_acceptance") {
      if (!value) {
        error = "Date is required.";
      } else if (isNaN(Date.parse(value))) {
        error = "Please enter a valid date.";
      }
    } else if (field === "total_award_amount") {
      if (!/^\d*\.?\d*$/.test(value)) {
        error = "Please enter a valid number.";
      }
    }

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      updatedErrors[section][index][field] = error;
      return updatedErrors;
    });

    // Update form data if no error
    if (!error) {
      setFormData((prevData) => {
        const updatedSection = [...prevData[section]];
        updatedSection[index][field] = value;

        return {
          ...prevData,
          [section]: updatedSection,
        };
      });
    }
  };



  const handleSubmit = async () => {
    let hasErrors = false;
    const newErrors = { completed: [], inReview: [] };
  
    formData.completed.forEach((grant, index) => {
      const errorsForGrant = {};
      
      const isCompletedFilled = grant.title || grant.agency || grant.total_award_amount;
  
      if (isCompletedFilled && !grant.date_of_completion) {
        errorsForGrant.date_of_completion = "Date is required if other fields are filled.";
        hasErrors = true;
      }
      if (isCompletedFilled && !/^\d*\.?\d*$/.test(grant.total_award_amount)) {
        errorsForGrant.total_award_amount = "Please enter a valid number.";
        hasErrors = true;
      }
      newErrors.completed[index] = errorsForGrant;
    });
  
    formData.inReview.forEach((review, index) => {
      const errorsForReview = {};
      
      const isInReviewFilled = review.title || review.agency || review.total_award_amount;
  
      if (isInReviewFilled && !review.date_of_acceptance) {
        errorsForReview.date_of_acceptance = "Date is required if other fields are filled.";
        hasErrors = true;
      }
      if (isInReviewFilled && !/^\d*\.?\d*$/.test(review.total_award_amount)) {
        errorsForReview.total_award_amount = "Please enter a valid number.";
        hasErrors = true;
      }
      newErrors.inReview[index] = errorsForReview;
    });
  
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
  
    try {
      for (const project of formData.completed) {
        if (project.title || project.agency || project.total_award_amount) {
          await createCompletedProject(project);
        }
      }
  
      for (const project of formData.inReview) {
        if (project.title || project.agency || project.total_award_amount) {
          await createFundedProject(project);
        }
      }
  
      setFormData(initialState);
      toast.success("Success!");
      setErrorMessage("");
    } catch (error) {
      toast.error(error.message);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };
  


  const breadCrumps = [
    {
      label: "Personal Information",
      path: "/researchportfolio",
    },
    {
      label: "Honor and Awards, Scholarship",
      path: "/honorandawards",
    },
    {
      label: "Membership",
      path: "/membership",
    },
    {
      label: "Publications",
      // path: "/researchpublication",
      path: "/viewallpublications",
    },
    {
      label: "Research Grants and Contracts",
      path: "/add-research-grants-and-contracts",
    },
  ];


  return (
    <div className="add-researchgrants-container">
      <Sidebar />
      <div className="add-researchgrants">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="add-researchgrants-card">
          <h4>Research portfolio | Research Grants and Contracts</h4>
          <div className="arg-bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>

          <div className="h4-heading">
            <h4>Research Grants and Contracts</h4>
          </div>
          <div className="completed-part">
            <h6>Completed</h6>
            {formData.completed.map((grant, index) => (
              <div className="heading11" key={index}>
                <h6>Project Completed {index + 1}.</h6>
                <div className="input-container">
                  {Object.keys(grant).map((key, i) => (
                    <div key={i} className="input-group">
                      <label>{key.replace(/_/g, " ")}</label>
                      <input
                        type={key === "date_of_completion" ? "date" : "text"}
                        value={grant[key]}
                        name={key}
                        onChange={(e) =>
                          handleInputChange(e, "completed", index, key)
                        }
                      />
                      {errors.completed[index][key] && (
                        <p className="error-message">{errors.completed[index][key]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="inreview-part">
            <h6>Funded & In progress, In review</h6>
            {formData.inReview.map((review, index) => (
              <div className="heading11" key={index}>
                <h6>Project In Review {index + 1}.</h6>
                <div className="input-container">
                  {Object.keys(review).map((key, i) => (
                    <div key={i} className="input-group">
                      <label>{key.replace(/_/g, " ")}</label>
                      <input
                        type={key === "date_of_acceptance" ? "date" : "text"}
                        value={review[key]}
                        name={key}
                        onChange={(e) =>
                          handleInputChange(e, "inReview", index, key)
                        }
                      />
                      {errors.inReview[index][key] && (
                        <p className="error-message">{errors.inReview[index][key]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="edit-button" onClick={handleSubmit}>
            SAVE
          </button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="juw-copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default Add_ResearchGrants;












// api not integrated
// import React, { useState } from "react";
// import "./add_researchGrants.css";
// import Sidebar from "../../Sidebar/Sidebar";
// import NavBar from "../../shared-components/navbar/NavBar";
// import Breadcrumb from "../../shared-components/breadcrumps/BreadCrumps";
// import { useLocation } from "react-router-dom";

// const Add_ResearchGrants = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;


//   const initialState = {
//     completed: [
//       {
//         title: "",
//         date_of_completion: "",
//         agency: "",
//         total_award_amount: "",
//       },
//       {
//         title: "",
//         date_of_completion: "",
//         agency: "",
//         total_award_amount: "",
//       },
//       {
//         title: "",
//         date_of_completion: "",
//         agency: "",
//         total_award_amount: "",
//       },
//     ],
//     inReview: [
//       {
//         title: "",
//         date_of_acceptance: "",
//         agency: "",
//         total_award_amount: "",
//       },
//       {
//         title: "",
//         date_of_acceptance: "",
//         agency: "",
//         total_award_amount: "",
//       },
//       {
//         title: "",
//         date_of_acceptance: "",
//         agency: "",
//         total_award_amount: "",
//       },
//     ],
//   };

//   // Use useState to manage the form state
//   const [formData, setFormData] = useState(initialState);

//   console.log(formData)



//   // Handle input changes
//   const handleInputChange = (e, section, index, field) => {
//     const value = e.target.value;

//     setFormData((prevData) => {
//       const updatedSection = [...prevData[section]];
//       updatedSection[index][field] = value;

//       return {
//         ...prevData,
//         [section]: updatedSection,
//       };
//     });
//   };

  // const breadCrumps = [
  //   {
  //     label: " Personal Information",
  //     path: "/researchportfolio",
  //   },
  //   {
  //     label: "Honor and Awards, Scholarship",
  //     path: "/honorandawards",
  //   },
  //   {
  //     label: "Membership",
  //     path: "/membership",
  //   },
  //   {
  //     label: "Publications",
  //     // path: "/researchpublication",
  //     path: "/viewallpublications",
  //   },
  //   {
  //     label: "Research Grants and Contracts",
  //     path: "/add-research-grants-and-contracts",
  //   },
  // ];

//   return (
//     <div className="add-researchgrants-container">
//       <Sidebar />
//       <div className="add-researchgrants">
//         <div className="navbar-div">
//           <NavBar />
//         </div>
//         <div className="add-researchgrants-card">
//           <h4>Research portfolio | Research Grants and Contracts</h4>
//           <div className="arg-bred-crumb">
//             <Breadcrumb items={breadCrumps} activePath={currentPath} />
//           </div>

//           <div className="h4-heading">
//             <h4>Research Grants and Contracts</h4>
//           </div>
//           <div className="completed-part">
//             <h6>Completed</h6>
//             {formData.completed.map((grant, index) => (
//               <div className="heading11" key={index}>
//                 <h6>Project Completed {index + 1}.</h6>
//                 <div className="input-container">
//                   {Object.keys(grant).map((key, i) => (
//                     <div key={i} className="input-group">
//                       <label>{key.replace(/_/g, " ")}</label>
//                       <input
//                         type={key === "DateofCompletion" ? "date" : "text"}
//                         value={grant[key]}
//                         name={key}
//                         onChange={(e) =>
//                           handleInputChange(e, "completed", index, key)
//                         }
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="inreview-part">
//             <h6>Funded & In progress, In review</h6>
//             {formData.inReview.map((review, index) => (
//               <div className="heading11" key={index}>
//                 <h6>Project In Review {index + 1}.</h6>
//                 <div className="input-container">
//                   {Object.keys(review).map((key, i) => (
//                     <div key={i} className="input-group">
//                       <label>{key.replace(/_/g, " ")}</label>
//                       <input
//                         type={key === "Date" ? "date" : "text"}  
//                         value={review[key]}
//                         name={key}
//                         onChange={(e) =>
//                           handleInputChange(e, "inReview", index, key)
//                         }
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button type="button" className="edit-button">
//             SAVE
//           </button>
//         </div>
//         <div className="juw-copyright">
//           <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Add_ResearchGrants;



