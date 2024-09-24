import React, {useState, useEffect} from "react";
import "./viewORICFundedProjects.css";
import Sidebar from "../../Sidebar/Sidebar";
import NavBar from "../../shared-components/navbar/NavBar";
import { useNavigate } from "react-router-dom";
import { fetchORICProjects } from "../../../api/Api";

const ViewORICFundedProjects = () => {
  const navigate = useNavigate();
  const [ORICProjects, setORICProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await fetchORICProjects();
        setORICProjects(projects);
        console.log(projects);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    loadProjects();
  }, []);


  const handleViewClick = (id) => {
    navigate(`/oric-funded-project/${id}`);
  };

  // const ORICProjects = [
  //   {
  //     Title:
  //       "Low cost effective production of alginate salts. Low cost effective production of alginate salts. Low cost effective production of alginate salts. Low cost effective production of alginate salts.",
  //     NameofPI:
  //       "Low cost effective production of alginate salts. Low cost effective production of alginate salts. Low cost effective production of alginate salts. Low cost effective production of alginate salts.",
  //     NameofFaculty:
  //       "Low cost effective production of alginate salts. Low cost effective production of alginate salts. Low cost effective production of alginate salts. Low cost effective production of alginate salts.",
  //     TotalBudgetRequested: "30000",
  //   },
  //   {
  //     Title: "test2",
  //     NameofPI: "test",
  //     NameofFaculty: "test",
  //     TotalBudgetRequested: "30000",
  //   },
  //   {
  //     Title: "test3",
  //     NameofPI: "test",
  //     NameofFaculty: "test",
  //     TotalBudgetRequested: "30000",
  //   },
  //   {
  //     Title: "test4",
  //     NameofPI: "test",
  //     NameofFaculty: "test",
  //     TotalBudgetRequested: "30000",
  //   },
  // ];

  return (
    <div className="vieworicfundedproject_container">
      <Sidebar />
      <div className="vieworicfundedproject">
        <div className="vieworic_navbar-div">
          <h4>Submission | Intellectual Property</h4>
          <NavBar />
        </div>
        <div className="vieworicfundedproject-card">
          <h5>ORIC Funded Project | Proposal Cover</h5>

          <div className="vieworicfundedproject-table-data">
            <div className="vieworicfundedproject-table-container">
              {ORICProjects.map((project, index) => {
                const proposalCover = JSON.parse(project.proposalCover || "{}");
                return (
                <div key={index} className="vieworicfundedproject-list-table">
                  <div className="View_project_detail">
                    <h5>Project Details #{index + 1}</h5>
                    <button type="button" onClick={() => handleViewClick(project.id)}>
                      VIEW
                    </button>
                  </div>
                  <div className="vieworicfundedproject-list-table-format title">
                    <b>Title:</b>
                    <span>{proposalCover.title}</span>
                  </div>
                  <div className="vieworicfundedproject-list-table-format">
                    <b>Name of PI</b>
                    <span>{proposalCover.nameOfPI}</span>
                  </div>
                  <div className="vieworicfundedproject-list-table-format">
                    <b>Name of Faculty</b>
                    <span>{proposalCover.nameOfFaculty}</span>
                  </div>
                  <div className="vieworicfundedproject-list-table-format">
                    <b>Total Budget Requested</b>
                    <span>{proposalCover.totalBudgetRequested}</span>
                  </div>
                </div>
              )})}
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

export default ViewORICFundedProjects;
