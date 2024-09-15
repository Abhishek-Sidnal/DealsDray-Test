const Employee = require('../models/Employee');

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error('Error fetching employee:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addEmployee = async (req, res) => {
  const { id, name, email, mobile, designation, gender, course } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newEmployee = new Employee({
      id: Math.floor(Math.random() * 1000000), 
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error('Error saving employee:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Edit/update employee by ID
exports.editEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course, status } = req.body;
  const image = req.file ? req.file.path : req.body.image;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee && existingEmployee._id.toString() !== req.params.id) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        image,
        status,
      },
      { new: true, runValidators: true } 
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Delete employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
