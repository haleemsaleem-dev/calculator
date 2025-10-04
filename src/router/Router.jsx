import React from "react";
import { Routes, Route } from "react-router-dom";
import UserManage from "../pages/UserManage";
import ProductManage from "../pages/ProductManage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<UserManage />} />
      <Route path="/Products" element={<ProductManage />} />
    </Routes>
  );
};

export default AppRouter;
