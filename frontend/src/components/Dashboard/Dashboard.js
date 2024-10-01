// added filter functionality for count
import React, {useState, useEffect} from "react";
import "./dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import publications_icon from "../../assets/publications_icon.png";
import i_icon from '../../assets/i_icon.png';
import check_icon from '../../assets/check_icon.png';
import { toast } from "react-toastify";
import { getAllResearchProjects } from "../../api/Api";
import NavBar from "../shared-components/navbar/NavBar";
import pending_icon from "../../assets/pending_icon.png";
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import {
  getAllPublications,
} from "../../api/Api";



const Dashboard = () => {
  // const [error, setError] = useState("");
  const [researchProjects, setResearchProjects] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [userRole, setUserRole] = useState('');


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
        throw error
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPublications();
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalpublications = data.length;
  const totalProjects = researchProjects.length;
  const pendingCount = researchProjects.filter((project) => project.status.toLowerCase() === "pending").length;
  const approvedCount = researchProjects.filter((project) => project.status.toLowerCase() === "approved").length;

  // const filteredProjects = researchProjects.filter((project) => {
  //   if (filter === "all") return true;
  //   return project.status.toLowerCase() === filter;
  // });



  return (
    <>
    <div className="dashboard-whole-page">
      <Sidebar />
      <div className="dashboard">
      <div className='navbar-div'>
        <NavBar/>
        </div>
        <div className="dashboard-card">
          <h3 className="dashboard-portfolio">
            Welcome to the member's area, {userRole}
          </h3>
          <div className="dashboard-subcards">
            <div className="dashboard-subcard">
              <div className="subcard-title">
                <h5>Publications</h5> 
              </div>
              <div className="subcard-number">
                {/* <h4>10</h4> */}
                <h4>{totalpublications}</h4>
              </div>
              <div className="subcard-img">
                <img src={publications_icon} alt="" />
              </div>
              <div className="subcard-link">
              <hr />
                <Link to="/viewallpublications">Add More Publications</Link>
              </div>
            </div>
            <div className="dashboard-subcard">
              <div className="subcard-title">
                <h5>Research Proposal Submitted</h5> 
              </div>
              <div className="subcard-number">
                {/* <h4>5</h4> */}
                <h4>{totalProjects}</h4> 
              </div>
              <div className="subcard-img">
                <img src={i_icon} alt="" />
              </div>
              <div className="subcard-link">
              <hr />
                {/* <Link to="/admin-dashboard?filter=submitted">View All Submitted Proposal</Link> */}
                <Link to="/admin-dashboard">View All Submitted Proposal</Link>
              </div>
            </div>
            <div className="dashboard-subcard">
              <div className="subcard-title">
                <h5>Research Proposal Approved</h5> 
              </div>
              <div className="subcard-number">
                {/* <h4>8</h4> */}
                <h4>{approvedCount}</h4> 
              </div>
              <div className="subcard-img">
                <img src={check_icon} alt="" />
              </div>
              <div className="subcard-link">
              <hr />
                <Link to="/admin-dashboard?filter=approved">View All Approved Proposal</Link>
              </div>
            </div>
            <div className="dashboard-subcard">
              <div className="subcard-title">
                <h5>Research Proposal Pending</h5> 
              </div>
              <div className="subcard-number">
                {/* <h4>8</h4> */}
                <h4>{pendingCount}</h4> 
              </div>
              <div className="subcard-img">
                <img src={pending_icon} alt="" />
              </div>
              <div className="subcard-link">
              <hr />
                <Link to="/admin-dashboard?filter=pending">View All Pending Proposal</Link>
              </div>
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

export default Dashboard;





// previous working code
// import React, {useState} from "react";
// import "./dashboard.css";
// import Sidebar from "../Sidebar/Sidebar";
// import publications_icon from "../../assets/publications_icon.png";
// import i_icon from '../../assets/i_icon.png';
// import check_icon from '../../assets/check_icon.png';
// import NavBar from "../shared-components/navbar/NavBar";
// import pending_icon from "../../assets/pending_icon.png";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
// // const Dashboard = ({ totalProjects, pendingCount, approvedCount }) => {

//   return (
//     <>
//     <div className="dashboard-whole-page">
//       <Sidebar />
//       <div className="dashboard">
//       <div className='navbar-div'>
//         <NavBar/>
//         </div>
//         <div className="dashboard-card">
//           <h3 className="dashboard-portfolio">
//             Welcome to the member's area, admin!
//           </h3>
//           <div className="dashboard-subcards">
//             <div className="dashboard-subcard">
//               <div className="subcard-title">
//                 <h5>Publications</h5> 
//               </div>
//               <div className="subcard-number">
//                 <h4>10</h4>
//               </div>
//               <div className="subcard-img">
//                 <img src={publications_icon} alt="" />
//               </div>
//               <div className="subcard-link">
//               <hr />
//                 <Link to="/viewallpublications">Add More Publications</Link>
//               </div>
//             </div>
//             <div className="dashboard-subcard">
//               <div className="subcard-title">
//                 <h5>Research Proposal Submitted</h5> 
//               </div>
//               <div className="subcard-number">
//                 <h4>5</h4>
//                 {/* <h4>{totalProjects}</h4>  */}
//               </div>
//               <div className="subcard-img">
//                 <img src={i_icon} alt="" />
//               </div>
//               <div className="subcard-link">
//               <hr />
//                 {/* <Link to="/admin-dashboard?filter=submitted">View All Submitted Proposal</Link> */}
//                 <Link to="/admin-dashboard">View All Submitted Proposal</Link>
//               </div>
//             </div>
//             <div className="dashboard-subcard">
//               <div className="subcard-title">
//                 <h5>Research Proposal Approved</h5> 
//               </div>
//               <div className="subcard-number">
//                 <h4>8</h4>
//                 {/* <h4>{approvedCount}</h4>  */}
//               </div>
//               <div className="subcard-img">
//                 <img src={check_icon} alt="" />
//               </div>
//               <div className="subcard-link">
//               <hr />
//                 <Link to="/admin-dashboard?filter=approved">View All Approved Proposal</Link>
//               </div>
//             </div>
//             <div className="dashboard-subcard">
//               <div className="subcard-title">
//                 <h5>Research Proposal Pending</h5> 
//               </div>
//               <div className="subcard-number">
//                 <h4>8</h4>
//                 {/* <h4>{pendingCount}</h4>  */}
//               </div>
//               <div className="subcard-img">
//                 <img src={pending_icon} alt="" />
//               </div>
//               <div className="subcard-link">
//               <hr />
//                 <Link to="/admin-dashboard?filter=pending">View All Pending Proposal</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="juw-copyright">
//           <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//         </div>
//       </div>
//     </div>
//   </>
//   );
// };

// export default Dashboard;


