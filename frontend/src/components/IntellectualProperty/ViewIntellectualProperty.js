import React, { useState, useEffect } from "react";
import "./viewIntelectualProperty.css";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../shared-components/navbar/NavBar";
import { jsPDF } from "jspdf";
import Modal from "react-modal";
import * as XLSX from "xlsx";
import "jspdf-autotable";
import {
  getAllIntellectualProperty,
  deleteIntellectualProperty,
  updateIntellectualProperty,
} from "../../api/Api";
import { toast } from "react-toastify";





const ViewIntellectualProperty = () => {
  const [IntelProperties, setIntelProperties] = useState([
    {
      title: "",
      OwnerIp: "Jinnah University of Women",
      address: "Jinnah University for Women, 5-C Nazimabad, 74600, Karachi.",
      fieldofinvention: "",
      backgroundofinvention: "",
      descriptionofinvention: "",
      refrences: "",
      inventivesteps: "",
    },
  ]);


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIntellectualProperties = async () => {
      try {
        const data = await getAllIntellectualProperty();
        setIntelProperties(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchIntellectualProperties();
  }, []);

  if (loading) {
    return <div>Loading intellectual properties...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const openModal = (property) => {
    setSelectedProperty(property);
    setEditMode(true);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProperty(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateIntellectualProperty(selectedProperty.id, selectedProperty);
      setIntelProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.id === selectedProperty.id ? selectedProperty : property
        )
      );
      toast.success("Success!")
      closeModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectedProperty((prevSelectedProperty) => ({
      ...prevSelectedProperty,
      [name]: value,
    }));
  };

  const downloadPDF = (IntelProperties) => {
    const doc = new jsPDF();

    // Set title font and add the title
    doc.setFontSize(16);
    doc.text("Intellectual Property", 14, 15);

    let yOffset = 25; // Initial Y position

    IntelProperties.forEach((property, index) => {
      // Title for each publication
      doc.setFontSize(14);
      doc.text(`Intellectual Property ID #${index + 1}`, 14, yOffset);
      yOffset += 5; // Adjust position for the next element

      // Prepare data for the table
      const tableData = Object.entries(property).map(([key, value]) => [
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
        didDrawPage: (IntelProperties) => {
          yOffset = IntelProperties.cursor.y; // Update yOffset to the position after the table
        },
      });

      yOffset += 10; // Space between tables

      // If the content reaches the bottom of the page, add a new page
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20; // Reset Y position for new page
      }
    });

    doc.save("IntellectualProperty.pdf");
  };

  const downloadCSV = (IntelProperties) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object?.keys(IntelProperties[0]).join(",") +
      "\n" + // Add headers
      IntelProperties?.map((row) => Object.values(row).join(",")).join("\n"); // Add rows

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "IntellectualProperty.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  const downloadExcel = (IntelProperties) => {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);

    // Initialize row index
    let rowIndex = 0;

    // Loop through each publication and create a styled table
    IntelProperties.forEach((property, index) => {
      // Header for the property
      const headerRow = [`Intellectual Property ID #${index + 1}`];
      XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {
        origin: `A${rowIndex + 1}`,
      });

      // Extract keys and values
      const keys = Object.keys(property);
      const values = Object.values(property);

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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Intellectual Property");

    // Write the workbook to a file and trigger the download
    XLSX.writeFile(workbook, "IntellectualProperty.xlsx");
  };

  const handleDelete = async (id) => {
    try {
      await deleteIntellectualProperty(id);
      setIntelProperties((prevData) =>
        prevData.filter((property) => property.id !== id)
      );
      toast.success("Deleted Successfully")
    } catch (error) {
      alert("Failed to delete the publication.");
      setError(error.message);
    }
  };

  return (

    <div className="intelproperty-container">
      <Sidebar />
      <div className="intelproperty">
        <div className="viewintell-navbar-div">
          <h4>Submission | Intellectual Property</h4>
          <NavBar />
        </div>
        {/* <div className="navbar-div">
        <h4>Submission | Intellectual Property</h4>
        <NavBar />
      </div> */}
        <div className="intelproperty-card">
          <h5>Intellectual Property</h5>
          <div className="download-btn" style={{ marginBottom: "20px" }}>
            <button
              type="button"
              className="create-user-btn"
              onClick={() => downloadPDF(IntelProperties)}
            >
              DOWNLOAD PDF
            </button>
            <button
              type="button"
              className="create-user-btn"
              onClick={() => downloadExcel(IntelProperties)}
            >
              DOWNLOAD EXCEL
            </button>
            <button
              type="button"
              className="create-user-btn"
              onClick={() => downloadCSV(IntelProperties)}
            >
              DOWNLOAD CSV
            </button>
          </div>

          <div className="intelproperty-table-data">
            <div className="intelproperty-table-container">
              {IntelProperties.length > 0 ? (
                IntelProperties.map((property, index) => (
                  <div key={index} className="intelproperty-list-table">
                    <div className="intelproperty-title">
                      <h5>
                        {property.title || `Intellectual Property ${index + 1}`}
                      </h5>
                      <div className="edit-intelprop">
                        <button
                          className="edit-intelpropbtn"
                          onClick={() => openModal(property)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-intelpropbtn"
                          onClick={() => handleDelete(property.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* <h5>
                      {property.title || `Intellectual Property ${index + 1}`}
                    </h5>

                    <div className="edit-intelprop">
                      <button
                        className="edit-intelpropbtn"
                        onClick={() => openModal(property)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-intelpropbtn"
                        onClick={() => handleDelete(property.id)}
                      >
                        Delete
                      </button>
                    </div> */}
                    <div className="intelproperty-list-table-format title">
                      <b>Title:</b>
                      <span>{property.title}</span>
                    </div>
                    <div className="intelproperty-list-table-format">
                      <b>Owner of IP:</b>
                      <span>{property.OwnerIp}</span>
                    </div>
                    <div className="intelproperty-list-table-format">
                      <b>Address:</b>
                      <span>{property.address}</span>
                    </div>
                    <div className="intelproperty-list-table-format">
                      <b>Field of Invention:</b>
                      <span>{property.fieldofinvention}</span>
                    </div>
                    <div className="intelproperty-list-table-format">
                      <b>Background of the Invention:</b>
                      <span>{property.backgroundofinvention}</span>
                    </div>
                    <div className="intelproperty-list-table-format">
                      <b>Description of Invention:</b>
                      <span>{property.descriptionofinvention}</span>
                    </div>
                    <div className="intelproperty-list-table-format">
                      <b>References:</b>
                      <span>{property.refrences}</span>
                    </div>
                    <div className="intelproperty-list-table-format">
                      <b>Inventive Steps:</b>
                      <span>{property.inventivesteps}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div>No intellectual properties found.</div>
              )}
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel={
            editMode
              ? "Edit Intellectual Property Modal"
              : "Create Intellectual Property Modal"
          }
          className="vip-modal"
          overlayClassName="vip-overlay"
        >
          <h2>
            {editMode
              ? "Edit Intellectual Property Modal"
              : "Create Intellectual Property Modal"}
          </h2>
          <form className="create-property" onSubmit={handleSubmit}>
            <div className="multi-fields">
              <input
                required
                name="title"
                onChange={handleInputChange}
                value={selectedProperty?.title || ""}
                type="text"
                placeholder="Title"
              />

              <input
                name="OwnerIp"
                onChange={handleInputChange}
                value={selectedProperty?.OwnerIp || ""}
                type="text"
                placeholder="Owner of IP:"
                disabled
              />

              <input
                name="address"
                onChange={handleInputChange}
                value={selectedProperty?.address || ""}
                type="text"
                placeholder="address"
                disabled
              />

              <input
                required
                name="fieldofinvention"
                onChange={handleInputChange}
                value={selectedProperty?.fieldofinvention || ""}
                type="text"
                placeholder="(Not more than 50 words. Either it should describe your method of production or process or combination of both)"
              />

              <input
                required
                name="backgroundofinvention"
                onChange={handleInputChange}
                value={selectedProperty?.backgroundofinvention || ""}
                type="text"
                placeholder="Approximately 800 words: (showing how your research is different and more useful than past research)"
              />

              <input
                name="descriptionofinvention"
                onChange={handleInputChange}
                value={selectedProperty?.descriptionofinvention || ""}
                type="text"
                placeholder="Approximately 250 words"
              />

              <input
                name="refrences"
                onChange={handleInputChange}
                value={selectedProperty?.refrences || ""}
                type="text"
                placeholder="Not More than 10"
              />

              <input
                name="inventivesteps"
                onChange={handleInputChange}
                value={selectedProperty?.inventivesteps || ""}
                type="text"
                placeholder="Approximately 5-6 Bullet points"
              />
            </div>
            <button className="submit-button" type="submit">
              {editMode ? "UPDATE" : "Submit"}
            </button>
          </form>
        </Modal>

        <div className="vip-juw-copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default ViewIntellectualProperty;
