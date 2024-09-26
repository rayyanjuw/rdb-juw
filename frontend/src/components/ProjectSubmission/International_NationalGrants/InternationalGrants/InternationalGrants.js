import React, { useState, useEffect } from "react";
import "./internationalGrants.css";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import "jspdf-autotable";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import { useParams } from "react-router-dom";

import { fetchAllNationalGrantsbyId } from "./../../../../api/Api";

const BASE_URL = "http://localhost:5000";

const InternationalGrants = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const fetchedProject = await fetchAllNationalGrantsbyId(id);
        setProject(fetchedProject);
        console.log(fetchedProject);
      } catch (error) {
        console.error("Error fetchiong project details:", error);
      }
    };

    loadProject();
  }, [id]);

  const proposalCover = project?.proposalCover
    ? JSON.parse(project.proposalCover)
    : {};
  const implementationTimeline = project?.implementationTimeline
    ? JSON.parse(project.implementationTimeline)
    : {};

  const principalInvestigator =
    project?.principalInvestigatorsAvailedResearchGrantDetails
      ? JSON.parse(project.principalInvestigatorsAvailedResearchGrantDetails)
      : {};

  const listOfReferences =
    project?.listOfReferences
      ? JSON.parse(project.listOfReferences)
      : {};

  const ExecutiveSummary =
    project?.executiveSummary
      ? JSON.parse(project.executiveSummary)
      : {};

  // // Using optional chaining to safely access project properties
  const academicSectoralCollaborators = project?.academicSectoralCollaborators
    ? JSON.parse(project.academicSectoralCollaborators)
    : { academicCollaboratorsDetails: [], sectoralCollaboratorsDetails: [] };

  const academicCollaborators =
    academicSectoralCollaborators?.academicCollaboratorsDetails || [];
  console.log("Academic Collaborators:", academicCollaborators);
  const sectoralCollaborators =
    academicSectoralCollaborators?.sectoralCollaboratorsDetails || [];

  

 

  



const downloadInternationalGrantsExcel = () => {
  const sections = [
      { 
          title: "PROPOSAL COVER", 
          data: {
              proposalReferenceNo: proposalCover?.proposalReferenceNo,
              titleOfProject: proposalCover?.titleOfProject,
              durationOfProject: proposalCover?.durationOfProject,
              totalBudgetRequested: proposalCover?.totalBudgetRequested,
              themeOfProposedResearch: proposalCover?.themeOfProposedResearch,
              disciplineOfProposedResearch: proposalCover?.disciplineOfProposedResearch,
          }
      },
      { title: "PRINCIPAL INVESTIGATOR", data: proposalCover?.principalInvestigator },
      { title: "FACULTY", data: proposalCover?.facultyDetails },
      { title: "EXECUTIVE SUMMARY", data: project?.executiveSummary },
      { title: "ACADEMIC & SECTORAL COLLABORATORS", data: academicCollaborators },
      { title: "PROJECT DESCRIPTION FILE", data: project?.projectDescription },
      { title: "PROJECT MANAGEMENT", data: project?.projectManagement },
      { title: "IMPLEMENTATION TIMELINE", data: implementationTimeline },
      { title: "PHYSICAL RESOURCES", data: project?.physicalResourcesAndFacilities },
      { title: "SCIENTIFIC PERSONNEL", data: project?.scientificPersonnel },
      { title: "Principal Investigator’s availed research grant details", data: principalInvestigator?.scientificPersonnelDetails },
      { title: "AVAILED RESEARCH GRANTS", data: principalInvestigator?.projects || [] },
      { title: "RISK MANAGEMENT", data: project?.riskManagementStrategy },
      { title: "LIST OF REFERENCES", data: listOfReferences },
      { title: "PROJECT BUDGET", data: project?.proposedProjectBudget },
  ];

  const excelData = [];

  sections.forEach(section => {
      // Add section title
      excelData.push([section.title]);
      excelData.push([]); // Add an empty row for visual separation
      
      // // Adding headers
      // excelData.push(["Title", "Details"]); // Header row

      if (section.title === "AVAILED RESEARCH GRANTS" && Array.isArray(section.data)) {
          // Handle projects under Availed Research Grants specifically
          const projectTableData = section.data.map((project, index) => [
              index + 1,
              project.title || "No Title",
              project.initiationDate || "N/A",
              project.completionDate || "N/A",
              project.amountAwarded || "N/A",
              project.fundingSource || "N/A",
          ]);

          excelData.push(["#", "Title", "Initiation Date", "Completion Date", "Amount Awarded", "Funding Source"]);
          excelData.push(...projectTableData); // Spread the project data rows
      } else if (section.title === "ACADEMIC & SECTORAL COLLABORATORS" && Array.isArray(section.data)) {
          // Handle academic and sectoral collaborators specifically
          const collaboratorTableData = section.data.map((collaborator, index) => [
              index + 1,
              collaborator.nameofcollaborator || "No Name", // Assuming there's a 'name' field
              collaborator.institutionofcollaborator || "N/A", // Assuming there's an 'institution' field
              collaborator.location || "N/A", // Assuming there's a 'location' field
              collaborator.focusofcollaboration || "N/A", // Assuming there's a 'role' field
              collaborator.tellno || "N/A", // Assuming there's a 'role' field
              collaborator.email || "N/A", // Assuming there's a 'role' field
          ]);

          excelData.push(["s.no", "Name Of Collaborator", "institutionofcollaborator", "Location", "Department", "tellno ", "Email" ]);
          excelData.push(...collaboratorTableData); // Spread the collaborator data rows
      } else if (Array.isArray(section.data)) {
          // If it's an array, push data rows
          section.data.forEach(item => {
              const row = [
                  item.title || "No Title", // Customize as needed
                  item.details || item.description || "N/A" // Customize as needed
              ]; 
              excelData.push(row); // Add row values
          });
      } else if (typeof section.data === 'object' && section.data !== null) {
          // If it's a single object, push key-value pairs
          const entries = Object.entries(section.data);
          entries.forEach(([key, value]) => {
              const displayValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;
              excelData.push([key, displayValue || "N/A"]); // Add key-value pairs
          });
      } else {
          // If it's just a string or simple value
          excelData.push([section.data || "No data available"]);
      }

      excelData.push([]); // Add an empty row for visual separation
  });

  const worksheet = XLSX.utils.aoa_to_sheet(excelData);

  // Style header row with bold and background color
  for (let i = 2; i < excelData.length; i++) { // Start from row 2 to style only header
      const cell = worksheet[XLSX.utils.encode_cell({ r: i, c: 0 })];
      const headerCell = worksheet[XLSX.utils.encode_cell({ r: i, c: 1 })];
      
      if (cell) {
          cell.s = {
              font: { bold: true },
          };
      }
      if (headerCell) {
          headerCell.s = {
              font: { bold: true },
          };
      }
      
      // Style section titles
      if (i % (excelData.length / sections.length) === 0) { // Determine section titles
          cell.s.fill = { fgColor: { rgb: "FFFF00" } }; // Yellow background for section titles
      }
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "International Grants");
  XLSX.writeFile(workbook, "InternationalGrants.xlsx");
};

const downloadInternationalGrantsCSV = () => {
  const sections = [
      { 
          title: "PROPOSAL COVER", 
          data: {
              proposalReferenceNo: proposalCover?.proposalReferenceNo,
              titleOfProject: proposalCover?.titleOfProject,
              durationOfProject: proposalCover?.durationOfProject,
              totalBudgetRequested: proposalCover?.totalBudgetRequested,
              themeOfProposedResearch: proposalCover?.themeOfProposedResearch,
              disciplineOfProposedResearch: proposalCover?.disciplineOfProposedResearch,
          }
      },
      { title: "PRINCIPAL INVESTIGATOR", data: proposalCover?.principalInvestigator },
      { title: "FACULTY", data: proposalCover?.facultyDetails },
      { title: "EXECUTIVE SUMMARY", data: project?.executiveSummary },
      { title: "ACADEMIC & SECTORAL COLLABORATORS", data: academicCollaborators },
      { title: "PROJECT DESCRIPTION FILE", data: project?.projectDescription },
      { title: "PROJECT MANAGEMENT", data: project?.projectManagement },
      { title: "IMPLEMENTATION TIMELINE", data: implementationTimeline },
      { title: "PHYSICAL RESOURCES", data: project?.physicalResourcesAndFacilities },
      { title: "SCIENTIFIC PERSONNEL", data: project?.scientificPersonnel },
      { title: "Principal Investigator’s availed research grant details", data: principalInvestigator?.scientificPersonnelDetails },
      { title: "AVAILED RESEARCH GRANTS", data: principalInvestigator?.projects || [] },
      { title: "RISK MANAGEMENT", data: project?.riskManagementStrategy },
      { title: "LIST OF REFERENCES", data: listOfReferences },
      { title: "PROJECT BUDGET", data: project?.proposedProjectBudget },
  ];

  const csvData = [];

  sections.forEach(section => {
      // Add section title
      csvData.push([section.title]);
      csvData.push([]); // Add an empty row for visual separation
      
      // Add headers based on section title
      if (section.title === "AVAILED RESEARCH GRANTS" && Array.isArray(section.data)) {
          csvData.push(["#", "Title", "Initiation Date", "Completion Date", "Amount Awarded", "Funding Source"]);
          section.data.forEach((project, index) => {
              csvData.push([
                  index + 1,
                  project.title || "No Title",
                  project.initiationDate || "N/A",
                  project.completionDate || "N/A",
                  project.amountAwarded || "N/A",
                  project.fundingSource || "N/A",
              ]);
          });
      } else if (section.title === "ACADEMIC & SECTORAL COLLABORATORS" && Array.isArray(section.data)) {
          csvData.push(["s.no", "Name Of Collaborator", "Institution", "Location", "Department", "Tell No", "Email"]);
          section.data.forEach((collaborator, index) => {
              csvData.push([
                  index + 1,
                  collaborator.nameofcollaborator || "No Name",
                  collaborator.institutionofcollaborator || "N/A",
                  collaborator.location || "N/A",
                  collaborator.focusofcollaboration || "N/A",
                  collaborator.tellno || "N/A",
                  collaborator.email || "N/A",
              ]);
          });
      } else if (Array.isArray(section.data)) {
          section.data.forEach(item => {
              const row = [
                  item.title || "No Title",
                  item.details || item.description || "N/A"
              ]; 
              csvData.push(row);
          });
      } else if (typeof section.data === 'object' && section.data !== null) {
          const entries = Object.entries(section.data);
          entries.forEach(([key, value]) => {
              const displayValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;
              csvData.push([key, displayValue || "N/A"]);
          });
      } else {
          csvData.push([section.data || "No data available"]);
      }

      csvData.push([]); // Add an empty row for visual separation
  });

  // Convert array of arrays to CSV format
  const csvContent = csvData.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "InternationalGrants.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  const downloadInternationalGrantsPDF = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(16);
    doc.text("International Grants", 14, 15);
  
    let yOffset = 25;
  
    const sections = [
      { title: "PROPOSAL COVER", data: {
                      proposalReferenceNo: proposalCover?.proposalReferenceNo,
                      titleOfProject: proposalCover?.titleOfProject,
                      durationOfProject: proposalCover?.durationOfProject,
                      totalBudgetRequested: proposalCover?.totalBudgetRequested,
                      themeOfProposedResearch: proposalCover?.themeOfProposedResearch,
                      disciplineOfProposedResearch: proposalCover?.disciplineOfProposedResearch,
                    } 
         },
      { title: "PRINCIPAL INVESTIGATOR", data: proposalCover?.principalInvestigator },
      { title: "FACULTY", data: proposalCover?.facultyDetails },
      { title: "EXECUTIVE SUMMARY", data: project?.executiveSummary },
      { title: "ACADEMIC & SECTORAL COLLABORATORS", data: academicCollaborators },
      { title: "PROJECT DESCRIPTION FILE", data: project?.projectDescription }, // This will be handled below
      { title: "PROJECT MANAGEMENT", data: project?.projectManagement },
      { title: "IMPLEMENTATION TIMELINE", data: implementationTimeline },
      { title: "PHYSICAL RESOURCES", data: project?.physicalResourcesAndFacilities },
      { title: "SCIENTIFIC PERSONNEL", data: project?.scientificPersonnel },
      { title: "Principal Investigator’s availed research grant details", data: principalInvestigator?.scientificPersonnelDetails },
      { title: "AVAILED RESEARCH GRANTS", data: principalInvestigator?.projects },
      { title: "RISK MANAGEMENT", data: project?.riskManagementStrategy },
      { title: "LIST OF REFERENCES", data: listOfReferences },
      { title: "PROJECT BUDGET", data: project?.proposedProjectBudget },
       // Handle scientificPersonnelDetails
    ];
  
    sections.forEach((section) => {
      // Section title
      doc.setFontSize(14);
      doc.text(section.title, 14, yOffset);
      yOffset += 10; // Adjust position for the next element
  
      if (section.title === "AVAILED RESEARCH GRANTS") {
        // Handle projects under Availed Research Grants specifically
        const projects = section.data;
  
        if (projects && projects.length > 0) {
          const projectTableData = projects.map((project, index) => [
            index + 1,
            project.title || "No Title",
            project.initiationDate || "N/A",
            project.completionDate || "N/A",
            project.amountAwarded || "N/A",
            project.fundingSource || "N/A",
          ]);
  
          doc.autoTable({
            startY: yOffset,
            head: [["#", "Title", "Initiation Date", "Completion Date", "Amount Awarded", "Funding Source"]],
            body: projectTableData,
            theme: "grid",
            headStyles: {
              fillColor: [79, 129, 189], // Blue color for header background
              textColor: [255, 255, 255], // White color for header text
              fontStyle: "bold",
            },
            bodyStyles: {
              fillColor: [226, 236, 255], // Light blue color for body background
              textColor: [0, 0, 0], // Black color for body text
            },
            alternateRowStyles: {
              fillColor: [255, 255, 255], // White background for alternate rows
            },
            styles: {
              lineColor: [0, 0, 0], // Black border for cells
              lineWidth: 0.1,
              fontSize: 10,
            },
            margin: { top: 10, left: 14, right: 14 },
            didDrawPage: (data) => {
              yOffset = data.cursor.y; // Update yOffset to the position after the table
            },
          });
  
          yOffset += 10; // Space between tables
        } else {
          doc.setFontSize(12);
          doc.text(`No data available for ${section.title}`, 14, yOffset);
          yOffset += 10;
        }
      } else if (section.title === "Principal Investigator’s availed research grant details") {
        // Handle scientificPersonnelDetails specifically
         // For 'scientificPersonnelDetails', treat it as a whole string
      // For scientificPersonnelDetails, display it as a key-value pair
      const tableData = [
        ["SCIENTIFIC PERSONNEL", section.data || "No data available"]
    ];

    doc.autoTable({
        startY: yOffset,
        head: [["Title", "Details"]],
        body: tableData,
        theme: "grid",
        headStyles: {
            fillColor: [79, 129, 189], // Blue color for header background
            textColor: [255, 255, 255], // White color for header text
            fontStyle: "bold",
        },
        bodyStyles: {
            fillColor: [226, 236, 255], // Light blue color for body background
            textColor: [0, 0, 0], // Black color for body text
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255], // White background for alternate rows
        },
        styles: {
            lineColor: [0, 0, 0], // Black border for cells
            lineWidth: 0.1,
            fontSize: 10,
        },
        margin: { top: 10, left: 14, right: 14 },
        didDrawPage: (data) => {
            yOffset = data.cursor.y; // Update yOffset to the position after the table
        },
    });

    yOffset += 10; // Space between tables
      } else if (section.data !== undefined && section.data !== null) {
        let tableData = [];
  
        if (section.title === "PROJECT DESCRIPTION FILE") {
          // Handle PROJECT DESCRIPTION FILE specifically
          doc.setFontSize(12);
          doc.textWithLink("Download Project Description File", 14, yOffset, {
            url: section.data,  // Add the file link as a clickable URL
          });
          yOffset += 10; // Space after the link
        } else {
          // Other sections processing as before
          if (Array.isArray(section.data)) {
            // If the data is an array of objects
            tableData = section.data.map((item) => {
              return Object.entries(item).map(([key, value]) => {
                return [key, typeof value === 'object' ? JSON.stringify(value) : value];
              });
            }).flat();
          } else if (typeof section.data === 'object') {
            // If it's a single object
            tableData = Object.entries(section.data).map(([key, value]) => {
              return [key, typeof value === 'object' ? JSON.stringify(value) : value];
            });
          } else {
            // If the data is not an object or array, just use it directly
            tableData = [[section.title, section.data]];
          }
  
          // Convert to a suitable format for the autoTable
          const formattedTableData = tableData.map(([key, value]) => {
            return [key, value !== undefined ? value : "No data available"];
          });
  
          doc.autoTable({
            startY: yOffset,
            head: [["Title", "Details"]],
            body: formattedTableData,
            theme: "grid",
            headStyles: {
              fillColor: [79, 129, 189], // Blue color for header background
              textColor: [255, 255, 255], // White color for header text
              fontStyle: "bold",
            },
            bodyStyles: {
              fillColor: [226, 236, 255], // Light blue color for body background
              textColor: [0, 0, 0], // Black color for body text
            },
            alternateRowStyles: {
              fillColor: [255, 255, 255], // White background for alternate rows
            },
            styles: {
              lineColor: [0, 0, 0], // Black border for cells
              lineWidth: 0.1,
              fontSize: 10,
            },
            margin: { top: 10, left: 14, right: 14 },
            didDrawPage: (data) => {
              yOffset = data.cursor.y; // Update yOffset to the position after the table
            },
          });
  
          yOffset += 10; // Space between tables
  
          // If the content reaches the bottom of the page, add a new page
          if (yOffset > 270) {
            doc.addPage();
            yOffset = 20; // Reset Y position for new page
          }
        }
      } else {
        // If there's no data to display, you can optionally add a message
        doc.setFontSize(12);
        doc.text(`No data available for ${section.title}`, 14, yOffset);
        yOffset += 10; // Adjust position for the next element
      }
    });
  
    doc.save("InternationalGrants.pdf");
  };
  return (
    <>
      <div className="internationalGrants_container">
        <Sidebar />
        <div className="internationalGrants">
          <div className="oric_navbar-div">
            <NavBar />
          </div>
          <div className="internationalGrants-card">
            <h5>International/National Grants</h5>
            <div className="download-btn" style={{ marginBottom: "20px" }}>
              <button
                type="button"
                className="create-user-btn"
                onClick={downloadInternationalGrantsPDF}
              >
                DOWNLOAD PDF
              </button>
              <button
                type="button"
                className="create-user-btn"
                onClick={downloadInternationalGrantsExcel}
              >
                DOWNLOAD EXCEL
              </button>
              <button
                type="button"
                className="create-user-btn"
                onClick={downloadInternationalGrantsCSV}
              >
                DOWNLOAD CSV
              </button>
            </div>

            <div className="internationalGrants-table-data">
              <div className="internationalGrants-table-container">
                <h2>Project Title: {proposalCover.titleOfProject}</h2>
                <div className="internationalGrants-list-table">
                  <div className="project_detail">
                    <h5>PROPOSAL COVER</h5>
                  </div>
                  <div className="internationalGrants-list-table-format title">
                    <b>*Proposal Reference No:</b>
                    <span>
                      {proposalCover.proposalReferenceNo ||
                        "No proposal cover available"}
                    </span>
                  </div>
                  <div className="internationalGrants-list-table-format">
                    <b>*Title of Project:</b>
                    <span>{proposalCover.titleOfProject}</span>
                  </div>
                  <div className="internationalGrants-list-table-format">
                    <b>Duration of Project:</b>
                    <span>{proposalCover.durationOfProject}</span>
                  </div>
                  <div className="internationalGrants-list-table-format">
                    <b>Total Budget Requested:</b>
                    <span>{proposalCover.totalBudgetRequested}</span>
                  </div>
                  <div className="internationalGrants-list-table-format">
                    <b>Theme of Proposed Research:</b>
                    <span>{proposalCover.themeOfProposedResearch}</span>
                  </div>
                  <div className="internationalGrants-list-table-format">
                    <b>Discipline of Proposed Research:</b>
                    <span>{proposalCover.disciplineOfProposedResearch}</span>
                  </div>

                  <div className="internationalGrants-list-table">
                    <div className="project_detail">
                      <h5>Principal Investigator Details:</h5>
                    </div>
                    <div className="internationalGrants-list-table-format title">
                      <b>Institution Name</b>
                      <span>
                        {proposalCover?.principalInvestigator?.institutionName}
                      </span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>Street Address:</b>
                      <span>
                        {proposalCover?.principalInvestigator?.streetAddress}
                      </span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>City:</b>
                      <span>{proposalCover?.principalInvestigator?.city}</span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>Name:</b>
                      <span>{proposalCover?.principalInvestigator?.name}</span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>Position/Title:</b>
                      <span>
                        {proposalCover?.principalInvestigator?.positionTitle}
                      </span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>Department:</b>
                      <span>
                        {proposalCover?.principalInvestigator?.department}
                      </span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>Tell No:</b>
                      <span>{proposalCover?.principalInvestigator?.tel}</span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>Email:</b>
                      <span>{proposalCover?.principalInvestigator?.email}</span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>CNIC/Passport No:</b>
                      <span>{proposalCover?.principalInvestigator?.cnic}</span>
                    </div>
                  </div>

                  <div className="internationalGrants-list-table">
                    <div className="project_detail">
                      <h5>Faculty Details:</h5>
                    </div>
                    <div className="internationalGrants-list-table-format title">
                      <b>Institution Name</b>
                      <span>
                        {proposalCover?.facultyDetails?.institutionName ||
                          "N/A"}
                      </span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>Street Address:</b>
                      <span>
                        {proposalCover?.facultyDetails?.streetAddress}
                      </span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>City:</b>
                      <span>{proposalCover?.facultyDetails?.city}</span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>Name:</b>
                      <span>{proposalCover?.facultyDetails?.name}</span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>Position/Title:</b>
                      <span>
                        {proposalCover?.facultyDetails?.positionTitle}
                      </span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>Department:</b>
                      <span>{proposalCover?.facultyDetails?.department}</span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>Tell No:</b>
                      <span>{proposalCover?.facultyDetails?.tel}</span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>Email:</b>
                      <span>{proposalCover?.facultyDetails?.email}</span>
                    </div>
                    <div className="internationalGrants-list-table-format">
                      <b>CNIC/Passport No:</b>
                      <span>{proposalCover?.facultyDetails?.cnic}</span>
                    </div>
                  </div>

                  <div className="internationalGrants-list-table">
                    <div className="project_detail">
                      <h5>Executive Summary</h5>
                    </div>
                    <div className="internationalGrants-list-table-format title">
                      <b>Executive Summary:</b>
                      <span>{project?.executiveSummary}</span>
                    </div>
                  </div>

                  <div className="internationalGrants-list-table">
                    <h5>Academic/Sectoral Collaborators</h5>

                    <div className="project_detail internationalGrants-list-table-format title">
                      <h5>Academic/Sectoral Collaborators (if any):</h5>
                      <span>
                        {academicSectoralCollaborators?.sectoralCollaborators}
                      </span>
                    </div>

                    {academicCollaborators.length > 0 ? (
                      academicCollaborators.map((collaborator, index) => (
                        <div key={index}>
                          <div className="project_detail internationalGrants-list-table-format title">
                            <h5>{index + 1}. Academic Collaborator Details:</h5>
                          </div>
                          <div className="internationalGrants-list-table-format title">
                            <b>Name of Collaborator:</b>
                            <span>
                              {collaborator?.nameofcollaborator || "N/A"}
                            </span>
                          </div>
                          <div className="internationalGrants-list-table-format">
                            <b>Institution of Collaborator:</b>
                            <span>
                              {collaborator?.institutionofcollaborator || "N/A"}
                            </span>
                          </div>
                          <div className="internationalGrants-list-table-format">
                            <b>Location:</b>
                            <span>{collaborator?.location || "N/A"}</span>
                          </div>
                          <div className="internationalGrants-list-table-format">
                            <b>Focus of collaboration:</b>
                            <span>
                              {collaborator?.focusofcollaboration || "N/A"}
                            </span>
                          </div>
                          <div className="internationalGrants-list-table-format">
                            <b>Tel. #:</b>
                            <span>{collaborator?.tellno || "N/A"}</span>
                          </div>
                          <div className="internationalGrants-list-table-format">
                            <b>Email:</b>
                            <span>{collaborator?.email || "N/A"}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No academic collaborators available.</p>
                    )}

                    <div className="internationalGrants-list-table-format">
                      <div className="project_detail">
                        <h5>2. SECTORAL COLLABORATORS</h5>
                      </div>
                    </div>

                    {sectoralCollaborators.length > 0 ? (
                      sectoralCollaborators.map((collaborator, index) => (
                        <div key={index}>
                          <div className="project_detail internationalGrants-list-table-format title">
                            <h5>{index + 1}. Sectoral Collaborator Details</h5>
                          </div>
                          <div className="internationalGrants-list-table-format title">
                            <b>Company/Organization Name:</b>
                            <span>{collaborator?.companyname || "N/A"}</span>
                          </div>

                          <div className="internationalGrants-list-table-format">
                            <b>Location:</b>
                            <span>{collaborator?.location || "N/A"}</span>
                          </div>
                          <div className="internationalGrants-list-table-format">
                            <b>Name of Collaborator:</b>
                            <span>
                              {collaborator?.nameofcollaborator || "N/A"}
                            </span>
                          </div>
                          <div className="internationalGrants-list-table-format">
                            <b>Position/Title:</b>
                            <span>{collaborator?.position || "N/A"}</span>
                          </div>
                          <div className="internationalGrants-list-table-format">
                            <b>Tel. #:</b>
                            <span>{collaborator?.tellno || "N/A"}</span>
                          </div>
                          <div className="internationalGrants-list-table-format">
                            <b>Email:</b>
                            <span>{collaborator?.email || "N/A"}</span>
                          </div>
                          <div className="internationalGrants-list-table-format">
                            <b>Anticipated Contribution to Project Goals:</b>
                            <span>
                              {collaborator?.ProjectGoalsAnticipatedContribution ||
                                "N/A"}
                            </span>
                          </div>
                          <div className="internationalGrants-list-table-format">
                            <b>Anticipated Annual Financial Contribution:</b>
                            <span>
                              {collaborator?.AnnualFinancialContribution ||
                                "N/A"}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No Sectoral collaborators available.</p>
                    )}

                    <div className="internationalGrants-list-table">
                      <div className="project_detail">
                        <h5>Project Description</h5>
                      </div>
                      <div className="internationalGrants-list-table-format title">
                        <b>Project Description Details:</b>
                        <span>
                          {project?.projectDescription ? (
                            <a
                              href={project?.projectDescription} // Get just the filename
                              download
                              rel="noopener noreferrer"
                            >
                              Download Project Description
                            </a>
                          ) : (
                            <span>No project description uploaded.</span>
                          )}
                        </span>
                      </div>

                      <div className="project_detail internationalGrants-list-table-format title">
                        <h5>Project Management</h5>
                      </div>
                      <div className="internationalGrants-list-table-format title">
                        <b>Project Management Details:</b>
                        <span>{project?.projectManagement}</span>
                      </div>

                      <div className="internationalGrants-list-table">
                        <div className="project_detail">
                          <h5>Implementation Timeline</h5>
                        </div>
                        <div className="internationalGrants-list-table-format">
                          <h5>Year One</h5>
                        </div>
                      </div>

                      <div className="internationalGrants-list-table-format">
                        <b>Major Tasks and Deliverables:</b>
                        <span>{implementationTimeline?.yearOneTasks}</span>
                      </div>

                      <div className="internationalGrants-list-table-format">
                        <h5>Year Two</h5>
                      </div>

                      <div className="internationalGrants-list-table-format title">
                        <b>Major Tasks and Deliverables:</b>
                        <span>{implementationTimeline?.yearTwoTasks}</span>
                      </div>

                      <div className="internationalGrants-list-table-format">
                        <div className="project_detail">
                          <h5>Year Three</h5>
                        </div>
                      </div>
                      <div className="internationalGrants-list-table-format title">
                        <b>Major Tasks and Deliverables:</b>
                        <span>{implementationTimeline?.yearThreeTasks}</span>
                      </div>
                      <div className="internationalGrants-list-table">
                        <div className="project_detail">
                          <h5>Physical Resources and Facilities</h5>
                        </div>
                        <div className="internationalGrants-list-table-format title">
                          <b>Physical Resources and Facilities Details:</b>
                          <span>{project?.physicalResourcesAndFacilities}</span>
                        </div>
                      </div>
                      <div className="internationalGrants-list-table">
                        <div className="project_detail">
                          <h5>Scientific Personnel</h5>
                        </div>
                        <div className="internationalGrants-list-table-format title">
                          <b>Scientific Personnel Details:</b>
                          <span>{project?.scientificPersonnel}</span>
                        </div>
                      </div>
                      <div className="internationalGrants-list-table">
                        <div className="project_detail">
                          <h5>
                            Principal Investigator’s availed research grant
                            details
                          </h5>
                        </div>
                        <div className="internationalGrants-list-table-format title">
                          <b>Scientific Personnel Details:</b>
                          <span>
                            {principalInvestigator?.scientificPersonnelDetails}
                          </span>
                        </div>

                        {principalInvestigator?.projects?.map(
                          (project, index) => (
                            <div
                              className="internationalGrants-list-table"
                              key={index}
                            >
                              <div className="project_detail">
                                <h5>{index + 1}. Project (If any)</h5>
                              </div>
                              <div className="internationalGrants-list-table-format title">
                                <b>Title of Project:</b>
                                <span>{project.title}</span>
                              </div>
                              <div className="internationalGrants-list-table-format">
                                <b>Initiation date:</b>
                                <span>{project.initiationDate || "N/A"}</span>
                              </div>
                              <div className="internationalGrants-list-table-format">
                                <b>Completion date:</b>
                                <span>{project.completionDate || "N/A"}</span>
                              </div>
                              <div className="internationalGrants-list-table-format">
                                <b>Amount(s) awarded:</b>
                                <span>{project.amountAwarded}</span>
                              </div>
                              <div className="internationalGrants-list-table-format">
                                <b>Funding source(s):</b>
                                <span>{project.fundingSource}</span>
                              </div>
                            </div>
                          )
                        )}

                      
                      </div>
                      <div className="internationalGrants-list-table">
                        <div className="project_detail">
                          <h5>Risk Management Strategy</h5>
                        </div>
                        <div className="internationalGrants-list-table-format title">
                          <b>Risk Management Strategy Details:</b>
                          <span>{project?.riskManagementStrategy}</span>
                        </div>
                      </div>
                      <div className="internationalGrants-list-table">
                        <div className="project_detail">
                          <h5>List of References</h5>
                        </div>
                        <div className="internationalGrants-list-table-format title">
                          <b>List of References:</b>
                          <span>{listOfReferences?.text}</span>
                        </div>
                      </div>
                      <div className="internationalGrants-list-table">
                        <div className="project_detail">
                          <h5>Proposed Project Budget</h5>
                        </div>
                        <div className="internationalGrants-list-table-format title">
                          <b>Proposed Project Budget Details:</b>
                          <span>{project?.proposedProjectBudget}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="juw_copyright">
            <p>© 2024, all rights reserved by Jinnah University for Women.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternationalGrants;
