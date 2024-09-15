import React, { useState, useEffect } from "react";
import { getEmployeeById, editEmployee } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "M",
    course: [],
    image: null,
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await getEmployeeById(id);
        setFormData({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          designation: data.designation,
          gender: data.gender,
          course: data.course,
          image: data.image,
        });
      } catch (error) {
        toast.error("Error fetching employee details");
      }
    };

    fetchEmployee();
  }, [id]);

  const validateForm = () => {
    if (!formData.name) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.email) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.mobile) {
      toast.error("Mobile number is required");
      return false;
    }
    if (!/^\d+$/.test(formData.mobile)) {
      toast.error("Mobile number must be numeric");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("designation", formData.designation);
    data.append("gender", formData.gender);
    data.append("course", JSON.stringify(formData.course)); // Send course as a stringified array
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    try {
      await editEmployee(id, data);
      toast.success("Employee details updated successfully!");
      navigate("/employees");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error updating employee. Please try again.");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setFormData({ ...formData, image: file });
    } else {
      toast.error("Only JPG/PNG files are allowed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800">Edit Employee</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-sm text-gray-600">Female</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Courses
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
              onChange={handleFileChange}
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
