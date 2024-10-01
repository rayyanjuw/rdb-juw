// toastified
import React, { useState, useEffect } from "react";
import "./honorANdAwards.css";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import NavBar from "../shared-components/navbar/NavBar";
import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
import { useLocation } from "react-router-dom";
import { getHonors, updateHonors, deleteHonors } from "../../api/Api";
import Modal from "react-modal";
import { toast } from "react-toastify";


const HonorAndAwards = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const [academicAwards, setAcademicAwards] = useState(["", "", "", ""]);
  const [professionalAwards, setProfessionalAwards] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState("");

  // Handle input field changes
  const handleInputChange = (e, index, type) => {
    const { value } = e.target;
    if (type === 'academic') {
      const updatedAwards = [...academicAwards];
      updatedAwards[index] = value;
      setAcademicAwards(updatedAwards);
    } else if (type === 'professional') {
      const updatedAwards = [...professionalAwards];
      updatedAwards[index] = value;
      setProfessionalAwards(updatedAwards);
    }
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSection(""); // Reset editing section
  };

  // Function to handle the update honors API call
  const handleUpdateHonors = async () => {
    try {
      const updatedHonors = {
        academicAwards: academicAwards.filter(award => award.trim() !== ""),
        professionalAwards: professionalAwards.filter(award => award.trim() !== ""),
      };
      await updateHonors(updatedHonors);
      setAcademicAwards(updatedHonors.academicAwards);
      setProfessionalAwards(updatedHonors.professionalAwards);
      closeModal();
      // toast.success("Honor And Awards Updated Successfully")
      toast.success("Success!")
    } catch (error) {
      toast.error("Failed to Update Honor And Awards")
      // setError("Failed to update honors.");
    }
  };

  // Function to handle the delete honors API call
  const handleDeleteHonors = async (category) => {
    try {
      await deleteHonors(category);
      toast.success(`${category} Awards Deleted SUccesfully`)
      // Clear the awards based on the category
      if (category === 'academic') {
        setAcademicAwards(["", "", "", ""]);
      } else if (category === 'professional') {
        setProfessionalAwards(["", "", "", ""]);
      }
    } catch (error) {
      toast.error(`Failed to delete ${category} awards`)
      // setError("Failed to delete honors.");
    }
  };

  useEffect(() => {
    const fetchHonors = async () => {
      try {
        const data = await getHonors();

        // Parse the academic and professional awards data
        const parsedAcademicAwards = JSON.parse(data.academicAwards || "[]");
        const parsedProfessionalAwards = JSON.parse(data.professionalAwards || "[]");

        setAcademicAwards(parsedAcademicAwards.concat(Array(4 - parsedAcademicAwards.length).fill("")))
        setProfessionalAwards(parsedProfessionalAwards.concat(Array(4 - parsedProfessionalAwards.length).fill("")))
      } catch (error) {
        toast.error("Failed to fetch honors data")
      } finally {
        setLoading(false);
      }
    };

    fetchHonors();
  }, []);

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

  const handleNavigate = () => {
    navigate("/edit-honorandawards");
  };

  return (
    <div className="honorandaward-container">
      <Sidebar />
      <div className="honor-and-awards">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="honorandaward-card">
          <h3 className="honorandaward-heading">
            Research portfolio | Honor and Awards, Scholarship
          </h3>
          <div className="ha-bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <hr />
          <div className="honorandaward-table">
            {loading ? (
              <p>Loading honors and awards...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="honorandaward-section">
                <div className="honorandaward-table-head">
                  <h5>ACADEMIC AWARDS</h5>
                  <button type="button" onClick={() => {
                    setEditingSection("academic");
                    setIsModalOpen(true);
                  }}>
                    EDIT
                  </button>
                  <button type="button" onClick={() => handleDeleteHonors('academic')}>
                    DELETE
                  </button>
                </div>
                {academicAwards.length > 0 ? (
                  <table>
                    <tbody>
                      {academicAwards.map((academicAward, index) => (
                        <tr key={index}>
                          <td className="key-column">{`Academic Award ${index + 1}`}</td>
                          <td className="value-column">{academicAward}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No academic awards found.</p>
                )}
                <hr />
                <div className="honorandaward-table-head">
                  <h5>PROFESSIONAL AWARDS</h5>
                  <button type="button" onClick={() => {
                    setEditingSection("professional");
                    setIsModalOpen(true);
                  }}>
                    EDIT
                  </button>
                  <button type="button" onClick={() => handleDeleteHonors('professional')}>
                    DELETE
                  </button>
                </div>
                {professionalAwards.length > 0 ? (
                  <table>
                    <tbody>
                      {professionalAwards.map((professionalAward, index) => (
                        <tr key={index}>
                          <td className="key-column">{`Professional Award ${index + 1}`}</td>
                          <td className="value-column">{professionalAward}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No professional awards found.</p>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            className="edit-button"
            onClick={handleNavigate}
          >
            EDIT
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Honors and Awards"
          className="honor-modal"
          overlayClassName="honor-overlay"
        >
          <h2>Edit Honors and Awards</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateHonors();
          }}>
            {editingSection === "academic" && (
              <>
                <h3>Academic Awards</h3>
                {academicAwards.map((award, index) => (
                  <div className="modal-field" key={`academic-${index}`}>
                    <label htmlFor={`academic-${index}`}>{`Academic Award ${index + 1}`}</label>
                    <input
                      id={`academic-${index}`}
                      type="text"
                      value={award}
                      onChange={(e) => handleInputChange(e, index, 'academic')}
                      placeholder={`Enter Academic Award ${index + 1}`}
                    />
                  </div>
                ))}
              </>
            )}
            {editingSection === "professional" && (
              <>
                <h3>Professional Awards</h3>
                {professionalAwards.map((award, index) => (
                  <div className="modal-field" key={`professional-${index}`}>
                    <label htmlFor={`professional-${index}`}>{`Professional Award ${index + 1}`}</label>
                    <input
                      id={`professional-${index}`}
                      type="text"
                      value={award}
                      onChange={(e) => handleInputChange(e, index, 'professional')}
                      placeholder={`Enter Professional Award ${index + 1}`}
                    />
                  </div>
                ))}
              </>
            )}
            <button type="submit">Save Changes</button>
            {/* <button type="button" onClick={closeModal}>Cancel</button> */}
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default HonorAndAwards;


