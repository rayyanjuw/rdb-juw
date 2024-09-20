import React, {useState} from 'react'
import './executiveSummary.css';
import { useLocation } from "react-router-dom";
import Sidebar from '../../../Sidebar/Sidebar';
import Breadcrumb from '../../../shared-components/breadcrumps/BreadCrumps';
import NavBar from '../../../shared-components/navbar/NavBar';


const ExecutiveSummary = ({ onSave }) => {

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

  const [summary, setSummary] = useState("");

  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  // Handle save button click
  const handleSave = () => {
    onSave({ summary });
  };

   

    return (
        <div className="executivesummary-container">
            <Sidebar />
            <div className="executivesummary">
                <div className="navbar-div">
                    <NavBar />
                </div>
                <div className="executivesummary-card">
                    <h3>International/National Grants | Executive Summary</h3>
                    <div className="executivesummary_bredcrumb">
                    {/* <div className="executivesummary_bred-crumb"> */}
                        <Breadcrumb items={breadCrumps} activePath={currentPath} />
                    </div>
                    <div className='executivesummary-content'>
                        <p>The Executive Summary (limited to one page) provides an overview of the proposal and the proposed research project. The broad research objectives should be briefly described, as well as the activities to be undertaken to achieve the project goals. In case of basic research, scientific hypothesis should be identified on which proposed goal is based and if research is applied output in the form of a product or process, need or relationship to industry and end-user of the output/ product should be identified. Principal investigator is encouraged to make preliminary inquiries with the proposed end user and attach any certificate/ document in support of the proposed research. In addition, it should identify the roles of partners- academic and sectoral1 that will contribute to the success of the proposed project should be identified if any.</p>
                        <div className="textarea">
                            <label htmlFor="exampleTextarea">Executive Summary:</label>
                            <textarea
                                id="exampleTextarea"
                                value={summary}
                                placeholder='Limited to one page'
                                onChange={handleChange}
                                rows="2"
                                cols="20"
                            />
                        </div>
                        <div className='executivesummary_btn'>
                            <button className="executivesummary_button" onClick={handleSave}>SAVE</button>
                        </div>
                    </div>
                </div>
                <div className="juw-copyright">
                    <p>© 2024, all rights reserved by Jinnah University for Women.</p>
                </div>
            </div>
        </div>
    )
}


export default ExecutiveSummary



