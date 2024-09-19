import React, { useState } from "react";
import "./estimatedbudgetforPRP.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar";
import NavBar from "../../../shared-components/navbar/NavBar";
import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

const EstimatedBudgetForPRP = ({formData, handleInputChange, handleSubmit}) => {
  const location = useLocation();

  const [estimatedBudget, setEstimatedBudget] = useState({
    // permanentEquipment: formData?.estimatedBudget?.permanentEquipment || [
    //   { item: "Hot Plates", qty: "", unitPrice: "", amount: "" },
    //   { item: "Computer", qty: "", unitPrice: "", amount: "" },
    //   { item: "Printer", qty: "", unitPrice: "", amount: "" },
    // ],
    permanentEquipment: formData?.estimatedBudget?.permanentEquipment || {
      hotplates: { qty: "", unitPrice: "", amount: "" },
      computer: { qty: "", unitPrice: "", amount: "" },
      printer: { qty: "", unitPrice: "", amount: "" }
    },
    localTravel: formData?.estimatedBudget?.localTravel || {amount: ""},
    paperrimAmount: formData?.estimatedBudget?.paperrimAmount || {amount: ""},
    literatureAndOtherAmount: formData?.estimatedBudget?.literatureAndOtherAmount || {amount: ""},
    othercostAmount: formData?.estimatedBudget?.othercostAmount || {amount: ""},
  });

  console.log(estimatedBudget)


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
  
    setEstimatedBudget((prevState) => {
      if (equipmentType === "hotplates" || equipmentType === "computer" || equipmentType === "printer") {
        return {
          ...prevState,
          permanentEquipment: {
            ...prevState.permanentEquipment,
            [equipmentType]: {
              ...prevState.permanentEquipment[equipmentType],
              [field]: value,
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
  
    if (handleInputChange) {
      handleInputChange(e);
    } else {
      console.error("handleInputChange is not a function");
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
          <div className="estimatedbudget_bred-crumb">
            <Breadcrumb items={breadCrumps} />
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
                    />
                  </div>
                  <div className="input-field">
                    <label>Unit/Price:</label>
                    <input
                      type="text"
                      value={estimatedBudget?.permanentEquipment?.hotplates?.unitPrice}
                      onChange={(e) => handleLocalChange(e, "hotplates", "unitPrice")}
                    />
                  </div>
                  <div className="input-field">
                    <label>Amount</label>
                    <input
                      type="text"
                      value={estimatedBudget?.permanentEquipment?.hotplates?.amount}
                      onChange={(e) => handleLocalChange(e, "hotplates", "amount")}
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
                    />
                  </div>
                  <div className="input-field">
                    <label>Unit/Price:</label>
                    <input
                      type="text"
                      value={estimatedBudget?.permanentEquipment?.computer?.unitPrice}
                      onChange={(e) => handleLocalChange(e, "computer", "unitPrice")}
                    />
                  </div>
                  <div className="input-field">
                    <label>Amount</label>
                    <input
                      type="text"
                      value={estimatedBudget?.permanentEquipment?.computer?.amount}
                      onChange={(e) => handleLocalChange(e, "computer", "amount")}
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
                    />
                  </div>
                  <div className="input-field">
                    <label>Unit/Price:</label>
                    <input
                      type="text"
                      value={estimatedBudget?.permanentEquipment?.printer?.unitPrice}
                      onChange={(e) => handleLocalChange(e, "printer", "unit")}
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
                />
              </div>
            </div>

            <div className="AIP_save-btn">
              <button className="AIP_savebut" onClick={handleSubmit}>Save</button>
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






// import React, { useState } from "react";
// import "./estimatedbudgetforPRP.css";
// import { useLocation } from "react-router-dom";
// import Sidebar from "../../../Sidebar/Sidebar";
// import NavBar from "../../../shared-components/navbar/NavBar";
// import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

// const EstimatedBudgetForPRP = ({formData, handleInputChange, handleSubmit}) => {
//   const location = useLocation();

//   const [estimatedBudget, setEstimatedBudget] = useState({
//     permanentEquipment: formData?.estimatedBudget?.permanentEquipment || [
//       { item: "Hot Plates", qty: "", unitPrice: "", amount: "" },
//       {  item: "Computer", qty: "", unitPrice: "", amount: "" },
//       {  item: "Printer", qty: "", unitPrice: "", amount: "" },
//     ],
//     // permanentEquipment: formData?.estimatedBudget?.permanentEquipment || [{
//     //   hotplates: { qty: "", unitPrice: "", amount: "" },
//     //   computer: { qty: "", unitPrice: "", amount: "" },
//     //   printer: { qty: "", unitPrice: "", amount: "" }
//     // }],
//     localTravel: formData?.estimatedBudget?.localTravel || {amount: ""},
//     paperrimAmount: formData?.estimatedBudget?.paperrimAmount || {amount: ""},
//     literatureAndOtherAmount: formData?.estimatedBudget?.literatureAndOtherAmount || {amount: ""},
//     othercostAmount: formData?.estimatedBudget?.othercostAmount || {amount: ""},
//   });

//   console.log(estimatedBudget)




//   const handleLocalChange = (e, equipmentType, field) => {
//     const { value } = e.target;
  
//     setEstimatedBudget((prevState) => {
//       if (equipmentType === "hotplates" || equipmentType === "computer" || equipmentType === "printer") {
//         return {
//           ...prevState,
//           permanentEquipment: {
//             ...prevState.permanentEquipment,
//             [equipmentType]: {
//               ...prevState.permanentEquipment[equipmentType],
//               [field]: value,
//             },
//           },
//         };
//       } else {
//         return {
//           ...prevState,
//           [equipmentType]: {
//             ...prevState[equipmentType],
//             [field]: value,
//           },
//         };
//       }
//     });
  
//     if (handleInputChange) {
//       handleInputChange(e);
//     } else {
//       console.error("handleInputChange is not a function");
//     }
//   };


//   const breadCrumps = [
//     {
//       label: "Proposal Cover",
//       // path: "/add-oric",
//       // path: "/add-oric-funded-projects",
//     //   path: "/add-international/national-grants",
//     },
//     {
//       label: "Research Project",
//       // path: "/oric-funded-project-research-project",
//     },
//     {
//       label: "Facilities and Funding",
//       // path: "/oric-funded-project-facilities-and-funding",
//     },
//     {
//       label: "Justification for The Requested Budget Items",
//       // path: "/oric-funded-project-justification-and-budget-items",
//     },
//     {
//       label: "Estimated Budget for Proposed Research Period",
//       // path: "/oric-funded-project-estimated-budget-proposed-research-period",
//     },
//   ];


//   return (
//     <div className="estimatedbudget-container">
//       <Sidebar />
//       <div className="estimatedbudget">
//         <div className="estimatedbudget_navbar-div">
//           <NavBar />
//         </div>
//         <div className="estimatedbudget-card">
//           <h3 className="estimatedbudget_heading">
//             ORIC Funded Project | Estimated Budget for Proposed Research Period
//           </h3>
//           <div className="estimatedbudget_bred-crumb">
//             <Breadcrumb items={breadCrumps} />
//             {/* <Breadcrumb items={breadCrumps} activePath={currentPath} /> */}
//           </div>
//           <div className="estimatedbudget_main_heading">
//             <h4>Estimated Budget for Proposed Research Period</h4>
//           </div>
//           <div className="estimatedbudget_multiInputFields">
//             <h4 className="estimatedbudget_heading2">
//               A. Permanent Equipment:
//             </h4>

//             <div>
//               <div className="section-container">
//                 <h6 className="estimatedbudget_subheading">Hot Plates</h6>
//                 <div className="input-row">
//                   <div className="input-field">
//                     <label>Qty</label>
//                     <input
//                       type="text"
//                       // value={estimatedBudget?.permanentEquipment?.hotplates?.qty}
//                       value={estimatedBudget?.permanentEquipment?.hotplates?.qty}
//                       onChange={(e) => handleLocalChange(e, "hotplates", "qty")}
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label>Unit/Price:</label>
//                     <input
//                       type="text"
//                       value={estimatedBudget?.permanentEquipment?.hotplates?.unitPrice}
//                       onChange={(e) => handleLocalChange(e, "hotplates", "unitPrice")}
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label>Amount</label>
//                     <input
//                       type="text"
//                       value={estimatedBudget?.permanentEquipment?.hotplates?.amount}
//                       onChange={(e) => handleLocalChange(e, "hotplates", "amount")}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="section-container">
//                 {/* <h6 className="estimatedbudget_subheading">Computer</h6> */}
//                 <div className="input-row">
//                   <div className="input-field">
//                     <label>Qty</label>
//                     <input
//                       type="text"
//                       value={estimatedBudget?.permanentEquipment?.computer?.qty}
//                       onChange={(e) => handleLocalChange(e, "computer", "qty")}
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label>Unit/Price:</label>
//                     <input
//                       type="text"
//                       value={estimatedBudget?.permanentEquipment?.computer?.unitPrice}
//                       onChange={(e) => handleLocalChange(e, "computer", "unitPrice")}
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label>Amount</label>
//                     <input
//                       type="text"
//                       value={estimatedBudget?.permanentEquipment?.computer?.amount}
//                       onChange={(e) => handleLocalChange(e, "computer", "amount")}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="section-container">
//                 <h6 className="estimatedbudget_subheading">Printer</h6>
//                 <div className="input-row">
//                   <div className="input-field">
//                     <label>Qty</label>
//                     <input
//                       type="text"
//                       value={estimatedBudget?.permanentEquipment?.printer?.qty}
//                       onChange={(e) => handleLocalChange(e, "printer", "qty")}
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label>Unit/Price:</label>
//                     <input
//                       type="text"
//                       value={estimatedBudget?.permanentEquipment?.printer?.unitPrice}
//                       onChange={(e) => handleLocalChange(e, "printer", "unit")}
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label>Amount</label>
//                     <input
//                       type="text"
//                       value={estimatedBudget?.permanentEquipment?.printer?.amount}
//                       onChange={(e) =>
//                         handleLocalChange(e, "printer", "amount")
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h4 className="estimatedbudget_heading2">B. Paper Rim:</h4>
//               <div className="input-field">
//                 <label>Amount:</label>
//                 <input 
//                     type="text" 
//                     value={estimatedBudget?.paperrimAmount?.amount}
//                     onChange={(e) =>
//                       handleLocalChange(e, "paperrimAmount", "amount")
//                     }
//                 />
//               </div>
//             </div>

//             <div>
//               <h4 className="estimatedbudget_heading2">
//                 C. Literature, documentation, information, online literature
//                 search, contingencies, postage:
//               </h4>
//               <div className="input-field">
//                 <label>Amount:</label>
//                 <input
//                   type="text"
//                   value={estimatedBudget?.literatureAndOtherAmount?.amount}
//                   onChange={(e) =>
//                     handleLocalChange(e, "literatureAndOtherAmount", "amount")
//                   }
//                 />
//               </div>
//             </div>

//             <div>
//               <h4 className="estimatedbudget_heading2">
//                 D. Local Travel (For project involving field work etc.):
//               </h4>

//               <div className="input-field">
//                 <label>Amount:</label>
//                 <input
//                     type="text"
//                     value={estimatedBudget?.localTravel?.amount} 
//                     onChange={(e) =>
//                       handleLocalChange(e, "localTravel", "amount")
//                     }
//                 />
//               </div>
//             </div>

//             <div>
//               <h4 className="estimatedbudget_heading2">
//                 E. Other costs (specify):
//               </h4>
//               <div className="input-field">
//                 <label>Amount:</label>
//                 <input
//                     type="text"
//                     value={estimatedBudget?.othercostAmount?.amount} 
//                     onChange={(e) =>
//                       handleLocalChange(e, "othercostAmount", "amount")
//                     }
//                 />
//               </div>
//             </div>

//             <div className="AIP_save-btn">
//               <button className="AIP_savebut" onClick={handleSubmit}>Save</button>
//             </div>
//           </div>
//         </div>
//         <div className="juw_copyright">
//           <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EstimatedBudgetForPRP;
















// import React, { useState } from "react";
// import "./estimatedbudgetforPRP.css";
// import { useLocation } from "react-router-dom";
// import Sidebar from "../../../Sidebar/Sidebar";
// import NavBar from "../../../shared-components/navbar/NavBar";
// import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

// const EstimatedBudgetForPRP = ({ formData, handleInputChange, handleSubmit }) => {
//   const location = useLocation();

//   const [estimatedBudget, setEstimatedBudget] = useState({
//     permanentEquipment: formData?.estimatedBudget?.permanentEquipment || [
//       { item: "", qty: "", unitPrice: "", amount: "" },
//     ],
//     localTravel: formData?.estimatedBudget?.localTravel || { amount: "" },
//     paperrimAmount: formData?.estimatedBudget?.paperrimAmount || { amount: "" },
//     literatureAndOtherAmount: formData?.estimatedBudget?.literatureAndOtherAmount || { amount: "" },
//     othercostAmount: formData?.estimatedBudget?.othercostAmount || { amount: "" },
//   });

//   const handleLocalChange = (e, section, index, field) => {
//     const { value } = e.target;

//     setEstimatedBudget((prevState) => {
//       if (section === 'permanentEquipment') {
//         const updatedEquipment = [...prevState.permanentEquipment];
//         updatedEquipment[index] = { ...updatedEquipment[index], [field]: value };
//         return { ...prevState, permanentEquipment: updatedEquipment };
//       } else {
//         return {
//           ...prevState,
//           [section]: { ...prevState[section], [field]: value }
//         };
//       }
//     });

//     if (handleInputChange) {
//       handleInputChange(e);
//     } else {
//       console.error("handleInputChange is not a function");
//     }
//   };

//   const breadCrumps = [
//     { label: "Proposal Cover" },
//     { label: "Research Project" },
//     { label: "Facilities and Funding" },
//     { label: "Justification for The Requested Budget Items" },
//     { label: "Estimated Budget for Proposed Research Period" },
//   ];

//   return (
//     <div className="estimatedbudget-container">
//       <Sidebar />
//       <div className="estimatedbudget">
//         <div className="estimatedbudget_navbar-div">
//           <NavBar />
//         </div>
//         <div className="estimatedbudget-card">
//           <h3 className="estimatedbudget_heading">
//             ORIC Funded Project | Estimated Budget for Proposed Research Period
//           </h3>
//           <div className="estimatedbudget_bred-crumb">
//             <Breadcrumb items={breadCrumps} />
//           </div>
//           <div className="estimatedbudget_main_heading">
//             <h4>Estimated Budget for Proposed Research Period</h4>
//           </div>
//           <div className="estimatedbudget_multiInputFields">
//             <h4 className="estimatedbudget_heading2">
//               A. Permanent Equipment:
//             </h4>
//             {estimatedBudget.permanentEquipment.map((equipment, index) => (
//               <div key={index} className="section-container">
//                 <h6 className="estimatedbudget_subheading">Equipment {index + 1}</h6>
//                 <div className="input-row">
//                   <div className="input-field">
//                     <label>Item</label>
//                     <input
//                       type="text"
//                       value={equipment.item}
//                       onChange={(e) => handleLocalChange(e, 'permanentEquipment', index, 'item')}
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label>Qty</label>
//                     <input
//                       type="text"
//                       value={equipment.qty}
//                       onChange={(e) => handleLocalChange(e, 'permanentEquipment', index, 'qty')}
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label>Unit Price</label>
//                     <input
//                       type="text"
//                       value={equipment.unitPrice}
//                       onChange={(e) => handleLocalChange(e, 'permanentEquipment', index, 'unitPrice')}
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label>Amount</label>
//                     <input
//                       type="text"
//                       value={equipment.amount}
//                       onChange={(e) => handleLocalChange(e, 'permanentEquipment', index, 'amount')}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div>
//               <h4 className="estimatedbudget_heading2">B. Paper Rim:</h4>
//               <div className="input-field">
//                 <label>Amount:</label>
//                 <input
//                   type="text"
//                   value={estimatedBudget.paperrimAmount.amount}
//                   onChange={(e) => handleLocalChange(e, 'paperrimAmount', 'amount')}
//                 />
//               </div>
//             </div>

//             <div>
//               <h4 className="estimatedbudget_heading2">
//                 C. Literature, documentation, information, online literature search, contingencies, postage:
//               </h4>
//               <div className="input-field">
//                 <label>Amount:</label>
//                 <input
//                   type="text"
//                   value={estimatedBudget.literatureAndOtherAmount.amount}
//                   onChange={(e) => handleLocalChange(e, 'literatureAndOtherAmount', 'amount')}
//                 />
//               </div>
//             </div>

//             <div>
//               <h4 className="estimatedbudget_heading2">
//                 D. Local Travel (For project involving field work etc.):
//               </h4>
//               <div className="input-field">
//                 <label>Amount:</label>
//                 <input
//                   type="text"
//                   value={estimatedBudget.localTravel.amount}
//                   onChange={(e) => handleLocalChange(e, 'localTravel', 'amount')}
//                 />
//               </div>
//             </div>

//             <div>
//               <h4 className="estimatedbudget_heading2">
//                 E. Other costs (specify):
//               </h4>
//               <div className="input-field">
//                 <label>Amount:</label>
//                 <input
//                   type="text"
//                   value={estimatedBudget.othercostAmount.amount}
//                   onChange={(e) => handleLocalChange(e, 'othercostAmount', 'amount')}
//                 />
//               </div>
//             </div>

//             <div className="AIP_save-btn">
//               <button className="AIP_savebut" onClick={handleSubmit}>Save</button>
//             </div>
//           </div>
//         </div>
//         <div className="juw_copyright">
//           <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EstimatedBudgetForPRP;



// import React, { useState } from "react";
// import "./estimatedbudgetforPRP.css";
// import { useLocation } from "react-router-dom";
// import Sidebar from "../../../Sidebar/Sidebar";
// import NavBar from "../../../shared-components/navbar/NavBar";
// import Breadcrumb from "../../../shared-components/breadcrumps/BreadCrumps";

// const EstimatedBudgetForPRP = ({ formData, handleInputChange, handleSubmit }) => {
//   const location = useLocation();

//   // Initialize state with formData or default values
//   const [estimatedBudget, setEstimatedBudget] = useState({
//     permanentEquipment: formData?.estimatedBudget?.permanentEquipment || [
//       { item: "", qty: "", unitPrice: "", amount: "" },
//     ],
//     localTravel: formData?.estimatedBudget?.localTravel || { amount: "" },
//     paperrimAmount: formData?.estimatedBudget?.paperrimAmount || { amount: "" },
//     literatureAndOtherAmount: formData?.estimatedBudget?.literatureAndOtherAmount || { amount: "" },
//     othercostAmount: formData?.estimatedBudget?.othercostAmount || { amount: "" },
//   });

//   // Function to handle changes in permanentEquipment
//   const handlePermanentEquipmentChange = (index, field, value) => {
//     setEstimatedBudget((prevState) => {
//       const updatedEquipment = [...prevState.permanentEquipment];
//       updatedEquipment[index][field] = value;
//       return { ...prevState, permanentEquipment: updatedEquipment };
//     });
//   };

//   // Function to handle changes in other sections
//   const handleOtherInputChange = (section, field, value) => {
//     setEstimatedBudget((prevState) => ({
//       ...prevState,
//       [section]: { ...prevState[section], [field]: value },
//     }));
//   };

//   const breadCrumps = [
//     { label: "Proposal Cover" },
//     { label: "Research Project" },
//     { label: "Facilities and Funding" },
//     { label: "Justification for The Requested Budget Items" },
//     { label: "Estimated Budget for Proposed Research Period" },
//   ];

//   return (
//     <div className="estimatedbudget-container">
//       <Sidebar />
//       <div className="estimatedbudget">
//         <div className="estimatedbudget_navbar-div">
//           <NavBar />
//         </div>
//         <div className="estimatedbudget-card">
//           <h3 className="estimatedbudget_heading">
//             ORIC Funded Project | Estimated Budget for Proposed Research Period
//           </h3>
//           <div className="estimatedbudget_bred-crumb">
//             <Breadcrumb items={breadCrumps} />
//           </div>
//           <div className="estimatedbudget_main_heading">
//             <h4>Estimated Budget for Proposed Research Period</h4>
//           </div>
//           <div className="estimatedbudget_multiInputFields">
//             <h4 className="estimatedbudget_heading2">
//               A. Permanent Equipment:
//             </h4>
//             {estimatedBudget.permanentEquipment.map((equipment, index) => (
//               <div key={index} className="section-container">
//                 <h6 className="estimatedbudget_subheading">Equipment {index + 1}</h6>
//                 <div className="input-row">
//                   <div className="input-field">
//                     <label>Item</label>
//                     <input
//                       type="text"
//                       value={equipment.item}
//                       onChange={(e) => handlePermanentEquipmentChange(index, "item", e.target.value)}
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label>Qty</label>
//                     <input
//                       type="text"
//                       value={equipment.qty}
//                       onChange={(e) => handlePermanentEquipmentChange(index, "qty", e.target.value)}
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label>Unit Price</label>
//                     <input
//                       type="text"
//                       value={equipment.unitPrice}
//                       onChange={(e) => handlePermanentEquipmentChange(index, "unitPrice", e.target.value)}
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label>Amount</label>
//                     <input
//                       type="text"
//                       value={equipment.amount}
//                       onChange={(e) => handlePermanentEquipmentChange(index, "amount", e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div>
//               <h4 className="estimatedbudget_heading2">B. Paper Rim:</h4>
//               <div className="input-field">
//                 <label>Amount:</label>
//                 <input
//                   type="text"
//                   value={estimatedBudget.paperrimAmount.amount}
//                   onChange={(e) => handleOtherInputChange("paperrimAmount", "amount", e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <h4 className="estimatedbudget_heading2">
//                 C. Literature, documentation, information, online literature search, contingencies, postage:
//               </h4>
//               <div className="input-field">
//                 <label>Amount:</label>
//                 <input
//                   type="text"
//                   value={estimatedBudget.literatureAndOtherAmount.amount}
//                   onChange={(e) => handleOtherInputChange("literatureAndOtherAmount", "amount", e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <h4 className="estimatedbudget_heading2">
//                 D. Local Travel (For project involving field work etc.):
//               </h4>
//               <div className="input-field">
//                 <label>Amount:</label>
//                 <input
//                   type="text"
//                   value={estimatedBudget.localTravel.amount}
//                   onChange={(e) => handleOtherInputChange("localTravel", "amount", e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <h4 className="estimatedbudget_heading2">
//                 E. Other costs (specify):
//               </h4>
//               <div className="input-field">
//                 <label>Amount:</label>
//                 <input
//                   type="text"
//                   value={estimatedBudget.othercostAmount.amount}
//                   onChange={(e) => handleOtherInputChange("othercostAmount", "amount", e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="AIP_save-btn">
//               <button className="AIP_savebut" onClick={handleSubmit}>Save</button>
//             </div>
//           </div>
//         </div>
//         <div className="juw_copyright">
//           <p>© 2024, all rights reserved by Jinnah University for Women.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EstimatedBudgetForPRP;
