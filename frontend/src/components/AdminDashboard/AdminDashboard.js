// original workinng code
// import React, { useState, useEffect } from "react";
// import "./adminDashboard.css";
// import NavBar from "../shared-components/navbar/NavBar";
// import Sidebar from "../Sidebar/Sidebar";
// import { toast } from "react-toastify";
// import { getAllResearchProjects, approveProject, rejectProject } from "../../api/Api";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from 'jwt-decode';


// const AdminDashboard = () => {
//   const [error, setError] = useState("");
//   const [researchProjects, setResearchProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate()
//   const [filter, setFilter] = useState("all");
//   const [userRole, setUserRole] = useState('');


//   const handleApprove = async (projectId) => {
//     try {
//       const result = await approveProject(projectId);
//       toast.success(`Project by ${result.nameOfPI} approved successfully!`);
//       setResearchProjects((prev) => prev.filter((proj) => proj.id !== projectId));
//     } catch (err) {
//       setError(err.message || "Failed to approve the project");
//       toast.error(err.message || "Failed to approve the project");
//     }
//   };

//   const handleReject = async (projectId) => {
//     try {
//       const result = await rejectProject(projectId);
//       toast.success(`Project by ${result.nameOfPI} rejected successfully!`);
//       setResearchProjects((prev) => prev.filter((proj) => proj.id !== projectId));
//     } catch (err) {
//       setError(err.message || "Failed to reject the project");
//       toast.error(err.message || "Failed to reject the project");
//     }
//   };


//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decoded = jwtDecode(token);
//       setUserRole(decoded.role);
//     }
//   }, []);


//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         const projects = await getAllResearchProjects();
//         setResearchProjects(projects);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error loading projects:", error);
//       }
//     };

//     loadProjects();
//   }, []);

//   useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     const filterParam = query.get("filter");
//     if (filterParam) {
//       setFilter(filterParam); 
//     }
//   }, []);

//   const filteredProjects = researchProjects.filter((project) => {
//     if (filter === "all") return true;
//     return project.status.toLowerCase() === filter;
//   });

//   // if (loading) {
//   //   return <p>Loading...</p>;
//   // }

//   return (
//     <div className="whole-page-container">
//       <Sidebar />
//       <div className="admin-dashboard">
//         <div className="navbar-div">
//           <NavBar />
//         </div>
//         <div className="admin-dashboard-card">
//           <h4>ADMIN DASHBOARD</h4>
//           {error && <p className="error-message">{error}</p>}


//           {/* Filter Buttons */}
//           <div className="admin-dashboard-filter-buttons">
//             <button className="view-all-button" onClick={() => setFilter("all")}>
//               View All
//             </button>
//             <button className="view-pending-button" onClick={() => setFilter("pending")}>
//               View Pending
//             </button>
//             <button className="view-approved-button" onClick={() => setFilter("approved")}>
//               View Approved 
//             </button>
//           </div>

//           <div className="admin-dashboard-table-container">
//             <h5>Projects</h5>
//             <table className="admin-dashboard-user-table">
//               <thead>
//                 <tr className="admin-dashboard-list-table-format title">
//                   <th>Title</th>
//                   <th>Principal Investigator (PI)</th>
//                   <th>Faculty</th>
//                   <th>Status</th>
//                   {/* <th>Actions</th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProjects.map((project) => {
//                   const proposalCover = project.proposalCover
//                     ? JSON.parse(project.proposalCover)
//                     : {};
//                   return (
//                     <tr key={project.id} className="admin-dashboard-list-table-format">
//                       <td>{proposalCover.title}</td>
//                       <td>{proposalCover.nameOfPI}</td>
//                       <td>{proposalCover.nameOfFaculty}</td>
//                       <td>{project.status}</td>
//                       <td>
//                         {project?.status?.toLowerCase().trim() === "pending" && userRole === "admin" && (
//                           <>
//                             <button
//                               className="pending_create-user-btn"
//                               onClick={() => handleReject(project.id)}
//                             >
//                               REJECT
//                             </button>
//                             <button
//                               className="approve_create-user-btn"
//                               onClick={() => handleApprove(project.id)}
//                             >
//                               APPROVE
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="juw-copyright">
//           <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// perfect
import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import NavBar from "../shared-components/navbar/NavBar";
import Sidebar from "../Sidebar/Sidebar";
import { toast } from "react-toastify";
import { getAllResearchProjects, approveProject, rejectProject } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const AdminDashboard = () => {
  const [error, setError] = useState("");
  const [researchProjects, setResearchProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [userRole, setUserRole] = useState('');

  const handleApprove = async (projectId) => {
    try {
      const result = await approveProject(projectId);
      toast.success(`Project by ${result.nameOfPI} approved successfully!`);
      setResearchProjects((prev) => prev.filter((proj) => proj.id !== projectId));
    } catch (err) {
      setError(err.message || "Failed to approve the project");
      toast.error(err.message || "Failed to approve the project");
    }
  };

  const handleReject = async (projectId) => {
    try {
      const result = await rejectProject(projectId);
      toast.success(`Project by ${result.nameOfPI} rejected successfully!`);
      setResearchProjects((prev) => prev.filter((proj) => proj.id !== projectId));
    } catch (err) {
      setError(err.message || "Failed to reject the project");
      toast.error(err.message || "Failed to reject the project");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
    }
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await getAllResearchProjects();
        setResearchProjects(projects);
        setLoading(false);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const filterParam = query.get("filter");
    if (filterParam) {
      setFilter(filterParam);
    }
  }, []);

  // Count the total, pending, and approved projects
  const totalProjects = researchProjects.length;
  const pendingCount = researchProjects.filter((project) => project.status.toLowerCase() === "pending").length;
  const approvedCount = researchProjects.filter((project) => project.status.toLowerCase() === "approved").length;

  const filteredProjects = researchProjects.filter((project) => {
    if (filter === "all") return true;
    return project.status.toLowerCase() === filter;
  });

  return (
    <div className="whole-page-container">
      <Sidebar />
      <div className="admin-dashboard">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="admin-dashboard-card">
          <h4>ADMIN DASHBOARD</h4>
          {error && <p className="error-message">{error}</p>}

          {/* Filter Buttons */}
          <div className="admin-dashboard-filter-buttons">
            <button className="view-all-button" onClick={() => setFilter("all")}>
              View All ({totalProjects})
            </button>
            <button className="view-pending-button" onClick={() => setFilter("pending")}>
              View Pending ({pendingCount})
            </button>
            <button className="view-approved-button" onClick={() => setFilter("approved")}>
              View Approved ({approvedCount})
            </button>
          </div>

          <div className="admin-dashboard-table-container">
            {/* <h5>Projects</h5> */}
            <table className="admin-dashboard-user-table">
              <thead>
                <tr className="admin-dashboard-list-table-format title">
                  <th>Title</th>
                  <th>Principal Investigator (PI)</th>
                  <th>Faculty</th>
                  <th>Status</th>
                  {userRole === "admin" && (
                  <th>Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => {
                  const proposalCover = project.proposalCover
                    ? JSON.parse(project.proposalCover)
                    : {};
                  return (
                    <tr key={project.id} className="admin-dashboard-list-table-format">
                      <td>{proposalCover.title}</td>
                      <td>{proposalCover.nameOfPI}</td>
                      <td>{proposalCover.nameOfFaculty}</td>
                      <td>{project.status}</td>
                      <td>
                        {project?.status?.toLowerCase().trim() === "pending" && userRole === "admin" && (
                          <>
                            <button
                              className="pending-create-user-btn"
                              onClick={() => handleReject(project.id)}
                            >
                              REJECT
                            </button>
                            <button
                              className="approve-create-user-btn"
                              onClick={() => handleApprove(project.id)}
                            >
                              APPROVE
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="juw-copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


