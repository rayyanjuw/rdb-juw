import React, { useState } from "react";
import "./facilitiesAndFunding.css";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";
import NavBar from "../../../shared-components/navbar/NavBar";
import Sidebar from "../../../Sidebar/Sidebar";
import { toast } from "react-toastify";



const FacilitiesAndFunding = ({ onSave }) => {
  const location = useLocation();
  // const currentPath = location.pathname;
  const breadCrumps = [
    {
      label: "Proposal Cover",
      // path: "/add-international/national-grants",
    },
    {
      label: "Research Project",
      // path: "/oric-funded-project-research-project",
    },
    {
      label: "Facilities and Funding",
      // path: "/oric-funded-project-facilities-and-funding",
    },
    {
      label: "Justification for The Requested Budget Items",
      // path: "/oric-funded-project-justification-and-budget-items",
    },
    {
      label: "Estimated Budget for Proposed Research Period",
      // path: "/oric-funded-project-estimated-budget-proposed-research-period",
    },
  ];

  const [FacilitiesAndFunding, setFacilitiesAndFunding] = useState({
      facilitiesAvailable: "",
      otherSourceOfFunding: "N/A",
  });

  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    setFacilitiesAndFunding((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const { facilitiesAvailable, otherSourceOfFunding } = FacilitiesAndFunding;

    // Check if facilities available is empty
    if (!facilitiesAvailable.trim()) {
      toast.error('Please fill in the facilities available for the research project.');
      return; // Stop the save operation if validation fails
    }

    if (typeof onSave === 'function') {
        onSave(FacilitiesAndFunding); // This will trigger the parent's handleSaveAndNext
    } else {
        console.error('onSave is not a function');
    }
};

  return (
    <div className="facilitiesAndfunding-container">
      <Sidebar />
      <div className="facilitiesAndfunding">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="facilitiesAndfunding-card">
          <h3>ORIC Funded Project | Facilities and Funding</h3>
          <p>Proposal Cover / Research Project / Facilities and Funding / Justification for The Requested Budget Items / Estimated Budget for Proposed Research Period</p>
          {/* <div className="facilitiesAndfunding_bred-crumb"> */}
            {/* <Breadcrumb items={breadCrumps} /> */}
            {/* <Breadcrumb items={breadCrumps} activePath={currentPath} /> */}
          {/* </div> */}
          <div className="facilitiesAndfunding-content">
            <div className="facilitiesAndfunding_textarea">
              <label htmlFor="exampleTextarea">
                Facilities available for the research project in the department:
              </label>
              <textarea
                id="exampleTextarea"
                name="facilitiesAvailable"
                value={FacilitiesAndFunding.facilitiesAvailable}
                // value={formData.facilitiesAvailable}
                onChange={handleLocalChange}
                // onChange={handleInputChange}
                rows="2"
                cols="20"
                required
              />
            </div>

            <div className="facilitiesAndfunding_title-input">
              <label>Other source of funding (if any):</label>
              <input
                type="text"
                name="otherSourceOfFunding"
                value={FacilitiesAndFunding.otherSourceOfFunding}
                // value={formData.sourceOfFunding}
                onChange={handleLocalChange}
                // onChange={handleInputChange}
                placeholder="N/A"
                disabled
              />
            </div>

            <div className="facilitiesAndfunding_btn">
              <button className="facilitiesAndfunding_button" onClick={handleSave} >SAVE</button>
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

export default FacilitiesAndFunding;
