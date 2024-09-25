// import React, {useState} from "react";
// import "./adminDashboard.css";
// import NavBar from "../shared-components/navbar/NavBar";
// import Sidebar from "../Sidebar/Sidebar";
// import { toast } from "react-toastify";
// import { approveProject } from "../../api/Api";

// const AdminDashboard = () => {
//     const [error, setError] = useState("");
//     const [users, setUsers] = useState([
//         {
//             title: "Mr.",
//             name: "John Doe",
//             username: "johndoe",
//             email: "john.doe@example.com",
//           },
//           {
//             title: "Ms.",
//             name: "Jane Smith",
//             username: "janesmith",
//             email: "jane.smith@example.com",
//           },
//           {
//             title: "Dr.",
//             name: "Emily Johnson",
//             username: "emilyjohnson",
//             email: "emily.johnson@example.com",
//           },
//           {
//             title: "Prof.",
//             name: "Michael Brown",
//             username: "michaelbrown",
//             email: "michael.brown@example.com",
//           },
//     ]);
//     const [data, setData] = useState({
//       title: "",
//       name: "",
//       username: "",
//       email: "",
//     });

// const handleApprove = async (userId) => {
//     try {
//         const result = await approveProject(userId);
//         toast.success(`User ${result.name} request approved successfully!`);

//     } catch (err) {
//         setError(err.error || 'Failed to approve the user');
//         toast.error(err.error || 'Failed to approve the user');
//     }
// };

//   return (
//     <>
//       <div className="whole-page-container">
//         <Sidebar />
//         <div className="admin-dashboard">
//           <div className="navbar-div">
//             <NavBar />
//           </div>
//           <div className="admin-dashboard-card">
//             <h4>Users and Roles</h4>

//             <div className="admin-dashboard-table-container">
//               <h5>Current Users</h5>
//               <table className="user-table">
//                 <thead>
//                   <tr className="list-table-format title">
//                     <th>Title</th>
//                     <th>Name</th>
//                     <th>Username</th>
//                     <th>Email</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user, index) => (
//                     <tr key={index} className="list-table-format">
//                       <td>{user.title}</td>
//                       <td>{user.name}</td>
//                       <td>{user.username}</td>
//                       <td>{user.email}</td>
//                       <td>{user.role}</td>
//   <td>
//     <button
//       // type="button"
//       className="pending_create-user-btn"
//       onClick={() => handleApprove(user.username)}
//     >
//       PENDING
//     </button>
//     <button
//       // type="button"
//       className="approve_create-user-btn"
//     >
//       APPROVE
//     </button>
//   </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="juw-copyright">
//             <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import NavBar from "../shared-components/navbar/NavBar";
import Sidebar from "../Sidebar/Sidebar";
import { toast } from "react-toastify";
import { getAllResearchProjects, approveProject } from "../../api/Api";

const AdminDashboard = () => {
  const [error, setError] = useState("");
  const [researchProjects, setResearchProjects] = useState([]);
  // const [ORICProjects, setORICProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  //   const proposalCover = JSON.parse(ORICProjects.proposalCover || "{}");
  //   useEffect(() => {
  //     const fetchResearchProjects = async () => {
  //       try {
  //         const filteredProjects = await getAllResearchProjects();
  //         setResearchProjects(filteredProjects);
  //       } catch (err) {
  //         setError(err.message || "Failed to fetch research projects");
  //       } finally {
  //         setLoading(false); // Always set loading to false after try/catch
  //       }
  //     };

  //     fetchResearchProjects();
  //   }, []);
  const handleApprove = async (userId) => {
    try {
      const result = await approveProject(userId);
      toast.success(`User ${result.name} request approved successfully!`);
    } catch (err) {
      setError(err.error || "Failed to approve the user");
      toast.error(err.error || "Failed to approve the user");
    }
  };

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await getAllResearchProjects();
        setResearchProjects(projects);
        // setORICProjects(projects);
        setLoading(false);
        console.log(projects);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    loadProjects();
  }, []);

//   const handleApprove = async (projectId) => {
//     try {
//       const result = await approveProject(projectId);
//       toast.success(`Project by ${result.nameOfPI} approved successfully!`);
//       setResearchProjects((prev) =>
//         prev.filter((proj) => proj.id !== projectId)
//       ); // Optionally remove the approved project
//       // setORICProjects((prev) => prev.filter((proj) => proj.id !== projectId)); // Optionally remove the approved project
//     } catch (err) {
//       setError(err.message || "Failed to approve the project");
//       toast.error(err.message || "Failed to approve the project");
//     }
//   };

  //   if (loading) {
  //     return <p>Loading...</p>;
  //   }

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

          <div className="admin-dashboard-table-container">
            <h5>Projects</h5>
            <table className="user-table">
              <thead>
                <tr className="list-table-format title">
                  <th>Title</th>
                  <th>Principal Investigator (PI)</th>
                  <th>Faculty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {researchProjects.map((project) => {
                  const proposalCover = JSON.parse(
                    project.proposalCover || "{}"
                  );
                  return (
                    <tr key={project.id} className="list-table-format">
                      <td>{proposalCover.title}</td>
                      <td>{proposalCover.nameOfPI}</td>
                      <td>{proposalCover.nameOfFaculty}</td>
                      <td>
                        <button
                          // type="button"
                          className="pending_create-user-btn"
                            // onClick={() => handleApprove(user.username)}
                        >
                          PENDING
                        </button>
                        <button
                          // type="button"
                          className="approve_create-user-btn"
                        >
                          APPROVE
                        </button>
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
