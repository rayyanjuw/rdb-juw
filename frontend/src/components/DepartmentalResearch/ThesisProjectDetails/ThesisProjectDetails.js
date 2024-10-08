import React, { useState } from 'react'
import './thesisProjectDetails.css';
import Sidebar from '../../Sidebar/Sidebar';
import NavBar from '../../shared-components/navbar/NavBar';
import Breadcrumb from '../../shared-components/breadcrumps/BreadCrumps';
import { useLocation } from "react-router-dom";




const ThesisProjectDetails = () => {

    const location = useLocation();
    const currentPath = location.pathname;

    const ThesisProjectDetail = {
        Title: "",
        StudentName: "",
        PrincipalandCoPrincipalInvestigatorDetails: "",
    }



    const ResearchFundingStatus = {
        FundedornonfundedResearch: "",
        AmountIfFunded: "",
        Sourceoffunding: "",
        DateofFinalReportSubmission: ""
    }



    const [ThesisProject, setThesisProject] = useState(ThesisProjectDetail);
    const [ResearchFunding, setResearchFunding] = useState(ResearchFundingStatus);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setThesisProject((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setResearchFunding((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };



    const breadCrumps = [
        {
            label: "Publications of Faculty",
            path: "/departmental-research-data-publications-of-faculty",
        },
        {
            label: "Conferences, Workshops Attended",
            path: "/departmental-research-data-conferences-workshops-attended",
        },
        {
            label: "Collaborative Research/Academic work",
            path: "/departmental-research-data-collaborative-research-academic-work",
        },
        {
            label: "BS/MS/PhD Thesis/Project Details",
            path: "/departmental-research-data-thesis-project-details",
        },
    ];


    return (
        <div className='thesisprojectdetails-container'>
            <Sidebar />
            <div className='thesisprojectdetails'>
                <div className="thsisproject-navbar-div">
                    <NavBar />
                </div>
                <div className="thesisprojectdetails-card">
                    <h3 className="thesisprojectdetails-heading">
                        Departmental Research Data | Publications of Faculty
                    </h3>
                    <div className="thesisprojectdetails-bred-crumb">
                        <Breadcrumb items={breadCrumps} activePath={currentPath} />
                    </div>
                    <div className='thesisprojectdetails-main-heading'>
                    <h4>BS/MS/PhD thesis/project details:</h4>
                    </div>
                    <div className="thesisprojectdetails-multiinputfields">
                        <div className="thesisprojectdetails-title-input">
                            <label>Title:</label>
                            <input
                                required
                                type="text"
                                value={ThesisProjectDetail.Title}
                                name="Title"
                                onChange={handleChange}
                            />
                        </div>


                        <div className="thesisprojectdetails-multiinputfields">
                            <div className="thesisprojectdetails-inputgroup">
                                <label>Student Name:</label>
                                <input
                                    required
                                    type="text"
                                    value={ThesisProjectDetail.StudentName}
                                    name="StudentName"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="thesisprojectdetails-inputgroup">
                                <label>Principal and Co-Principal Investigator Details:</label>
                                <input
                                    required
                                    type="text"
                                    value={ThesisProjectDetail.PrincipalandCoPrincipalInvestigatorDetails}
                                    name="PrincipalandCoPrincipalInvestigatorDetails"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <h4 className='thesisprojectdetails-heading2'>Research funding status:</h4>

                        <div className="thesisprojectdetails-four-inputs">
                            <div className="thesisprojectdetails-inputgroup">
                                <label>Funded or non-funded research:</label>
                                <input 
                                    required
                                    type="text"
                                    value={ResearchFundingStatus.FundedornonfundedResearch}
                                    name="StudentName"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="thesisprojectdetails-inputgroup">
                                <label>Amount if funded:</label>
                                <input
                                    required
                                    type="text"
                                    value={ResearchFundingStatus.AmountIfFunded}
                                    name="PrincipalandCoPrincipalInvestigatorDetails"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="thesisprojectdetails-inputgroup">
                                <label>Source of funding:</label>
                                <input
                                    required
                                    type="text"
                                    value={ResearchFundingStatus.Sourceoffunding}
                                    name="Sourceoffunding"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="thesisprojectdetails-inputgroup">
                                <label>Date of initiation and submission of final report to BASR:</label>
                                <input
                                    required
                                    type="date"
                                    value={ResearchFundingStatus.DateofFinalReportSubmission}
                                    name="DateofFinalReportSubmission"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="aip-save-btn">
                            <button className="aip-savebut">Save</button>
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



export default ThesisProjectDetails
