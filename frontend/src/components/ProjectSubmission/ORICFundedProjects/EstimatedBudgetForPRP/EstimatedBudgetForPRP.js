import React, { useState } from "react";
import "./estimatedbudgetforPRP.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

const EstimatedBudgetForPRP = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [formData, setFormData] = useState({
    hotplates: { qty: "", unit: "", amount: "" },
    computer: { qty: "", unit: "", amount: "" },
    printer: { qty: "", unit: "", amount: "" },
    paperrimAmount: { amount: "" },
    literatureAndOtherAmount: { amount: "" },
    localtravel: { amount: "" },
    othercostAmount: { amount: "" },
  });

  console.log(formData);

  const breadCrumps = [
    {
      label: "Proposal Cover",
      path: "/add-oric-funded-projects",
    //   path: "/add-international/national-grants",
    },
    {
      label: "Research Project",
      path: "/oric-funded-project-research-project",
    },
    {
      label: "Facilities and Funding",
      path: "/oric-funded-project-facilities-and-funding",
    },
    {
      label: "Justification for The Requested Budget Items",
      path: "/oric-funded-project-justification-and-budget-items",
    },
    {
      label: "Estimated Budget for Proposed Research Period",
      path: "/oric-funded-project-estimated-budget-proposed-research-period",
    },
  ];

  //   const handleInputChange = (event, field, key) => {
  //     const { value } = event.target;
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [field]: {
  //         ...prevState[field],
  //         [key]: value,
  //       },
  //     }));
  //   };

  const handleInputChange = (event, field, key) => {
    const { value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [key]: value,
      },
    }));
  };

  return (
    <div className="estimatedbudget-container">
      <Sidebar />
      <div className="estimatedbudget">
        <div className="estimatedbudget_navbar-div">
          <NavBar />
        </div>
        <div className="estimatedbudget-card">
          <h3 className="estimatedbudget_heading">
            ORIC Funded Project | Estimated Budget for Proposed Research Period
          </h3>
          <div className="estimatedbudget_bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>
          <div className="estimatedbudget_main_heading">
            <h4>Estimated Budget for Proposed Research Period</h4>
          </div>
          <div className="estimatedbudget_multiInputFields">
            <h4 className="estimatedbudget_heading2">
              A. Permanent Equipment:
            </h4>

            <div>
              <div className="section-container">
                <h6 className="estimatedbudget_subheading">Hot Plates</h6>
                <div className="input-row">
                  <div className="input-field">
                    <label>Qty</label>
                    <input
                      type="text"
                      value={formData.hotplates.qty}
                      onChange={(e) => handleInputChange(e, "hotplates", "qty")}
                    />
                  </div>
                  <div className="input-field">
                    <label>Unit/Price:</label>
                    <input
                      type="text"
                      value={formData.hotplates.unit}
                      onChange={(e) =>
                        handleInputChange(e, "hotplates", "unit")
                      }
                    />
                  </div>
                  <div className="input-field">
                    <label>Amount</label>
                    <input
                      type="text"
                      value={formData.hotplates.amount}
                      onChange={(e) =>
                        handleInputChange(e, "hotplates", "amount")
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="section-container">
                <h6 className="estimatedbudget_subheading">Computer</h6>
                <div className="input-row">
                  <div className="input-field">
                    <label>Qty</label>
                    <input
                      type="text"
                      value={formData.computer.qty}
                      onChange={(e) => handleInputChange(e, "computer", "qty")}
                    />
                  </div>
                  <div className="input-field">
                    <label>Unit/Price:</label>
                    <input
                      type="text"
                      value={formData.computer.unit}
                      onChange={(e) => handleInputChange(e, "computer", "unit")}
                    />
                  </div>
                  <div className="input-field">
                    <label>Amount</label>
                    <input
                      type="text"
                      value={formData.computer.amount}
                      onChange={(e) =>
                        handleInputChange(e, "computer", "amount")
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="section-container">
                <h6 className="estimatedbudget_subheading">Printer</h6>
                <div className="input-row">
                  <div className="input-field">
                    <label>Qty</label>
                    <input
                      type="text"
                      value={formData.printer.qty}
                      onChange={(e) => handleInputChange(e, "printer", "qty")}
                    />
                  </div>
                  <div className="input-field">
                    <label>Unit/Price:</label>
                    <input
                      type="text"
                      value={formData.printer.unit}
                      onChange={(e) => handleInputChange(e, "printer", "unit")}
                    />
                  </div>
                  <div className="input-field">
                    <label>Amount</label>
                    <input
                      type="text"
                      value={formData.printer.amount}
                      onChange={(e) =>
                        handleInputChange(e, "printer", "amount")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="estimatedbudget_heading2">B. Paper Rim:</h4>
              <div className="input-field">
                <label>Amount:</label>
                <input 
                    type="text" 
                    value={formData.paperrimAmount.amount}
                    onChange={(e) =>
                        handleInputChange(e, "paperrimAmount", "amount")
                    }
                />
              </div>
            </div>

            <div>
              <h4 className="estimatedbudget_heading2">
                C. Literature, documentation, information, online literature
                search, contingencies, postage:
              </h4>
              <div className="input-field">
                <label>Amount:</label>
                <input
                  type="text"
                  value={formData.literatureAndOtherAmount.amount}
                  onChange={(e) =>
                    handleInputChange(e, "literatureAndOtherAmount", "amount")
                  }
                />
              </div>
            </div>

            <div>
              <h4 className="estimatedbudget_heading2">
                D. Local Travel (For project involving field work etc.):
              </h4>

              <div className="input-field">
                <label>Amount:</label>
                <input
                    type="text"
                    value={formData.localtravel.amount} 
                    onChange={(e) =>
                        handleInputChange(e, "localtravel", "amount")
                    }
                />
              </div>
            </div>

            <div>
              <h4 className="estimatedbudget_heading2">
                E. Other costs (specify):
              </h4>
              <div className="input-field">
                <label>Amount:</label>
                <input
                    type="text"
                    value={formData.othercostAmount.amount} 
                    onChange={(e) =>
                        handleInputChange(e, "othercostAmount", "amount")
                    }
                />
              </div>
            </div>

            <div className="AIP_save-btn">
              <button className="AIP_savebut">Save</button>
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

export default EstimatedBudgetForPRP;
