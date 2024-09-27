import React, { useState } from "react";
import "./internationalGrants.css";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import "jspdf-autotable";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";


const InternationalGrants = () => {

  // Proposal Cover
  const internationalProposalCover = {
    ProposalReferenceNo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
    TitleofProject: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
    DurationofProject: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
    TotalBudgetRequested: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
    ThemeofProposedResearch: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
    DisciplineofProposedResearch: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
  };

  const principleInvestigator = {
    InstitutionName: "",
    StreetAddress: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
    City: "",
    Name: "",
    Position_or_Title: "",
    Department: "",
    TellNo: "",
    Email: "",
    CNIC_PassportNo: "",
  };

  const faculty = {
    InstitutionName: "",
    StreetAddress: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
    City: "",
    Name: "",
    Position_or_Title: "",
    Department: "",
    TellNo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
    Email: "",
    CNIC_PassportNo: "",
  };

  const ExecutiveSummary = {
    executiveSummary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
  };

  const AcademicSectoral = {
    sectoralCollaborators: "",
    academicCollaboratorsDetails: [
      {
        nameofcollaborator: "",
        institutionofcollaborator: "",
        location: "",
        focusofcollaboration: "",
        tellno: "",
        email: "",
      },
      {
        nameofcollaborator: "",
        institutionofcollaborator: "",
        location: "",
        focusofcollaboration: "",
        tellno: "",
        email: "",
      },
    ],
    sectoralCollaboratorsDetails: [
      {
        companyname: "",
        location: "",
        nameofcollaborator: "",
        position: "",
        tellno: "",
        email: "",
        ProjectGoalsAnticipatedContribution: "",
        AnnualFinancialContribution: "",
      },
      {
        companyname: "",
        location: "",
        nameofcollaborator: "",
        position: "",
        tellno: "",
        email: "",
        ProjectGoalsAnticipatedContribution: "",
        AnnualFinancialContribution: "",
      },
    ],
  };

  const ProjectManagement = {
    projectManagement: "",
  };

  const ImplementationTimeline = {
    yearOne: {
      majorTasksAndDeliverables: "",
    },
    yearTwo: {
      majorTasksAndDeliverables: "",
    },
    yearThree: {
      majorTasksAndDeliverables: "",
    },
  };

  const PhysicalResources = {
    physicalResourcesAndFacilities: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
  };

  const ScientificPersonnel = {
    scientificPersonnel: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
  };

  const availedResearchGrants = {
    scientificPersonnelDetails: "",
    projects: [
      {
        titleOfProject: "",
        initiationDate: "",
        completionDate: "",
        amountAwarded: "",
        fundingSource: "",
      },
      {
        titleOfProject: "",
        initiationDate: "",
        completionDate: "",
        amountAwarded: "",
        fundingSource: "",
      },
      {
        titleOfProject: "",
        initiationDate: "",
        completionDate: "",
        amountAwarded: "",
        fundingSource: "",
      },
    ],
  };

  const riskManagement = {
    riskManagementStrategy: "",
  };

  const listOfReferences = {
    listOfReferences: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
  };

  const ProjectBudget = {
    proposedProjectBudget: "",
  };


  const downloadInternationalGrantsPDF = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(16);
    doc.text("International Grants", 14, 15);
  
    let yOffset = 25; 
  
    const sections = [
      { title: "PROPOSAL COVER", data: internationalProposalCover },
      { title: "PRINCIPAL INVESTIGATOR", data: principleInvestigator },
      { title: "FACULTY", data: faculty },
      { title: "EXECUTIVE SUMMARY", data: ExecutiveSummary },
      { title: "ACADEMIC & SECTORAL COLLABORATORS", data: AcademicSectoral },
      { title: "PROJECT MANAGEMENT", data: ProjectManagement },
      { title: "IMPLEMENTATION TIMELINE", data: ImplementationTimeline },
      { title: "PHYSICAL RESOURCES", data: PhysicalResources },
      { title: "SCIENTIFIC PERSONNEL", data: ScientificPersonnel },
      { title: "AVAILED RESEARCH GRANTS", data: availedResearchGrants },
      { title: "RISK MANAGEMENT", data: riskManagement },
      { title: "LIST OF REFERENCES", data: listOfReferences },
      { title: "PROJECT BUDGET", data: ProjectBudget },
    ];
  
    sections.forEach((section) => {
      // Section title
      doc.setFontSize(14);
      doc.text(section.title, 14, yOffset);
      yOffset += 10; // Adjust position for the next element
  
      const tableData = Object.entries(section.data).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.map((item) => JSON.stringify(item)).join(", ")]; 
        }
        return [key, value];
      });
  
      doc.autoTable({
        startY: yOffset,
        head: [["Key", "Value"]],
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
  
      // If the content reaches the bottom of the page, add a new page
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20; // Reset Y position for new page
      }
    });
  
    doc.save("InternationalGrants.pdf");
  };

  const downloadInternationalGrantsExcel = () => {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);
  
    // Initialize row index
    let rowIndex = 0;
  
    // Define the sections with their respective data
    const sections = [
      { title: "PROPOSAL COVER", data: internationalProposalCover },
      { title: "PRINCIPAL INVESTIGATOR", data: principleInvestigator },
      { title: "FACULTY", data: faculty },
      { title: "EXECUTIVE SUMMARY", data: ExecutiveSummary },
      { title: "ACADEMIC & SECTORAL COLLABORATORS", data: AcademicSectoral },
      { title: "PROJECT MANAGEMENT", data: ProjectManagement },
      { title: "IMPLEMENTATION TIMELINE", data: ImplementationTimeline },
      { title: "PHYSICAL RESOURCES", data: PhysicalResources },
      { title: "SCIENTIFIC PERSONNEL", data: ScientificPersonnel },
      { title: "AVAILED RESEARCH GRANTS", data: availedResearchGrants },
      { title: "RISK MANAGEMENT", data: riskManagement },
      { title: "LIST OF REFERENCES", data: listOfReferences },
      { title: "PROJECT BUDGET", data: ProjectBudget },
    ];
  
    // Loop through each section and add the content to the worksheet
    sections.forEach((section) => {
      // Add the section title as a header row
      const headerRow = [section.title];
      XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {
        origin: `A${rowIndex + 1}`,
      });
  
      // Style the header row
      const headerCell = XLSX.utils.encode_cell({ r: rowIndex, c: 0 });
      worksheet[headerCell] = worksheet[headerCell] || {};
      worksheet[headerCell].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4F81BD" } },
        alignment: { horizontal: "center", vertical: "center" },
      };
  
      // Extract keys and values from the section data
      const keys = Object.keys(section.data);
      const values = Object.values(section.data);
  
      // Add the keys and values as table rows
      const tableData = keys.map((key, idx) => [key, values[idx]]);
      XLSX.utils.sheet_add_aoa(worksheet, tableData, {
        origin: `A${rowIndex + 2}`,
      });
  
      // Apply background color and border styling to the table cells
      for (let r = rowIndex + 1; r <= rowIndex + keys.length + 1; r++) {
        for (let c = 0; c < 2; c++) {
          const cell = XLSX.utils.encode_cell({ r, c });
          worksheet[cell] = worksheet[cell] || {};
          worksheet[cell].s = {
            fill: { fgColor: { rgb: "E2ECFF" } },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          };
        }
      }
  
      // Adjust column widths for the key and value columns
      worksheet["!cols"] = [
        { wch: 30 }, // Width for the key column
        { wch: 50 }, // Width for the value column
      ];
  
      // Update the rowIndex for the next section, adding spacing
      rowIndex += keys.length + 3;
    });
  
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "International Grants");
  
    // Trigger the download of the Excel file
    XLSX.writeFile(workbook, "InternationalGrants.xlsx");
  };

  const downloadInternationalGrantsCSV = () => {
    // Define the sections with their respective data
    const sections = [
      { title: "PROPOSAL COVER", data: internationalProposalCover },
      { title: "PRINCIPAL INVESTIGATOR", data: principleInvestigator },
      { title: "FACULTY", data: faculty },
      { title: "EXECUTIVE SUMMARY", data: ExecutiveSummary },
      { title: "ACADEMIC & SECTORAL COLLABORATORS", data: AcademicSectoral },
      { title: "PROJECT MANAGEMENT", data: ProjectManagement },
      { title: "IMPLEMENTATION TIMELINE", data: ImplementationTimeline },
      { title: "PHYSICAL RESOURCES", data: PhysicalResources },
      { title: "SCIENTIFIC PERSONNEL", data: ScientificPersonnel },
      { title: "AVAILED RESEARCH GRANTS", data: availedResearchGrants },
      { title: "RISK MANAGEMENT", data: riskManagement },
      { title: "LIST OF REFERENCES", data: listOfReferences },
      { title: "PROJECT BUDGET", data: ProjectBudget },
    ];
  
    // Initialize an array to hold CSV data
    let csvContent = "";
  
    // Loop through each section and add content to the CSV
    sections.forEach((section) => {
      // Add the section title
      csvContent += section.title + "\n";
  
      // Extract keys and values from the section data
      const keys = Object.keys(section.data);
      const values = Object.values(section.data);
  
      // Create CSV rows for keys and values
      keys.forEach((key, idx) => {
        const row = `${key},${values[idx]}`;
        csvContent += row + "\n";
      });
  
      // Add a blank line between sections
      csvContent += "\n";
    });
  
    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
    // Create a link element for downloading
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "InternationalGrants.csv");
  
    // Append to the body and trigger the download
    document.body.appendChild(link);
    link.click();
  
    // Clean up and remove the link element
    document.body.removeChild(link);
  };

  
  

  return (
    <>
      <div className="internationalgrants-container">
        <Sidebar />
        <div className="internationalgrants">
          <div className="oric_navbar-div">
            <NavBar />
          </div>
          <div className="internationalgrants-card">
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

            <div className="internationalgrants-table-data">
              <div className="internationalgrants-table-container">
                <h2>Project Title: test</h2>
                <div className="internationalgrants-list-table">
                  <div className="project_detail">
                    <h5>PROPOSAL COVER</h5>
                  </div>
                  <div className="internationalgrants-list-table-format title">
                    <b>*Proposal Reference No:</b>
                    <span>
                      {internationalProposalCover.ProposalReferenceNo}
                    </span>
                  </div>
                  <div className="internationalgrants-list-table-format">
                    <b>*Title of Project:</b>
                    <span>{internationalProposalCover.TitleofProject}</span>
                  </div>
                  <div className="internationalgrants-list-table-format">
                    <b>Duration of Project:</b>
                    <span>{internationalProposalCover.DurationofProject}</span>
                  </div>
                  <div className="internationalgrants-list-table-format">
                    <b>Total Budget Requested:</b>
                    <span>
                      {internationalProposalCover.TotalBudgetRequested}
                    </span>
                  </div>
                  <div className="internationalgrants-list-table-format">
                    <b>Theme of Proposed Research:</b>
                    <span>
                      {internationalProposalCover.ThemeofProposedResearch}
                    </span>
                  </div>
                  <div className="internationalgrants-list-table-format">
                    <b>Discipline of Proposed Research:</b>
                    <span>
                      {internationalProposalCover.DisciplineofProposedResearch}
                    </span>
                  </div>

                  <div className="internationalgrants-list-table">
                    <div className="project_detail">
                      <h5>Principal Investigator Details:</h5>
                    </div>
                    <div className="internationalgrants-list-table-format title">
                      <b>Institution Name</b>
                      <span>{principleInvestigator.InstitutionName}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Street Address:</b>
                      <span>{principleInvestigator.StreetAddress}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>City:</b>
                      <span>{principleInvestigator.City}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Name:</b>
                      <span>{principleInvestigator.Name}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Position/Title:</b>
                      <span>{principleInvestigator.Position_or_Title}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Department:</b>
                      <span>{principleInvestigator.Department}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Tell No:</b>
                      <span>{principleInvestigator.TellNo}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Email:</b>
                      <span>{principleInvestigator.Email}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>CNIC/Passport No:</b>
                      <span>{principleInvestigator.CNIC_PassportNo}</span>
                    </div>
                  </div>

                  <div className="internationalgrants-list-table">
                    <div className="project_detail">
                      <h5>Faculty Details:</h5>
                    </div>
                    <div className="internationalgrants-list-table-format title">
                      <b>Institution Name</b>
                      <span>{faculty.InstitutionName}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Street Address:</b>
                      <span>{faculty.StreetAddress}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>City:</b>
                      <span>{faculty.City}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Name:</b>
                      <span>{faculty.Name}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Position/Title:</b>
                      <span>{faculty.Position_or_Title}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Department:</b>
                      <span>{faculty.Department}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Tell No:</b>
                      <span>{faculty.TellNo}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Email:</b>
                      <span>{faculty.Email}</span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>CNIC/Passport No:</b>
                      <span>{faculty.CNIC_PassportNo}</span>
                    </div>
                  </div>

                  <div className="internationalgrants-list-table">
                    <div className="project_detail">
                      <h5>Executive Summary</h5>
                    </div>
                    <div className="internationalgrants-list-table-format title">
                      <b>Executive Summary:</b>
                      <span>{ExecutiveSummary.executiveSummary}</span>
                    </div>
                  </div>

                  <div className="internationalgrants-list-table">
                    <h5>Academic/Sectoral Collaborators</h5>

                    <div className="project_detail">
                      <h5>1. ACADEMIC COLLABORATORS (IF ANY)</h5>
                    </div>

                    <div className="internationalgrants-list-table-format title">
                      <b>Name of Collaborator:</b>
                      <span>
                        {
                          AcademicSectoral?.academicCollaboratorsDetails
                            ?.nameofcollaborator
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Institution of Collaborator:</b>
                      <span>
                        {
                          AcademicSectoral?.academicCollaboratorsDetails
                            ?.institutionofcollaborator
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Location:</b>
                      <span>
                        {
                          AcademicSectoral?.academicCollaboratorsDetails
                            ?.location
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Focus of collaboration: education or research:</b>
                      <span>
                        {
                          AcademicSectoral?.academicCollaboratorsDetails
                            ?.focusofcollaboration
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Tel. #:</b>
                      <span>
                        {AcademicSectoral?.academicCollaboratorsDetails?.tellno}
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Email:</b>
                      <span>
                        {AcademicSectoral?.academicCollaboratorsDetails?.email}
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <div className="project_detail">
                        <h5>2. ACADEMIC COLLABORATORS (IF ANY)</h5>
                      </div>
                    </div>

                    <div className="internationalgrants-list-table-format title">
                      <b>Name of Collaborator:</b>
                      <span>
                        {
                          AcademicSectoral?.academicCollaboratorsDetails
                            ?.nameofcollaborator
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Institution of Collaborator:</b>
                      <span>
                        {
                          AcademicSectoral?.academicCollaboratorsDetails
                            ?.institutionofcollaborator
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Location:</b>
                      <span>
                        {
                          AcademicSectoral?.academicCollaboratorsDetails
                            ?.location
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Focus of collaboration: education or research:</b>
                      <span>
                        {
                          AcademicSectoral?.academicCollaboratorsDetails
                            ?.focusofcollaboration
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Tel. #:</b>
                      <span>
                        {AcademicSectoral?.academicCollaboratorsDetails?.tellno}
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Email:</b>
                      <span>
                        {AcademicSectoral?.academicCollaboratorsDetails?.email}
                      </span>
                    </div>

                    <div className="internationalgrants-list-table-format">
                      <div className="project_detail">
                        <h5>2. SECTORAL COLLABORATORS</h5>
                      </div>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <div className="project_detail">
                        <h5>1. Sectoral Collaborator Details</h5>
                      </div>
                    </div>

                    <div className="internationalgrants-list-table-format title">
                      <b>Company/Organization Name:</b>
                      <span>
                        {
                          AcademicSectoral?.sectoralCollaboratorsDetails
                            ?.companyname
                        }
                      </span>
                    </div>

                    <div className="internationalgrants-list-table-format">
                      <b>Location:</b>
                      <span>
                        {
                          AcademicSectoral?.sectoralCollaboratorsDetails
                            ?.location
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Name of Collaborator:</b>
                      <span>
                        {
                          AcademicSectoral?.sectoralCollaboratorsDetails
                            ?.nameofcollaborator
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Position/Title:</b>
                      <span>
                        {
                          AcademicSectoral?.sectoralCollaboratorsDetails
                            ?.position
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Tel. #:</b>
                      <span>
                        {AcademicSectoral?.sectoralCollaboratorsDetails?.tellno}
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Email:</b>
                      <span>
                        {AcademicSectoral?.sectoralCollaboratorsDetails?.email}
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Anticipated Contribution to Project Goals:</b>
                      <span>
                        {
                          AcademicSectoral?.sectoralCollaboratorsDetails
                            ?.ProjectGoalsAnticipatedContribution
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Anticipated Annual Financial Contribution:</b>
                      <span>
                        {
                          AcademicSectoral.sectoralCollaboratorsDetails
                            .AnnualFinancialContribution
                        }
                      </span>
                    </div>

                    <div className="internationalgrants-list-table-format title">
                      <div className="project_detail">
                        <h5>2. Sectoral Collaborator Details</h5>
                      </div>
                    </div>

                    <div className="internationalgrants-list-table-format title">
                      <b>Company/Organization Name:</b>
                      <span>
                        {
                          AcademicSectoral?.sectoralCollaboratorsDetails
                            ?.companyname
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Location:</b>
                      <span>
                        {
                          AcademicSectoral?.sectoralCollaboratorsDetails
                            ?.location
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Name of Collaborator:</b>
                      <span>
                        {
                          AcademicSectoral?.sectoralCollaboratorsDetails
                            ?.nameofcollaborator
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Position/Title:</b>
                      <span>
                        {AcademicSectoral.sectoralCollaboratorsDetails.position}
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Tel. #:</b>
                      <span>
                        {AcademicSectoral.sectoralCollaboratorsDetails.tellno}
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Email:</b>
                      <span>
                        {AcademicSectoral.sectoralCollaboratorsDetails.email}
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Anticipated Contribution to Project Goals:</b>
                      <span>
                        {
                          AcademicSectoral.sectoralCollaboratorsDetails
                            .ProjectGoalsAnticipatedContribution
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table-format">
                      <b>Anticipated Annual Financial Contribution:</b>
                      <span>
                        {
                          AcademicSectoral.sectoralCollaboratorsDetails
                            .AnnualFinancialContribution
                        }
                      </span>
                    </div>
                    <div className="internationalgrants-list-table">
                      <div className="project_detail">
                        <h5>Project Management</h5>
                      </div>
                      <div className="internationalgrants-list-table-format title">
                        <b>Project Management Details:</b>
                        <span>{ProjectManagement.projectManagement}</span>
                      </div>

                      <div className="internationalgrants-list-table">
                        <div className="project_detail">
                          <h5>Implementation Timeline</h5>
                        </div>
                        <div className="internationalgrants-list-table-format">
                          <h5>Year One</h5>
                        </div>
                      </div>

                      <div className="internationalgrants-list-table-format">
                        <b>Major Tasks and Deliverables:</b>
                        <span>
                          {
                            ImplementationTimeline?.yearOne
                              ?.majorTasksAndDeliverables
                          }
                        </span>
                      </div>

                      <div className="internationalgrants-list-table-format">
                        <h5>Year Two</h5>
                      </div>

                      <div className="internationalgrants-list-table-format title">
                        <b>Major Tasks and Deliverables:</b>
                        <span>
                          {
                            ImplementationTimeline?.yearTwo
                              ?.majorTasksAndDeliverables
                          }
                        </span>
                      </div>

                      <div className="internationalgrants-list-table-format">
                        <div className="project_detail">
                          <h5>Year Three</h5>
                        </div>
                      </div>
                      <div className="internationalgrants-list-table-format title">
                        <b>Major Tasks and Deliverables:</b>
                        <span>
                          {
                            ImplementationTimeline?.yearThree
                              ?.majorTasksAndDeliverables
                          }
                        </span>
                      </div>
                      <div className="internationalgrants-list-table">
                        <div className="project_detail">
                          <h5>Physical Resources and Facilities</h5>
                        </div>
                        <div className="internationalgrants-list-table-format title">
                          <b>Physical Resources and Facilities Details:</b>
                          <span>
                            {PhysicalResources.physicalResourcesAndFacilities}
                          </span>
                        </div>
                      </div>
                      <div className="internationalgrants-list-table">
                        <div className="project_detail">
                          <h5>Scientific Personnel</h5>
                        </div>
                        <div className="internationalgrants-list-table-format title">
                          <b>Scientific Personnel Details:</b>
                          <span>{ScientificPersonnel.scientificPersonnel}</span>
                        </div>
                      </div>
                      <div className="internationalgrants-list-table">
                        <div className="project_detail">
                          <h5>
                            Principal Investigator’s availed research grant
                            details
                          </h5>
                        </div>
                        <div className="internationalgrants-list-table-format title">
                          <b>Scientific Personnel Details:</b>
                          <span>
                            {availedResearchGrants.scientificPersonnelDetails}
                          </span>
                        </div>
                        <div className="internationalgrants-list-table">
                          <div className="project_detail">
                            <h5>1. Project (If any)</h5>
                          </div>
                          <div className="internationalgrants-list-table-format title">
                            <b>Title of Project:</b>
                            <span>
                              {availedResearchGrants.projects.titleOfProject}
                            </span>
                          </div>
                          <div className="internationalgrants-list-table-format">
                            <b>Initiation date:</b>
                            <span>
                              {availedResearchGrants.projects.initiationDate}
                            </span>
                          </div>
                          <div className="internationalgrants-list-table-format">
                            <b>Completion date:</b>
                            <span>
                              {availedResearchGrants.projects.completionDate}
                            </span>
                          </div>
                          <div className="internationalgrants-list-table-format">
                            <b>Amount(s) awarded:</b>
                            <span>
                              {availedResearchGrants.projects.amountAwarded}
                            </span>
                          </div>
                          <div className="internationalgrants-list-table-format">
                            <b>Funding source(s):</b>
                            <span>
                              {availedResearchGrants.projects.fundingSource}
                            </span>
                          </div>
                        </div>
                        <div className="internationalgrants-list-table">
                          <div className="project_detail">
                            <h5>2. Project (If any)</h5>
                          </div>
                          <div className="internationalgrants-list-table-format title">
                            <b>Title of Project:</b>
                            <span>
                              {availedResearchGrants.projects.titleOfProject}
                            </span>
                          </div>
                          <div className="internationalgrants-list-table-format">
                            <b>Initiation date:</b>
                            <span>
                              {availedResearchGrants.projects.initiationDate}
                            </span>
                          </div>
                          <div className="internationalgrants-list-table-format">
                            <b>Completion date:</b>
                            <span>
                              {availedResearchGrants.projects.completionDate}
                            </span>
                          </div>
                          <div className="internationalgrants-list-table-format">
                            <b>Amount(s) awarded:</b>
                            <span>
                              {availedResearchGrants.projects.amountAwarded}
                            </span>
                          </div>
                          <div className="internationalgrants-list-table-format">
                            <b>Funding source(s):</b>
                            <span>
                              {availedResearchGrants.projects.fundingSource}
                            </span>
                          </div>
                        </div>
                        <div className="internationalgrants-list-table">
                          <div className="project_detail">
                            <h5>3. Project (If any)</h5>
                          </div>
                          <div className="internationalgrants-list-table-format title">
                            <b>Title of Project:</b>
                            <span>
                              {availedResearchGrants.projects.titleOfProject}
                            </span>
                          </div>
                          <div className="internationalgrants-list-table-format">
                            <b>Initiation date:</b>
                            <span>
                              {availedResearchGrants.projects.initiationDate}
                            </span>
                          </div>
                          <div className="internationalgrants-list-table-format">
                            <b>Completion date:</b>
                            <span>
                              {availedResearchGrants.projects.completionDate}
                            </span>
                          </div>
                          <div className="internationalgrants-list-table-format">
                            <b>Amount(s) awarded:</b>
                            <span>
                              {availedResearchGrants.projects.amountAwarded}
                            </span>
                          </div>
                          <div className="internationalgrants-list-table-format">
                            <b>Funding source(s):</b>
                            <span>
                              {availedResearchGrants.projects.fundingSource}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="internationalgrants-list-table">
                        <div className="project_detail">
                          <h5>Risk Management Strategy</h5>
                        </div>
                        <div className="internationalgrants-list-table-format title">
                          <b>Risk Management Strategy Details:</b>
                          <span>{riskManagement.riskManagementStrategy}</span>
                        </div>
                      </div>
                      <div className="internationalgrants-list-table">
                        <div className="project_detail">
                          <h5>List of References</h5>
                        </div>
                        <div className="internationalgrants-list-table-format title">
                          <b>List of References:</b>
                          <span>{listOfReferences.listOfReferences}</span>
                        </div>
                      </div>
                      <div className="internationalgrants-list-table">
                        <div className="project_detail">
                          <h5>Proposed Project Budget</h5>
                        </div>
                        <div className="internationalgrants-list-table-format title">
                          <b>Proposed Project Budget Details:</b>
                          <span>{ProjectBudget.proposedProjectBudget}</span>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default InternationalGrants;
