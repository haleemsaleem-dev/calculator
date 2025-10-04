import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreateShowUsersContext } from "../context/UserContext.jsx";

const UserForm = () => {
  const { addUser, updateUser, selectedUser, closeForm } = useContext(
    CreateShowUsersContext
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  useEffect(() => {
    if (selectedUser) {
      reset(selectedUser);
    } else {
      reset({ firstName: "", lastName: "", email: "" });
    }
  }, [selectedUser, reset]);

  const onSubmit = async (data) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);
      } else {
        await addUser(data);
      }
      closeForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">
        {selectedUser ? "Edit User" : "Add User"}
      </h2>

      <input
        type="text"
        placeholder="First Name"
        {...register("firstName", { required: "First Name is required" })}
        className="w-full mb-1 p-2 border rounded"
      />
      {errors.firstName && (
        <p className="text-red-500 text-sm mb-2">{errors.firstName.message}</p>
      )}

      <input
        type="text"
        placeholder="Last Name"
        {...register("lastName", { required: "Last Name is required" })}
        className="w-full mb-1 p-2 border rounded"
      />
      {errors.lastName && (
        <p className="text-red-500 text-sm mb-2">{errors.lastName.message}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
        })}
        className="w-full mb-1 p-2 border rounded"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
      )}

      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {selectedUser ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={closeForm}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
