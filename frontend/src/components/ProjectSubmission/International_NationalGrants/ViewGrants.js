import React, {useState, useEffect} from "react";
import "./viewgrants.css";
import Sidebar from "../../Sidebar/Sidebar";
import NavBar from "../../shared-components/navbar/NavBar";
import { useNavigate } from "react-router-dom";
import NationalGrants from './International/NationalGrants';
import { fetchAllNationalGrants } from "../../../api/Api";
import { useParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";


const ViewGrants = () => {
  const navigate = useNavigate();
  const [nationalGrants, setNationalGrants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      } catch (error) {
        throw error
      }
    };

    loadProjects();
  }, []);

 

  const handleViewClick = (id) => {
    navigate(`/international/national-grants/${id}`);
  };

   // Filter projects based on search term (Name of PI)
   const filteredGrants = nationalGrants.filter((project) => {
    const piName = project.proposalCover?.principalInvestigator?.name || "";
    const title = project?.proposalCover?.titleOfProject || "";
    return (
      piName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      title.toLowerCase().includes(searchTerm.toLowerCase()) 
  );
  });


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
        <div className="viewgrants-navbar-div">
        <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchplaceholder="Search Grants " />
        </div>
        <div className="viewgrants-card">
          <div className="d-flex align-items-center justify-content-between">
            
          <h5>International/National Grants | Proposal Cover</h5>
          
          {/* <div className="searchbar m-2">
                <input type="text" placeholder='Search by Name of PI'  value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />      
                  <IoIosSearch />
             </div> */}
            </div>
          <div className="viewgrants-table-data">
            <div className="viewgrants-table-container">
            {filteredGrants.length > 0 ? (
              filteredGrants.map((project, index) =>  (
                <div key={index} className="viewgrants-list-table">
                  <div className="viewgrants-detail">
                    <h5  className="d-flex justify-content-center align-items-center">Project Details #{index + 1}</h5>
                    <button type="button" className="m-0"  onClick={() => handleViewClick(project.id)}>
                      VIEW
                    </button>
                  </div>
                  <div className="viewgrants-list-table-format title">
                    <b>Title:</b>
                    <span>{project?.proposalCover?.titleOfProject}</span>
                  </div>
                  <div className="viewgrants-list-table-format">
                    <b>Name of PI:</b>
                    <span>{project.proposalCover?.principalInvestigator?.name}</span>
                  </div>
                  <div className="viewgrants-list-table-format">
                    <b>Name of PI Institute:</b>
                    <span>{project.proposalCover?.principalInvestigator?.institutionName}</span>
                  </div>
                  <div className="viewgrants-list-table-format">
                    <b>Total Budget Requested:</b>
                    <span>{project?.proposalCover?.totalBudgetRequested}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex align-items-center text-12 border-top pb-2">
                
                    <h5 className="display-1 mt-5">Project Not Found</h5>
                  </div>
            )}
            </div>
          </div>
        </div>
        <div className="juw-copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default ViewGrants;
