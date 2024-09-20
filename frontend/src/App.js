/* eslint-disable react/jsx-pascal-case */
// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import SignInSide from './components/SignInSide';
import ViewAllPublications from './components/ViewAllPublications/ViewAllPublications';
import {Routes, Route, Router} from 'react-router-dom';
import DepartmentalResearch from './components/DepartmentalResearch/DepartmentalResearch';
// import Downloadable from './components/Downloadable';
import ResearchPublication from './components/researchPublication/ResearchPublication';
import Dashboard from './components/Dashboard/Dashboard';
import UserManagement from './components/Usermanagement/Usermanagement';
import ResearchPortfolio from './components/ResearchPortfolio/ResearchPortfolio';
import PersonalInfo2 from './components/PersonalInfo2/PersonalInfo2';
import HonorAndAwards from './components/HonorAndAwards/HonorAndAwards';
import Edit_HonorAndAward from './components/Edit_HonorAndAwards/Edit_HonorAndAward';
import Membership from './components/Membership/Membership';
import Add_membership from './components/Membership/Add_Membership/Add_membership';
import ResearchGrants from './components/Research_Grants/ResearchGrants';
import Add_ResearchGrants from './components/Research_Grants/Add_ResearchGrants/Add_ResearchGrants';
import Downloadable from './components/Downloadable/Downloadable';
import ViewIntellectualProperty from './components/IntellectualProperty/ViewIntellectualProperty';
import AddIntellectualProperty from './components/AddIntellectualProperty/AddIntellectualProperty';
import ViewORICFundedProjects from './components/ProjectSubmission/ORICFundedProjects/ViewORICFundedProjects';
import AddORICFundedProjects from './components/ProjectSubmission/ORICFundedProjects/AddORICFundedProjects';
import ViewGrants from './components/ProjectSubmission/International_NationalGrants/ViewGrants';
import AddGrants from './components/ProjectSubmission/International_NationalGrants/AddGrants';
import ORICFundedProject from './components/ProjectSubmission/ORICFundedProjects/ORICFundedProject';
import Conference from './components/DepartmentalResearch/Conference&Workshop/Conference';
import CollaborativeWork from './components/DepartmentalResearch/CollaborativeWork/CollaborativeWork';
import ThesisProjectDetails from './components/DepartmentalResearch/ThesisProjectDetails/ThesisProjectDetails';
import ResearchProject from './components/ProjectSubmission/ORICFundedProjects/Research Project/ResearchProject';
import FacilitiesAndFunding from './components/ProjectSubmission/ORICFundedProjects/Facilities and Funding/FacilitiesAndFunding';
import JustificationForBudget from './components/ProjectSubmission/ORICFundedProjects/Justification For Budget/JustificationForBudget';
import EstimatedBudgetForPRP from './components/ProjectSubmission/ORICFundedProjects/EstimatedBudgetForPRP/EstimatedBudgetForPRP';
import ExecutiveSummary from './components/ProjectSubmission/International_NationalGrants/Executive Summary/ExecutiveSummary';
import ProjectDescription from './components/ProjectSubmission/International_NationalGrants/Project Description/ProjectDescription';
import ProjectManagement from './components/ProjectSubmission/International_NationalGrants/Project Management/ProjectManagement';
import ImplementationTimeline from './components/ProjectSubmission/International_NationalGrants/Implementation Timeline/ImplementationTimeline';
import PhysicalResources from './components/ProjectSubmission/International_NationalGrants/Physical Resources and Facilities/PhysicalResources';
import ScientificPersonnel from './components/ProjectSubmission/International_NationalGrants/Scientific Personnel/ScientificPersonnel';
import RiskManagementStrategy from './components/ProjectSubmission/International_NationalGrants/Risk Management Strategy/RiskManagementStrategy';
import ListofReferences from './components/ProjectSubmission/International_NationalGrants/List of References/ListofReferences';
import ProposedProjectBudget from './components/ProjectSubmission/International_NationalGrants/Proposed Project Budget/ProposedProjectBudget';
import AvailedResearchGrants from './components/ProjectSubmission/International_NationalGrants/Principal Investigator’s availed research grant details/AvailedResearchGrants';
import AcademicSectoralCollaborators from './components/ProjectSubmission/International_NationalGrants/Academic_Sectoral Collaborators/AcademicSectoralCollaborators';
import MultiStepForm from './components/ProjectSubmission/ORICFundedProjects/MultiStepORICForms/MultiStepsORICForm';
import NationalGrants from './components/ProjectSubmission/International_NationalGrants/International/NationalGrants';


function App() {
  return (
    <>
    <div className='app'>
    <Routes>
      {/* <Route path="/sides" element={<Sides/>}/> */}



      <Route path="/" element={<SignInSide/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      
      {/* Submission */}
      {/* Intellectual Property */}
      <Route path="/viewintellectualproperty" element={<ViewIntellectualProperty/>}/>
      <Route path="/addintellectualproperty" element={<AddIntellectualProperty/>}/>

      {/* Project Submission */}
      {/* Oric Funded Project */}
      
      <Route path="/view-oric-funded-projects" element={<ViewORICFundedProjects/>}/>
      <Route path="/add-oric" element={<MultiStepForm/>}/>
      {/* <Route path="/add-oric-funded-projects" element={<AddORICFundedProjects/>}/> */}
      <Route path="/oric-funded-project" element={<ORICFundedProject/>}/>
      {/* <Route path="/oric-funded-project-research-project" element={<ResearchProject/>}/> */}
      {/* <Route path="/oric-funded-project-facilities-and-funding" element={<FacilitiesAndFunding/>}/> */}
      {/* <Route path="/oric-funded-project-justification-and-budget-items" element={<JustificationForBudget/>}/> */}
      {/* <Route path="/oric-funded-project-estimated-budget-proposed-research-period" element={<EstimatedBudgetForPRP/>}/> */}





      {/* International/National Grants */}
      <Route path="/view-international/national-grants" element={<ViewGrants/>}/>
      <Route path="/add-international/national-grants" element={<AddGrants/>}/>         
      <Route path="/add-international/national-grants-executive-summary" element={<ExecutiveSummary/>}/>         
      <Route path="/international/national-grants-project-description" element={<ProjectDescription/>}/>         
      <Route path="/international/national-grants-project-management" element={<ProjectManagement/>}/>         
      <Route path="/international/national-grants-implementation-timeline" element={<ImplementationTimeline/>}/>         
      <Route path="/international/national-grants-physical-resources-and-facilities" element={<PhysicalResources/>}/>         
      <Route path="/international/national-grants-scientific-personnel" element={<ScientificPersonnel/>}/>         
      <Route path="/international/national-grants-risk-management-strategy" element={<RiskManagementStrategy/>}/>         
      <Route path="/international/national-grants-list-of-references" element={<ListofReferences/>}/>         
      <Route path="/international/national-grants-proposed-project-budget" element={<ProposedProjectBudget/>}/>         
      <Route path="/international/national-grants-principal-investigators-availed-research-grant-details" element={<AvailedResearchGrants/>}/>         
      <Route path="/international/national-grants-academic/Sectoral-collaborators" element={<AcademicSectoralCollaborators/>}/>         
      <Route path="/international/national-grants" element={<NationalGrants/>}/>         

      
      





      {/* Research Portfolio */}
      {/* Personal Information */}
      <Route path='/researchportfolio' element={<ResearchPortfolio/>}/>
      <Route path='/edit-personal-info' element={<PersonalInfo2/>}/>
      {/* Honor And Awards, Scholarships */}
      <Route path='/honorandawards' element={<HonorAndAwards/>}/>
      <Route path='/edit-honorandawards' element={<Edit_HonorAndAward/>}/>
      {/* Membership */}
      <Route path='/membership' element={<Membership/>}/>
      <Route path='/add-membership' element={<Add_membership/>}/>
      {/* View All Publications */}
      <Route path='/viewallpublications' element={<ViewAllPublications/>}/>
      {/* Add New Publications */}
      <Route path="/researchpublication" element={<ResearchPublication/>}/>

      {/* Research Grants And Contracts */}
      <Route path='/research-grants-and-contracts' element={<ResearchGrants/>}/>
      <Route path='/add-research-grants-and-contracts' element={<Add_ResearchGrants/>}/>





      {/* Departmental Research Data */}
      <Route path="/departmental-research-data-publications-of-faculty" element={<DepartmentalResearch/>} />
      <Route path="/departmental-research-data-conferences-workshops-attended" element={<Conference/>} />
      <Route path="/departmental-research-data-collaborative-research-academic-work" element={<CollaborativeWork/>} />
      <Route path="/departmental-research-data-thesis-project-details" element={<ThesisProjectDetails/>} />


      {/* Downloadable */}
      <Route path="/downloadable" element={<Downloadable/>}/>

      {/* User % Roles */}
      <Route path="/usermanagement" element={<UserManagement/>}/>
      


    </Routes>
    </div>
    </>
  );
}

export default App;
