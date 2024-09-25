import React, { useEffect, useState } from "react";
import "./ORICFundedProject.css";
import Sidebar from "../../Sidebar/Sidebar";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import "jspdf-autotable";
import NavBar from "../../shared-components/navbar/NavBar";
import { useParams } from "react-router-dom";
import { fetchORICProjectsById } from "../../../api/Api";

const ORICFundedProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const fetchedProject = await fetchORICProjectsById(id);
        setProject(fetchedProject);
      } catch (error) {
        console.error("Error fetchiong project details:", error);
      }
    };

    loadProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const proposalCover = project.proposalCover
    ? JSON.parse(project.proposalCover)
    : {};
  const researchProject = project.researchProject
    ? JSON.parse(project.researchProject)
    : {};

  const facilitiesandFunding = project.facilitiesandFunding
    ? JSON.parse(project.facilitiesandFunding)
    : {};

  const justificationForBudgetItems = project.justificationForBudgetItems
    ? JSON.parse(project.justificationForBudgetItems)
    : {};

  const estimatedBudget = project.estimatedBudget
    ? JSON.parse(project.estimatedBudget)
    : {};

  const proposal_coverState = {
    Title:
      "Low cost effective production of alginate salts. Low cost effective production of alginate salts. Low cost effective production of alginate salts. Low cost effective production of alginate salts.",
    NameofPI:
      "Low cost effective production of alginate salts. Low cost effective production of alginate salts. Low cost effective production of alginate salts. Low cost effective production of alginate salts.",
    NameofFaculty:
      "Low cost effective production of alginate salts. Low cost effective production of alginate salts. Low cost effective production of alginate salts. Low cost effective production of alginate salts.",
    TotalBudgetRequested: "30000",
  };

  const research_projectState = {
    ProjectTitle: researchProject.projectTitle,
    NatureofProposedResearch: researchProject.natureOfProposedResearch,
    DomainofProposedResearch: researchProject.domainOfProposedResearch,
    ShortSummaryoftheProject: researchProject.shortSummary,
    ProjectDuration: researchProject.projectDuration.year,
    TotalFundsRequested: researchProject.projectDuration.totalFundsRequested,
    Summary_or_Abstract: researchProject.projectDuration.summaryAbstract,
    ProblemtobeAddressed: researchProject.projectDuration.backgroundoftheProblem,
   
  };

  const ObjectiveswithExpectedOutputs = {
    Objectives: Array.isArray(researchProject.objectives)
    ? researchProject.objectives.map((objective, index) => ({
        ObjectiveNumber: index + 1,
        Description: objective.description || "No Description",
        MeasurableOutput: objective.measurableOutput || "No Measurable Output",
        Benefits: objective.benefits || "No Benefits",
      }))
    : [], 
  };

  const facilitiesAndFundingState = {
    Facilitiesavailableinthedepartment: "",
    otherfundingsources: "",
  };

  const justification = {
    ScientificEquipment: "",
    Travel: "",
  };

  const estimatedBudgetdetail = [
    {
      PermanentEquipment: {
        HotPlatesQty: "",
        HotPlatesUnitPrice: "",
        HotPlatesAmount: "",
        PrinterQty: "",
        PrinterUnitPrice: "",
        PrinterAmount: "",
      },
    },
    {
      PaperRim: "",
      Literature: "",
      LocalTravel: "",
      OtherCosts: "",
    },
  ];

  const downloadORICFundedProjectPDF = () => {
    const doc = new jsPDF();

    // Set title font and add the title
    doc.setFontSize(16);
    doc.text("ORIC Funded Project", 14, 15);

    let yOffset = 25; // Initial Y position

    const sections = [
      { title: "PROPOSAL COVER", data: proposalCover },
      { title: "RESEARCH PROJECT", data: research_projectState },
      {
        title: "OBJECTIVES WITH EXPECTED OUTPUTS",
        data: ObjectiveswithExpectedOutputs?.Objectives || [],
      },
      { title: "FACILITIES AND FUNDING", data: facilitiesandFunding },
      {
        title: "JUSTIFICATION FOR THE REQUESTED BUDGET ITEMS",
        data: justificationForBudgetItems,
      },
      
    ];

    sections.forEach((section) => {
      // Section title
      doc.setFontSize(14);
      doc.text(section.title, 14, yOffset);
      yOffset += 10; // Adjust position for the next element
        // Safeguard each section's data
        if (!section.data || (!Array.isArray(section.data) && typeof section.data !== "object")) {
          doc.text("No data available", 14, yOffset);
          yOffset += 10;
          return; // Skip to the next section if data is undefined or invalid
        }
  
      // const tableData = Object.entries(section.data).map(([key, value]) => [
      //   key,
      //   value,
      // ]);

      // Handle objectives separately to format them
    // if (section.title === "OBJECTIVES WITH EXPECTED OUTPUTS") {
    //   section.data.forEach((objective) => {
    //     doc.setFontSize(12);
    //     doc.text(`Objective ${objective.ObjectiveNumber}: ${objective.Description}`, 14, yOffset);
    //     yOffset += 10;
    //     doc.text(`Measurable Output: ${objective.MeasurableOutput}`, 14, yOffset);
    //     yOffset += 10;
    //     doc.text(`Benefits: ${objective.Benefits}`, 14, yOffset);
    //     yOffset += 10; // Add space after each objective
    //   });
    // } else {
    //   // Create a table for other sections
    //   const tableData = Object.entries(section.data).map(([key, value]) => [
    //     key,
    //     value,
    //   ]);

    //   // Create a table for the section
    //   doc.autoTable({
    //     startY: yOffset,
    //     head: [["Key", "Value"]],
    //     body: tableData,
    //     theme: "grid",
    //     headStyles: {
    //       fillColor: [79, 129, 189], // Blue color for header background
    //       textColor: [255, 255, 255], // White color for header text
    //       fontStyle: "bold",
    //     },
    //     bodyStyles: {
    //       fillColor: [226, 236, 255], // Light blue color for body background
    //       textColor: [0, 0, 0], // Black color for body text
    //     },
    //     alternateRowStyles: {
    //       fillColor: [255, 255, 255], // White background for alternate rows
    //     },
    //     styles: {
    //       lineColor: [0, 0, 0], // Black border for cells
    //       lineWidth: 0.1,
    //       fontSize: 10,
    //     },
    //     margin: { top: 10, left: 14, right: 14 },
    //     didDrawPage: (data) => {
    //       yOffset = data.cursor.y; // Update yOffset to the position after the table
    //     },
    //   });
    // }

      // Handle objectives in a table format
      if (section.title === "OBJECTIVES WITH EXPECTED OUTPUTS") {
        if (Array.isArray(section.data)) {
          const objectivesData = section.data.map((objective, index) => [
            `Objective ${objective.ObjectiveNumber}`,
            objective.Description || "No Description",
            objective.MeasurableOutput || "No Measurable Output",
            objective.Benefits || "No Benefits",
          ]);
  
          // Create a table for objectives
          doc.autoTable({
            startY: yOffset,
            head: [["Objective", "Description", "Measurable Output", "Benefits"]],
            body: objectivesData,
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
  
          yOffset += 10 + objectivesData.length * 10; // Space after the objectives table
        }
      } else {
        // Handle non-objective sections with a table
        const tableData = Object.entries(section.data).map(([key, value]) => [
          key,
          value || "N/A", // Default to "N/A" if a value is undefined
        ]);
  
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
      }
    
      yOffset += 10; // Space between tables

      // If the content reaches the bottom of the page, add a new page
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20; // Reset Y position for new page
      }
    });

     // Handle estimatedBudget separately, as per your frontend structure
   // Handle estimatedBudget separately, with a table format
   if (estimatedBudget) {
    doc.setFontSize(14);
    doc.text("ESTIMATED BUDGET FOR PROPOSED RESEARCH PERIOD", 14, yOffset);
    yOffset += 10;

    // Prepare table data for estimatedBudget
    const estimatedBudgetData = [
      ["Permanent Equipment", ""],
    ];

    Object.entries(estimatedBudget.permanentEquipment).forEach(([equipment, details]) => {
      estimatedBudgetData.push([equipment.charAt(0).toUpperCase() + equipment.slice(1), `Qty: ${details.qty}, Unit Price: ${details.unitPrice}, Amount: ${details.amount}`]);
    });

    estimatedBudgetData.push(["B. Paper Rim", estimatedBudget.paperrimAmount.amount]);
    estimatedBudgetData.push(["C. Literature, documentation, online literature search, contingencies, postage", estimatedBudget.literatureAndOtherAmount.amount]);
    estimatedBudgetData.push(["D. Local Travel", estimatedBudget.localTravel.amount]);
    estimatedBudgetData.push(["E. Other costs", estimatedBudget.othercostAmount.amount]);

    // Create a table for estimated budget
    doc.autoTable({
      startY: yOffset,
      head: [["Item", "Details"]],
      body: estimatedBudgetData,
      theme: "grid",
      headStyles: {
        fillColor: [79, 129, 189],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: [226, 236, 255],
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
        fontSize: 10,
      },
      margin: { top: 10, left: 14, right: 14 },
      didDrawPage: (data) => {
        yOffset = data.cursor.y; // Update yOffset to the position after the table
      },
    });

    yOffset += 10; // Space after the budget table
  }

    doc.save("ORICFundedProject.pdf");
  };


  const downloadORICFundedProjectExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    const sections = [
      { title: "PROPOSAL COVER", data: proposalCover },
      { title: "RESEARCH PROJECT", data: research_projectState },
      {
        title: "OBJECTIVES WITH EXPECTED OUTPUTS",
        data: ObjectiveswithExpectedOutputs?.Objectives || [],
      },
      { title: "FACILITIES AND FUNDING", data: facilitiesandFunding },
      {
        title: "JUSTIFICATION", // Shortened to fit Excel's sheet name limit
        data: justificationForBudgetItems,
      },
     
    ];
  
    sections.forEach((section) => {
      let sheetData = [];
  
      if (section.title === "OBJECTIVES WITH EXPECTED OUTPUTS") {
        sheetData.push(["Objective", "Description", "Measurable Output", "Benefits"]);
        if (Array.isArray(section.data)) {
          section.data.forEach((objective) => {
            sheetData.push([
              `Objective ${objective.ObjectiveNumber || "N/A"}`,
              objective.Description || "No Description",
              objective.MeasurableOutput || "No Measurable Output",
              objective.Benefits || "No Benefits",
            ]);
          });
        }
      } else {
        // For other sections, format as key-value pairs
        sheetData.push(["Key", "Value"]);
        if (section.data && typeof section.data === "object") {
          Object.entries(section.data).forEach(([key, value]) => {
            sheetData.push([key, value || "N/A"]); 
          });
        } else {
          sheetData.push(["No data available", "N/A"]);
        }
      }
  
      // Create a worksheet from the sheet data
      const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  
      // Apply styling to the headers
      sheetData.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
          const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
          const cell = worksheet[cellAddress];
  
          if (rowIndex === 0) {
            // Apply styling to the header row
            cell.s = {
              font: { bold: true, color: { rgb: "FFFFFF" } },
              fill: { fgColor: { rgb: "4F81BD" } },
              alignment: { horizontal: "center" },
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
              },
            };
          } else {
            // Apply styling to the rest of the cells
            cell.s = {
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
              },
              alignment: { vertical: "top" },
            };
          }
        });
      });
  
      // Auto width for columns
      const columnWidths = sheetData[0].map(() => ({ wch: 20 }));
      worksheet["!cols"] = columnWidths;
  
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, section.title.substring(0, 31));
    });
  
    // Handle estimatedBudget separately
    if (estimatedBudget) {
      let estimatedBudgetData = [["Item", "Details"]];
      estimatedBudgetData.push(["Permanent Equipment", ""]);
  
      Object.entries(estimatedBudget.permanentEquipment || {}).forEach(([equipment, details]) => {
        estimatedBudgetData.push([
          equipment.charAt(0).toUpperCase() + equipment.slice(1),
          `Qty: ${details.qty}, Unit Price: ${details.unitPrice}, Amount: ${details.amount}`,
        ]);
      });
  
      estimatedBudgetData.push(["B. Paper Rim", estimatedBudget.paperrimAmount?.amount || "N/A"]);
      estimatedBudgetData.push([
        "C. Literature, documentation, online literature search, contingencies, postage",
        estimatedBudget.literatureAndOtherAmount?.amount || "N/A",
      ]);
      estimatedBudgetData.push(["D. Local Travel", estimatedBudget.localTravel?.amount || "N/A"]);
      estimatedBudgetData.push(["E. Other costs", estimatedBudget.othercostAmount?.amount || "N/A"]);
  
      // Create a worksheet for the estimated budget
      const estimatedBudgetWorksheet = XLSX.utils.aoa_to_sheet(estimatedBudgetData);
  
      // Apply the same styling and auto width
      estimatedBudgetData.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
          const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
          const cell = estimatedBudgetWorksheet[cellAddress];
  
          if (rowIndex === 0) {
            cell.s = {
              font: { bold: true, color: { rgb: "FFFFFF" } },
              fill: { fgColor: { rgb: "4F81BD" } },
              alignment: { horizontal: "center" },
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
              },
            };
          } else {
            cell.s = {
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
              },
            };
          }
        });
      });
  
      // Auto width for columns
      const estimatedBudgetColumnWidths = estimatedBudgetData[0].map(() => ({ wch: 30 }));
      estimatedBudgetWorksheet["!cols"] = estimatedBudgetColumnWidths;
  
      XLSX.utils.book_append_sheet(workbook, estimatedBudgetWorksheet, "Estimated Budget");
    }
  
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "ORICFundedProject.xlsx");
  };
  

// const downloadORICFundedProjectExcel = () => {
//   // Create a new workbook
//   const workbook = XLSX.utils.book_new();
  
//   const sections = [
//     { title: "PROPOSAL COVER", data: proposalCover },
//     { title: "RESEARCH PROJECT", data: research_projectState },
//     {
//       title: "OBJECTIVES WITH EXPECTED OUTPUTS",
//       data: ObjectiveswithExpectedOutputs?.Objectives || [],
//     },
//     { title: "FACILITIES AND FUNDING", data: facilitiesandFunding },
//     {
//       title: "JUSTIFICATION", // Shortened to fit Excel's sheet name limit
//       data: justificationForBudgetItems,
//     },
//     {
//       title: "ESTIMATED BUDGET",
//       data: estimatedBudgetdetail,
//     },
//   ];

//   sections.forEach((section) => {
//     // Create data for each section
//     let sheetData = [];

//     if (section.title === "OBJECTIVES WITH EXPECTED OUTPUTS") {
//       // Format objectives specifically
//       sheetData.push(["Objective", "Description", "Measurable Output", "Benefits"]);
//       if (Array.isArray(section.data)) {
//         section.data.forEach((objective) => {
//           sheetData.push([
//             `Objective ${objective.ObjectiveNumber || "N/A"}`,
//             objective.Description || "No Description",
//             objective.MeasurableOutput || "No Measurable Output",
//             objective.Benefits || "No Benefits",
//           ]);
//         });
//       }
//     } else {
//       // For other sections, format as key-value pairs
//       sheetData.push(["Key", "Value"]);
//       if (section.data && typeof section.data === "object") {
//         Object.entries(section.data).forEach(([key, value]) => {
//           sheetData.push([key, value || "N/A"]); // Default to "N/A" if value is undefined
//         });
//       } else {
//         sheetData.push(["No data available", "N/A"]);
//       }
//     }

//     // Create a worksheet from the sheet data
//     const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

//     // Ensure worksheet name is <= 31 characters to prevent Excel errors
//     const sheetName = section.title.substring(0, 31);

//     // Add the worksheet to the workbook
//     XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
//   });

//   // Handle estimatedBudget separately (checking if it exists)
//   if (estimatedBudget) {
//     let estimatedBudgetData = [["Item", "Details"]];
//     estimatedBudgetData.push(["Permanent Equipment", ""]);

//     Object.entries(estimatedBudget.permanentEquipment || {}).forEach(([equipment, details]) => {
//       estimatedBudgetData.push([
//         equipment.charAt(0).toUpperCase() + equipment.slice(1),
//         `Qty: ${details.qty}, Unit Price: ${details.unitPrice}, Amount: ${details.amount}`,
//       ]);
//     });

//     estimatedBudgetData.push(["B. Paper Rim", estimatedBudget.paperrimAmount?.amount || "N/A"]);
//     estimatedBudgetData.push([
//       "C. Literature, documentation, online literature search, contingencies, postage",
//       estimatedBudget.literatureAndOtherAmount?.amount || "N/A",
//     ]);
//     estimatedBudgetData.push(["D. Local Travel", estimatedBudget.localTravel?.amount || "N/A"]);
//     estimatedBudgetData.push(["E. Other costs", estimatedBudget.othercostAmount?.amount || "N/A"]);

//     // Create a worksheet for the estimated budget
//     const estimatedBudgetWorksheet = XLSX.utils.aoa_to_sheet(estimatedBudgetData);
//     XLSX.utils.book_append_sheet(workbook, estimatedBudgetWorksheet, "Estimated Budget");
//   }

//   // Generate Excel file and trigger download
//   XLSX.writeFile(workbook, "ORICFundedProject.xlsx");
// };



  // const downloadORICFundedProjectExcel = () => {
  //   // Create a new workbook and worksheet
  //   const workbook = XLSX.utils.book_new();
  //   const worksheet = XLSX.utils.aoa_to_sheet([]);

  //   // Initialize row index
  //   let rowIndex = 0;

  //   // Define the sections with their respective data
  //   const sections = [
  //     { title: "PROPOSAL COVER", data: proposal_coverState },
  //     { title: "RESEARCH PROJECT", data: research_projectState },
  //     {
  //       title: "OBJECTIVES WITH EXPECTED OUTPUTS",
  //       data: ObjectiveswithExpectedOutputs,
  //     },
  //     { title: "FACILITIES AND FUNDING", data: facilitiesAndFundingState },
  //     { title: "JUSTIFICATION", data: justification },
  //     { title: "ESTIMATED BUDGET", data: estimatedBudget },
  //   ];

  //   // Loop through each section and add the content to the worksheet
  //   sections.forEach((section) => {
  //     // Add the section title as a header row
  //     const headerRow = [section.title];
  //     XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {
  //       origin: `A${rowIndex + 1}`,
  //     });

  //     // Style the header row
  //     const headerCell = XLSX.utils.encode_cell({ r: rowIndex, c: 0 });
  //     worksheet[headerCell] = worksheet[headerCell] || {};
  //     worksheet[headerCell].s = {
  //       font: { bold: true, color: { rgb: "FFFFFF" } },
  //       fill: { fgColor: { rgb: "4F81BD" } },
  //       alignment: { horizontal: "center", vertical: "center" },
  //     };

  //     // Extract keys and values from the section data
  //     const keys = Object.keys(section.data);
  //     const values = Object.values(section.data);

  //     // Add the keys and values as table rows
  //     const tableData = keys.map((key, idx) => [key, values[idx]]);
  //     XLSX.utils.sheet_add_aoa(worksheet, tableData, {
  //       origin: `A${rowIndex + 2}`,
  //     });

  //     // Apply background color and border styling to the table cells
  //     for (let r = rowIndex + 1; r <= rowIndex + keys.length + 1; r++) {
  //       for (let c = 0; c < 2; c++) {
  //         const cell = XLSX.utils.encode_cell({ r, c });
  //         worksheet[cell] = worksheet[cell] || {};
  //         worksheet[cell].s = {
  //           fill: { fgColor: { rgb: "E2ECFF" } },
  //           border: {
  //             top: { style: "thin", color: { rgb: "000000" } },
  //             bottom: { style: "thin", color: { rgb: "000000" } },
  //             left: { style: "thin", color: { rgb: "000000" } },
  //             right: { style: "thin", color: { rgb: "000000" } },
  //           },
  //         };
  //       }
  //     }

  //     // Adjust column widths for the key and value columns
  //     worksheet["!cols"] = [
  //       { wch: 30 }, // Width for the key column
  //       { wch: 50 }, // Width for the value column
  //     ];

  //     // Update the rowIndex for the next section, adding spacing
  //     rowIndex += keys.length + 3;
  //   });

  //   // Append the worksheet to the workbook
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "ORIC Funded Project");

  //   // Trigger the download of the Excel file
  //   XLSX.writeFile(workbook, "ORICFundedProject.xlsx");
  // };

  // const downloadORICFundedProjectCSV = () => {
  //   const csvContent = "data:text/csv;charset=utf-8,";

  //   const sections = [
  //     { title: "PROPOSAL COVER", data: proposal_coverState },
  //     { title: "RESEARCH PROJECT", data: research_projectState },
  //     {
  //       title: "OBJECTIVES WITH EXPECTED OUTPUTS",
  //       data: ObjectiveswithExpectedOutputs,
  //     },
  //     { title: "FACILITIES AND FUNDING", data: facilitiesAndFundingState },
  //     { title: "JUSTIFICATION", data: justification },
  //     { title: "ESTIMATED BUDGET", data: estimatedBudget },
  //   ];

  //   let csvRows = [];

  //   sections.forEach((section) => {
  //     csvRows.push(section.title);
  //     const keys = Object.keys(section.data);
  //     const values = Object.values(section.data);
  //     keys.forEach((key, idx) => {
  //       csvRows.push(`${key},${values[idx]}`);
  //     });
  //     csvRows.push(""); // Add an empty row between sections
  //   });

  //   const encodedUri = encodeURI(csvContent + csvRows.join("\n"));
  //   const link = document.createElement("a");
  //   link.setAttribute("href", encodedUri);
  //   link.setAttribute("download", "ORICFundedProject.csv");
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const downloadORICFundedProjectCSV = () => {
    // Initialize the CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
  
    const sections = [
      { title: "PROPOSAL COVER", data: proposalCover },
      { title: "RESEARCH PROJECT", data: research_projectState },
      {
        title: "OBJECTIVES WITH EXPECTED OUTPUTS",
        data: ObjectiveswithExpectedOutputs?.Objectives || [],
      },
      { title: "FACILITIES AND FUNDING", data: facilitiesandFunding },
      {
        title: "JUSTIFICATION",
        data: justificationForBudgetItems,
      },
      
    ];
  
    let csvRows = [];
  
    // Add a table-like structure for each section
    sections.forEach((section) => {
      csvRows.push(`\n==== ${section.title.toUpperCase()} ====\n`); // Add section title with clear separator
  
      if (section.title === "OBJECTIVES WITH EXPECTED OUTPUTS") {
        // Format objectives as a table
        csvRows.push("Objective,Description,Measurable Output,Benefits"); // Table header
        if (Array.isArray(section.data)) {
          section.data.forEach((objective) => {
            csvRows.push([
              `"Objective ${objective.ObjectiveNumber || "N/A"}"`,
              `"${objective.Description || "No Description"}"`,
              `"${objective.MeasurableOutput || "No Measurable Output"}"`,
              `"${objective.Benefits || "No Benefits"}"`,
            ].join(",")); // Join as a table row
          });
        }
      } else {
        // For other sections, format as a key-value table
        csvRows.push("Key,Value"); // Table header for key-value pairs
        Object.entries(section.data || {}).forEach(([key, value]) => {
          csvRows.push([
            `"${key}"`,
            `"${value || "N/A"}"`, // Default to "N/A" if value is undefined
          ].join(",")); // Join as a table row
        });
      }
    });
  
    // Handle Estimated Budget as a separate section with table-like formatting
    if (estimatedBudget) {
      csvRows.push("\n==== ESTIMATED BUDGET ====\n");
      csvRows.push("Item,Details"); // Table header for estimated budget
  
      csvRows.push("Permanent Equipment,");
      Object.entries(estimatedBudget.permanentEquipment || {}).forEach(([equipment, details]) => {
        csvRows.push([
          `"${equipment.charAt(0).toUpperCase() + equipment.slice(1)}"`,
          `"Qty: ${details.qty}, Unit Price: ${details.unitPrice}, Amount: ${details.amount}"`,
        ].join(",")); // Add rows for each equipment
      });
  
      csvRows.push(`"B. Paper Rim","${estimatedBudget.paperrimAmount?.amount || "N/A"}"`);
      csvRows.push(`"C. Literature, documentation, online literature search, contingencies, postage","${estimatedBudget.literatureAndOtherAmount?.amount || "N/A"}"`);
      csvRows.push(`"D. Local Travel","${estimatedBudget.localTravel?.amount || "N/A"}"`);
      csvRows.push(`"E. Other costs","${estimatedBudget.othercostAmount?.amount || "N/A"}"`);
    }
  
    // Join the rows into a single CSV content string
    const encodedUri = encodeURI(csvContent + csvRows.join("\n"));
  
    // Create and trigger the download link
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ORICFundedProject.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  
  return (
    <div className="oricfundedproject_container">
      <Sidebar />
      <div className="oricfundedproject">
        <div className="oric_navbar-div">
          <NavBar />
        </div>
        <div className="oricfundedproject-card">
          <h5>ORIC Funded Project</h5>

          <div className="download-btn" style={{ marginBottom: "20px" }}>
            <button
              type="button"
              className="create-user-btn"
              onClick={downloadORICFundedProjectPDF}
            >
              DOWNLOAD PDF
            </button>
            <button
              type="button"
              className="create-user-btn"
              onClick={downloadORICFundedProjectExcel}
            >
              DOWNLOAD EXCEL
            </button>
            <button
              type="button"
              className="create-user-btn"
              onClick={downloadORICFundedProjectCSV}
            >
              DOWNLOAD CSV
            </button>
          </div>

          <div className="oricfundedproject-table-data">
            <div className="oricfundedproject-table-container">
              <h2>Project Title: {proposalCover.title}</h2>
              <div className="oricfundedproject-list-table">
                <div className="project_detail">
                  <h5>PROPOSAL COVER</h5>
                </div>
                <div className="oricfundedproject-list-table-format title">
                  <b>Title:</b>
                  <span>{proposalCover.title || "N/A"}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Owner of IP:</b>
                  <span>{proposalCover.nameOfPI || "N/A"}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Address:</b>
                  <span>{proposalCover.nameOfFaculty || "N/A"}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Field of Invention:</b>
                  <span>{proposalCover.totalBudgetRequested || "N/A"}</span>
                </div>
              </div>
              <div className="oricfundedproject-list-table">
                <div className="project_detail">
                  <h5>RESEARCH PROJECT</h5>
                </div>
                <div className="oricfundedproject-list-table-format title">
                  <b>Project Title</b>
                  <span>{researchProject.projectTitle}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Nature of Proposed Research</b>
                  <span>{researchProject.natureOfProposedResearch}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Domain of Proposed Research</b>
                  <span>{researchProject.domainOfProposedResearch}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Short Summary of the Project</b>
                  <span>{researchProject.shortSummary}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Project Duration (Years)</b>
                  <span>
                    {researchProject.projectDuration.year || "Loading..."}
                  </span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Total Funds Requested (Rs)</b>
                  <span>
                    {researchProject.projectDuration.totalFundsRequested}
                  </span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Summary / Abstract</b>
                  <span>{researchProject.projectDuration.summaryAbstract}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Background of The Problem to be Addressed</b>
                  <span>
                    {researchProject.projectDuration.backgroundoftheProblem}
                  </span>
                </div>
              </div>
              <div className="oricfundedproject-list-table">
                <b>Objectives with Expected Outputs</b>
                {researchProject.objectives.map((objective, index) => (
                  <div key={index} className="objective-container">
                    <div className="oricfundedproject-list-table-format title">
                      <b>Objective {index + 1} Description</b>
                      <span>{objective.description}</span>
                    </div>
                    <div className="oricfundedproject-list-table-format">
                      <b>Measurable Output / Expected Results</b>
                      <span>{objective.measurableOutput}</span>
                    </div>
                    <div className="oricfundedproject-list-table-format">
                      <b>Benefits</b>
                      <span>{objective.benefits}</span>
                    </div>
                  </div>
                ))}

                <div className="oricfundedproject-list-table-format">
                  <b>Expected Socio-Economic Benefit</b>
                  <span>{researchProject.socioEconomicBenefit}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Methodology</b>
                  <span>{researchProject.methodology}</span>
                </div>
                {researchProject.schedulephasing.length > 0 ? (
                  researchProject.schedulephasing.map((phase, index) => (
                    <div key={index} className="schedule-phase-container">
                      <div className="oricfundedproject-list-table-format">
                        <b>
                          Activities during Time period {index + 1}st Quarter{" "}
                        </b>
                        <span>{phase.activities}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="oricfundedproject-list-table-format">
                    <span>No schedule phasing activities available.</span>
                  </div>
                )}

                <div className="oricfundedproject-list-table-format">
                  <b>
                    Researcher’s Prior Experience in Relation to Current Project
                    Details
                  </b>
                  <span>{researchProject.priorExperience}</span>
                </div>
              </div>

              <div className="oricfundedproject-list-table">
                <div className="project_detail">
                  <h5>FACILITIES AND FUNDING</h5>
                </div>
                <div className="oricfundedproject-list-table-format title">
                  <b>
                    Facilities available for the research project in the
                    department
                  </b>
                  <span>{facilitiesandFunding.facilitiesAvailable}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Other source of funding (if any)</b>
                  <span>{facilitiesandFunding.otherSourceOfFunding}</span>
                </div>
              </div>

              <div className="oricfundedproject-list-table">
                <div className="project_detail">
                  <h5>JUSTIFICATION FOR THE REQUESTED BUDGET ITEMS</h5>
                </div>
                <div className="oricfundedproject-list-table-format title">
                  <b>Scientific Equipment (if any)</b>
                  <span>{justificationForBudgetItems.scientificEquipment}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>Travel (if required)</b>
                  <span>{justificationForBudgetItems.travel}</span>
                </div>
              </div>

              <div className="oricfundedproject-list-table">
                <div className="project_detail">
                  <h5>ESTIMATED BUDGET FOR PROPOSED RESEARCH PERIOD</h5>
                </div>
                <div className="oricfundedproject-list-table-format title">
                <b>Permanent Equipment</b>
                <span className="">
                    
                      <ul>
                        {Object.entries(
                          estimatedBudget.permanentEquipment
                        ).map(([equipment, details], index) => (
                          <li key={index} className="diskstyle">
                            {equipment.charAt(0).toUpperCase() +
                              equipment.slice(1)}{" "}
                            Qty: {details.qty}, Unit Price: {details.unitPrice},
                            Amount: {details.amount}
                          </li>
                        ))}
                      </ul>
                    </span>
                </div>

                <div className="oricfundedproject-list-table-format">
                  <b>B. Paper Rim</b>
                  <span>{estimatedBudget.paperrimAmount.amount}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>
                    C. Literature, documentation, information, online literature
                    search, contingencies, postage
                  </b>
                  <span>{estimatedBudget.literatureAndOtherAmount.amount}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>D. Local Travel (For project involving field work etc.)</b>
                  <span>{estimatedBudget.localTravel.amount}</span>
                </div>
                <div className="oricfundedproject-list-table-format">
                  <b>E. Other costs (specify)</b>
                  <span>{estimatedBudget.othercostAmount.amount}</span>
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
  );
};

export default ORICFundedProject;
