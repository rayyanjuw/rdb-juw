import React from "react";
import "./downloadable.css";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../shared-components/navbar/NavBar";

const Downloadable = () => {
  return (
    <div className="downloadable-container">
      <Sidebar />
      <div className="downloadable">
        <div className="navbar-div">
          <NavBar />
        </div>
        <div className="downloadable-card">
          <h5>Downloadable</h5>
          <div className="link-items">
            <div className="hec-national">
              <p>HEC Recognized National Journals Before 2020</p>
              <a href="https://www.hec.gov.pk/english/services/faculty/journals/Pages/Research/National.aspx">
                https://www.hec.gov.pk/english/services/faculty/journals/Pages/Research/National.aspx
              </a>
            </div>
            <div className="hec-international">
              <p>HEC Recognized International Journals Before 2020</p>
              <a href="https://www.hec.gov.pk/english/services/faculty/journals/Pages/Research/International.aspx">
                https://www.hec.gov.pk/english/services/faculty/journals/Pages/Research/International.aspx
              </a>
            </div>
            <div className="hec-journals">
              <p>HEC Recognized Journals After 2020</p>
              <a href="https://hjrs.hec.gov.pk">https://hjrs.hec.gov.pk/</a>
            </div>
            <div className="webofscience">
              <p>Web of Science Master Journal List</p>
              <a href="https://mjl.clarivate.com/search-results">
                https://mjl.clarivate.com/search-results
              </a>
            </div>
          </div>
        </div>
        <div className="juw-copyright">
          <p>© 2024, all rights reserved by Jinnah University for Women.</p>
        </div>
      </div>
    </div>
  );
};

export default Downloadable;
