import React from 'react';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const username = localStorage.getItem('username'); 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <main className="bg-white p-8 rounded-lg shadow-lg text-center  w-full sm:w-3/4 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to Admin Panel, {username}!
        </h2>

        <p className="text-gray-600 text-lg">
          Manage your dashboard efficiently and make updates as needed.
        </p>

        <div className="space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-gray-700 text-lg mb-2">
              Ready to add a new employee? Click below:
            </p>
            <Link
              to="/employees/create"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 inline-block"
            >
              Create Employee
            </Link>
          </div>

          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-gray-700 text-lg mb-2">
              Want to view the list of employees? Click below:
            </p>
            <Link
              to="/employees"
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300 inline-block"
            >
              Employee List
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
