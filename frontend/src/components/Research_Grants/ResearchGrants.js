// api integrated
import React, { useEffect, useState } from "react";
import "./researchgrants.css";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
import NavBar from "../shared-components/navbar/NavBar";
import Sidebar from "../Sidebar/Sidebar";
import { getCompletedResearchProjects, getFundedProjects } from "../../api/Api";



const ResearchGrants = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const [completedResearchProjects, setCompletedResearchProjects] = useState([]);
  const [fundedProjects, setFundedProjects] = useState([]);
  const [error, setError] = useState(null);

  const breadCrumps = [
    { label: " Personal Information", path: "/researchportfolio" },
    { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
    { label: "Membership", path: "/membership" },
    { label: "Publications", path: "/viewallpublications" },
    { label: "Research Grants and Contracts", path: "/research-grants-and-contracts" },
  ];

  const research_projects_title = [
    "Title",
    "Date of Completion",
    "Agency/Organization",
    "Total Award Amount",
  ];

  const funded_or_inprogress_title = [
    "Title",
    "Date of acceptance",
    "Agency/Organization",
    "Total Award Amount",
  ];

  const handleEditClick = () => {
    navigate("/add-research-grants-and-contracts");
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const completedProjects = await getCompletedResearchProjects();

        const completedData = completedProjects.map(({ title, date_of_completion, agency, total_award_amount }) => ({
          title,
          date_of_completion,
          agency,
          total_award_amount,
        }));

        setCompletedResearchProjects(completedData);

        const fundedProjects = await getFundedProjects();


        const fundedData = fundedProjects.map(({ title, date_of_acceptance, agency, total_award_amount }) => ({
          title,
          date_of_acceptance,
          agency,
          total_award_amount,
        }));

        setFundedProjects(fundedData);
        
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);


  return (
    <div className="researchgrants-container">
      <Sidebar />
      <div className="researchgrants">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="researchgrants-card">
          <h4>Research portfolio | Research Grants and Contracts</h4>
          <div className="rg-bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="h4-heading">
            <h4>Completed Research Projects</h4>
          </div>
          <div className="researchgrants-table1">
            <table>
              <thead>
                <tr>
                  <th colSpan="2" className="table-heading">
                    PROJECT DETAILS
                  </th>
                </tr>
              </thead>
              <tbody>
                {completedResearchProjects?.map((project, index) =>
                  Object.entries(project).map(([key, value], subIndex) => (
                    <tr key={subIndex}>
                      <td className="key-column">{research_projects_title[subIndex]}</td>
                      <td className="value-column">{value}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="h4-heading">
            <h4>Funded & In Progress, In Review</h4>
          </div>
          <div className="researchgrants-table2">
            <table>
              <thead>
                <tr>
                  <th colSpan="2" className="table-heading">
                    PROJECT DETAILS
                  </th>
                </tr>
              </thead>
              <tbody>
                {fundedProjects?.map((project, index) =>
                  Object.entries(project).map(([key, value], subIndex) => (
                    <tr key={subIndex}>
                      <td className="key-column">{funded_or_inprogress_title[subIndex]}</td>
                      <td className="value-column">{value}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <button type="button" className="edit-button" onClick={handleEditClick}>
            EDIT
          </button>
        </div>
        <div className="juw-copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default ResearchGrants;








//  not integrated
// import React from "react";
// import "./researchgrants.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
// import NavBar from "../shared-components/navbar/NavBar";
// import Sidebar from "../Sidebar/Sidebar";

// const ResearchGrants = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const navigate = useNavigate();



//   const breadCrumps = [
//     {
//       label: " Personal Information",
//       path: "/researchportfolio",
//     },
//     {
//       label: "Honor and Awards, Scholarship",
//       path: "/honorandawards",
//     },
//     {
//       label: "Membership",
//       path: "/membership",
//     },
//     {
//       label: "Publications",
//       path: "/viewallpublications",
//     },
//     {
//       label: "Research Grants and Contracts",
//       path: "/research-grants-and-contracts",
//     },
//   ];

//   const completed_research_projects = [
//     {
//       Title: "Anti-depressant Effect of Fluoxetine on Brain Indolamine Levels to Improve the RA Associated Depression in Adjuvant Induced Arthritic Rats",
//       DateofCompletion: "0000-00-00",
//       AgencyOrganization: "juw",
//       TotalAwardAmount: "20.00",
//     },
//     {
//       Title: "project saphire",
//       DateofCompletion: "0000-00-00",
//       AgencyOrganization: "Saphire",
//       TotalAwardAmount: "1.00",
//     },
//     {
//       Title: "project tesla",
//       DateofCompletion: "0000-00-00",
//       AgencyOrganization: "Tesla",
//       TotalAwardAmount: "5.00",
//     },
//   ];

//   const funded_or_inprogress = [
//     {
//       Title: "Test1",
//       DateofAcceptance: "2026-12-06",
//       AgencyOrganization: "juw",
//       TotalAwardAmount: "63200.00",
//     },
//     {
//       Title: "Test2",
//       DateofAcceptance: "2026-12-06",
//       AgencyOrganization: "juw",
//       TotalAwardAmount: "65200.00",
//     },
//     {
//       Title: "Test3",
//       DateofAcceptance: "2027-12-04",
//       AgencyOrganization: "juw",
//       TotalAwardAmount: "78000.00",
//     },
//   ];

//   const research_projects_title = [
//     "Title",
//     "Date of Completion",
//     "Agency/Organization",
//     "Total Award Amount",
//   ];

//   const funded_or_inprogress_title = [
//     "Title",
//     "Date of acceptance",
//     "Agency/Organization",
//     "Total Award Amount",
//   ];

//   const handleEditClick = () => {
//     navigate("/add-research-grants-and-contracts");
//   };


//   return (
//     <div className="researchgrants-container">
//       <Sidebar />
//       <div className="researchgrants">
//         <div className="navbar-div">
//           <NavBar />
//         </div>
//         <div className="researchgrants-card">
//           <h4>Research portfolio | Research Grants and Contracts</h4>
//           <div className="rg-bred-crumb">
//             <Breadcrumb items={breadCrumps} activePath={currentPath} />
//           </div>
//           <div className="h4-heading">
//             <h4>Completed Research Projects</h4>
//           </div>
//           <div className="researchgrants-table1">
//             <table>
//               <thead>
//                 <tr>
//                   <th colSpan="2" className="table-heading">
//                     PROJECT DETAILS
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {completed_research_projects?.map((project, index) =>
//                   Object.entries(project).map(([key, value], subIndex) => (
//                     <tr key={subIndex}>
//                       <td className="key-column">
//                         {research_projects_title[subIndex]}
//                       </td>
//                       <td className="value-column">{value}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="h4-heading">
//             <h4>Funded & In Progress, In Review</h4>
//           </div>
//           <div className="researchgrants-table2">
//             <table>
//               <thead>
//                 <tr>
//                   <th colSpan="2" className="table-heading">
//                     PROJECT DETAILS
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {funded_or_inprogress?.map((project, index) =>
//                   Object.entries(project).map(([key, value], subIndex) => (
//                     <tr key={subIndex}>
//                       <td className="key-column">
//                         {funded_or_inprogress_title[subIndex]}
//                       </td>
//                       <td className="value-column">{value}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <button
//             type="button"
//             className="edit-button"
//             onClick={handleEditClick}
//           >
//             EDIT
//           </button>
//         </div>
//         <div className="juw-copyright">
//             <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//           </div>
//       </div>
//     </div>
//   );
// };

// export default ResearchGrants;









