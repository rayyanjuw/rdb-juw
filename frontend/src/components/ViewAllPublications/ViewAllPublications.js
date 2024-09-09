// import React from "react";
// import "./viewAllPublications.css";
// import Sidebar from "../Sidebar/Sidebar";
// import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
// import { useLocation } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import * as XLSX from 'xlsx';
// import 'jspdf-autotable';
// import NavBar from "../shared-components/navbar/NavBar";

// const downloadPDF = (data) => {
//   const doc = new jsPDF();

//   // Set title font and add the title
//   doc.setFontSize(16);
//   doc.text("Publications", 14, 15);

//   let yOffset = 25; // Initial Y position

//   data.forEach((research, index) => {
//     // Title for each publication
//     doc.setFontSize(14);
//     doc.text(`Publication #${index + 1}`, 14, yOffset);
//     yOffset += 5; // Adjust position for the next element

//     // Prepare data for the table
//     const tableData = Object.entries(research).map(([key, value]) => [key, value]);

//     // Create a table for the publication
//     doc.autoTable({
//       startY: yOffset,
//       head: [['Key', 'Value']],
//       body: tableData,
//       theme: 'grid',
//       headStyles: {
//         fillColor: [79, 129, 189], // Blue color for header background
//         textColor: [255, 255, 255], // White color for header text
//         fontStyle: 'bold',
//       },
//       bodyStyles: {
//         fillColor: [226, 236, 255], // Light blue color for body background
//         textColor: [0, 0, 0], // Black color for body text
//       },
//       alternateRowStyles: {
//         fillColor: [255, 255, 255], // White background for alternate rows
//       },
//       styles: {
//         lineColor: [0, 0, 0], // Black border for cells
//         lineWidth: 0.1,
//         fontSize: 10,
//       },
//       margin: { top: 10, left: 14, right: 14 },
//       didDrawPage: (data) => {
//         yOffset = data.cursor.y; // Update yOffset to the position after the table
//       },
//     });

//     yOffset += 10; // Space between tables

//     // If the content reaches the bottom of the page, add a new page
//     if (yOffset > 270) {
//       doc.addPage();
//       yOffset = 20; // Reset Y position for new page
//     }
//   });

//   doc.save("publications.pdf");
// };

// const downloadCSV = (data) => {
//   const csvContent = "data:text/csv;charset=utf-8,"
//     + Object?.keys(data[0]).join(",") + "\n" // Add headers
//     + data?.map(row => Object.values(row).join(",")).join("\n"); // Add rows

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "publications.csv");
//   document.body.appendChild(link); // Required for Firefox
//   link.click();
//   document.body.removeChild(link);
// };

// const downloadExcel = (data) => {
//   // Create a new workbook and worksheet
//   const workbook = XLSX.utils.book_new();
//   const worksheet = XLSX.utils.aoa_to_sheet([]);

//   // Initialize row index
//   let rowIndex = 0;

//   // Loop through each publication and create a styled table
//   data.forEach((research, index) => {
//     // Header for the publication
//     const headerRow = [`Publication #${index + 1}`];
//     XLSX.utils.sheet_add_aoa(worksheet, [headerRow], { origin: `A${rowIndex + 1}` });

//     // Extract keys and values
//     const keys = Object.keys(research);
//     const values = Object.values(research);

//     // Add keys and values as table rows
//     const tableData = keys.map((key, idx) => [key, values[idx]]);
//     XLSX.utils.sheet_add_aoa(worksheet, tableData, { origin: `A${rowIndex + 2}` });

//     // Apply styles to the header row
//     const headerCell = XLSX.utils.encode_cell({ r: rowIndex, c: 0 });
//     if (worksheet[headerCell]) {
//       worksheet[headerCell].s = {
//         font: { bold: true, color: { rgb: "FFFFFF" } },
//         fill: { fgColor: { rgb: "4F81BD" } },
//         alignment: { horizontal: "center", vertical: "center" }
//       };
//     }

//     // Apply background color and border to each cell in the publication table
//     for (let r = rowIndex + 1; r <= rowIndex + keys.length + 1; ++r) {
//       for (let c = 0; c < 2; ++c) {
//         const cell = XLSX.utils.encode_cell({ r, c });
//         if (!worksheet[cell]) worksheet[cell] = {}; // Ensure the cell is defined
//         worksheet[cell].s = {
//           fill: { fgColor: { rgb: "E2ECFF" } },
//           border: {
//             top: { style: "thin", color: { rgb: "000000" } },
//             bottom: { style: "thin", color: { rgb: "000000" } },
//             left: { style: "thin", color: { rgb: "000000" } },
//             right: { style: "thin", color: { rgb: "000000" } }
//           }
//         };
//       }
//     }

//     // Adjust column widths
//     worksheet['!cols'] = [
//       { wch: 30 }, // Width for key column
//       { wch: 50 }  // Width for value column
//     ];

//     // Increment rowIndex by the number of rows in the current table + 3 for spacing
//     rowIndex += keys.length + 3;
//   });

//   // Add the worksheet to the workbook
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Publications');

//   // Write the workbook to a file and trigger the download
//   XLSX.writeFile(workbook, 'publications.xlsx');
// };

// const ViewAllPublications = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const breadCrumps = [
//     {
//       label: " Personal Information",
//       path: "/researchportfolio",
//     },
//     {
//       label: "Honor and Awards, Scholarship",
//       path: "/honorandawards",
//     },
//     {
//       label: "Membership",
//       path: "/membership",
//     },
//     {
//       label: "Publications",
//       path: "/viewallpublications",
//     },
//     {
//       label: "Research Grants and Contracts",
//       path: "/research-grants-and-contracts",
//     },
//   ];

//   const data = [
//     {
//       Articletype: "Original Research",
//       TitleofManuscript: "Anti-depressant Effect of Fluoxetine on Brain Indolamine Levels to Improve the RA Associated Depression in Adjuvant Induced Arthritic Rats",
//       Journal: "RADS JOURNAL OF PHARMACY AND ALLIED HEALTH SCIENCES",
//       ISSN: "1",
//       Vol: "1",
//       Issue: "1",
//       URLofPublication: "https://jphs.juw.edu.pk/index.php/jphs/article/view/26/57",
//       DateofPublication: "2024-02-01",
//       HECCategory: "W",
//       WebofScience: "Yes",
//       ImpactFactor: "1.00",
//       Scopus: "Yes",
//     },
//     {
//       Articletype: "Original Research",
//       TitleofManuscript: "1",
//       Journal: "1",
//       ISSN: "1",
//       Vol: "1",
//       Issue: "1",
//       URLofPublication: "",
//       DateofPublication: "2024-02-01",
//       HECCategory: "W",
//       WebofScience: "Yes",
//       ImpactFactor: "1.00",
//       Scopus: "Yes",
//     },
//     {
//       Articletype: "Original Research",
//       TitleofManuscript: "1",
//       Journal: "1",
//       ISSN: "1",
//       Vol: "1",
//       Issue: "1",
//       URLofPublication: "",
//       DateofPublication: "2024-02-01",
//       HECCategory: "W",
//       WebofScience: "Yes",
//       ImpactFactor: "1.00",
//       Scopus: "Yes",
//     },
//     {
//       Articletype: "Original Research",
//       TitleofManuscript: "1",
//       Journal: "1",
//       ISSN: "1",
//       Vol: "1",
//       Issue: "1",
//       URLofPublication: "",
//       DateofPublication: "2024-02-01",
//       HECCategory: "W",
//       WebofScience: "Yes",
//       ImpactFactor: "1.00",
//       Scopus: "Yes",
//     },
//     {
//       Articletype: "Original Research",
//       TitleofManuscript: "1",
//       Journal: "1",
//       ISSN: "1",
//       Vol: "1",
//       Issue: "1",
//       URLofPublication: "",
//       DateofPublication: "2024-02-01",
//       HECCategory: "W",
//       WebofScience: "Yes",
//       ImpactFactor: "1.00",
//       Scopus: "Yes",
//     },
//   ];

//   return (
//     <>
//     <div className="viewallpublications-whole-page">
//       <Sidebar />
//       <div className="viewAllPublications">
//       <div className='navbar-div'>
//         <NavBar/>
//         </div>
//         <div className="viewAllPublications-card">
//           <h4>Research portfolio | Publications</h4>
//           <div className="VAP_bred-crumb">
//             <Breadcrumb items={breadCrumps} activePath={currentPath} />
//           </div>
//           {/* <div className="bred-crumb">
//             <Breadcrumb items={breadCrumps} activePath={currentPath} />
//           </div> */}
//           <div className="h4-heading" style={{ marginTop: "20px" }}>
//             <h4>Publications:</h4>
//           </div>
//           <div className="download-btn" style={{marginBottom: "20px"}}>
//             <button
//               type="button"
//               className="create-user-btn"
//               onClick={() => downloadPDF(data)}
//             >
//               DOWNLOAD PDF
//             </button>
//             <button type="button" className="create-user-btn" onClick={()=> downloadExcel(data)}>
//               DOWNLOAD EXCEL
//             </button>
//             <button type="button" className="create-user-btn" onClick={()=> downloadCSV(data)}>
//               DOWNLOAD CSV
//             </button>
//           </div>
//           <div className="publications-table">
//             {data?.map((research, index) => (
//               <div key={index} className="publication-section">
//                 <h5 className="publication-heading">Publication {index + 1}</h5>
//                 <table>
//                   <tbody>
//                     {Object.entries(research).map(([key, value], subIndex) => (
//                       <tr key={subIndex}>
//                         <td className="key-column">{key}</td>
//                         <td className="value-column">{value}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>
//         </div>
//           {/* <div className="juw-copyright">
//             <h6>© 2024, all rights reserved by Jinnah University for Women.</h6>
//           </div> */}
//           <div className="juw-copyright">
//             <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//           </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default ViewAllPublications;

// api integrated

// perfectly integrated
// import React, { useState, useEffect } from "react";
// import "./viewAllPublications.css";
// import Sidebar from "../Sidebar/Sidebar";
// import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
// import { useLocation } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import * as XLSX from 'xlsx';
// import 'jspdf-autotable';
// import NavBar from "../shared-components/navbar/NavBar";
// import { getAllPublications } from "../../api/Api";

// const downloadPDF = (data) => {
//   const doc = new jsPDF();
//   doc.setFontSize(16);
//   doc.text("Publications", 14, 15);

//   let yOffset = 25;

//   data.forEach((research, index) => {
//     doc.setFontSize(14);
//     doc.text(`Publication #${index + 1}`, 14, yOffset);
//     yOffset += 5;
//     const tableData = Object.entries(research).map(([key, value]) => [key, value]);

//     doc.autoTable({
//       startY: yOffset,
//       head: [['Key', 'Value']],
//       body: tableData,
//       theme: 'grid',
//       headStyles: {
//         fillColor: [79, 129, 189],
//         textColor: [255, 255, 255],
//         fontStyle: 'bold',
//       },
//       bodyStyles: {
//         fillColor: [226, 236, 255],
//         textColor: [0, 0, 0],
//       },
//       alternateRowStyles: {
//         fillColor: [255, 255, 255],
//       },
//       styles: {
//         lineColor: [0, 0, 0],
//         lineWidth: 0.1,
//         fontSize: 10,
//       },
//       margin: { top: 10, left: 14, right: 14 },
//       didDrawPage: (data) => {
//         yOffset = data.cursor.y;
//       },
//     });

//     yOffset += 10;
//     if (yOffset > 270) {
//       doc.addPage();
//       yOffset = 20;
//     }
//   });

//   doc.save("publications.pdf");
// };

// const downloadCSV = (data) => {
//   const csvContent = "data:text/csv;charset=utf-8,"
//     + Object?.keys(data[0]).join(",") + "\n"
//     + data?.map(row => Object.values(row).join(",")).join("\n");

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "publications.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const downloadExcel = (data) => {
//   const workbook = XLSX.utils.book_new();
//   const worksheet = XLSX.utils.aoa_to_sheet([]);
//   let rowIndex = 0;

//   data.forEach((research, index) => {
//     const headerRow = [`Publication #${index + 1}`];
//     XLSX.utils.sheet_add_aoa(worksheet, [headerRow], { origin: `A${rowIndex + 1}` });

//     const keys = Object.keys(research);
//     const values = Object.values(research);
//     const tableData = keys.map((key, idx) => [key, values[idx]]);
//     XLSX.utils.sheet_add_aoa(worksheet, tableData, { origin: `A${rowIndex + 2}` });

//     const headerCell = XLSX.utils.encode_cell({ r: rowIndex, c: 0 });
//     if (worksheet[headerCell]) {
//       worksheet[headerCell].s = {
//         font: { bold: true, color: { rgb: "FFFFFF" } },
//         fill: { fgColor: { rgb: "4F81BD" } },
//         alignment: { horizontal: "center", vertical: "center" }
//       };
//     }

//     for (let r = rowIndex + 1; r <= rowIndex + keys.length + 1; ++r) {
//       for (let c = 0; c < 2; ++c) {
//         const cell = XLSX.utils.encode_cell({ r, c });
//         if (!worksheet[cell]) worksheet[cell] = {};
//         worksheet[cell].s = {
//           fill: { fgColor: { rgb: "E2ECFF" } },
//           border: {
//             top: { style: "thin", color: { rgb: "000000" } },
//             bottom: { style: "thin", color: { rgb: "000000" } },
//             left: { style: "thin", color: { rgb: "000000" } },
//             right: { style: "thin", color: { rgb: "000000" } }
//           }
//         };
//       }
//     }

//     worksheet['!cols'] = [
//       { wch: 30 },
//       { wch: 50 }
//     ];

//     rowIndex += keys.length + 3;
//   });

//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Publications');
//   XLSX.writeFile(workbook, 'publications.xlsx');
// };

// const ViewAllPublications = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [data, setData] = useState([
//     {
//       articletype: "",
//       titleofmanuscript: "",
//       journal: "",
//       ISSN: "",
//       Volume: "",
//       Issue: "",
//       Year: "",
//       DateofPublication: "",
//       Pages: "",
//       HECcategory: "",
//       webofScience: "",
//       impactfactor: "",
//       scopus: "",
//       urlOfPublication: "",
//     },
//   ]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const publications = await getAllPublications();
//         setData(publications);
//       } catch (error) {
//         console.error("Error fetching publications:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const breadCrumps = [
//     { label: " Personal Information", path: "/researchportfolio" },
//     { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
//     { label: "Membership", path: "/membership" },
//     { label: "Publications", path: "/viewallpublications" },
//     { label: "Research Grants and Contracts", path: "/research-grants-and-contracts" },
//   ];

//   return (
//     <>
//       <div className="viewallpublications-whole-page">
//         <Sidebar />
//         <div className="viewAllPublications">
//           <div className='navbar-div'>
//             <NavBar/>
//           </div>
//           <div className="viewAllPublications-card">
//             <h4>Research portfolio | Publications</h4>
//             <div className="VAP_bred-crumb">
//               <Breadcrumb items={breadCrumps} activePath={currentPath} />
//             </div>
//             <div className="h4-heading" style={{ marginTop: "20px" }}>
//               <h4>Publications:</h4>
//             </div>
//             <div className="download-btn" style={{ marginBottom: "20px" }}>
//               <button type="button" className="create-user-btn" onClick={() => downloadPDF(data)}>
//                 DOWNLOAD PDF
//               </button>
//               <button type="button" className="create-user-btn" onClick={() => downloadExcel(data)}>
//                 DOWNLOAD EXCEL
//               </button>
//               <button type="button" className="create-user-btn" onClick={() => downloadCSV(data)}>
//                 DOWNLOAD CSV
//               </button>
//             </div>
//             <div className="publications-table">
//               {data?.map((research, index) => (
//                 <div key={index} className="publication-section">
//                   <h5 className="publication-heading">{research.titleofmanuscript || `Publication ${index + 1}`}</h5>
//                   <table>
//                     <tbody>
//                       {Object.entries(research).map(([key, value], subIndex) => (
//                         <tr key={subIndex}>
//                           <td className="key-column">{key}</td>
//                           <td className="value-column">{value}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="juw-copyright">
//             <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewAllPublications;

// more adjustments : Delete APi integrated
// import React, { useState, useEffect } from "react";
// import "./viewAllPublications.css";
// import Sidebar from "../Sidebar/Sidebar";
// import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
// import { useLocation } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import * as XLSX from "xlsx";
// import "jspdf-autotable";
// import NavBar from "../shared-components/navbar/NavBar";
// import { getAllPublications, deletePublication } from "../../api/Api";

// const downloadPDF = (data) => {
//   const doc = new jsPDF();
//   doc.setFontSize(16);
//   doc.text("Publications", 14, 15);

//   let yOffset = 25;

//   data.forEach((research, index) => {
//     doc.setFontSize(14);
//     doc.text(`Publication #${index + 1}`, 14, yOffset);
//     yOffset += 5;
//     const tableData = Object.entries(research).map(([key, value]) => [
//       key,
//       value,
//     ]);

//     doc.autoTable({
//       startY: yOffset,
//       head: [["Key", "Value"]],
//       body: tableData,
//       theme: "grid",
//       headStyles: {
//         fillColor: [79, 129, 189],
//         textColor: [255, 255, 255],
//         fontStyle: "bold",
//       },
//       bodyStyles: {
//         fillColor: [226, 236, 255],
//         textColor: [0, 0, 0],
//       },
//       alternateRowStyles: {
//         fillColor: [255, 255, 255],
//       },
//       styles: {
//         lineColor: [0, 0, 0],
//         lineWidth: 0.1,
//         fontSize: 10,
//       },
//       margin: { top: 10, left: 14, right: 14 },
//       didDrawPage: (data) => {
//         yOffset = data.cursor.y;
//       },
//     });

//     yOffset += 10;
//     if (yOffset > 270) {
//       doc.addPage();
//       yOffset = 20;
//     }
//   });

//   doc.save("publications.pdf");
// };

// const downloadCSV = (data) => {
//   const csvContent =
//     "data:text/csv;charset=utf-8," +
//     Object?.keys(data[0]).join(",") +
//     "\n" +
//     data?.map((row) => Object.values(row).join(",")).join("\n");

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "publications.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const downloadExcel = (data) => {
//   const workbook = XLSX.utils.book_new();
//   const worksheet = XLSX.utils.aoa_to_sheet([]);
//   let rowIndex = 0;

//   data.forEach((research, index) => {
//     const headerRow = [`Publication #${index + 1}`];
//     XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {
//       origin: `A${rowIndex + 1}`,
//     });

//     const keys = Object.keys(research);
//     const values = Object.values(research);
//     const tableData = keys.map((key, idx) => [key, values[idx]]);
//     XLSX.utils.sheet_add_aoa(worksheet, tableData, {
//       origin: `A${rowIndex + 2}`,
//     });

//     const headerCell = XLSX.utils.encode_cell({ r: rowIndex, c: 0 });
//     if (worksheet[headerCell]) {
//       worksheet[headerCell].s = {
//         font: { bold: true, color: { rgb: "FFFFFF" } },
//         fill: { fgColor: { rgb: "4F81BD" } },
//         alignment: { horizontal: "center", vertical: "center" },
//       };
//     }

//     for (let r = rowIndex + 1; r <= rowIndex + keys.length + 1; ++r) {
//       for (let c = 0; c < 2; ++c) {
//         const cell = XLSX.utils.encode_cell({ r, c });
//         if (!worksheet[cell]) worksheet[cell] = {};
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

//     worksheet["!cols"] = [{ wch: 30 }, { wch: 50 }];

//     rowIndex += keys.length + 3;
//   });

//   XLSX.utils.book_append_sheet(workbook, worksheet, "Publications");
//   XLSX.writeFile(workbook, "publications.xlsx");
// };

// const ViewAllPublications = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [data, setData] = useState([
//     {
//       articletype: "",
//       titleofmanuscript: "",
//       journal: "",
//       ISSN: "",
//       Volume: "",
//       Issue: "",
//       Year: "",
//       DateofPublication: "",
//       Pages: "",
//       HECcategory: "",
//       webofScience: "",
//       impactfactor: "",
//       scopus: "",
//       urlOfPublication: "",
//     },
//   ]);

//     // Handle delete action
//     const handleDelete = async (id) => {
//       try {
//         await deletePublication(id);
//         // After deleting, fetch the updated list of publications
//         setData((prevData) => prevData.filter((publication) => publication.id !== id));
//       } catch (error) {
//         console.error("Error deleting publication:", error);
//         alert("Failed to delete the publication.");
//       }
//     };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const publications = await getAllPublications();
//         setData(publications);
//       } catch (error) {
//         console.error("Error fetching publications:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const breadCrumps = [
//     { label: " Personal Information", path: "/researchportfolio" },
//     { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
//     { label: "Membership", path: "/membership" },
//     { label: "Publications", path: "/viewallpublications" },
//     {
//       label: "Research Grants and Contracts",
//       path: "/research-grants-and-contracts",
//     },
//   ];

//   return (
//     <>
//       <div className="viewallpublications-whole-page">
//         <Sidebar />
//         <div className="viewAllPublications">
//           <div className="navbar-div">
//             <NavBar />
//           </div>
//           <div className="viewAllPublications-card">
//             <h4>Research portfolio | Publications</h4>
//             <div className="VAP_bred-crumb">
//               <Breadcrumb items={breadCrumps} activePath={currentPath} />
//             </div>
//             <div className="h4-heading" style={{ marginTop: "20px" }}>
//               <h4>Publications:</h4>
//             </div>
//             <div className="download-btn" style={{ marginBottom: "20px" }}>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadPDF(data)}
//               >
//                 DOWNLOAD PDF
//               </button>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadExcel(data)}
//               >
//                 DOWNLOAD EXCEL
//               </button>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadCSV(data)}
//               >
//                 DOWNLOAD CSV
//               </button>
//             </div>

//             <div className="publications-table">
//               {data?.map((research, index) => (
//                 <div key={index} className="publication-section">
//                   <div className="publication-header">
//                     <h5 className="publication-heading">
//                       {research.titleofmanuscript || `Publication ${index + 1}`}
//                     </h5>
//                     <div className="publication-actions">
//                       <button
//                         className="edit-btn"
//                         // onClick={() => handleEdit(research)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="delete-btn"
//                         onClick={() => handleDelete(research.id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                   <table>
//                     <tbody>
//                       {Object.entries(research).map(
//                         ([key, value], subIndex) => (
//                           <tr key={subIndex}>
//                             <td className="key-column">{key}</td>
//                             <td className="value-column">{value}</td>
//                           </tr>
//                         )
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="juw-copyright">
//             <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewAllPublications;



// implementing Edit api : with Modal
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./viewAllPublications.css";
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import "jspdf-autotable";
import NavBar from "../shared-components/navbar/NavBar";
import { getAllPublications, deletePublication } from "../../api/Api";

const ViewAllPublications = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [data, setData] = useState([
    {
      articletype: "",
      titleofmanuscript: "",
      journal: "",
      ISSN: "",
      Volume: "",
      Issue: "",
      Year: "",
      DateofPublication: "",
      Pages: "",
      HECcategory: "",
      webofScience: "",
      impactfactor: "",
      scopus: "",
      urlOfPublication: "",
    },
  ]);
  const [emailError, setEmailError] = useState(""); 
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null); 
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publications = await getAllPublications();
        setData(publications);
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    fetchData();
  }, []);

  // Open modal and set selected publication data
  const openModal = (publication) => {
    setSelectedPublication(publication);
    setEditMode(true); // Set to true for editing mode
    setModalIsOpen(true);
  };

  //     // Handle delete action
  const handleDelete = async (id) => {
    try {
      await deletePublication(id);
      // After deleting, fetch the updated list of publications
      setData((prevData) =>
        prevData.filter((publication) => publication.id !== id)
      );
    } catch (error) {
      console.error("Error deleting publication:", error);
      alert("Failed to delete the publication.");
    }
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPublication(null);
    setEmailError(""); // Reset email error on modal close
  };

  // Handle form submission inside the modal (e.g., saving the edited data)
  const handleSubmit = (event) => {
    event.preventDefault();
    closeModal();
  };

  const breadCrumps = [
    { label: " Personal Information", path: "/researchportfolio" },
    { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
    { label: "Membership", path: "/membership" },
    { label: "Publications", path: "/viewallpublications" },
    {
      label: "Research Grants and Contracts",
      path: "/research-grants-and-contracts",
    },
  ];

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setData((prevData) => ({ ...prevData, [name]: value }));
  //   if (name === "email" && emailError) {
  //     setEmailError(""); // Clear email error when the user starts typing again
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Update the selected publication, not the entire data array
    setSelectedPublication((prevSelectedPublication) => ({
      ...prevSelectedPublication,
      [name]: value,
    }));
  
    // Reset email error if the email field is being updated
    if (name === "email" && emailError) {
      setEmailError(""); 
    }
  };

  return (
    <>
      <div className="viewallpublications-whole-page">
        <Sidebar />
        <div className="viewAllPublications">
          <div className="navbar-div">
            <NavBar />
          </div>
          <div className="viewAllPublications-card">
            <h4>Research portfolio | Publications</h4>
            <div className="VAP_bred-crumb">
              <Breadcrumb items={breadCrumps} activePath={currentPath} />
            </div>
            <div className="h4-heading" style={{ marginTop: "20px" }}>
              <h4>Publications:</h4>
            </div>
            <div className="publications-table">
              {data?.map((research, index) => (
                <div key={index} className="publication-section">
                  <div className="publication-header">
                    <h5 className="publication-heading">
                      {research.titleofmanuscript || `Publication ${index + 1}`}
                    </h5>
                    {/* <div className="publication-actions"> */}
                      <button
                        className="edit-btn"
                        onClick={() => openModal(research)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(research.id)}
                      >
                        Delete
                      </button>
                    {/* </div> */}
                  </div>
                  <table>
                    <tbody>
                      {Object.entries(research).map(
                        ([key, value], subIndex) => (
                          <tr key={subIndex}>
                            <td className="key-column">{key}</td>
                            <td className="value-column">{value}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel={
              editMode ? "Edit Publication Modal" : "Create Publication Modal"
            }
            className="Modal"
            overlayClassName="Overlay"
          >
            <h2>{editMode ? "Edit Publication" : "Create Publication"}</h2>
            <form className="create-publication" onSubmit={handleSubmit}>
              <div className="multi-fields">
                {/* <label>Article Type</label> */}
                <input
                  name="articletype"
                  onChange={handleInputChange}
                  value={selectedPublication?.articletype || ""}
                  type="text"
                  placeholder="Article Type"
                />
                {/* <label>Title of Manuscript</label> */}
                <input
                  name="titleofmanuscript"
                  onChange={handleInputChange}
                  value={selectedPublication?.titleofmanuscript || ""}
                  type="text"
                  placeholder="Title of Manuscript"
                />
                {/* <label>Journal</label> */}
                <input
                  required
                  name="journal"
                  onChange={handleInputChange}
                  value={selectedPublication?.journal || ""}
                  type="text"
                  placeholder="Journal"
                />
                {/* <label>ISSN</label> */}
                <input
                  required
                  name="ISSN"
                  onChange={handleInputChange}
                  value={selectedPublication?.ISSN  || ""}
                  type="text"
                  placeholder="ISSN"
                />
                {/* <label>Volume</label> */}
                <input
                  required
                  name="Volume"
                  onChange={handleInputChange}
                  value={selectedPublication?.Volume || ""}
                  type="text"
                  placeholder="Volume"
                />
                {/* <label>Issue</label> */}
                <input
                  name="Issue"
                  onChange={handleInputChange}
                  value={selectedPublication?.Issue || ""}
                  type="text"
                  placeholder="Issue"
                />
                {/* <label>Year</label> */}
                <input
                  name="Year"
                  onChange={handleInputChange}
                  value={selectedPublication?.Year || ""}
                  type="text"
                  placeholder="Year"
                />
                {/* <label>Date of Publication</label> */}
                <input
                  name="DateofPublication"
                  onChange={handleInputChange}
                  value={selectedPublication?.DateofPublication || ""}
                  type="text"
                  placeholder="Date of Publication"
                />
                {/* <label>HEC Category</label> */}
                <input
                  name="HECcategory"
                  onChange={handleInputChange}
                  value={selectedPublication?.HECcategory || ""}
                  type="text"
                  placeholder="HEC Category"
                />
                {/* <label>Web of Science</label> */}
                <input
                  name="webofScience"
                  onChange={handleInputChange}
                  value={selectedPublication?.webofScience || ""}
                  type="text"
                  placeholder="Web of Science"
                />
                {/* <label>Impact Factor</label> */}
                <input
                  name="impactfactor"
                  onChange={handleInputChange}
                  value={selectedPublication?.impactfactor || ""}
                  type="number"
                  placeholder="Impact Factor"
                />
                {/* <label>Scopus</label> */}
                <input
                  name="scopus"
                  onChange={handleInputChange}
                  value={selectedPublication?.scopus || ""}
                  type="text"
                  placeholder="Scopus"
                />
                {/* <label>URL of Publication</label> */}
                <input
                  name="urlOfPublication"
                  onChange={handleInputChange}
                  value={selectedPublication?.urlOfPublication || ""}
                  type="text"
                  placeholder="URL of Publication"
                />
              </div>
              <button className="edit-modal-submit-button" type="submit">
                {editMode ? "UPDATE" : "Submit"}
              </button>
            </form>
          </Modal>

          <div className="juw-copyright">
            <p>© 2024, all rights reserved by Jinnah University for Women.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAllPublications;

// more adjustments : Edit api
// import React, { useState, useEffect } from "react";
// import "./viewAllPublications.css";
// import Sidebar from "../Sidebar/Sidebar";
// import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
// import { useLocation } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import * as XLSX from "xlsx";
// import "jspdf-autotable";
// import NavBar from "../shared-components/navbar/NavBar";
// import {
//   getAllPublications,
//   deletePublication,
//   updatePublication,
// } from "../../api/Api";

// const downloadPDF = (data) => {
//   const doc = new jsPDF();
//   doc.setFontSize(16);
//   doc.text("Publications", 14, 15);

//   let yOffset = 25;

//   data.forEach((research, index) => {
//     doc.setFontSize(14);
//     doc.text(`Publication #${index + 1}`, 14, yOffset);
//     yOffset += 5;
//     const tableData = Object.entries(research).map(([key, value]) => [
//       key,
//       value,
//     ]);

//     doc.autoTable({
//       startY: yOffset,
//       head: [["Key", "Value"]],
//       body: tableData,
//       theme: "grid",
//       headStyles: {
//         fillColor: [79, 129, 189],
//         textColor: [255, 255, 255],
//         fontStyle: "bold",
//       },
//       bodyStyles: {
//         fillColor: [226, 236, 255],
//         textColor: [0, 0, 0],
//       },
//       alternateRowStyles: {
//         fillColor: [255, 255, 255],
//       },
//       styles: {
//         lineColor: [0, 0, 0],
//         lineWidth: 0.1,
//         fontSize: 10,
//       },
//       margin: { top: 10, left: 14, right: 14 },
//       didDrawPage: (data) => {
//         yOffset = data.cursor.y;
//       },
//     });

//     yOffset += 10;
//     if (yOffset > 270) {
//       doc.addPage();
//       yOffset = 20;
//     }
//   });

//   doc.save("publications.pdf");
// };

// const downloadCSV = (data) => {
//   const csvContent =
//     "data:text/csv;charset=utf-8," +
//     Object?.keys(data[0]).join(",") +
//     "\n" +
//     data?.map((row) => Object.values(row).join(",")).join("\n");

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "publications.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const downloadExcel = (data) => {
//   const workbook = XLSX.utils.book_new();
//   const worksheet = XLSX.utils.aoa_to_sheet([]);
//   let rowIndex = 0;

//   data.forEach((research, index) => {
//     const headerRow = [`Publication #${index + 1}`];
//     XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {
//       origin: `A${rowIndex + 1}`,
//     });

//     const keys = Object.keys(research);
//     const values = Object.values(research);
//     const tableData = keys.map((key, idx) => [key, values[idx]]);
//     XLSX.utils.sheet_add_aoa(worksheet, tableData, {
//       origin: `A${rowIndex + 2}`,
//     });

//     const headerCell = XLSX.utils.encode_cell({ r: rowIndex, c: 0 });
//     if (worksheet[headerCell]) {
//       worksheet[headerCell].s = {
//         font: { bold: true, color: { rgb: "FFFFFF" } },
//         fill: { fgColor: { rgb: "4F81BD" } },
//         alignment: { horizontal: "center", vertical: "center" },
//       };
//     }

//     for (let r = rowIndex + 1; r <= rowIndex + keys.length + 1; ++r) {
//       for (let c = 0; c < 2; ++c) {
//         const cell = XLSX.utils.encode_cell({ r, c });
//         if (!worksheet[cell]) worksheet[cell] = {};
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

//     worksheet["!cols"] = [{ wch: 30 }, { wch: 50 }];

//     rowIndex += keys.length + 3;
//   });

//   XLSX.utils.book_append_sheet(workbook, worksheet, "Publications");
//   XLSX.writeFile(workbook, "publications.xlsx");
// };

// const ViewAllPublications = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   // const [editingPublication, setEditingPublication] = useState(null);
//   // const [editForm, setEditForm] = useState({});
//   const [data, setData] = useState([
//     {
//       articletype: "",
//       titleofmanuscript: "",
//       journal: "",
//       ISSN: "",
//       Volume: "",
//       Issue: "",
//       Year: "",
//       DateofPublication: "",
//       Pages: "",
//       HECcategory: "",
//       webofScience: "",
//       impactfactor: "",
//       scopus: "",
//       urlOfPublication: "",
//     },
//   ]);

//   // Handle delete action
//   const handleDelete = async (id) => {
//     try {
//       await deletePublication(id);
//       // After deleting, fetch the updated list of publications
//       setData((prevData) =>
//         prevData.filter((publication) => publication.id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting publication:", error);
//       alert("Failed to delete the publication.");
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const publications = await getAllPublications();
//         setData(publications);
//       } catch (error) {
//         console.error("Error fetching publications:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const breadCrumps = [
//     { label: " Personal Information", path: "/researchportfolio" },
//     { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
//     { label: "Membership", path: "/membership" },
//     { label: "Publications", path: "/viewallpublications" },
//     {
//       label: "Research Grants and Contracts",
//       path: "/research-grants-and-contracts",
//     },
//   ];

//   return (
//     <>
//       <div className="viewallpublications-whole-page">
//         <Sidebar />
//         <div className="viewAllPublications">
//           <div className="navbar-div">
//             <NavBar />
//           </div>
//           <div className="viewAllPublications-card">
//             <h4>Research portfolio | Publications</h4>
//             <div className="VAP_bred-crumb">
//               <Breadcrumb items={breadCrumps} activePath={currentPath} />
//             </div>
//             <div className="h4-heading" style={{ marginTop: "20px" }}>
//               <h4>Publications:</h4>
//             </div>
//             <div className="download-btn" style={{ marginBottom: "20px" }}>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadPDF(data)}
//               >
//                 DOWNLOAD PDF
//               </button>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadExcel(data)}
//               >
//                 DOWNLOAD EXCEL
//               </button>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadCSV(data)}
//               >
//                 DOWNLOAD CSV
//               </button>
//             </div>

//             <div className="publications-table">
//               {data?.map((research, index) => (
//                 <div key={index} className="publication-section">
//                   <div className="publication-header">
//                     <h5 className="publication-heading">
//                       {research.titleofmanuscript || `Publication ${index + 1}`}
//                     </h5>
//                     <div className="publication-actions">
//                       <button
//                         className="edit-btn"
//                         onClick={() => handleEdit(research.id)}
//                         // onClick={() => handleEdit(research)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="delete-btn"
//                         onClick={() => handleDelete(research.id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                   <table>
//                     <tbody>
//                       {Object.entries(research).map(
//                         ([key, value], subIndex) => (
//                           <tr key={subIndex}>
//                             <td className="key-column">{key}</td>
//                             <td className="value-column">{value}</td>
//                           </tr>
//                         )
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="juw-copyright">
//             <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewAllPublications;

// ADJUSTMENTS : Edit functionality edit but styling messed
// import React, { useState, useEffect } from "react";
// import "./viewAllPublications.css";
// import Sidebar from "../Sidebar/Sidebar";
// import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
// import { useLocation } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import * as XLSX from "xlsx";
// import "jspdf-autotable";
// import NavBar from "../shared-components/navbar/NavBar";
// import {
//   getAllPublications,
//   deletePublication,
//   updatePublication,
// } from "../../api/Api";

// const downloadPDF = (data) => {
//   const doc = new jsPDF();
//   doc.setFontSize(16);
//   doc.text("Publications", 14, 15);

//   let yOffset = 25;

//   data.forEach((research, index) => {
//     doc.setFontSize(14);
//     doc.text(`Publication #${index + 1}`, 14, yOffset);
//     yOffset += 5;
//     const tableData = Object.entries(research).map(([key, value]) => [
//       key,
//       value,
//     ]);

//     doc.autoTable({
//       startY: yOffset,
//       head: [["Key", "Value"]],
//       body: tableData,
//       theme: "grid",
//       headStyles: {
//         fillColor: [79, 129, 189],
//         textColor: [255, 255, 255],
//         fontStyle: "bold",
//       },
//       bodyStyles: {
//         fillColor: [226, 236, 255],
//         textColor: [0, 0, 0],
//       },
//       alternateRowStyles: {
//         fillColor: [255, 255, 255],
//       },
//       styles: {
//         lineColor: [0, 0, 0],
//         lineWidth: 0.1,
//         fontSize: 10,
//       },
//       margin: { top: 10, left: 14, right: 14 },
//       didDrawPage: (data) => {
//         yOffset = data.cursor.y;
//       },
//     });

//     yOffset += 10;
//     if (yOffset > 270) {
//       doc.addPage();
//       yOffset = 20;
//     }
//   });

//   doc.save("publications.pdf");
// };

// const downloadCSV = (data) => {
//   const csvContent =
//     "data:text/csv;charset=utf-8," +
//     Object?.keys(data[0]).join(",") +
//     "\n" +
//     data?.map((row) => Object.values(row).join(",")).join("\n");

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "publications.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const downloadExcel = (data) => {
//   const workbook = XLSX.utils.book_new();
//   const worksheet = XLSX.utils.aoa_to_sheet([]);
//   let rowIndex = 0;

//   data.forEach((research, index) => {
//     const headerRow = [`Publication #${index + 1}`];
//     XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {
//       origin: `A${rowIndex + 1}`,
//     });

//     const keys = Object.keys(research);
//     const values = Object.values(research);
//     const tableData = keys.map((key, idx) => [key, values[idx]]);
//     XLSX.utils.sheet_add_aoa(worksheet, tableData, {
//       origin: `A${rowIndex + 2}`,
//     });

//     const headerCell = XLSX.utils.encode_cell({ r: rowIndex, c: 0 });
//     if (worksheet[headerCell]) {
//       worksheet[headerCell].s = {
//         font: { bold: true, color: { rgb: "FFFFFF" } },
//         fill: { fgColor: { rgb: "4F81BD" } },
//         alignment: { horizontal: "center", vertical: "center" },
//       };
//     }

//     for (let r = rowIndex + 1; r <= rowIndex + keys.length + 1; ++r) {
//       for (let c = 0; c < 2; ++c) {
//         const cell = XLSX.utils.encode_cell({ r, c });
//         if (!worksheet[cell]) worksheet[cell] = {};
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

//     worksheet["!cols"] = [{ wch: 30 }, { wch: 50 }];

//     rowIndex += keys.length + 3;
//   });

//   XLSX.utils.book_append_sheet(workbook, worksheet, "Publications");
//   XLSX.writeFile(workbook, "publications.xlsx");
// };

// const ViewAllPublications = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [data, setData] = useState([]);
//   const [editingPublication, setEditingPublication] = useState(null);
//   const [editForm, setEditForm] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const publications = await getAllPublications();
//         setData(publications);
//       } catch (error) {
//         console.error("Error fetching publications:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await deletePublication(id);
//       setData((prevData) => prevData.filter((publication) => publication.id !== id));
//     } catch (error) {
//       console.error("Error deleting publication:", error);
//       alert("Failed to delete the publication.");
//     }
//   };

//   const handleEdit = (publication) => {
//     setEditingPublication(publication);
//     setEditForm({ ...publication });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updatePublication(editingPublication.id, editForm);
//       setData((prevData) =>
//         prevData.map((pub) =>
//           pub.id === editingPublication.id ? { ...pub, ...editForm } : pub
//         )
//       );
//       setEditingPublication(null);
//     } catch (error) {
//       console.error("Error updating publication:", error);
//       alert("Failed to update the publication.");
//     }
//   };

//   const breadCrumps = [
//     { label: "Personal Information", path: "/researchportfolio" },
//     { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
//     { label: "Membership", path: "/membership" },
//     { label: "Publications", path: "/viewallpublications" },
//     {
//       label: "Research Grants and Contracts",
//       path: "/research-grants-and-contracts",
//     },
//   ];

//   return (
//     <>
//       <div className="viewallpublications-whole-page">
//         <Sidebar />
//         <div className="viewAllPublications">
//           <div className="navbar-div">
//             <NavBar />
//           </div>
//           <div className="viewAllPublications-card">
//             <h4>Research portfolio | Publications</h4>
//             <div className="VAP_bred-crumb">
//               <Breadcrumb items={breadCrumps} activePath={currentPath} />
//             </div>
//             <div className="h4-heading" style={{ marginTop: "20px" }}>
//               <h4>Publications:</h4>
//             </div>
//             <div className="download-btn" style={{ marginBottom: "20px" }}>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadPDF(data)}
//               >
//                 DOWNLOAD PDF
//               </button>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadExcel(data)}
//               >
//                 DOWNLOAD EXCEL
//               </button>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadCSV(data)}
//               >
//                 DOWNLOAD CSV
//               </button>
//             </div>

//             <div className="publications-table">
//               {data?.map((publication) => (
//                 <div key={publication.id} className="publication-card">
//                   {editingPublication?.id === publication.id ? (
//                     <form onSubmit={handleSubmit}>
//                       {Object.keys(publication).map((key) => (
//                         <div key={key} className="form-group">
//                           <label htmlFor={key}>{key}</label>
//                           <input
//                             type="text"
//                             id={key}
//                             name={key}
//                             value={editForm[key] || ""}
//                             onChange={handleChange}
//                           />
//                         </div>
//                       ))}
//                       <button type="submit">Save</button>
//                       <button type="button" onClick={() => setEditingPublication(null)}>
//                         Cancel
//                       </button>
//                     </form>
//                   ) : (
//                     <>
//                       <div className="publication-details">
//                         {Object.entries(publication).map(([key, value]) => (
//                           <div key={key}>
//                             <strong>{key}:</strong> {value}
//                           </div>
//                         ))}
//                       </div>
//                       <button onClick={() => handleEdit(publication)}>Edit</button>
//                       <button onClick={() => handleDelete(publication.id)}>Delete</button>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewAllPublications;

// edit api
// import React, { useState, useEffect } from "react";
// import "./viewAllPublications.css";
// import Sidebar from "../Sidebar/Sidebar";
// import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
// import { useLocation } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import * as XLSX from "xlsx";
// import "jspdf-autotable";
// import NavBar from "../shared-components/navbar/NavBar";
// import {
//   getAllPublications,
//   deletePublication,
//   updatePublication,
// } from "../../api/Api";

// const downloadPDF = (data) => {
//   const doc = new jsPDF();
//   doc.setFontSize(16);
//   doc.text("Publications", 14, 15);

//   let yOffset = 25;

//   data.forEach((research, index) => {
//     doc.setFontSize(14);
//     doc.text(`Publication #${index + 1}`, 14, yOffset);
//     yOffset += 5;
//     const tableData = Object.entries(research).map(([key, value]) => [
//       key,
//       value,
//     ]);

//     doc.autoTable({
//       startY: yOffset,
//       head: [["Key", "Value"]],
//       body: tableData,
//       theme: "grid",
//       headStyles: {
//         fillColor: [79, 129, 189],
//         textColor: [255, 255, 255],
//         fontStyle: "bold",
//       },
//       bodyStyles: {
//         fillColor: [226, 236, 255],
//         textColor: [0, 0, 0],
//       },
//       alternateRowStyles: {
//         fillColor: [255, 255, 255],
//       },
//       styles: {
//         lineColor: [0, 0, 0],
//         lineWidth: 0.1,
//         fontSize: 10,
//       },
//       margin: { top: 10, left: 14, right: 14 },
//       didDrawPage: (data) => {
//         yOffset = data.cursor.y;
//       },
//     });

//     yOffset += 10;
//     if (yOffset > 270) {
//       doc.addPage();
//       yOffset = 20;
//     }
//   });

//   doc.save("publications.pdf");
// };

// const downloadCSV = (data) => {
//   const csvContent =
//     "data:text/csv;charset=utf-8," +
//     Object?.keys(data[0]).join(",") +
//     "\n" +
//     data?.map((row) => Object.values(row).join(",")).join("\n");

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "publications.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const downloadExcel = (data) => {
//   const workbook = XLSX.utils.book_new();
//   const worksheet = XLSX.utils.aoa_to_sheet([]);
//   let rowIndex = 0;

//   data.forEach((research, index) => {
//     const headerRow = [`Publication #${index + 1}`];
//     XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {
//       origin: `A${rowIndex + 1}`,
//     });

//     const keys = Object.keys(research);
//     const values = Object.values(research);
//     const tableData = keys.map((key, idx) => [key, values[idx]]);
//     XLSX.utils.sheet_add_aoa(worksheet, tableData, {
//       origin: `A${rowIndex + 2}`,
//     });

//     const headerCell = XLSX.utils.encode_cell({ r: rowIndex, c: 0 });
//     if (worksheet[headerCell]) {
//       worksheet[headerCell].s = {
//         font: { bold: true, color: { rgb: "FFFFFF" } },
//         fill: { fgColor: { rgb: "4F81BD" } },
//         alignment: { horizontal: "center", vertical: "center" },
//       };
//     }

//     for (let r = rowIndex + 1; r <= rowIndex + keys.length + 1; ++r) {
//       for (let c = 0; c < 2; ++c) {
//         const cell = XLSX.utils.encode_cell({ r, c });
//         if (!worksheet[cell]) worksheet[cell] = {};
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

//     worksheet["!cols"] = [{ wch: 30 }, { wch: 50 }];

//     rowIndex += keys.length + 3;
//   });

//   XLSX.utils.book_append_sheet(workbook, worksheet, "Publications");
//   XLSX.writeFile(workbook, "publications.xlsx");
// };

// const ViewAllPublications = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [data, setData] = useState([
//     {
//       articletype: "",
//       titleofmanuscript: "",
//       journal: "",
//       ISSN: "",
//       Volume: "",
//       Issue: "",
//       Year: "",
//       DateofPublication: "",
//       Pages: "",
//       HECcategory: "",
//       webofScience: "",
//       impactfactor: "",
//       scopus: "",
//       urlOfPublication: "",
//     },
//   ]);
//   const [editingPublication, setEditingPublication] = useState(null);
//   const [editForm, setEditForm] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const publications = await getAllPublications();
//         setData(publications);
//       } catch (error) {
//         console.error("Error fetching publications:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await deletePublication(id);
//       setData((prevData) => prevData.filter((publication) => publication.id !== id));
//     } catch (error) {
//       console.error("Error deleting publication:", error);
//       alert("Failed to delete the publication.");
//     }
//   };

//   const handleEdit = (publication) => {
//     setEditingPublication(publication);
//     setEditForm({ ...publication });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updatePublication(editingPublication.id, editForm);
//       setData((prevData) =>
//         prevData.map((pub) =>
//           pub.id === editingPublication.id ? { ...pub, ...editForm } : pub
//         )
//       );
//       setEditingPublication(null);
//     } catch (error) {
//       console.error("Error updating publication:", error);
//       alert("Failed to update the publication.");
//     }
//   };

//   const breadCrumps = [
//     { label: "Personal Information", path: "/researchportfolio" },
//     { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
//     { label: "Membership", path: "/membership" },
//     { label: "Publications", path: "/viewallpublications" },
//     {
//       label: "Research Grants and Contracts",
//       path: "/research-grants-and-contracts",
//     },
//   ];

//   return (
//     <>
//       <div className="viewallpublications-whole-page">
//         <Sidebar />
//         <div className="viewAllPublications">
//           <div className="navbar-div">
//             <NavBar />
//           </div>
//           <div className="viewAllPublications-card">
//             <h4>Research portfolio | Publications</h4>
//             <div className="VAP_bred-crumb">
//               <Breadcrumb items={breadCrumps} activePath={currentPath} />
//             </div>
//             <div className="h4-heading" style={{ marginTop: "20px" }}>
//               <h4>Publications:</h4>
//             </div>
//             <div className="download-btn" style={{ marginBottom: "20px" }}>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadPDF(data)}
//               >
//                 DOWNLOAD PDF
//               </button>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadExcel(data)}
//               >
//                 DOWNLOAD EXCEL
//               </button>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadCSV(data)}
//               >
//                 DOWNLOAD CSV
//               </button>
//             </div>

//             <div className="publications-table">
//               {data.map((publication) => (
//                 <div key={publication.id} className="publication-card">
//                   {editingPublication?.id === publication.id ? (
//                     <form onSubmit={handleSubmit}>
//                       {Object.keys(publication).map((key) => (
//                         <div key={key} className="form-group">
//                           <label htmlFor={key}>{key}</label>
//                           <input
//                             type="text"
//                             id={key}
//                             name={key}
//                             value={editForm[key] || ""}
//                             onChange={handleChange}
//                           />
//                         </div>
//                       ))}
//                       <button type="submit">Save</button>
//                       <button type="button" onClick={() => setEditingPublication(null)}>
//                         Cancel
//                       </button>
//                     </form>
//                   ) : (
//                     <>
//                       <div className="publication-details">
//                         {Object.entries(publication).map(([key, value]) => (
//                           <div key={key}>
//                             <strong>{key}:</strong> {value}
//                           </div>
//                         ))}
//                       </div>
//                       <button onClick={() => handleEdit(publication)}>Edit</button>
//                       <button onClick={() => handleDelete(publication.id)}>Delete</button>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewAllPublications;

// edit api : with issues
// import React, { useState, useEffect } from "react";
// import "./viewAllPublications.css";
// import Sidebar from "../Sidebar/Sidebar";
// import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
// import { useLocation } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import * as XLSX from "xlsx";
// import "jspdf-autotable";
// import NavBar from "../shared-components/navbar/NavBar";
// import {
//   getAllPublications,
//   deletePublication,
//   updatePublication,
// } from "../../api/Api";

// const downloadPDF = (data) => {
//   const doc = new jsPDF();
//   doc.setFontSize(16);
//   doc.text("Publications", 14, 15);

//   let yOffset = 25;

//   data.forEach((research, index) => {
//     doc.setFontSize(14);
//     doc.text(`Publication #${index + 1}`, 14, yOffset);
//     yOffset += 5;
//     const tableData = Object.entries(research).map(([key, value]) => [
//       key,
//       value,
//     ]);

//     doc.autoTable({
//       startY: yOffset,
//       head: [["Key", "Value"]],
//       body: tableData,
//       theme: "grid",
//       headStyles: {
//         fillColor: [79, 129, 189],
//         textColor: [255, 255, 255],
//         fontStyle: "bold",
//       },
//       bodyStyles: {
//         fillColor: [226, 236, 255],
//         textColor: [0, 0, 0],
//       },
//       alternateRowStyles: {
//         fillColor: [255, 255, 255],
//       },
//       styles: {
//         lineColor: [0, 0, 0],
//         lineWidth: 0.1,
//         fontSize: 10,
//       },
//       margin: { top: 10, left: 14, right: 14 },
//       didDrawPage: (data) => {
//         yOffset = data.cursor.y;
//       },
//     });

//     yOffset += 10;
//     if (yOffset > 270) {
//       doc.addPage();
//       yOffset = 20;
//     }
//   });

//   doc.save("publications.pdf");
// };

// const downloadCSV = (data) => {
//   const csvContent =
//     "data:text/csv;charset=utf-8," +
//     Object?.keys(data[0]).join(",") +
//     "\n" +
//     data?.map((row) => Object.values(row).join(",")).join("\n");

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "publications.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const downloadExcel = (data) => {
//   const workbook = XLSX.utils.book_new();
//   const worksheet = XLSX.utils.aoa_to_sheet([]);
//   let rowIndex = 0;

//   data.forEach((research, index) => {
//     const headerRow = [`Publication #${index + 1}`];
//     XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {
//       origin: `A${rowIndex + 1}`,
//     });

//     const keys = Object.keys(research);
//     const values = Object.values(research);
//     const tableData = keys.map((key, idx) => [key, values[idx]]);
//     XLSX.utils.sheet_add_aoa(worksheet, tableData, {
//       origin: `A${rowIndex + 2}`,
//     });

//     const headerCell = XLSX.utils.encode_cell({ r: rowIndex, c: 0 });
//     if (worksheet[headerCell]) {
//       worksheet[headerCell].s = {
//         font: { bold: true, color: { rgb: "FFFFFF" } },
//         fill: { fgColor: { rgb: "4F81BD" } },
//         alignment: { horizontal: "center", vertical: "center" },
//       };
//     }

//     for (let r = rowIndex + 1; r <= rowIndex + keys.length + 1; ++r) {
//       for (let c = 0; c < 2; ++c) {
//         const cell = XLSX.utils.encode_cell({ r, c });
//         if (!worksheet[cell]) worksheet[cell] = {};
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

//     worksheet["!cols"] = [{ wch: 30 }, { wch: 50 }];

//     rowIndex += keys.length + 3;
//   });

//   XLSX.utils.book_append_sheet(workbook, worksheet, "Publications");
//   XLSX.writeFile(workbook, "publications.xlsx");
// };

// const ViewAllPublications = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   // const [data, setData] = useState([]);
//   const [data, setData] = useState([
//     {
//       articletype: "",
//       titleofmanuscript: "",
//       journal: "",
//       ISSN: "",
//       Volume: "",
//       Issue: "",
//       Year: "",
//       DateofPublication: "",
//       Pages: "",
//       HECcategory: "",
//       webofScience: "",
//       impactfactor: "",
//       scopus: "",
//       urlOfPublication: "",
//     },
//   ]);
//   const [editingPublication, setEditingPublication] = useState(null);
//   // const [editForm, setEditForm] = useState({});
//   const [editForm, setEditForm] = useState({
//     articletype: "",
//     titleofmanuscript: "",
//     journal: "",
//     ISSN: "",
//     Volume: "",
//     Issue: "",
//     Year: "",
//     DateofPublication: "",
//     Pages: "",
//     HECcategory: "",
//     webofScience: "",
//     impactfactor: "",
//     scopus: "",
//     urlOfPublication: ""
//   });

//   // Handle delete action
//   const handleDelete = async (id) => {
//     try {
//       await deletePublication(id);
//       // After deleting, fetch the updated list of publications
//       setData((prevData) =>
//         prevData.filter((publication) => publication.id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting publication:", error);
//       alert("Failed to delete the publication.");
//     }
//   };

//   // Handle edit action
//   // const handleEdit = (publication) => {
//   //   setEditingPublication(publication.id);
//   //   setEditForm({ ...publication });
//   // };

//   const handleEdit = (publication) => {
//     setEditingPublication(publication.id);
//     setEditForm({ ...publication });
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prevForm) => ({ ...prevForm, [name]: value }));
//   };

//   // Handle form submit
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   console.log("Submitting form with:", editForm); // Debugging statement
//   //   try {
//   //     await updatePublication(editForm.id, editForm);
//   //     setData((prevData) =>
//   //       prevData.map((publication) =>
//   //         // publication.id === editForm.id ? editForm : publication
//   //         publication.id === editForm.id ? { ...publication, ...editForm } : publication
//   //       )
//   //     );
//   //     setEditingPublication(null);
//   //   } catch (error) {
//   //     console.error("Error updating publication:", error);
//   //     alert("Failed to update the publication.");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting form with:", editForm); // Debugging statement

//     try {
//       const updatedPublication = await updatePublication(editForm.id, editForm);
//       console.log("Update successful:", updatedPublication); // Debugging statement
//       setData((prevData) =>
//         prevData.map((publication) =>
//           publication.id === editForm.id ? { ...publication, ...editForm } : publication
//         )
//       );
//       setEditingPublication(null);
//     } catch (error) {
//       console.error("Error updating publication:", error);
//       alert("Failed to update the publication.");
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const publications = await getAllPublications();
//         setData(publications);
//       } catch (error) {
//         console.error("Error fetching publications:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const breadCrumps = [
//     { label: " Personal Information", path: "/researchportfolio" },
//     { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
//     { label: "Membership", path: "/membership" },
//     { label: "Publications", path: "/viewallpublications" },
//     {
//       label: "Research Grants and Contracts",
//       path: "/research-grants-and-contracts",
//     },
//   ];

//   return (
//     <>
//       <div className="viewallpublications-whole-page">
//         <Sidebar />
//         <div className="viewAllPublications">
//           <div className="navbar-div">
//             <NavBar />
//           </div>
//           <div className="viewAllPublications-card">
//             <h4>Research portfolio | Publications</h4>
//             <div className="VAP_bred-crumb">
//               <Breadcrumb items={breadCrumps} activePath={currentPath} />
//             </div>
//             <div className="h4-heading" style={{ marginTop: "20px" }}>
//               <h4>Publications:</h4>
//             </div>
//             <div className="download-btn" style={{ marginBottom: "20px" }}>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadPDF(data)}
//               >
//                 DOWNLOAD PDF
//               </button>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadExcel(data)}
//               >
//                 DOWNLOAD EXCEL
//               </button>
//               <button
//                 type="button"
//                 className="create-user-btn"
//                 onClick={() => downloadCSV(data)}
//               >
//                 DOWNLOAD CSV
//               </button>
//             </div>

//             <div className="publications-table">
//               {data.map((publication, index) => (
//                 <div
//                   key={publication.id || index}
//                   className="publication-section"
//                 >
//                   <div className="publication-header">
//                     <h5 className="publication-heading">
//                       {publication.titleofmanuscript ||
//                         `Publication ${index + 1}`}
//                     </h5>
//                     <div className="publication-actions">
//                       {editingPublication === publication.id ? (
//                         <form onSubmit={handleSubmit}>
//                           {Object.keys(publication).map((key) => (
//                             <div key={key} className="edit-form-group">
//                               <label htmlFor={key}>{key}</label>
//                               <input
//                                 type="text"
//                                 id={key}
//                                 name={key}
//                                 value={editForm[key] || ""}
//                                 onChange={handleChange}
//                               />
//                             </div>
//                           ))}
//                           <button type="submit" className="create-user-btn">
//                             Save
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => setEditingPublication(null)}
//                             className="create-user-btn"
//                           >
//                             Cancel
//                           </button>
//                         </form>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => handleEdit(publication)}
//                             className="create-user-btn"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(publication.id)}
//                             className="create-user-btn"
//                           >
//                             Delete
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                   <table className="publications-table-content">
//                     <tbody>
//                       {Object.entries(publication).map(([key, value]) => (
//                         <tr key={key}>
//                           <td className="key-cell">{key}</td>
//                           <td>{value}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewAllPublications;
