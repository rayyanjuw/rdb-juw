import React, { useEffect, useState } from "react";
import "./membership.css";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../shared-components/navbar/NavBar";
import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
import { useLocation, useNavigate } from "react-router-dom";
import { getMemberships } from "../../api/Api";

const Membership = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  
  // State to store memberships
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch memberships on component mount
  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const data = await getMemberships();
        setMemberships(data);
      } catch (error) {
        console.error("Failed to fetch memberships", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  const breadCrumps = [
    { label: " Personal Information", path: "/researchportfolio" },
    { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
    { label: "Membership", path: "/membership" },
    { label: "Publications", path: "/viewallpublications" },
    { label: "Research Grants and Contracts", path: "/research-grants-and-contracts" },
  ];

  const handleEditClick = () => {
    navigate("/add-membership");
  };

  return (
    <div className="membership-container">
      <Sidebar />
      <div className="membership">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="membership-card">
          <h3>Research portfolio | Membership</h3>
          <div className="membership-bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <hr />
          <h5>MEMBERSHIPS</h5>
          <hr />
          {loading ? (
            <p>Loading memberships...</p>
          ) : (
            <ul>
              {memberships.map((membership, index) => (
                <li key={membership.id}>
                  {index + 1}. {membership.description}
                </li>
              ))}
            </ul>
          )}
          <button className="membership-button" onClick={handleEditClick}>
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

export default Membership;

