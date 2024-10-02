import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import Sidebar from "../Sidebar/Sidebar";
import Modal from "react-modal";
import "./usermanagement.css";
import NavBar from "../shared-components/navbar/NavBar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  createUser,
  getAllUsers,
  updateUser,
  impersonateUser,
  getAllDepartmentNames
} from "../../api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const UserManagement = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    departmentName: "",
  });
  const [currentUserRole, setCurrentUserRole] = useState(""); 
  const [emailError, setEmailError] = useState("");
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);

  const fetchDepartmentsFromServer = async () => {
    try {
      const fetchedDepartments = await getAllDepartmentNames();
      setDepartments(fetchedDepartments); // Set fetched departments
    } catch (error) {
      // console.error("Error fetching departments:", error);
    }
  };


  const fetchUsersFromServer = async () => {
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      // console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validRoles = ["admin", "manager", "dean", "chairperson", "researcher"];
    if (!validRoles.includes(data.role.toLowerCase())) {
      toast.error("Role must be one of: admin, manager, dean, chairperson, researcher.");
      return;
    }
    // } else {
    //   toast.error("");
    // }

    if (!validateEmail(data.email)) {
      toast.error("Invalid email address.");
      // setEmailError("Invalid email address.");
      return;
    }

    try {
      if (editMode && selectedUserId) {
        await updateUser(selectedUserId, data);
        toast.success("User updated Successfully");
      } else {
        await createUser(data);
        toast.success("User Created Successfully");
      }

      closeModal();
      fetchUsersFromServer();
    } catch (error) {
      // handleError(error);
    }
  };

  const validateEmail = (email) => {
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Updated regex to allow domains like .com, .edu.pk, .gov.uk, etc.
      // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
      // return emailPattern.test(email);
        // Updated regex to only allow valid domain extensions (2-6 lowercase letters)
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}(\.[a-z]{2,3})?$/i;
      return emailPattern.test(email);
  };

  // const handleError = (error) => {
  //   toast.error("Server Error, Please try again later");
  //   setError(error.message || "Server Error, Please try again later");
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openModal = () => {
    setModalIsOpen(true);
    setEditMode(false);
  };

  const handleImpersonate = async (id) => {
    try {
      const response = await impersonateUser(id);

      let roleMessage = "";
      if (response.role === "researcher") {
        roleMessage = "You are now logged in as a Researcher";
      } else if (response.role === "admin") {
        roleMessage = "You are now logged in as an Admin";
      } else if (response.role === "manager") {
        roleMessage = "You are now logged in as a Manager";
      } else {
        roleMessage = `You are now logged in as ${response.role}`;
      }

      toast.success(roleMessage);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to impersonate user: " + error.message);
    }
  };

  const openEditModal = (user) => {
    setData({
      name: user.name,
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
      departmentName: user.departmentName,
    });
    setSelectedUserId(user.id);
    setModalIsOpen(true);
    setEditMode(true);
  };

  const closeModal = () => {
    resetForm();
    setModalIsOpen(false);
    setEmailError("");
  };

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      username: "",
      password: "",
      role: "",
      departmentName: "",
    });
    setSelectedUserId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "departmentName") {
      const filtered = departments.filter((dept) =>
        dept.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDepartments(filtered);
    }

    if (name === "email" && emailError) {
      setEmailError("");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        const role = decodedToken.role; // Extract the role from the token
        setCurrentUserRole(role); // Set the role in the state
      } catch (error) {
        // console.error("Failed to decode token:", error);
      }
    }
    fetchUsersFromServer();
    fetchDepartmentsFromServer(); 
  }, []);


  return (
    <>
      <div className="whole-page-container">
        <Sidebar />
        <div className="user-management">
          <div className="navbar-div">
            <NavBar />
          </div>
          <div className="user-management-card">
            <h4>Users and Roles</h4>
            <button
              className="create-user-btn"
              onClick={openModal}
            >
              ADD NEW USER
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel={editMode ? "Edit User Modal" : "Create User Modal"}
              className="usermanagement-modal"
              overlayClassName="usermanagement-overlay"
            >
              <h2>{editMode ? "Edit User" : "Create User"}</h2>
              <form className="create-user" onSubmit={handleSubmit}>
                <div className="create-user-left">
                  <p className="title">User Information</p>
                  <div className="multi-fields">
                    <input
                      required
                      name="name"
                      onChange={handleInputChange}
                      value={data.name}
                      type="text"
                      placeholder="Name"
                    />
                    <input
                      required
                      name="username"
                      onChange={handleInputChange}
                      value={data.username}
                      type="text"
                      placeholder="Username"
                    />
                    <input
                      required
                      name="role"
                      onChange={handleInputChange}
                      value={data.role}
                      type="text"
                      placeholder="Role"
                    />
                    {/* Department dropdown with search */}
                    <input
                      required
                      name="departmentName"
                      onChange={handleInputChange}
                      value={data.departmentName}
                      type="text"
                      placeholder="Department"
                    />
                    {filteredDepartments.length > 0 && (
                      <ul className="department-dropdown">
                        {filteredDepartments.slice(0, 3).map((dept, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setData((prevData) => ({ ...prevData, departmentName: dept }));
                              setFilteredDepartments([]);
                            }}
                          >
                            {dept}
                          </li>
                        ))}
                        {filteredDepartments.length > 3 && (
                          <div className="scrollable-dropdown">
                            {filteredDepartments.slice(3).map((dept, index) => (
                              <li
                                key={index + 3}
                                onClick={() => {
                                  setData((prevData) => ({ ...prevData, departmentName: dept }));
                                  setFilteredDepartments([]);
                                }}
                              >
                                {dept}
                              </li>
                            ))}
                          </div>
                        )}
                      </ul>
                    )}

                    <input
                      required
                      name="email"
                      onChange={handleInputChange}
                      value={data.email}
                      type="email"
                      placeholder="Email Address"
                    />
                    {emailError && <p className="error">{emailError}</p>}
                    <div className="password-container">
                      <input
                        required
                        name="password"
                        onChange={handleInputChange}
                        value={data.password}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                      />
                      <span
                        className="eye-icon"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="user-modal-submit-button" type="submit">
                  {editMode ? "UPDATE" : "Submit"}
                </button>
                {error && <p className="error">{error}</p>}
              </form>
            </Modal>
            <button>SEARCH</button>

            <div className="usermanagement-table-container">
              <h5>Current Users</h5>
              <table className="user-table">
                <thead>
                  <tr className="list-table-format title">
                    <th>Name</th>
                    <th>Username</th>
                    <th>User Role</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="list-table-format">
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td>{user?.department?.name}</td>
                      <td>{user.email}</td>
                      <td className="buttonz">
                        <button
                          // type="button"
                          className="edit_create-user-btn"
                          onClick={() => openEditModal(user)}
                        >
                          EDIT
                        </button>

                       
                           {/* Conditionally render "LOGIN AS" button based on current user role */}
                           {(currentUserRole === "admin" || currentUserRole === "manager") && (
                          <button
                            className="edit-create-user-btn"
                            onClick={() => handleImpersonate(user.id)}
                          >
                            LOGIN
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="juw-copyright">
            <p>© 2024, all rights reserved by Jinnah University for Women.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
