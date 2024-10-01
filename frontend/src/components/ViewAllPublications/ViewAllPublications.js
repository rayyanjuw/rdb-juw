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
import {
  getAllPublications,
  deletePublication,
  updatePublication,
} from "../../api/Api";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPublications();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        // console.error("Error fetching publications:", error);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <div>Loading Research Publications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const downloadPDF = (data) => {
    const doc = new jsPDF();

    // Set title font and add the title
    doc.setFontSize(16);
    doc.text("Publications", 14, 15);

    let yOffset = 25; // Initial Y position

    data.forEach((research, index) => {
      // Title for each publication
      doc.setFontSize(14);
      doc.text(`Publication #${index + 1}`, 14, yOffset);
      yOffset += 5; // Adjust position for the next element

      // Prepare data for the table
      const tableData = Object.entries(research).map(([key, value]) => [
        key,
        value,
      ]);

      // Create a table for the publication
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

    doc.save("publications.pdf");
  };

  const downloadCSV = (data) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object?.keys(data[0]).join(",") +
      "\n" + // Add headers
      data?.map((row) => Object.values(row).join(",")).join("\n"); // Add rows

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "publications.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  const downloadExcel = (data) => {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);

    // Initialize row index
    let rowIndex = 0;

    // Loop through each publication and create a styled table
    data.forEach((research, index) => {
      // Header for the publication
      const headerRow = [`Publication #${index + 1}`];
      XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {
        origin: `A${rowIndex + 1}`,
      });

      // Extract keys and values
      const keys = Object.keys(research);
      const values = Object.values(research);

      // Add keys and values as table rows
      const tableData = keys.map((key, idx) => [key, values[idx]]);
      XLSX.utils.sheet_add_aoa(worksheet, tableData, {
        origin: `A${rowIndex + 2}`,
      });

      // Apply styles to the header row
      const headerCell = XLSX.utils.encode_cell({ r: rowIndex, c: 0 });
      if (worksheet[headerCell]) {
        worksheet[headerCell].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "4F81BD" } },
          alignment: { horizontal: "center", vertical: "center" },
        };
      }

      // Apply background color and border to each cell in the publication table
      for (let r = rowIndex + 1; r <= rowIndex + keys.length + 1; ++r) {
        for (let c = 0; c < 2; ++c) {
          const cell = XLSX.utils.encode_cell({ r, c });
          if (!worksheet[cell]) worksheet[cell] = {}; // Ensure the cell is defined
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

      // Adjust column widths
      worksheet["!cols"] = [
        { wch: 30 }, // Width for key column
        { wch: 50 }, // Width for value column
      ];

      // Increment rowIndex by the number of rows in the current table + 3 for spacing
      rowIndex += keys.length + 3;
    });

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Publications");

    // Write the workbook to a file and trigger the download
    XLSX.writeFile(workbook, "publications.xlsx");
  };

  const openModal = (publication) => {
    setSelectedPublication(publication);
    setEditMode(true);
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deletePublication(id);
      toast.success("Successfully Deleted!");
      // After deleting, fetch the updated list of publications
      setData((prevData) =>
        prevData.filter((publication) => publication.id !== id)
      );
    } catch (error) {
      // console.error("Error deleting publication:", error);
      toast.error("Failed to delete the publication.");
      // alert("Failed to delete the publication.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updatePublication(selectedPublication.id, selectedPublication);
      toast.success("Success!");
      setData((prevData) =>
        prevData.map(
          (publication) =>
            // publication.id === updatedPublication.id ? updatedPublication : publication
            publication.id === selectedPublication.id
              ? selectedPublication
              : publication
          // property.id === selectedProperty.id ? selectedProperty : property
        )
      );
      closeModal();
    } catch (error) {
      setError(error.message);
      // console.error("Error updating publication:", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPublication(null);
    setEmailError("");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectedPublication((prevSelectedPublication) => ({
      ...prevSelectedPublication,
      [name]: value,
    }));

    if (name === "email" && emailError) {
      setEmailError("");
    }
  };

  return (
    <>
      <div className="viewallpublications-whole-page">
        <Sidebar />
        <div className="viewallpublications">
          <div className="navbar-div">
            <NavBar />
          </div>
          <div className="viewallpublications-card">
            <h4>Research portfolio | Publications</h4>
            <div className="vap-bred-crumb">
              <Breadcrumb items={breadCrumps} activePath={currentPath} />
            </div>
            <div className="h4-heading" style={{ marginTop: "20px" }}>
              <h4>Publications:</h4>
            </div>
            <div className="download-btn" style={{ marginBottom: "20px" }}>
              <button
                type="button"
                className="create-user-btn"
                onClick={() => downloadPDF(data)}
              >
                DOWNLOAD PDF
              </button>
              <button
                type="button"
                className="create-user-btn"
                onClick={() => downloadExcel(data)}
              >
                DOWNLOAD EXCEL
              </button>
              <button
                type="button"
                className="create-user-btn"
                onClick={() => downloadCSV(data)}
              >
                DOWNLOAD CSV
              </button>
            </div>
            <div className="publications-table">
              {data.length > 0 ? (
                data?.map((research, index) => (
                  <div key={index} className="publication-section">
                    <div className="publication-header">
                      <h5 className="publication-heading">
                        {research.titleofmanuscript ||
                          `Publication ${index + 1}`}
                      </h5>
                      <div className="publication-actions">
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
                      </div>
                    </div>
                    <table>
                      <tbody>
                        {Object.entries(research)
                          .slice(1, -5)
                          .map(([key, value], subIndex) => (
                            <tr key={subIndex}>
                              <td className="key-column">{key}</td>
                              <td className="value-column">{value}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ))
              ) : (
                <div>No Publications found.</div>
              )}
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel={"Edit Publication Modal"}
            className="vap-modal"
            overlayClassName="vap-overlay"
          >
            <h2>"Edit Publication"</h2>
            <form className="create-publication" onSubmit={handleSubmit}>
              <div className="create-publication-left">
                <div className="multi-fields">
                  <input
                    name="articletype"
                    onChange={handleInputChange}
                    value={selectedPublication?.articletype || ""}
                    type="text"
                    placeholder="Article Type"
                  />
                  <input
                    name="titleofmanuscript"
                    onChange={handleInputChange}
                    value={selectedPublication?.titleofmanuscript || ""}
                    type="text"
                    placeholder="Title of Manuscript"
                  />

                  <input
                    required
                    name="journal"
                    onChange={handleInputChange}
                    value={selectedPublication?.journal || ""}
                    type="text"
                    placeholder="Journal"
                  />
                  <input
                    required
                    name="ISSN"
                    onChange={handleInputChange}
                    value={selectedPublication?.ISSN || ""}
                    type="text"
                    placeholder="ISSN"
                  />
                  <input
                    required
                    name="Volume"
                    onChange={handleInputChange}
                    value={selectedPublication?.Volume || ""}
                    type="text"
                    placeholder="Volume"
                  />

                  <input
                    name="Issue"
                    onChange={handleInputChange}
                    value={selectedPublication?.Issue || ""}
                    type="text"
                    placeholder="Issue"
                  />

                  <input
                    name="Year"
                    onChange={handleInputChange}
                    value={selectedPublication?.Year || ""}
                    type="text"
                    placeholder="Year"
                  />

                  <input
                    name="DateofPublication"
                    onChange={handleInputChange}
                    value={selectedPublication?.DateofPublication || ""}
                    type="text"
                    placeholder="Date of Publication"
                  />

                  <input
                    name="HECcategory"
                    onChange={handleInputChange}
                    value={selectedPublication?.HECcategory || ""}
                    type="text"
                    placeholder="HEC Category"
                  />
                  <input
                    name="webofScience"
                    onChange={handleInputChange}
                    value={selectedPublication?.webofScience || ""}
                    type="text"
                    placeholder="Web of Science"
                  />

                  <input
                    name="impactfactor"
                    onChange={handleInputChange}
                    value={selectedPublication?.impactfactor || ""}
                    type="number"
                    placeholder="Impact Factor"
                  />
                  <input
                    name="scopus"
                    onChange={handleInputChange}
                    value={selectedPublication?.scopus || ""}
                    type="text"
                    placeholder="Scopus"
                  />
                  <input
                    name="urlOfPublication"
                    onChange={handleInputChange}
                    value={selectedPublication?.urlOfPublication || ""}
                    type="text"
                    placeholder="URL of Publication"
                  />
                </div>
              </div>
              <button className="submit-button" type="submit">
                {editMode ? "UPDATE" : "Submit"}
              </button>
              {error && <p className="error">{error}</p>}
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
