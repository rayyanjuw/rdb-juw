import React, {useState, useEffect} from "react";
import "./viewgrants.css";
import Sidebar from "../../Sidebar/Sidebar";
import NavBar from "../../shared-components/navbar/NavBar";
import { useNavigate } from "react-router-dom";
import NationalGrants from './International/NationalGrants';
import { fetchAllNationalGrants } from "../../../api/Api";
import { useParams } from "react-router-dom";


const ViewGrants = () => {
  const navigate = useNavigate();
  const [nationalGrants, setNationalGrants] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await fetchAllNationalGrants();
        // Parse the necessary JSON fields
        const parsedProjects = projects.map((project) => ({
          ...project,
          proposalCover: project.proposalCover
            ? JSON.parse(project.proposalCover)
            : {},
          implementationTimeline: project.implementationTimeline
            ? JSON.parse(project.implementationTimeline)
            : {},
          academicSectoralCollaborators: project.academicSectoralCollaborators
            ? JSON.parse(project.academicSectoralCollaborators)
            : {},
          proposedProjectBudget: project.proposedProjectBudget
            ? JSON.parse(project.proposedProjectBudget)
            : {},
        }));
        setNationalGrants(parsedProjects);
        console.log(parsedProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    loadProjects();
  }, []);

 

  const handleViewClick = (id) => {
    navigate(`/international/national-grants/${id}`);
  };

  const Grants = [
    {
      Title:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      NameofPI: "test",
      NameofPIInstitute:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      TotalBudgetRequested: "30000",
    },
  ];

  return (
    <div className="viewgrants-container">
      <Sidebar />
      <div className="viewgrants">
        {/* <div className="navbar-div">
          <NavBar />
        </div> */}
        <div className="viewgrants_navbar-div">
          <NavBar />
        </div>
        <div className="viewgrants-card">
          <h5>International/National Grants | Proposal Cover</h5>
          <div className="viewgrants-table-data">
            <div className="viewgrants-table-container">
              {nationalGrants.map((project, index) =>  (
                <div key={index} className="viewgrants-list-table">
                  <div className="Viewgrants_detail">
                    <h5>Project Details #{index + 1}</h5>
                    <button type="button" onClick={handleViewClick}>
                      VIEW
                    </button>
                  </div>
                  <div className="viewgrants-list-table-format title">
                    <b>Title:</b>
                    <span>{project.proposalCover.titleOfProject}</span>
                  </div>
                  <div className="viewgrants-list-table-format">
                    <b>Name of PI:</b>
                    <span>{project.proposalCover.principalInvestigator.name}</span>
                  </div>
                  <div className="viewgrants-list-table-format">
                    <b>Name of PI Institute:</b>
                    <span>{project.proposalCover.principalInvestigator.institutionName}</span>
                  </div>
                  <div className="viewgrants-list-table-format">
                    <b>Total Budget Requested:</b>
                    <span>{project.proposalCover.totalBudgetRequested}</span>
                  </div>
                </div>
              ))}
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

export default ViewGrants;
