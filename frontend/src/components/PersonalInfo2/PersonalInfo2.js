// integrated
import React, { useState } from "react";
import "./personalinfo2.css";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../shared-components/navbar/NavBar";
import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
import { useLocation } from "react-router-dom";
import { createOrUpdateProfile } from "../../api/Api";
import { toast } from "react-toastify";


const PersonalInfo2 = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    address: "",
    cellPhone: "",
  });

  const [highestDegree, setHighestDegree] = useState({
    highestDegree: "",
    yearOfDegree: "",
  });

  const [latestExperience, setLatestExperience] = useState({
    latestInstitutionName: "",
    latestJobTitle: "",
    latestExperienceFrom: "",
    latestExperienceTo: "",
  });

  // Handle change for personal information
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  // Handle change for highest degree
  const handleHighestDegreeChange = (e) => {
    const { name, value } = e.target;
    setHighestDegree({
      ...highestDegree,
      [name]: value,
    });
  };

  // Handle change for latest experience
  const handleLatestExperienceChange = (e) => {
    const { name, value } = e.target;
    setLatestExperience({
      ...latestExperience,
      [name]: value,
    });
  };

  // Handle form submission to call the API
  const handleSubmit = async () => {
    const profileData = {
      name: personalInfo.name,
      email: personalInfo.email,
      address: personalInfo.address,
      cellPhone: personalInfo.cellPhone,
      highestDegree: highestDegree.highestDegree,
      yearOfDegree: highestDegree.yearOfDegree,
      latestInstitutionName: latestExperience.latestInstitutionName,
      latestJobTitle: latestExperience.latestJobTitle,
      latestExperienceFrom: latestExperience.latestExperienceFrom,
      latestExperienceTo: latestExperience.latestExperienceTo,
    };

    try {
      const response = await createOrUpdateProfile(profileData);
      console.log("Profile updated successfully:", response);
      toast.success("Profile updated successfully:");
      // You can add further actions here, like showing success messages or navigating
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Failed to update profile:", error);
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
      path: "/viewallpublications",
    },
    {
      label: "Research Grants and Contracts",
      path: "/research-grants-and-contracts",
    },
  ];

  return (
    <>
      <div className="add_personal_info_container">
        <Sidebar />
        <div className="add_personal_info">
          <div className="navbar-div">
            <NavBar />
          </div>
          <div className="add-personalInfo_card">
            <h3 className="add-personalInfo_heading">
              Research portfolio | Personal Information
            </h3>
            <div className="PI2_bred-crumb">
              <Breadcrumb items={breadCrumps} activePath={currentPath} />
            </div>

            <div className="personal_info_data">
              <h3 className="add-personalInfo_heading">Personal Information</h3>
              <div className="multiInputFields">
                <div className="InputGroup">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Administrator"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="InputGroup">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    // placeholder="Email"
                    value={personalInfo.email}
                    disabled
                  />
                </div>
                <div className="InputGroup">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="5c Nazimabad karachi"
                    value={personalInfo.address}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="InputGroup">
                  <label>Cell Phone</label>
                  <input
                    type="text"
                    name="cellPhone"
                    value={personalInfo.cellPhone}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>

              <h3 className="add-personalInfo_heading">Education</h3>
              <div className="multiInputFields">
                <div className="InputGroup">
                  <label>Degree</label>
                  <input
                    type="text"
                    name="highestDegree"
                    placeholder="eg: BS ,MS"
                    value={highestDegree.highestDegree}
                    onChange={handleHighestDegreeChange}
                  />
                </div>
                <div className="InputGroup">
                  <label>Year</label>
                  <input
                    type="text"
                    name="yearOfDegree"
                    placeholder="e.g: 2018"
                    value={highestDegree.yearOfDegree}
                    onChange={handleHighestDegreeChange}
                  />
                </div>
              </div>

              <h3 className="add-personalInfo_heading">Experience</h3>
              <div className="multiInputFields">
                <div className="InputGroup">
                  <label>Institution</label>
                  <input
                    type="text"
                    name="latestInstitutionName"
                    placeholder="JUW"
                    value={latestExperience.latestInstitutionName}
                    onChange={handleLatestExperienceChange}
                  />
                </div>
                <div className="InputGroup">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="latestJobTitle"
                    // placeholder="Job Title"
                    value={latestExperience.latestJobTitle}
                    onChange={handleLatestExperienceChange}
                  />
                </div>
                <div className="InputGroup">
                  <label>From Date</label>
                  <input
                    type="date"
                    name="latestExperienceFrom"
                    value={latestExperience.latestExperienceFrom}
                    onChange={handleLatestExperienceChange}
                  />
                </div>
                <div className="InputGroup">
                  <label>To Date</label>
                  <input
                    type="date"
                    name="latestExperienceTo"
                    value={latestExperience.latestExperienceTo}
                    onChange={handleLatestExperienceChange}
                  />
                </div>
              </div>
              

              <div className="EPI_save-btn-bg">
                <button className="EPI_savebut" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="juw_copyright">
          {/* <div className="add-personalInfo_juw_copyright"> */}
            <p>© 2024, all rights reserved by Jinnah University for Women.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo2;


