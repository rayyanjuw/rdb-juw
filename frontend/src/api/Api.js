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
export const updatePublication = async (id, updateData) => {
  console.log("Updating publication with ID:", id); // Debugging statement
  console.log("Update data:", updateData); // Debugging statement

  try {
    const response = await api.put(`/publication/update/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Publication updated response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating publication:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Intellectual Property
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
    const response = await api.put(`/intellectualproperty/update/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Intellectual Property Successfully Updated", response.data);
  } catch (error) {
    console.error("Error updating Intellectual Property:", error.response ? error.response.data : error.message);
    throw error;
  }
};
