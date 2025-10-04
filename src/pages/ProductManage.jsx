import React from "react";
import Sidebar from "../components/Sidebar";
import ProductTable from "../components/ProductTable";

const ProductManage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductManage;
