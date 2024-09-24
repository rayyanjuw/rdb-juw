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
  console.log(data);

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
        console.error("Error fetching publications:", error);
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

  const openModal = (publication) => {
    setSelectedPublication(publication);
    setEditMode(true);
    setModalIsOpen(true);
    console.log(selectedPublication);
  };

  const handleDelete = async (id) => {
    try {
      await deletePublication(id);
      toast.success("Successfully Deleted!")
      // After deleting, fetch the updated list of publications
      setData((prevData) =>
        prevData.filter((publication) => publication.id !== id)
      );
    } catch (error) {
      console.error("Error deleting publication:", error);
      toast.error("Failed to delete the publication.");
      // alert("Failed to delete the publication.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updatePublication(selectedPublication.id, selectedPublication);
      toast.success("Success!")
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
      console.log(setData);
      closeModal();
    } catch (error) {
      setError(error.message);
      console.error("Error updating publication:", error);
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
            className="Modal"
            overlayClassName="Overlay"
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
