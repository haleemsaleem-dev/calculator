import React from "react";

import Sidebar from "../components/Sidebar";
import UserTable from "../components/UserTable";
const UserManage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-gray-50">
        <UserTable />
      </div>
    </div>
  );
};

export default UserManage;
