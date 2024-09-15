import React, { useEffect, useState } from "react";
import axios from "axios";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data } = await axios.get("/api/employees", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>
            {emp.name} - {emp.email} - {emp.mobile} - {emp.designation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employee;
