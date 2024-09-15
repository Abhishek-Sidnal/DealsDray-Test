const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, validate: /^[0-9]+$/ }, 
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: [String], required: true },
  status: { type: Boolean, default: true }, 
  createdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
