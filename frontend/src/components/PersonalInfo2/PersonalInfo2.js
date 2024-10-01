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
      toast.success("Profile updated successfully:");
      // You can add further actions here, like showing success messages or navigating
    } catch (error) {
      toast.error("Failed to update profile");
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
      <div className="add-personal-info-container">
        <Sidebar />
        <div className="add-personal-info">
          <div className="navbar-div">
            <NavBar />
          </div>
          <div className="add-personalinfo-card">
            <h3 className="add-personalinfo-heading">
              Research portfolio | Personal Information
            </h3>
            <div className="pi2-bred-crumb">
              <Breadcrumb items={breadCrumps} activePath={currentPath} />
            </div>

            <div className="personal-info-data">
              <h3 className="add-personalinfo-heading">Personal Information</h3>
              <div className="multiinputfields">
                <div className="inputgroup">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Administrator"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="inputgroup">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    // placeholder="Email"
                    value={personalInfo.email}
                    disabled
                  />
                </div>
                <div className="inputgroup">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="5c Nazimabad karachi"
                    value={personalInfo.address}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="inputgroup">
                  <label>Cell Phone</label>
                  <input
                    type="text"
                    name="cellPhone"
                    value={personalInfo.cellPhone}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>

              <h3 className="add-personalinfo-heading">Education</h3>
              <div className="multiinputfields">
                <div className="inputgroup">
                  <label>Degree</label>
                  <input
                    type="text"
                    name="highestDegree"
                    placeholder="eg: BS ,MS"
                    value={highestDegree.highestDegree}
                    onChange={handleHighestDegreeChange}
                  />
                </div>
                <div className="inputgroup">
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

              <h3 className="add-personalinfo-heading">Experience</h3>
              <div className="multiinputfields">
                <div className="inputgroup">
                  <label>Institution</label>
                  <input
                    type="text"
                    name="latestInstitutionName"
                    placeholder="JUW"
                    value={latestExperience.latestInstitutionName}
                    onChange={handleLatestExperienceChange}
                  />
                </div>
                <div className="inputgroup">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="latestJobTitle"
                    // placeholder="Job Title"
                    value={latestExperience.latestJobTitle}
                    onChange={handleLatestExperienceChange}
                  />
                </div>
                <div className="inputgroup">
                  <label>From Date</label>
                  <input
                    type="date"
                    name="latestExperienceFrom"
                    value={latestExperience.latestExperienceFrom}
                    onChange={handleLatestExperienceChange}
                  />
                </div>
                <div className="inputgroup">
                  <label>To Date</label>
                  <input
                    type="date"
                    name="latestExperienceTo"
                    value={latestExperience.latestExperienceTo}
                    onChange={handleLatestExperienceChange}
                  />
                </div>
              </div>
              

              <div className="epi-save-btn-bg">
                <button className="epi-savebut" onClick={handleSubmit}>
                  Save
                </button>
              </div>
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

export default PersonalInfo2;


