import React, { useState } from "react";
import "./add_researchGrants.css";
import Sidebar from "../../Sidebar/Sidebar";
import NavBar from "../../shared-components/navbar/NavBar";
import Breadcrumb from "../../shared-components/breadcrumps/BreadCrumps";
import { useLocation } from "react-router-dom";

const Add_ResearchGrants = () => {
  const location = useLocation();
  const currentPath = location.pathname;


  const initialState = {
    completed: [
      {
        Title: "",
        DateofCompletion: "",
        Agency_or_Organization: "",
        TotalAwardAmount: "",
      },
      {
        Title: "",
        DateofCompletion: "",
        Agency_or_Organization: "",
        TotalAwardAmount: "",
      },
      {
        Title: "",
        DateofCompletion: "",
        Agency_or_Organization: "",
        TotalAwardAmount: "",
      },
    ],
    inReview: [
      {
        Title: "",
        Date: "",
        Agency_or_Organization: "",
        TotalAwardAmount: "",
      },
      {
        Title: "",
        Date: "",
        Agency_or_Organization: "",
        TotalAwardAmount: "",
      },
      {
        Title: "",
        Date: "",
        Agency_or_Organization: "",
        TotalAwardAmount: "",
      },
    ],
  };

  // Use useState to manage the form state
  const [formData, setFormData] = useState(initialState);

  console.log(formData)



  // Handle input changes
  const handleInputChange = (e, section, index, field) => {
    const value = e.target.value;

    setFormData((prevData) => {
      const updatedSection = [...prevData[section]];
      updatedSection[index][field] = value;

      return {
        ...prevData,
        [section]: updatedSection,
      };
    });
  };

  const breadCrumps = [
    {
      label: " Personal Information",
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
    <div className="Add_ResearchGrants-container">
      <Sidebar />
      <div className="add_researchGrants">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="add_researchGrants_card">
          <h4>Research portfolio | Research Grants and Contracts</h4>
          <div className="ARG_bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          {/* <div className="bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div> */}
          <div className="h4-heading">
            <h4>Research Grants and Contracts</h4>
          </div>
          <div className="completed_part">
            <h6>Completed</h6>
            {formData.completed.map((grant, index) => (
              <div className="heading11" key={index}>
                <h6>Project Completed {index + 1}.</h6>
                <div className="input-container">
                  {Object.keys(grant).map((key, i) => (
                    <div key={i} className="input-group">
                      <label>{key.replace(/_/g, " ")}</label>
                      <input
                        type={key === "DateofCompletion" ? "date" : "text"}
                        value={grant[key]}
                        name={key}
                        onChange={(e) =>
                          handleInputChange(e, "completed", index, key)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="inreview_part">
            <h6>Funded & In progress, In review</h6>
            {formData.inReview.map((review, index) => (
              <div className="heading11" key={index}>
                <h6>Project In Review {index + 1}.</h6>
                <div className="input-container">
                  {Object.keys(review).map((key, i) => (
                    <div key={i} className="input-group">
                      <label>{key.replace(/_/g, " ")}</label>
                      <input
                        type={key === "Date" ? "date" : "text"}  
                        value={review[key]}
                        name={key}
                        onChange={(e) =>
                          handleInputChange(e, "inReview", index, key)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="edit_button">
            SAVE
          </button>
        </div>
        <div className="juw_copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default Add_ResearchGrants;



