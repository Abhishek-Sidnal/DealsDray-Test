import React, { useState } from "react";
import { addEmployee } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "M",
    course: [],
    image: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobile, designation, gender, course, image } =
      formData;

    if (
      !name ||
      !email ||
      !mobile ||
      !designation ||
      !gender ||
      course.length === 0 ||
      !image
    ) {
      toast.error("Please fill in all the details");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("designation", designation);
    data.append("gender", gender);
    data.append("course", course);
    if (image) data.append("image", image);

    try {
      await addEmployee(data);
      toast.success("Employee added successfully!");
      navigate("/employees");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error adding employee. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Create Employee
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile No
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="mt-2 flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={formData.gender === "M"}
                  onChange={handleInputChange}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-sm text-gray-600">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={formData.gender === "F"}
                  onChange={handleInputChange}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-sm text-gray-600">Female</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course
            </label>
            <div className="mt-2 flex flex-wrap gap-4">
              {["MCA", "BCA", "BSC"].map((course) => (
                <label key={course} className="flex items-center">
                  <input
                    type="checkbox"
                    name="course"
                    value={course}
                    checked={formData.course.includes(course)}
                    onChange={(e) => {
                      const updatedCourses = formData.course.includes(course)
                        ? formData.course.filter((c) => c !== course)
                        : [...formData.course, course];
                      setFormData({ ...formData, course: updatedCourses });
                    }}
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">{course}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image Upload
            </label>
            <input
              type="file"
              name="image"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              accept=".jpg,.png"
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
