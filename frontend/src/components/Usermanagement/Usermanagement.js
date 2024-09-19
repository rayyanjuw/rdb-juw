import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Modal from "react-modal";
import "./usermanagement.css";
import NavBar from "../shared-components/navbar/NavBar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUser, getAllUsers, updateUser } from "../../api/Api";

const UserManagement = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    departmentName: "",
  });
  const [emailError, setEmailError] = useState("");
  const [users, setUsers] = useState([]); 
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); 
  const [editMode, setEditMode] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);


  const fetchUsersFromServer = async () => {
    try {
      const fetchedUsers = await getAllUsers(); 
      setUsers(fetchedUsers); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(data.email)) {
      setEmailError("Invalid email address.");
      return; 
    }
  
    try {
      if (editMode && selectedUserId) {
        await updateUser(selectedUserId, data);
        console.log("User updated", data);
      } else {
        await createUser(data);
        console.log("User created", data);
      }
  
      closeModal();
      fetchUsersFromServer(); 
    } catch (error) {
      handleError(error); 
    }
  };


  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };


  const handleError = (error) => {
    setError(error.message || "Server Error, Please try again later");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openModal = () => {
    setModalIsOpen(true);
    setEditMode(false);
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
    if (name === "email" && emailError) {
      setEmailError("");
    }
  };


  useEffect(() => {
    fetchUsersFromServer();
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
              type="button"
              className="create-user-btn"
              onClick={openModal}
            >
              ADD NEW USER
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel={editMode ? "Edit User Modal" : "Create User Modal"}
              className="Modal"
              overlayClassName="Overlay"
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
                    <input
                      required
                      name="departmentName"
                      onChange={handleInputChange}
                      value={data.departmentName}
                      type="text"
                      placeholder="Department"
                    />
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
                <button className="submit-button" type="submit">
                  {editMode ? "UPDATE" : "Submit"}
                </button>
                {error && <p className="error">{error}</p>}
              </form>
            </Modal>
            <button>SEARCH</button>
            <h5>Current Users</h5>
            <div className="usermanagement-table-container">
              <div className="list add flex-col">
                <div className="list-table">
                  <div className="list-table-format title">
                    <b>Name</b>
                    <b>Username</b>
                    <b>User Role</b>
                    <b>Department</b>
                    <b>Email</b>
                    <b>Actions</b>
                  </div>
                  {users.map((user, index) => (
                    <div key={index} className="list-table-format">
                      <p>{user.name}</p>
                      <p>{user.username}</p>
                      <p>{user.role}</p>
                      <p>{user.departmentName}</p>
                      <p>{user.email}</p>
                      <div className="Edit-Modal">
                        <button
                          type="button"
                          className="create-user-btn"
                          onClick={() => openEditModal(user)}
                        >
                          EDIT
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
