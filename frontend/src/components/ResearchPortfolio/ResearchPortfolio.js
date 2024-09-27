// implementing toast
import React, { useState, useEffect } from "react";
import "./researchportfolio.css";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import NavBar from "../shared-components/navbar/NavBar";
import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
import { useLocation } from "react-router-dom";
import { getProfile } from "../../api/Api";
import { toast } from 'react-toastify'


const formatDate = (dateString) => {
  if (!dateString) return ""; 
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; 
};



const ResearchPortfolio = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  // State to store user profile data
  const [profileData, setProfileData] = useState({
    personal_information: {
      Name: "Administrator",   
      email: "oricadmin@juw.edu.pk",
      // email: "",
      address: "",
      cellPhone: ""
    },
    highest_degree: {
      degree: "",
      year: ""
    },
    latest_experience: {
      institutionName: "",
      jobTitle: "",
      from: "",
      to: ""
    }
  });

  // Titles for each section
  const personalInformationTitle = [
    "Name:",
    "Email:",
    "Address:",
    "Cell Phone:"
  ];

  const highestDegreeTitle = [
    "Degree:",
    "Year:"
  ];

  const latestExperienceTitle = [
    "Institution Name:",
    "Job Title:",
    "From (Date):",
    "To (Date):"
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData({
          personal_information: {
            name: data.name || "Administrator",
            email: data.email || "oricadmin@juw.edu.pk",
            address: data.address || "",
            cellPhone: data.cellPhone || ""
          },
          highest_degree: {
            degree: data.highestDegree || "",
            year: data.yearOfDegree || ""
          },
          latest_experience: {
            institutionName: data.latestInstitutionName || "",
            jobTitle: data.latestJobTitle || "",
            from: formatDate(data.latestExperienceFrom),
            to: formatDate(data.latestExperienceTo) 
          }
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        // toast.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    navigate("/edit-personal-info");
  };

  const breadCrumps = [
    { label: "Personal Information", path: "/researchportfolio" },
    { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
    { label: "Membership", path: "/membership" },
    { label: "Publications", path: "/viewallpublications" },
    { label: "Research Grants and Contracts", path: "/research-grants-and-contracts" }
  ];

  return (
    <div className="personal-information-container">
      <Sidebar />
      <div className="personal-information">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="personal-information-card">
          <h3 className="research-portfolio">
            Research portfolio | Personal Information
          </h3>
          <div className="pi-bredcrumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <hr />
          <div className="personal_information-table">
            <div className="personal-information-section">
              <h5 className="personal-info-heading">PERSONAL INFORMATION</h5>
              <table>
                <tbody>
                  {personalInformationTitle.map((title, index) => (
                    <tr key={index}>
                      <td className="key-column">{title}</td>
                      <td className="value-column">
                        {Object.values(profileData.personal_information)[index]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />

              <h5 className="personal-info-heading">Highest Degree</h5>
              <table>
                <tbody>
                  {highestDegreeTitle.map((title, index) => (
                    <tr key={index}>
                      <td className="key-column">{title}</td>
                      <td className="value-column">
                        {Object.values(profileData.highest_degree)[index]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />

              <h5 className="personal-info-heading">Latest Experience</h5>
              <table>
                <tbody>
                  {latestExperienceTitle.map((title, index) => (
                    <tr key={index}>
                      <td className="key-column">{title}</td>
                      <td className="value-column">
                        {Object.values(profileData.latest_experience)[index]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                className="edit-button"
                onClick={handleEditClick}
              >
                EDIT
              </button>
            </div>
          </div>
          <div className="juw-copyright">
            <p>© 2024, all rights reserved by Jinnah University for Women.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPortfolio;


