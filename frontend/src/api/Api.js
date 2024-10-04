import axios from "axios";
import { toast } from "react-toastify";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure to replace with your actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
});


// Function to get all research projects
// export const getAllResearchProjects = async () => {
//   try {
//     const response = await api.get("/oricfundedproject/getAll", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     const filteredProjects = response.data.map((project) => {
//       const proposalCover = JSON.parse(project.proposalCover);
//       return {
//         title: proposalCover.title || "Untitled", 
//         nameOfPI: proposalCover.nameOfPI,
//         nameOfFaculty: proposalCover.nameOfFaculty,
//         // Add other fields here as needed
//       };
//     });
//     return filteredProjects;
//   } catch (error) {
//     console.error("Error fetching research projects:", {
//       message: error.message,
//       response: error.response ? error.response.data : "No response data",
//       status: error.response ? error.response.status : "No status",
//     });
//     throw error; // Rethrow the error if you want to handle it further up
//   }
// };

// export const getAllResearchProjects = async () => {
//   try {
//     const response = await api.get("/oricfundedproject/getAll", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     const filteredProjects = response.data.map((project) => {
//       // Parse the proposalCover JSON string
//       const proposalCover = JSON.parse(project.proposalCover);
      
//       return {
//         title: proposalCover.title || "Untitled", 
//         nameOfPI: proposalCover.nameOfPI,
//         nameOfFaculty: proposalCover.nameOfFaculty,
//         // You can add more fields here if necessary
//       };
//     });

//     return filteredProjects;
//   } catch (error) {
//     console.error("Error fetching research projects:", {
//       message: error.message,
//       response: error.response ? error.response.data : "No response data",
//       status: error.response ? error.response.status : "No status",
//     });
//     throw error; // Rethrow the error if you want to handle it further up
//   }
// };


// get All Research Project
export const getAllResearchProjects = async () => {
  try {
      const response = await api.get("/oricfundedproject/getAll", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }); 
      return response.data;
  } catch (error) {
      throw error.response?.data || 'Failed to fetch research projects';
  }
};

// Approve project
export const approveProject = async (id) => {
  try {
    const response = await api.post(`/oricfundedproject/approval-requests/${id}`, {
      status: 'approved',
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Reject project
export const rejectProject = async (id) => {
  try {
    const response = await api.post(`/oricfundedproject/approval-requests/${id}`, {
      status: 'rejected',
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};



// Function to login user
export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
    
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// impersonate User
export const impersonateUser = async (id) => {
  try {
    const response = await api.post(`/auth/impersonate/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};





// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await api.post("/user/create", userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // toast.success("User Created Successfully")
    return response.data;
  } catch (error) {
    if (error.response) {
      // Extract message from error response
      const { message } = error.response.data;
      toast.error(message); // Show the specific error message from the backend
      throw new Error(message); // Throw the specific error for further handling
    } else {
      // Handle network or unexpected errors
      toast.error("Failed to create user. Please try again.");
      throw error; // Re-throw the original error
    }
  }
};

// API call to get all users with authorization header
export const getAllUsers = async () => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  try {
    const response = await api.get("user/allUsers", {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in Authorization header
      },
    });
    return response.data; // Return the list of users
  } catch (error) {
    throw error; // Rethrow error to handle in the component
  }
};

// Update user API call
export const updateUser = async (id, updatedData) => {
  try {
    const response = await api.put(`user/update/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Extract message from error response
      const { message } = error.response.data;
      toast.error(message); // Show the specific error message from the backend
      throw new Error(message); // Throw the specific error for further handling
    } else {
      // Handle network or unexpected errors
      toast.error("Failed to update user. Please try again.");
      throw error; // Re-throw the original error
    }
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`user/delete/${id}`,  {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update user");
  }
};

// // Research Portfolio

// Personal Information
// get Personal Information

// export const getProfile = async () => {
//   try {
//     const response = await api.get(`/membership/get`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching memberships:', error);
//     throw error;
//   }
// };

export const getProfile = async () => {
  try {
    const response = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // toast.success("Successfully get user profile")
    return response.data;
  } catch (error) {
    // console.error(
    //   "Error fetching profile data:",
    //   error.response ? error.response.data : error.message
    // );
    throw new Error("Error fetching profile");
  }
};


// create profile
export const createOrUpdateProfile = async (profileData) => {
  try {
    const response = await api.post('/user/profile', profileData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.error('Failed to create or update profile', error);
    throw error;
  }
};



// Create Membership
export const createMembership = async (description) => {
  try {
    const response = await api.post(
      `/membership/create`,
      { description },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // console.error("Error creating membership:", error);
    throw error;
  }
};

// get Memberhips
export const getMemberships = async () => {
  try {
    const response = await api.get(`/membership/get`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.error("Error fetching memberships:", error);
    throw error;
  }
};

// Create Honor And Awards
export const createHonors = async (payload, token) => {
  try {
    const response = await api.post(`/honors/create`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Failed to create or update honors"
    );
  }
};

// Get Honor And Awards
export const getHonors = async () => {
  try {
    const response = await api.get("/honors/gethonors", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // toast.success("Successfully get All Honors And Awards")
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch honors: " + error.message);
  }
};

// Update Honor And Awards
export const updateHonors = async (updatedHonors) => {
  try {
    const response = await api.put("/honors/update", updatedHonors, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update Honor And Awards: " + error.message);
  }
};

// Delete Honor And Awards
// export const deleteHonors = async () => {
//   try {
//     const response = await api.delete('/honors/delete', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error('Failed to update Honor And Awards: ' + error.message);
//   }
// };

export const deleteHonors = async (category) => {
  try {
    const response = await api.delete("/honors/delete", {
      data: { category },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update Honor And Awards: " + error.message);
  }
};

// export const createPublication = async (publications, targetRole, departmentId) => {
export const createPublication = async (publicationData) => {
  try {
    // const requestPayload = publications?.map(publicationData => ({
    //   targetRole,
    //   departmentId,
    //   ...publicationData,
    // }));

    // const response = await axios.post(`publications/create`, requestPayload, {
    const response = await api.post(`/publication/create`, publicationData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // console.log("Publication created:", response.data);
    return response;
  } catch (error) {
    // console.error("Error creating publication:", error);
    if (error.response) {
      // console.error("Error status:", error.response.status);
      // console.error("Error details:", error.response.data);
    }
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

// ViewAllPublications api
export const getAllPublications = async () => {
  try {
    const response = await api.get("/publication/getAllPublications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // const response = await api.get("/publication/getAllPublications");
    return response.data;
  } catch (error) {
    // console.log(
    //   "Error While Fetching Research Publications",
    //   error.response ? error.response.data : error.message
    // );
    throw new Error(
      error.response?.data?.message || "Error fetching publications"
    );
  }
};

// Delete Publication api

export const deletePublication = async (id) => {
  try {
    // const response = await axios.delete(`/api/publications/${id}`);
    const response = await api.delete(`/publication/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.error("Error deleting publication:", error);
    throw error;
  }
};

// Update Publication api

// export const updatePublication = async (id, updateData) => {
//   try {
//     const response = await api.put(`/publication/update/${id}`, updateData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     console.log("Publication Updated", response.data)
//     return response.data;
//   } catch (error) {
//     console.error("Error updating publication:", error);
//     throw error;
//   }
// };

// Update Publication api

// export const updatePublication = async (id, updateData) => {
//   console.log("Update data:", updateData); // Debugging statement

//   try {
//     const response = await api.put(`/publication/update/${id}`, updateData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     console.log("Publication updated response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error updating publication:",
//       error.response ? error.response.data : error.message
//     );
//     throw error;
//   }
// };

export const updatePublication = async (id, updateData) => {
  try {
    const response = await api.put(`/publication/update/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log("Publication updated Successfully", response.data);
    // console.log("Publication id", id);

    return response.data;
  } catch (error) {
    // console.error("Error updating publication:", error);
    throw error;
  }
};

// Create Intellectual Property
export const createIntellectualProperty = async (intellectualPropertyData) => {
  try {
    const response = await api.post(
      "/intellectualproperty/create",
      intellectualPropertyData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log("Intellectual Property Created Successfully", response.data);
    return response.data;
  } catch (error) {
    // console.log(
    //   "Error in Creating Intellectual Property",
    //   error.response ? error.response.data : error.message
    // );
    throw new Error(
      error.response
        ? error.response.data.error
        : "Failed to create intellectual property"
    );
  }
};

// View All Intellectual Property
export const getAllIntellectualProperty = async () => {
  try {
    const response = await api.get("/intellectualproperty/getallIp", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log("Successfully fetched all intellectual properties");
    return response.data;
  } catch (error) {
    // console.log(
    //   "Error While Fetching Intellectual Properties",
    //   error.response ? error.response.data : error.message
    // );
    throw new Error(
      error.response
        ? error.response.data.error
        : "Failed to Fetch All Intellectual Properties"
    );
  }
};

// Delete Intellectual Property
export const deleteIntellectualProperty = async (id) => {
  try {
    const response = await api.delete(`/intellectualproperty/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // console.log("Intellectual Property Deleted Successfully");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to delete intellectual property"
    );
  }
};

// Update Intellectual Property
export const updateIntellectualProperty = async (id, updateData) => {
  try {
    const response = await api.put(
      `/intellectualproperty/update/${id}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log("Intellectual Property Successfully Updated", response.data);
    // console.log("Intel Prop Id", id);
  } catch (error) {
    // console.error(
    //   "Error updating Intellectual Property:",
    //   error.response ? error.response.data : error.message
    // );
    throw error;
  }
};

export const getAllDepartmentNames = async () => {
  const response = await api.get(`/department/get`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.map(department => department.name);
};


export const createOricFunded = async (proposalCoverData, researchProjectData, facilitiesAndFundingData, justificationForBudgetData, estimatedBudgetData) => {
// export const createOricFunded = async (formData) => {
  try {
    // Combine all the data into one object
    const requestData = {
      proposalCoverData,
      researchProjectData,
      facilitiesAndFundingData,
      justificationForBudgetData,
      estimatedBudgetData,
    };

    const response = await api.post(
      "/oricfundedproject/create",
      // formData,
      requestData, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log("Response Data", response);
    return response.data;
  } catch (error) {
    // console.error("Error creating ORIC Funded Project:", error);
    throw error;
  }
};


export const fetchORICProjects = async () => {
  try {
    const response = await api.get("/oricfundedproject/getAll", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log("Successfully fetched all ORIC Funded Project");
    return response.data;
  } catch (error) {
    // console.log(
    //   "Error While Fetching ORIC Funded Project",
    //   error.response ? error.response.data : error.message
    // );
    throw new Error(
      error.response
        ? error.response.data.error
        : "Failed to Fetch All ORIC Funded Project"
    );
  }
};

export const fetchORICProjectsById = async (id) => {
  try {

    const response = await api.get(`/oricfundedproject/oricby/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    
    // console.log(response.data)
    return  response.data;
  } catch (error) {
    // console.error("Error fetching project by id", error);
    throw error
  }
}





export const fetchAllNationalGrants = async () => {
  try {
    const response = await api.get("/nationalGrant/getAll", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log("Successfully fetched all International/National Grants");
    return response.data;
  } catch (error) {
    // console.log(
    //   "Error While Fetching International/National Grants ",
    //   error.response ? error.response.data : error.message
    // );
    throw new Error(
      error.response
        ? error.response.data.error
        : "Failed to Fetch All International/National Grants "
    );
  }
};


export const fetchAllNationalGrantsbyId = async (id) => {
  try {

    const response = await api.get(`/nationalGrant/getBy/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    
    // console.log(response.data)
    return  response.data;
  } catch (error) {
    // console.error("Error fetching project by id", error);
    throw error
  }
}




// view research grant
export const getCompletedResearchProjects = async () => {
  const response = await api.get('/completedProjects/getAll', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  }); 
  return response.data;
};

export const getFundedProjects = async () => {
  const response = await api.get('/fundedProjects/', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  }); 
  return response.data;
};


// create research grant

// Function to create a project in the Completed section
export const createCompletedProject = async (projectData) => {
  try {
    const response = await api.post(`/completedProjects/create`, projectData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    // console.log("Response data", response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to create completed project");
  }
};


export const createFundedProject = async (projectData) => {
  try {
    const response = await api.post(`/fundedProjects/`, projectData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    // console.log("Response data", response.data)
    return response.data; 
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to create funded project");
  }
};
