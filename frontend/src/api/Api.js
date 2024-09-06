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
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
      });
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user');
  }
};


export const ResearchPublication = async () => {
  try {
    const response = await api.post("publication/create")
  } catch (error) {
    
  }
}


