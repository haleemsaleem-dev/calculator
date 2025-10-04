import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-700 text-white h-screen p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center border-b border-gray-600 pb-3">
        Sidebar
      </h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Employee
          </Link>
        </li>
        <li>
          <Link
            to="/Products"
            className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
