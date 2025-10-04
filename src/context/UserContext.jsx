import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CreateShowUsersContext = createContext();

export const CreateShowUsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  // const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    // setLoading(true);
    try {
      const res = await axios.get("https://dummyjson.com/users");
      setUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      // setLoading(false);
    }
  };

  const addUser = async (data) => {
    try {
      const res = await axios.post("https://dummyjson.com/users/add", data, {
        headers: { "Content-Type": "application/json" },
      });

      const newUser = { ...res.data, id: Date.now() };
      setUsers((prev) => [newUser, ...prev]);

      return newUser;
    } catch (err) {
      console.error("Error adding user:", err);
      throw new Error("Submission failed!");
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `https://dummyjson.com/users/${id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...res.data } : user))
      );

      return res.data;
    } catch (err) {
      console.error("Error updating user:", err);
      throw new Error("Update failed!");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/users/${id}`);

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      throw new Error("Delete failed!");
    }
  };

  const openFormForNew = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const openFormForEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const closeForm = () => {
    setSelectedUser(null);
    setShowForm(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

   const filteredUsers = users.filter((user) => {
    const searchLower = search.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <CreateShowUsersContext.Provider
      value={{ users, addUser, updateUser, deleteUser, selectedUser,
        showForm,
        openFormForNew,
        openFormForEdit,
        closeForm,filteredUsers, search,      
      setSearch }}
    >
      {children}
    </CreateShowUsersContext.Provider>
  );
};
