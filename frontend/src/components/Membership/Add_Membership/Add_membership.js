// api integrated
import React, { useState } from "react";
import "./add_membership.css";
import Sidebar from "../../Sidebar/Sidebar";
import NavBar from "../../shared-components/navbar/NavBar";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../shared-components/breadcrumps/BreadCrumps";
import { createMembership } from "../../../api/Api";
import { toast } from "react-toastify";


const Add_membership = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSave = async () => {
    if (description.trim() === "") {
      toast.error("Membership description cannot be empty.")
      setError("Membership description cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Assuming description is a string, wrap it in an array to match the API schema
      const descriptionArray = description.split("\n").filter((line) => line.trim() !== "");
      
      // Call the API
      const response = await createMembership(descriptionArray);
      toast.success("Success!")
      console.log("Membership created successfully:", response);
      
      // Clear the input after successful save
      setDescription("");
    } catch (error) {
      toast.error("Failed to save membership. Please try again.")
      setError("Failed to save membership. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const breadCrumps = [
    { label: "Personal Information", path: "/researchportfolio" },
    { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
    { label: "Membership", path: "/membership" },
    { label: "Publications", path: "/viewallpublications" },
    { label: "Research Grants and Contracts", path: "/research-grants-and-contracts" },
  ];

  return (
    <div className="add-membership-container">
      <Sidebar />
      <div className="add-membership">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="add-membership-card">
          <h3>Research portfolio | Membership</h3>
          <div className="e-membership-bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <h5>Membership</h5>
          <p>
            (List memberships in professional and learned Societies, indicating offices held, committees, or other specific assignments)
          </p>
          <div className="textarea">
            <label htmlFor="exampleTextarea">List:</label>
            <textarea
              required
              id="exampleTextarea"
              value={description}
              onChange={handleChange}
              rows="5"
              cols="50"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="button-container">
            <button className="am-button" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "SAVE"}
            </button>
          </div>
        </div>
        <div className="juw-copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default Add_membership;







