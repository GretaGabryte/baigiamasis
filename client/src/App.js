import React, { useEffect, useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import UserTable from "./components/UserTable";
import Login from "./components/Login";
import { getUsers, createUser, updateUser, deleteUser } from "./services/api";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await getUsers(token);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    if (loggedIn) fetchUsers();
  }, [loggedIn]);

  const handleRegister = async (user) => {
    try {
      if (editingUser) {
        await updateUser(editingUser._id, user);
        setEditingUser(null);
      } else {
        await createUser(user);
      }
      fetchUsers();
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const handleUpdate = (user) => {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="container">
      <h1>Event Registration</h1>
      <RegistrationForm onRegister={handleRegister} user={editingUser} />
      <hr />
      <UserTable
        users={users}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
