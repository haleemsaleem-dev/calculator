import React, { useContext } from "react";
import { CreateShowProductsContext } from "../context/ProductContext";
import ProductForm from "./ProductForm";

const ProductTable = () => {
  const {
    deleteProduct,
    openFormForEdit,
    openFormForNew,
    showForm,
    filteredProducts,
    search,
    setSearch,
  } = useContext(CreateShowProductsContext);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Product Management
      </h1>
      {showForm ? (
        <ProductForm />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <input
              className="p-3 border border-gray-300 rounded-full w-full sm:w-[800px] mb-4 sm:mb-0 focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              placeholder="Search by Title, Description, or Price"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={openFormForNew}
              className="px-6 py-3 italic font-bold bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              + Add Product
            </button>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-3 text-left">ID</th>
                  <th className="border px-4 py-3 text-left">Title</th>
                  <th className="border px-4 py-3 text-left">Price</th>
                  <th className="border px-4 py-3 text-left">Description</th>
                  <th className="border px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-100 transition-colors duration-200"
                    >
                      <td className="border px-4 py-3">{product.id}</td>
                      <td className="border px-4 py-3">{product.title}</td>
                      <td className="border px-4 py-3">${product.price}</td>
                      <td className="border px-4 py-3 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                        {product.description}
                      </td>
                      <td className="border px-4 py-3 flex gap-2 justify-center items-center">
                        <button
                          onClick={() => openFormForEdit(product)}
                          className="text-blue-600 hover:text-blue-800 transition transform hover:scale-110"
                          aria-label={`Edit product ${product.title}`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM15.414 5l-2 2L15 9.586l2-2L15.414 5z" />
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3a1 1 0 112 0v3a4 4 0 01-4 4H4a4 4 0 01-4-4V6a4 4 0 014-4h3a1 1 0 110 2H4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800 transition transform hover:scale-110"
                          aria-label={`Delete product ${product.title}`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No products found
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
export default ProductTable;
