import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./researchPublication.css";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
import NavBar from "../shared-components/navbar/NavBar";
import { createPublication } from "../../api/Api";

const ResearchPublication = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const data = {
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
  };

  const [publications, setPublications] = useState([data]);
  // const [publications, setPublications] = useState([initialPublication]);

  // const handleInput = (e, index) => {
  //   const { name, value } = e.target;
  //   const updatedPublications = publications.map((publication, i) =>
  //     i === index ? { ...publication, [name]: value } : publication
  //   );
  //   setPublications(updatedPublications);
  // };

  const handleInput = (e, index) => {
    const { name, value } = e.target;
    const updatedPublications = publications.map((publication, i) => {
      if (i === index) {
        // Convert "Yes" to true and "No" to false for boolean fields
        const updatedValue = (name === "scopus" || name === "webofScience") ? (value === "Yes") : value;
        // const updatedValue = (name === "Scopus" || name === "WebofScience") ? (value === "Yes") : value;
        return { ...publication, [name]: updatedValue };
      }
      return publication;
    });
    setPublications(updatedPublications);
  };

  const addMorePublications = () => {
    // setPublications([...publications, initialPublication]);
    setPublications([...publications, data]);
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await createPublication({
  //       publications,
  //     });

  //     // Check if the response status is 201 (Created)
  //     if (response.status === 201) {
  //       alert("Publications added successfully");
  //       // Optionally, clear the form or redirect
  //       setPublications([initialPublication]); // Reset to initial state
  //     } else {
  //       // Handle non-201 responses
  //       const result = await response.json();
  //       alert(result.message || "Error while adding publications");
  //     }
  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error:", error);
  //     alert("Error while adding publications");
  //   }
  // };

  // code
  // const handleSubmit = async () => {
  //   try {
  //     // Adjust the payload structure as needed
  //     const response = await createPublication();

  //     if (response.status === 201) {
  //       alert("Publications added successfully");
  //       // Optionally, you can clear the form or redirect here
  //     } else {
  //       alert("Error while adding publications");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Error while adding publications");
  //   }
  // };

  const handleSubmit = async () => {
    try {
      for (const publication of publications) {
        const response = await createPublication(publication);
        if (response.status === 201) {
          alert("Publication added successfully");
        } else {
          alert("Error while adding publication");
        }
      }
      setPublications([data]); // Reset to initial state
    } catch (error) {
      console.error("Error:", error);
      alert("Error while adding publications");
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch("/research", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(publications),
  //     });

  //     const result = await response.json();

  //     if (result.success) {
  //       alert("Research added successfully");
  //     } else {
  //       alert("Error while adding research");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Error while adding research");
  //   }
  // };

  console.log(publications);

  const breadCrumps = [
    {
      label: " Personal Information",
      path: "/researchportfolio",
    },
    {
      label: "Honor and Awards, Scholarship",
      path: "/honorandawards",
    },
    {
      label: "Membership",
      path: "/membership",
    },
    {
      label: "Publications",
      // path: "/researchpublication",
      path: "/viewallpublications",
    },
    {
      label: "Research Grants and Contracts",
      path: "/research-grants-and-contracts",
    },
  ];

  return (
    <>
      <div className="research-publication-container">
        <Sidebar />
        <div className="research-publication">
          <div className="navbar-div">
            <NavBar />
          </div>
          <div className="research-publication-card">
            <h3 className="research-portfolio">
              Research portfolio | Publications
            </h3>
            <div className="bred-crumb">
              <Breadcrumb items={breadCrumps} activePath={currentPath} />
            </div>
            {publications.map((publication, index) => (
              <div
                key={index}
                className={`card-content ${publication.new ? "" : "mt-2"}`}
              >
                <h5>Publication Details ({index + 1}):</h5>
                <div className="multi-input-fields">
                  <div className="d-flex flex-column gap-01">
                    <label>Article Type:</label>
                    <select
                      // name="ArticleType"
                      name="articletype"
                      value={publication.articletype}
                      // value={publication.ArticleType}
                      onChange={(e) => handleInput(e, index)}
                    >
                      <option value="Selectoption">Select Article Type</option>
                      <option value="Original Research">
                        Original Research
                      </option>
                      <option value="Review Article">Review Article</option>
                    </select>
                  </div>
                  <div className="">
                    <label>Title of Manuscript:</label>
                    <input
                      type="text"
                      name="titleofmanuscript"
                      // name="TitleofManuscript"
                      placeholder="Title of Manuscript:"
                      value={publication.titleofmanuscript}
                      // value={publication.TitleofManuscript}
                      onChange={(e) => handleInput(e, index)}
                    />
                  </div>
                  <div className="">
                    <label>Journal:</label>
                    <input
                      type="text"
                      name="journal"
                      // name="Journal"
                      placeholder="Journal:"
                      value={publication.journal}
                      // value={publication.Journal}
                      onChange={(e) => handleInput(e, index)}
                    />
                  </div>

                  <div className="">
                    <label>ISSN:</label>
                    <input
                      // type="Number"
                      type="text"
                      name="ISSN"
                      placeholder="Enter Journal ISSN:"
                      value={publication.ISSN}
                      onChange={(e) => handleInput(e, index)}
                    />
                  </div>

                  <div className="">
                    <label>Volume:</label>
                    <input
                      type="text"
                      name="Volume"
                      placeholder="Volume:"
                      value={publication.Volume}
                      onChange={(e) => handleInput(e, index)}
                    />
                  </div>

                  <div className="">
                    <label>Issue:</label>
                    <input
                      type="text"
                      name="Issue"
                      placeholder="Issue:"
                      value={publication.Issue}
                      onChange={(e) => handleInput(e, index)}
                    />
                  </div>

                  {/* <div className="">
                    <label>Year:</label>
                    <input
                      type="Date"
                      name="Year"
                      placeholder="Year:"
                      value={publication.Year}
                      onChange={(e) => handleInput(e, index)}
                    />
                  </div> */}

                  <div className="">
                    <label>Year:</label>
                    <input
                      type="number"
                      name="Year"
                      placeholder="Year:"
                      value={publication.Year}
                      min="1900" // Minimum valid year
                      max={new Date().getFullYear()} // Maximum valid year (current year)
                      onChange={(e) => handleInput(e, index)}
                      required
                    />
                  </div>

                  <div className="">
                    <label>Date of Publication:</label>
                    <input
                      type="Date"
                      name="DateofPublication"
                      placeholder="Date of Publication:"
                      value={publication.DateofPublication}
                      onChange={(e) => handleInput(e, index)}
                    />
                  </div>

                  <div className="">
                    <label>Pages:</label>
                    <input
                      // type="Number"
                      type="text"
                      name="Pages"
                      placeholder="Pages:"
                      value={publication.Pages}
                      // onChange={(e) => handleInput(e, index)}
                      onChange={(e) => handleInput(e, index)}
                      pattern="\d{1,5}-\d{1,5}" // Regex pattern to validate page range format
                    />
                  </div>

                  <div className="d-flex flex-column gap-01">
                    <label>HEC Category:</label>
                    <select
                      name="HECcategory"
                      // name="HECCategory"
                      value={publication.HECcategory}
                      // value={publication.HECCategory}
                      onChange={(e) => handleInput(e, index)}
                    >
                      <option value="Category">HEC Category</option>
                      <option value="W-Category">W Category</option>
                      <option value="X-Category">X Category</option>
                      <option value="Y-Category">Y Category</option>
                      <option value="Z-Category">Z Category</option>
                    </select>
                  </div>

                  <div className="d-flex flex-column gap-01">
                    <label>Web of Science (Yes/No):</label>
                    <select
                      name="webofScience"
                      // name="WebofScience"
                      id="WebofScience"
                      placeholder="Web of Science (Yes/No):"
                      // value={publication.WebofScience}
                      value={publication.webofScience ? "Yes" : "No"}
                      onChange={(e) => handleInput(e, index)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="">
                    <label>Impact Factor:</label>
                    <input
                      type="number"
                      // step="0.01"
                      name="impactfactor"
                      // name="ImpactFactor"
                      placeholder="Impact Factor:"
                      value={publication.impactfactor}
                      // value={publication.ImpactFactor}
                      onChange={(e) => handleInput(e, index)}
                    />
                  </div>

                  <div className="d-flex flex-column gap-01">
                    <label>Scopus (Yes/No):</label>
                    <select
                      name="scopus"
                      // name="Scopus"
                      id="Scopus"
                      placeholder="Scopus"
                      // value={publication.Scopus}
                      value={publication.scopus ? "Yes" : "No"}
                      // value={publication.Scopus ? "Yes" : "No"}
                      onChange={(e) => handleInput(e, index)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="url-publication">
                    <label>URL of Publication:</label>
                    <input
                      type="url"
                      name="urlOfPublication"
                      // name="URLofPublication"
                      placeholder="URL of Publication:"
                      value={publication.urlOfPublication}
                      // value={publication.URLofPublication}
                      onChange={(e) => handleInput(e, index)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="add-more-bg">
              <button className="button" onClick={addMorePublications}>
                ADD MORE
              </button>
            </div>
            <div className="save-button">
              <button className="button" onClick={handleSubmit}>
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResearchPublication;
