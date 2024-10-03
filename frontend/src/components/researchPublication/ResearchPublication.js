import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./researchPublication.css";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
import NavBar from "../shared-components/navbar/NavBar";
import { createPublication } from "../../api/Api";
import { toast } from "react-toastify";

const ResearchPublication = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchTerm, setSearchTerm] = useState(""); 

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

  const [error, setError] = useState("");
  const [publications, setPublications] = useState([data]);
  // const [publications, setPublications] = useState([initialPublication]);

  // const handleInput = (e, index) => {
  //   const { name, value } = e.target;
  //   const updatedPublications = publications.map((publication, i) =>
  //     i === index ? { ...publication, [name]: value } : publication
  //   );
  //   setPublications(updatedPublications);
  // };

  const validateURL = (url) => {
    // Ensure the URL starts with http:// or https://
    const urlPattern = new RegExp("^(https?:\\/\\/)", "i");
    return urlPattern.test(url);
  };

  // orignal
  // const handleInput = (e, index) => {
  //   const { name, value } = e.target;
  //   const updatedPublications = publications.map((publication, i) => {
  //     if (i === index) {
  //       // Convert "Yes" to true and "No" to false for boolean fields
  //       const updatedValue =
  //         name === "scopus" || name === "webofScience"
  //           ? value === "Yes"
  //           : value;
  //       // const updatedValue = (name === "scopus" || name === "webofScience") ? value : value;
  //       // Add URL validation
  //       if (name === "urlOfPublication") {
  //         if (validateURL(value)) {
  //           setError("");
  //         } else {
  //           // toast.error("URL must start with http:// or https://");
  //           setError("URL must start with http:// or https://");
  //         }
  //       }
  //       return { ...publication, [name]: updatedValue };
  //     }
  //     return publication;
  //   });
  //   setPublications(updatedPublications);
  // };

  const handleInput = (e, index) => {
    const { name, value } = e.target;

    const updatedPublications = publications.map((publication, i) => {
      if (i === index) {
        let updatedValue = value;

        // Handle scopus and webofScience boolean fields
        if (name === "scopus" || name === "webofScience") {
          updatedValue = value === "Yes" ? true : value === "No" ? false : "";
        }

        // Add URL validation
        if (name === "urlOfPublication") {
          if (validateURL(value)) {
            setError("");
          } else {
            setError("URL must start with http:// or https://");
          }
        }

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


  const handleSubmit = async () => {
    try {
      for (const publication of publications) {
        const response = await createPublication(publication);
        if (response.status === 201) {
          toast.success("Publication added successfully");
          // alert("Publication added successfully");
        } else {
          toast.error("Error while adding publication");
          // alert("Error while adding publication");
        }
      }
      setPublications([data]);
    } catch (error) {
      toast.error("Error while adding publications");
      // alert("Error while adding publications");
    }
  };



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
            <div className="rp-bred-crumb">
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
                      required
                      type="text"
                      name="titleofmanuscript"
                      placeholder="Title of Manuscript:"
                      value={publication.titleofmanuscript}
                      onChange={(e) => handleInput(e, index)}
                    />
                  </div>
                  <div className="">
                    <label>Journal:</label>
                    <input
                      required
                      type="text"
                      name="journal"
                      placeholder="Journal:"
                      value={publication.journal}
                      onChange={(e) => handleInput(e, index)}
                    />
                  </div>

                  <div className="">
                    <label>ISSN:</label>
                    <input
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
                      type="number"
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
                  <div className="">
                    <label>Year:</label>
                    <input
                      type="number"
                      name="Year"
                      placeholder="Year:"
                      value={publication.Year}
                      min="1900"
                      max={new Date().getFullYear()} 
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
                      type="text"
                      name="Pages"
                      placeholder="e.g: 100-200"
                      value={publication.Pages}
                      onChange={(e) => handleInput(e, index)}
                      pattern="\d{1,5}-\d{1,5}"
                    />
                  </div>

                  <div className="d-flex flex-column gap-01">
                    <label>HEC Category:</label>
                    <select
                      name="HECcategory"
                      value={publication.HECcategory}
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
                      id="WebofScience"
                      value={
                        publication.webofScience === true
                          ? "Yes"
                          : publication.webofScience === false
                          ? "No"
                          : ""
                      }
                      onChange={(e) => handleInput(e, index)}
                    >
                      <option value="">Select an option</option>{" "}
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="">
                    <label>Impact Factor:</label>
                    <input
                      type="number"
                      name="impactfactor"
                      placeholder="e.g: 0.01"
                      value={publication.impactfactor}
                      onChange={(e) => handleInput(e, index)}
                    />
                  </div>

                  <div className="d-flex flex-column gap-01">
                    <label>Scopus (Yes/No):</label>
                    <select
                      name="scopus"
                      id="Scopus"
                      value={
                        publication.scopus === true
                          ? "Yes"
                          : publication.scopus === false
                          ? "No"
                          : ""
                      }
                      onChange={(e) => handleInput(e, index)}
                    >
                      <option value="">Select an option</option>{" "}
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="">
                    <label>URL of Publication:</label>
                    <input
                      type="url"
                      name="urlOfPublication"
                      placeholder="URL of Publication"
                      value={publication.urlOfPublication}
                      onChange={(e) => handleInput(e, index)}
                    />
                    {error && <span style={{ color: "red" }}>{error}</span>}
                  </div>
                </div>
              </div>
            ))}
            <div className="save-button">
              <button
                className="researchpublication-button"
                onClick={addMorePublications}
              >
                ADD MORE
              </button>
              <button
                className="researchpublication-button"
                onClick={handleSubmit}
              >
                SAVE
              </button>
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

export default ResearchPublication;
