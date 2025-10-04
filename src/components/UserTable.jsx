import React, { useContext } from "react";
import { CreateShowUsersContext } from "../context/UserContext.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import UserForm from "./UserForm.jsx";

const UsersTable = () => {
  const {
    users,
    deleteUser,
    openFormForEdit,
    openFormForNew,
    showForm,
    filteredUsers,
    search,
    setSearch,
  } = useContext(CreateShowUsersContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Employ Management</h1>

      {showForm ? (
        <UserForm />
      ) : (
        <>
          <div className="flex justify-between w-auto h-14">
            <form>
              <input
                className="p-2 rounded border border-black w-[800px]"
                type="text"
                placeholder="Search by First Name, Last Name, or Email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <button
              onClick={openFormForNew}
              className="mb-4 px-4 py-2 italic font-bold bg-blue-600  text-white rounded hover:bg-blue-700"
            >
              + Add Employ
            </button>
          </div>

          <div className="overflow-x-auto flex justify-end">
            <table className="table-auto w-[1000px] border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">First Name</th>
                  <th className="border px-4 py-2">Last Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{user.id}</td>
                      <td className="border px-4 py-2">{user.firstName}</td>
                      <td className="border px-4 py-2">{user.lastName}</td>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2 flex gap-2 justify-center">
                        <button
                          onClick={() => openFormForEdit(user)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-gray-500 italic"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersTable;
