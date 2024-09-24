import React, { useState } from "react";
import "./edit_honorAndAward.css";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../shared-components/navbar/NavBar";
import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
import { useLocation } from "react-router-dom";
import { createHonors } from "../../api/Api";
import { toast } from "react-toastify";

const Edit_HonorAndAward = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [formData, setFormData] = useState({
    academicDetails: [
      { detail: "" },
      { detail: "" },
      { detail: "" },
      { detail: "" },
    ],
    professionalDetails: [
      { detail: "" },
      { detail: "" },
      { detail: "" },
      { detail: "" },
    ],
  });

  // Handle input change for academic and professional details
  const handleInputChange = (index, value, type) => {
    const updatedDetails = formData[type].map((item, i) =>
      i === index ? { detail: value } : item
    );
    setFormData((prevState) => ({ ...prevState, [type]: updatedDetails }));
  };

  // Handle Save button click
  const handleSave = async () => {
    try {
      const payload = {
        academicAwards: formData.academicDetails.map((item) => item.detail),
        professionalAwards: formData.professionalDetails.map(
          (item) => item.detail
        ),
      };

      const token = localStorage.getItem("token");

      const response = await createHonors(payload, token);
      console.log("Honors saved successfully:", response);
      // Reset the form data state
      setFormData({
        academicDetails: [
          { detail: "" },
          { detail: "" },
          { detail: "" },
          { detail: "" },
        ],
        professionalDetails: [
          { detail: "" },
          { detail: "" },
          { detail: "" },
          { detail: "" },
        ],
      });
      toast.success("Success!");
    } catch (error) {
      // console.error("Failed to save honors:", error.message);
      toast.error("Failed to save honors:");
    }
  };

  const breadCrumps = [
    { label: "Personal Information", path: "/researchportfolio" },
    { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
    { label: "Membership", path: "/membership" },
    { label: "Publications", path: "/viewallpublications" },
    {
      label: "Research Grants and Contracts",
      path: "/research-grants-and-contracts",
    },
  ];

  return (
    <div className="edit_honorandaward_container">
      <Sidebar />
      <div className="edit_honorandaward">
        <div className="navba-div">
          <NavBar />
        </div>
        <div className="edit_honorandaward_card">
          <h3 className="edit_honorandaward_heading">
            Research portfolio | Honor and Awards, Scholarship
          </h3>
          <div className="EHA_bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>

          <div className="edit_honorandaward_data">
            <h3 className="edit_honorandaward_heading">
              Honor and Awards, Scholarship
            </h3>
            <h6 className="edit_honorandaward_subheading">Academically</h6>
            <div className="EDIT_Honor_multiInputFields">
              {formData.academicDetails.map((academicDetail, index) => (
                <div key={index} className="InputGroup">
                  <label>{index + 1}. Detail:</label>
                  <input
                    type="text"
                    value={academicDetail.detail}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        e.target.value,
                        "academicDetails"
                      )
                    }
                    name="detail"
                  />
                </div>
              ))}
            </div>

            <h6 className="edit_honorandaward_subheading">Professionally</h6>
            <div className="EDIT_Honor_multiInputFields">
              {formData.professionalDetails.map((professionalDetail, index) => (
                <div key={index} className="InputGroup">
                  <label>{index + 1}. Detail:</label>
                  <input
                    type="text"
                    value={professionalDetail.detail}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        e.target.value,
                        "professionalDetails"
                      )
                    }
                    name="detail"
                  />
                </div>
              ))}
            </div>

            <div className="EHA_save-btn-bg">
              <button className="EHA_savebut" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="juw_copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default Edit_HonorAndAward;
