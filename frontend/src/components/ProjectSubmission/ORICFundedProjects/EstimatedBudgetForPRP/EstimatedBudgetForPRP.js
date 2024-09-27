import React, { useState } from "react";
import "./estimatedbudgetforPRP.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";
import { toast } from "react-toastify";


const EstimatedBudgetForPRP = ({onSave}) => {
  const location = useLocation();

  const [estimatedBudget, setEstimatedBudget] = useState({
    // permanentEquipment: formData?.estimatedBudget?.permanentEquipment || [
    //   { item: "Hot Plates", qty: "", unitPrice: "", amount: "" },
    //   { item: "Computer", qty: "", unitPrice: "", amount: "" },
    //   { item: "Printer", qty: "", unitPrice: "", amount: "" },
    // ],
    permanentEquipment: {
      hotplates: { qty: "", unitPrice: "", amount: "" },
      computer: { qty: "", unitPrice: "", amount: "" },
      printer: { qty: "", unitPrice: "", amount: "" }
    },
    localTravel: {
      amount: ""
    },
    paperrimAmount: {
      amount: ""
    },
    literatureAndOtherAmount: {
      amount: ""
    },
    othercostAmount:{
      amount: ""
    },
  });




  // const handleLocalChange = (e, equipmentType, field) => {
  //   const { value } = e.target;

  //   setEstimatedBudget((prevState) => ({
  //     ...prevState,
  //     permanentEquipment: {
  //       ...prevState.permanentEquipment,
  //       [equipmentType]: {
  //         ...prevState.permanentEquipment[equipmentType],
  //         [field]: value,
  //       },
  //     },
  //   }));

  //   if (handleInputChange) {
  //     handleInputChange(e);
  //   } else {
  //     console.error("handleInputChange is not a function");
  //   }
  // };



  const handleLocalChange = (e, equipmentType, field) => {
    const { value } = e.target;
    if (field === "qty" || field === "unitPrice" || field === "amount") {
      const numericValue = value.replace(/[^0-9.]/g, '');
    setEstimatedBudget((prevState) => {
      if (equipmentType === "hotplates" || equipmentType === "computer" || equipmentType === "printer") {
        return {
          ...prevState,
          permanentEquipment: {
            ...prevState.permanentEquipment,
            [equipmentType]: {
              ...prevState.permanentEquipment[equipmentType],
              [field]: numericValue,
            },
          },
        };
      } else {
        return {
          ...prevState,
          [equipmentType]: {
            ...prevState[equipmentType],
            [field]: value,
          },
        };
      }
    });
  } else {
    setEstimatedBudget((prevState) => ({
        ...prevState,
        [equipmentType]: {
            ...prevState[equipmentType],
            [field]: value,
        },
    }));
  };
}

  const handleSave = () => {
      // Validation logic
  const { permanentEquipment, paperrimAmount, literatureAndOtherAmount, localTravel, othercostAmount } = estimatedBudget;

  // Check for permanent equipment fields
  const equipmentKeys = ['hotplates', 'computer', 'printer'];
  for (const key of equipmentKeys) {
    if (!permanentEquipment[key]?.qty || !permanentEquipment[key]?.unitPrice || !permanentEquipment[key]?.amount) {
      toast.error(`Please fill in all fields for ${key.charAt(0).toUpperCase() + key.slice(1)}.`);
      return; // Stop the save operation if validation fails
    }
  }

  // Check for paper rim amount
  if (!paperrimAmount?.amount) {
    toast.error('Please provide an amount for Paper Rim.');
    return;
  }

  // Check for literature and other amount
  if (!literatureAndOtherAmount?.amount) {
    toast.error('Please provide an amount for Literature, Documentation, and Information.');
    return;
  }

  // Check for local travel amount
  if (!localTravel?.amount) {
    toast.error('Please provide an amount for Local Travel.');
    return;
  }

  // Check for other costs amount
  if (!othercostAmount?.amount) {
    toast.error('Please provide an amount for Other Costs.');
    return;
  }

    if (typeof onSave === 'function') {
        onSave(estimatedBudget); // This will trigger the parent's handleSaveAndNext
    } else {
        console.error('onSave is not a function');
    }
};


  const breadCrumps = [
    {
      label: "Proposal Cover",
      // path: "/add-oric",
      // path: "/add-oric-funded-projects",
    //   path: "/add-international/national-grants",
    },
    {
      label: "Research Project",
      // path: "/oric-funded-project-research-project",
    },
    {
      label: "Facilities and Funding",
      // path: "/oric-funded-project-facilities-and-funding",
    },
    {
      label: "Justification for The Requested Budget Items",
      // path: "/oric-funded-project-justification-and-budget-items",
    },
    {
      label: "Estimated Budget for Proposed Research Period",
      // path: "/oric-funded-project-estimated-budget-proposed-research-period",
    },
  ];


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
          {/* <p>Proposal Cover / Research Project / Facilities and Funding / Justification for The Requested Budget Items / Estimated Budget for Proposed Research Period</p> */}
          <div className="estimatedbudget_bred-crumb">
            {/* <Breadcrumb items={breadCrumps} /> */}
              <p>Proposal Cover / Research Project / Facilities and Funding / Justification for The Requested Budget Items / Estimated Budget for Proposed Research Period</p>
            {/* <Breadcrumb items={breadCrumps} activePath={currentPath} /> */}
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
                      // value={estimatedBudget?.permanentEquipment?.hotplates?.qty}
                      value={estimatedBudget?.permanentEquipment?.hotplates?.qty}
                      onChange={(e) => handleLocalChange(e, "hotplates", "qty")}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Unit/Price:</label>
                    <input
                      type="text"
                      value={estimatedBudget?.permanentEquipment?.hotplates?.unitPrice}
                      onChange={(e) => handleLocalChange(e, "hotplates", "unitPrice")}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Amount</label>
                    <input
                      type="text"
                      value={estimatedBudget?.permanentEquipment?.hotplates?.amount}
                      onChange={(e) => handleLocalChange(e, "hotplates", "amount")}
                      required
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
                      value={estimatedBudget?.permanentEquipment?.computer?.qty}
                      onChange={(e) => handleLocalChange(e, "computer", "qty")}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Unit/Price:</label>
                    <input
                      type="text"
                      value={estimatedBudget?.permanentEquipment?.computer?.unitPrice}
                      onChange={(e) => handleLocalChange(e, "computer", "unitPrice")}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Amount</label>
                    <input
                      type="text"
                      value={estimatedBudget?.permanentEquipment?.computer?.amount}
                      onChange={(e) => handleLocalChange(e, "computer", "amount")}
                      required
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
                      value={estimatedBudget?.permanentEquipment?.printer?.qty}
                      onChange={(e) => handleLocalChange(e, "printer", "qty")}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Unit/Price:</label>
                    <input
                      type="text"
                      value={estimatedBudget?.permanentEquipment?.printer?.unitPrice}
                      onChange={(e) => handleLocalChange(e, "printer", "unitPrice")}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Amount</label>
                    <input
                      type="text"
                      value={estimatedBudget?.permanentEquipment?.printer?.amount}
                      onChange={(e) =>
                        handleLocalChange(e, "printer", "amount")
                      }
                      required
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
                    value={estimatedBudget?.paperrimAmount?.amount}
                    onChange={(e) =>
                      handleLocalChange(e, "paperrimAmount", "amount")
                    }
                    required
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
                  value={estimatedBudget?.literatureAndOtherAmount?.amount}
                  onChange={(e) =>
                    handleLocalChange(e, "literatureAndOtherAmount", "amount")
                  }
                  required
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
                    value={estimatedBudget?.localTravel?.amount} 
                    onChange={(e) =>
                      handleLocalChange(e, "localTravel", "amount")
                    }
                    required
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
                    value={estimatedBudget?.othercostAmount?.amount} 
                    onChange={(e) =>
                      handleLocalChange(e, "othercostAmount", "amount")
                    }
                    required
                />
              </div>
            </div>

            <div className="AIP_save-btn">
              <button className="AIP_savebut" onClick={handleSave}>Save</button>
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

