import axios from "axios";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure to replace with your actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to attach the token (if available) to every request
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });

// Function to login user
export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
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
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
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
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching profile data:",
      error.response ? error.response.data : error.message
    );
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
    console.error('Failed to create or update profile', error);
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
    console.error("Error creating membership:", error);
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
    console.error("Error fetching memberships:", error);
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

    console.log("Publication created:", response.data);
    return response;
  } catch (error) {
    console.error("Error creating publication:", error);
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error details:", error.response.data);
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
    console.log(
      "Error While Fetching Research Publications",
      error.response ? error.response.data : error.message
    );
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
    console.error("Error deleting publication:", error);
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
    console.log("Publication updated Successfully", response.data);
    console.log("Publication id", id);

    return response.data;
  } catch (error) {
    console.error("Error updating publication:", error);
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
    console.log("Intellectual Property Created Successfully", response.data);
    return response.data;
  } catch (error) {
    console.log(
      "Error in Creating Intellectual Property",
      error.response ? error.response.data : error.message
    );
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
    console.log("Successfully fetched all intellectual properties");
    return response.data;
  } catch (error) {
    console.log(
      "Error While Fetching Intellectual Properties",
      error.response ? error.response.data : error.message
    );
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

    console.log("Intellectual Property Deleted Successfully");
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
    console.log("Intellectual Property Successfully Updated", response.data);
    console.log("Intel Prop Id", id);
  } catch (error) {
    console.error(
      "Error updating Intellectual Property:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// ORIC Funded Project

// Create ORIC Funded Project
// export const createOricFunded = async (data) => {
//   try {
//     const response = await api.post("/oricfundedproject/create", data, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     console.log("Response Data", response)
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response ? error.response.data.error : "Network error"
//     );
//   }
// };

// export const createOricFunded = async (proposalCoverData, researchProjectData, facilitiesAndFundingData, justificationForBudgetData, estimatedBudgetData) => {
//   try {
//     const response = await api.post(
//       "/oricfundedproject/create",
//       proposalCoverData,
//       researchProjectData,
//       facilitiesAndFundingData,
//       justificationForBudgetData,
//       estimatedBudgetData,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     console.log("Response Data", response)
//     return response.data; 
//   } catch (error) {
//     console.error("Error creating ORIC Funded Project:", error);
//     throw error;
//   }
// };


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
    console.log("Response Data", response);
    return response.data;
  } catch (error) {
    console.error("Error creating ORIC Funded Project:", error);
    throw error;
  }
};