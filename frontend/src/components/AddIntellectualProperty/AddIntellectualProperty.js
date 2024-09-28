// api integrated successfully
import React, { useState } from "react";
import "./addintellectualproperty.css";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../shared-components/navbar/NavBar";
import { createIntellectualProperty } from "../../api/Api";
import { toast } from "react-toastify";

const AddIntellectualProperty = () => {
  const initialPropertyState = {
    title: "",
    OwnerIp: "Jinnah University of Women",
    address: "Jinnah University for Women, 5-C Nazimabad, 74600, Karachi.",
    fieldofinvention: "",
    backgroundofinvention: "", 
    descriptionofinvention: "",
    refrences: "",
    inventivesteps: "",
  };

  const [addintellectualproperty, setIntellectualProperty] = useState(initialPropertyState);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  console.log(addintellectualproperty)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntellectualProperty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const newProperty = {
        title: addintellectualproperty.title,
        OwnerIp: addintellectualproperty.OwnerIp,
        address: addintellectualproperty.address,
        fieldofinvention: addintellectualproperty.fieldofinvention,
        backgroundofinvention: addintellectualproperty.backgroundofinvention,
        descriptionofinvention: addintellectualproperty.descriptionofinvention,
        refrences: addintellectualproperty.refrences,
        inventivesteps: addintellectualproperty.inventivesteps,
      };

      await createIntellectualProperty(newProperty);
      setSuccessMessage("Intellectual property created successfully.");
      setIntellectualProperty(initialPropertyState);
      toast.success("Intellectual property created successfully.");
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
      toast.error(error.message || "An error occurred. Please try again.")
    }
  };

  return (
    <div className="addintelproperty-container">
      <Sidebar />
      <div className="addintelproperty">
        <div className="intelprop-navbar-div">
          <h4>Submission | Intellectual Property</h4>
          <NavBar />
        </div>
        <div className="addintelproperty-card">
          <h3 className="addintelproperty-heading">
            Intellectual Property Form
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="addintelproperty-multiinputfields">
              <div className="title-input">
                <label>Title:</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={addintellectualproperty.title}
                  name="title"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="two-inputs">
                <div className="inputgroup">
                  <label>Owner of IP:</label>
                  <input
                    type="text"
                    value={addintellectualproperty.OwnerIp}
                    name="OwnerIp"
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="inputgroup">
                  <label>Address:</label>
                  <input
                    type="text"
                    value={addintellectualproperty.address}
                    name="address"
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </div>

              <div className="inputgroup">
                <label>Field of The Invention:</label>
                <textarea
                  rows="3"
                  value={addintellectualproperty.fieldofinvention}
                  placeholder="(Not more than 50 words. Either it should describe your method of production or process or combination of both)"
                  name="fieldofinvention"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputgroup">
                <label>Background Of The Invention:</label>
                <textarea
                  rows="5"
                  value={addintellectualproperty.backgroundofinvention}
                  placeholder="Approximately 800 words: (showing how your research is different and more useful than past research)"
                  name="backgroundofinvention"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputgroup">
                <label>Description Of Invention:</label>
                <textarea
                  rows="4"
                  value={addintellectualproperty.descriptionofinvention}
                  placeholder="Approximately 250 words"
                  name="descriptionofinvention"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputgroup">
                <label>References:</label>
                <textarea
                  rows="2"
                  value={addintellectualproperty.refrences}
                  name="refrences"
                  placeholder="Not more than 10"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputgroup">
                <label>Inventive Steps:</label>
                <textarea
                  rows="4"
                  value={addintellectualproperty.inventivesteps}
                  placeholder="Approximately 5-6 Bullet points"
                  name="inventivesteps"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="aip-save-btn">
                <button type="submit" className="aip-savebut">Save</button>
              </div>

              
            </div>
          </form>
        </div>
        <div className="juw-copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default AddIntellectualProperty;
