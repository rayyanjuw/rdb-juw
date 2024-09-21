import React, { useState } from "react";
import "./implementationtimeline.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";
import NavBar from "../../../shared-components/navbar/NavBar";

const ImplementationTimeline = ({ onSave }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadCrumps = [
    { label: "Proposal Cover", path: "/add-international/national-grants" },
    {
      label: "Executive Summary",
      path: "/add-international/national-grants-executive-summary",
    },
    {
      label: "Academic/Sectoral Collaborators",
      path: "/international/national-grants-academic/Sectoral-collaborators",
    },
    {
      label: "Project Description",
      path: "/international/national-grants-project-description",
    },
    {
      label: "Project Management",
      path: "/international/national-grants-project-management",
    },
    {
      label: "Implementation Timeline",
      path: "/international/national-grants-implementation-timeline",
    },
    {
      label: "Physical Resources and Facilities",
      path: "/international/national-grants-physical-resources-and-facilities",
    },
    {
      label: "Scientific Personnel",
      path: "/international/national-grants-scientific-personnel",
    },
    {
      label: "Principal Investigators availed research grant details",
      path: "/international/national-grants-principal-investigators-availed-research-grant-details",
    },
    {
      label: "Risk Management Strategy",
      path: "/international/national-grants-risk-management-strategy",
    },
    {
      label: "List of References",
      path: "/international/national-grants-list-of-references",
    },
    {
      label: "Proposed Project Budget",
      path: "/international/national-grants-proposed-project-budget",
    },
  ];

  const [yearOne, setYearOne] = useState("");
  const [yearTwo, setYearTwo] = useState("");
  const [yearThree, setYearThree] = useState("");

  const [error, setError] = useState({
    yearOne: "",
    yearTwo: "",
    yearThree: "",
  });

  const handleSave = () => {
    const errors = {};
    if (yearOne.length < 10) {
      errors.yearOne = "Year One must contain at least 10 characters.";
    }
    if (yearTwo.length < 10) {
      errors.yearTwo = "Year Two must contain at least 10 characters.";
    }
    if (yearThree.length < 10) {
      errors.yearThree = "Year Three must contain at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      onSave({
        yearOneTasks: yearOne,
        yearTwoTasks: yearTwo,
        yearThreeTasks: yearThree,
      });
    }
  };

  return (
    <div className="implementation-timeline-container">
      <Sidebar />
      <div className="implementation-timeline">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="implementation-timeline-card">
          <h3>International/National Grants | Implementation Timeline</h3>
          <div className="implementation-timeline_bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="implementation-timeline-content">
            <p>
              The Implementation Timeline is designed to provide an overview of
              the planned research activities of the proposed project. For this
              purposed develop a Gant Chart to demonstrate how the project will
              proceed in a timely fashion. Then, in the Table below, identify up
              to five major tasks and deliverables planned for each year of the
              proposed project. In all aspects, disparate activities should link
              together to result in a coherent work plan that achieves the
              objectives of the proposed project.
            </p>

            <p>
              In addition to the Gantt chart and the Table, this Section can
              include a narrative (maximum two pages) that provides further
              details on the Implementation Timeline.
            </p>

            <div className="textarea">
              <h4>Year One</h4>
              <label htmlFor="exampleTextarea">
                Major Tasks and Deliverables:
              </label>
              <textarea
                id="yearOneTextarea"
                value={yearOne}
                placeholder="1.&#13;&#10;2.&#13;&#10;3.&#13;&#10;4.&#13;&#10;5."
                onChange={(e) => setYearOne(e.target.value)}
                rows="2"
                cols="20"
              />
              {error.yearOne && <p className="error-text">{error.yearOne}</p>}
            </div>
            <div className="textarea">
              <h4>Year Two</h4>
              <label htmlFor="exampleTextarea">
                Major Tasks and Deliverables:
              </label>
              <textarea
                id="yearTwoTextarea"
                value={yearTwo}
                placeholder="1.&#13;&#10;2.&#13;&#10;3.&#13;&#10;4.&#13;&#10;5."
                onChange={(e) => setYearTwo(e.target.value)}
                rows="5"
                cols="50"
              />
              {error.yearTwo && <p className="error-text">{error.yearTwo}</p>}
            </div>
            <div className="textarea">
              <h4>Year Three</h4>
              <label htmlFor="exampleTextarea">
                Major Tasks and Deliverables:
              </label>
              <textarea
                id="yearThreeTextarea"
                value={yearThree}
                placeholder="1.&#13;&#10;2.&#13;&#10;3.&#13;&#10;4.&#13;&#10;5."
                onChange={(e) => setYearThree(e.target.value)}
                rows="5"
                cols="50"
              />
              {error.yearThree && (
                <p className="error-text">{error.yearThree}</p>
              )}
            </div>
            <div className="implementation-timeline_btn">
              <button className="implementation-timeline_button"  onClick={handleSave}>SAVE</button>
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

export default ImplementationTimeline;
