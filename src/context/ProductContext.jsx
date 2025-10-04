import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CreateShowProductsContext = createContext();

export const CreateShowProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const addProduct = async (data) => {
    try {
      const res = await axios.post("https://dummyjson.com/products/add", data, {
        headers: { "Content-Type": "application/json" },
      });
      const newProduct = { ...res.data, id: Date.now() };
      setProducts((prev) => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      console.error("Error adding product:", err);
      throw new Error("Submission failed!");
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `https://dummyjson.com/products/${id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...res.data } : product
        )
      );
      return res.data;
    } catch (err) {
      console.error("Error updating product:", err);
      throw new Error("Update failed!");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      throw new Error("Delete failed!");
    }
  };

  const openFormForNew = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const openFormForEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const closeForm = () => {
    setSelectedProduct(null);
    setShowForm(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const searchLower = search.toLowerCase();
    const matchesTitle = product.title.toLowerCase().includes(searchLower);
    const matchesDescription = product.description
      .toLowerCase()
      .includes(searchLower);
    const matchesCategory = product.category
      ? product.category.toLowerCase().includes(searchLower)
      : false;
    const matchesPrice = product.price
      ? String(product.price).includes(searchLower)
      : false;
    return (
      matchesTitle || matchesDescription || matchesCategory || matchesPrice
    );
  });

  return (
    <CreateShowProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        selectedProduct,
        showForm,
        openFormForNew,
        openFormForEdit,
        closeForm,
        filteredProducts,
        search,
        setSearch,
      }}
    >
      {children}
    </CreateShowProductsContext.Provider>
  );
};
