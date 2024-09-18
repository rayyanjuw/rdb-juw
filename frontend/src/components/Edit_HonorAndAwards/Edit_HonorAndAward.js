// original code without integrated
// import React, { useState } from "react";
// import "./edit_honorAndAward.css";
// import Sidebar from "../Sidebar/Sidebar";
// import NavBar from "../shared-components/navbar/NavBar";
// import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
// import { useLocation } from "react-router-dom";

// const Edit_HonorAndAward = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const [academicDetails, setAcademicDetails] = useState([
//     "AP International Diploma (APID)",
//     "AP Scholar",
//     "AP Scholar with Distinction",
//     "AP Scholar with Honor",
//   ]);

//   const [professionalDetails, setProfessionalDetails] = useState([
//     "Governor’s Volunteer Award",
//     "National Student Volunteer Award",
//     "President’s Award for Educational Excellence",
//     "President’s National Service Award",
//   ]);

//   console.log(academicDetails);
//   console.log(professionalDetails);

//   const handleInputChange = (index, value, type) => {
//     if (type === "academic") {
//       const newDetails = [...academicDetails];
//       newDetails[index] = value;
//       setAcademicDetails(newDetails);
//     } else if (type === "professional") {
//       const newDetails = [...professionalDetails];
//       newDetails[index] = value;
//       setProfessionalDetails(newDetails);
//     }
//   };

//   const breadCrumps = [
//     { label: "Personal Information", path: "/researchportfolio" },
//     { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
//     { label: "Membership", path: "/membership" },
//     { label: "Publications", path: "/viewallpublications" },
//     {
//       label: "Research Grants and Contracts",
//       path: "/research-grants-and-contracts",
//     },
//   ];

//   return (
//     <div className="edit_honorandaward_container">
//       <Sidebar />
//       <div className="edit_honorandaward">
//         <div className="navba-div">
//           <NavBar />
//         </div>
//         <div className="edit_honorandaward_card">
//           <h3 className="edit_honorandaward_heading">
//             Research portfolio | Honor and Awards, Scholarship
//           </h3>
//           <div className="EHA_bred-crumb">
//             <Breadcrumb items={breadCrumps} activePath={currentPath} />
//           </div>
//           {/* <div className="bred-crumb">
//             <Breadcrumb items={breadCrumps} activePath={currentPath} />
//           </div> */}

//           <div className="edit_honorandaward_data">
//             <h3 className="edit_honorandaward_heading">
//               Honor and Awards, Scholarship
//             </h3>
//             <h6 className="edit_honorandaward_subheading">Academically</h6>
//             <div className="EDIT_Honor_multiInputFields">
//               {academicDetails.map((detail, index) => (
//                 <div key={index} className="InputGroup">
//                   <label>{index + 1}. Detail:</label>
//                   <input
//                     type="text"
//                     value={detail}
//                     onChange={(e) =>
//                       handleInputChange(index, e.target.value, "academic")
//                     }
//                     name="detail"
//                   />
//                 </div>
//               ))}
//             </div>

//             <h6 className="edit_honorandaward_subheading">Professionally</h6>
//             <div className="EDIT_Honor_multiInputFields">
//               {professionalDetails.map((detail, index) => (
//                 <div key={index} className="InputGroup">
//                   <label>{index + 1}. Detail:</label>
//                   <input
//                     type="text"
//                     value={detail}
//                     onChange={(e) =>
//                       handleInputChange(index, e.target.value, "professional")
//                     }
//                     name="detail"
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="EHA_save-btn-bg">
//               <button className="EHA_savebut">Save</button>
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

// export default Edit_HonorAndAward;



// import React, { useState } from "react";
// import "./edit_honorAndAward.css";
// import Sidebar from "../Sidebar/Sidebar";
// import NavBar from "../shared-components/navbar/NavBar";
// import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
// import { useLocation } from "react-router-dom";

// const Edit_HonorAndAward = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;


//   const [formData, setFormData] = useState({
//     academicDetails: [
//       { detail: "" },
//       { detail: "" },
//       { detail: "" },
//       { detail: "" },
//     ],
//     professionalDetails: [
//       { detail: "" },
//       { detail: "" },
//       { detail: "" },
//       { detail: "" },
//     ]
//   })


//   const breadCrumps = [
//     { label: "Personal Information", path: "/researchportfolio" },
//     { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
//     { label: "Membership", path: "/membership" },
//     { label: "Publications", path: "/viewallpublications" },
//     {
//       label: "Research Grants and Contracts",
//       path: "/research-grants-and-contracts",
//     },
//   ];

//   return (
//     <div className="edit_honorandaward_container">
//       <Sidebar />
//       <div className="edit_honorandaward">
//         <div className="navba-div">
//           <NavBar />
//         </div>
//         <div className="edit_honorandaward_card">
//           <h3 className="edit_honorandaward_heading">
//             Research portfolio | Honor and Awards, Scholarship
//           </h3>
//           <div className="EHA_bred-crumb">
//             <Breadcrumb items={breadCrumps} activePath={currentPath} />
//           </div>
//           {/* <div className="bred-crumb">
//             <Breadcrumb items={breadCrumps} activePath={currentPath} />
//           </div> */}

//           <div className="edit_honorandaward_data">
//             <h3 className="edit_honorandaward_heading">
//               Honor and Awards, Scholarship
//             </h3>
//             <h6 className="edit_honorandaward_subheading">Academically</h6>
//             <div className="EDIT_Honor_multiInputFields">
//               {formData.academicDetails.map((academicDetail, index) => (
//                 <div key={index} className="InputGroup">
//                   <label>{index + 1}. Detail:</label>
//                   <input
//                     type="text"
//                     value={academicDetail.detail}
//                     // onChange={(e) =>
//                     //   handleInputChange(index, e.target.value, "academic")
//                     // }
//                     name="detail"
//                   />
//                 </div>
//               ))}
//             </div>

//             <h6 className="edit_honorandaward_subheading">Professionally</h6>
//             <div className="EDIT_Honor_multiInputFields">
//               {formData.professionalDetails.map((professionalDetail, index) => (
//                 <div key={index} className="InputGroup">
//                   <label>{index + 1}. Detail:</label>
//                   <input
//                     type="text"
//                     value={professionalDetail.detail}
//                     // onChange={(e) =>
//                     //   handleInputChange(index, e.target.value, "professional")
//                     // }
//                     name="detail"
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="EHA_save-btn-bg">
//               <button className="EHA_savebut">Save</button>
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

// export default Edit_HonorAndAward;




import React, { useState } from "react";
import "./edit_honorAndAward.css";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../shared-components/navbar/NavBar";
import Breadcrumb from "../shared-components/breadcrumps/BreadCrumps";
import { useLocation } from "react-router-dom";
import { createHonors } from "../../api/Api";



const Edit_HonorAndAward = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [formData, setFormData] = useState({
    academicDetails: [
      { detail: "" },
      { detail: "" },
      { detail: "" },
      { detail: "" },
    ],
    professionalDetails: [
      { detail: "" },
      { detail: "" },
      { detail: "" },
      { detail: "" },
    ]
  });

  // Handle input change for academic and professional details
  const handleInputChange = (index, value, type) => {
    const updatedDetails = formData[type].map((item, i) =>
      i === index ? { detail: value } : item
    );
    setFormData(prevState => ({ ...prevState, [type]: updatedDetails }));
  };

  // Handle Save button click
  const handleSave = async () => {
    try {
      const payload = {
        academicAwards: formData.academicDetails.map(item => item.detail),
        professionalAwards: formData.professionalDetails.map(item => item.detail),
      };

      const token = localStorage.getItem("token"); 

      const response = await createHonors(payload, token);

      console.log("Honors saved successfully:", response);
      alert("Honors saved successfully!");
    } catch (error) {
      console.error("Failed to save honors:", error.message);
      alert("Failed to save honors");
    }
  };

  const breadCrumps = [
    { label: "Personal Information", path: "/researchportfolio" },
    { label: "Honor and Awards, Scholarship", path: "/honorandawards" },
    { label: "Membership", path: "/membership" },
    { label: "Publications", path: "/viewallpublications" },
    {
      label: "Research Grants and Contracts",
      path: "/research-grants-and-contracts",
    },
  ];

  return (
    <div className="edit_honorandaward_container">
      <Sidebar />
      <div className="edit_honorandaward">
        <div className="navba-div">
          <NavBar />
        </div>
        <div className="edit_honorandaward_card">
          <h3 className="edit_honorandaward_heading">
            Research portfolio | Honor and Awards, Scholarship
          </h3>
          <div className="EHA_bred-crumb">
            <Breadcrumb items={breadCrumps} activePath={currentPath} />
          </div>

          <div className="edit_honorandaward_data">
            <h3 className="edit_honorandaward_heading">
              Honor and Awards, Scholarship
            </h3>
            <h6 className="edit_honorandaward_subheading">Academically</h6>
            <div className="EDIT_Honor_multiInputFields">
              {formData.academicDetails.map((academicDetail, index) => (
                <div key={index} className="InputGroup">
                  <label>{index + 1}. Detail:</label>
                  <input
                    type="text"
                    value={academicDetail.detail}
                    onChange={(e) =>
                      handleInputChange(index, e.target.value, "academicDetails")
                    }
                    name="detail"
                  />
                </div>
              ))}
            </div>

            <h6 className="edit_honorandaward_subheading">Professionally</h6>
            <div className="EDIT_Honor_multiInputFields">
              {formData.professionalDetails.map((professionalDetail, index) => (
                <div key={index} className="InputGroup">
                  <label>{index + 1}. Detail:</label>
                  <input
                    type="text"
                    value={professionalDetail.detail}
                    onChange={(e) =>
                      handleInputChange(index, e.target.value, "professionalDetails")
                    }
                    name="detail"
                  />
                </div>
              ))}
            </div>

            <div className="EHA_save-btn-bg">
              <button className="EHA_savebut" onClick={handleSave}>
                Save
              </button>
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

export default Edit_HonorAndAward;
