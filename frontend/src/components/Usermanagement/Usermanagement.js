// updated
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
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
  getAllDepartmentNames,
} from "../../api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

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
  const [searchTerm, setSearchTerm] = useState(""); // New search term state

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
    const validRoles = [
      "admin",
      "manager",
      "dean",
      "chairperson",
      "researcher",
    ];
    if (!validRoles.includes(data.role.toLowerCase())) {
      toast.error(
        "Role must be one of: admin, manager, dean, chairperson, researcher."
      );
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
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}(\.[a-z]{2,3})?$/i;
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
      departmentName: user?.department?.name,
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

  const Roles = ["manager", "dean", "chairperson", "researcher"];

  const roleHierarchy = {
    admin: 1,
    manager: 2,
    dean: 3,
    chairperson: 4,
    researcher: 5,
  };

  // Filter roles based on the current user's role
  const getFilteredRoles = (currentUserRole) => {
    const currentRoleLevel = roleHierarchy[currentUserRole.toLowerCase()] || 5;

    // Exclude the user's current role from the dropdown
    return Roles.filter(
      (role) =>
        roleHierarchy[role] >= currentRoleLevel && role !== currentUserRole
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        setCurrentUserRole(role);
      } catch (error) {
        // console.error("Failed to decode token:", error);
      }
    }
    fetchUsersFromServer();
    fetchDepartmentsFromServer();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(searchLower) ||
      user.username.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="whole-page-container">
        <Sidebar />
        <div className="user-management">
          <div className="navbar-div">
            <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchplaceholder="Search users .." />
          </div>
          <div className="user-management-card">
            <h4>Users and Roles</h4>
            <div className="d-flex align-items-center justify-content-between w-100">
              <button className="create-user-btn" onClick={openModal}>
                ADD NEW USER
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel={
                  editMode ? "Edit User Modal" : "Create User Modal"
                }
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

                      <div className="role-container">
                        <select
                          required
                          name="role"
                          onChange={handleInputChange}
                          value={data.role}
                        >
                          <option value="" disabled>
                            Select Role
                          </option>
                          {getFilteredRoles(currentUserRole).map(
                            (role, index) => (
                              <option key={index} value={role}>
                                {role}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div className="department-container">
                        <select
                          required
                          name="departmentName"
                          onChange={handleInputChange}
                          value={data.departmentName}
                        >
                          <option value="" disabled>
                            Select Department
                          </option>
                          {departments.map((dept, index) => (
                            <option key={index} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>

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
              {/* <div className="d-flex align-items-center justify-content-between">
                <div className="searchbar m-2">
                  <input
                    type="text"
                    placeholder="Search by Email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <IoIosSearch />
                </div>
              </div> */}
            </div>
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
                   {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
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
                        {(currentUserRole === "admin" ||
                          currentUserRole === "manager") && (
                          <button
                            className="edit-create-user-btn"
                            onClick={() => handleImpersonate(user.id)}
                          >
                            LOGIN
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) :(
                  <tr>
                  <td colSpan="6" className="not-found-message">
                      User Not Found
                  </td>
              </tr>
                
              )}

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
