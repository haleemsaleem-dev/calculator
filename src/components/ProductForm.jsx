import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreateShowProductsContext } from "../context/ProductContext";

const ProductForm = () => {
  const { addProduct, updateProduct, selectedProduct, closeForm } = useContext(
    CreateShowProductsContext
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
  });

  useEffect(() => {
    if (selectedProduct) {
      reset({
        title: selectedProduct.title || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || "",
      });
    } else {
      reset({ title: "", description: "", price: "" });
    }
  }, [selectedProduct, reset]);

  const onSubmit = async (data) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, data);
      } else {
        await addProduct(data);
      }
      closeForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-xl space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {selectedProduct ? "Edit Product" : "Add Product"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: "Title is required" })}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <input
        type="number"
        placeholder="Price"
        step="any"
        {...register("price", {
          required: "Price is required",
        })}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition"
      />

      {errors.price && (
        <p className="text-red-500 text-sm">{errors.price.message}</p>
      )}

      <textarea
        placeholder="Description"
        {...register("description", { required: "Description is required" })}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition"
      ></textarea>
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}

      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white rounded-md shadow-lg hover:bg-green-700 transition transform hover:scale-105"
        >
          {selectedProduct ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={closeForm}
          className="px-6 py-3 bg-gray-500 text-white rounded-md shadow-lg hover:bg-gray-600 transition transform hover:scale-105"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
