import React, { useState, useEffect } from "react";
import { getEmployees, deleteEmployee, editEmployee } from "../services/api";
import { FaSortUp, FaSortDown, FaSort, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";  
import toast from "react-hot-toast";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const employeesPerPage = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getEmployees();
        setEmployees(data);
      } catch (error) {
        toast.error("Failed to fetch employees.");
      }
    };

    fetchEmployees();
  }, []);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortedEmployees = employees.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const filteredEmployees = sortedEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((emp) => emp._id !== id));
      toast.success("Employee deleted successfully.");
    } catch (error) {
      toast.error("Error deleting employee.");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await editEmployee(id, { status: !currentStatus });
      setEmployees(
        employees.map((emp) =>
          emp._id === id ? { ...emp, status: !currentStatus } : emp
        )
      );
      toast.success(`Employee status updated to ${!currentStatus ? 'Active' : 'Inactive'}.`);
    } catch (error) {
      toast.error("Error updating employee status.");
    }
  };

  const renderSortIcon = (field) => {
    if (sortField === field) {
      return sortOrder === "asc" ? (
        <FaSortUp className="inline-block ml-1" />
      ) : (
        <FaSortDown className="inline-block ml-1" />
      );
    } else {
      return <FaSort className="inline-block ml-1" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="flex flex-col justify-between items-start sm:items-center sm:flex-row gap-2 mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Employee List</h1>
        <input
          type="text"
          placeholder="Search Employees"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      {filteredEmployees.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No employees found. Please add employees.</p>
          <Link
            to="/employees/create"
            className="text-blue-500 hover:text-blue-700 hover:font-medium transition duration-300 inline-block"
          >
            Create Employee
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th
                    className="px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    ID {renderSortIcon("id")}
                  </th>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th
                    className="px-4 py-2 text-left cursor-pointer whitespace-nowrap"
                    onClick={() => handleSort("name")}
                  >
                    Name {renderSortIcon("name")}
                  </th>
                  <th
                    className="px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort("email")}
                  >
                    Email {renderSortIcon("email")}
                  </th>
                  <th
                    className="px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort("mobile")}
                  >
                    Mobile {renderSortIcon("mobile")}
                  </th>
                  <th
                    className="px-4 py-2 text-left cursor-pointer whitespace-nowrap"
                    onClick={() => handleSort("designation")}
                  >
                    Designation {renderSortIcon("designation")}
                  </th>
                  <th className="px-4 py-2 text-left ">Status</th>
                  <th className="px-4 py-2 text-left ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-4 py-2">{employee.id}</td>
                    <td className="px-4 py-2">
                      <img
                        src={`http://localhost:5000/${employee.image}`}
                        alt={employee.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">{employee.name}</td>
                    <td className="px-4 py-2">{employee.email}</td>
                    <td className="px-4 py-2">{employee.mobile}</td>
                    <td className="px-4 py-2">{employee.designation}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() =>
                          handleToggleStatus(employee._id, employee.status)
                        }
                        className={`p-2 rounded ${
                          employee.status
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {employee.status ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td>
                      <div className="space-x-2 flex items-center justify-center ">
                        <button
                          onClick={() =>
                            (window.location = `/edit-employee/${employee._id}`)
                          }
                          className="p-2  bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(employee._id)}
                          className="p-2  bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center">
            {Array.from(
              { length: Math.ceil(filteredEmployees.length / employeesPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
