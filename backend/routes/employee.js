const express = require('express');
const { getEmployees, getEmployeeById, addEmployee, editEmployee, deleteEmployee } = require('../controllers/employeeController');
const upload = require('../middleware/upload'); 
const auth = require('../middleware/auth'); 

const router = express.Router();

router.get('/', auth, getEmployees);
router.get('/:id', auth, getEmployeeById); 
router.post('/', auth, upload.single('image'), addEmployee);
router.put('/:id', auth, upload.single('image'), editEmployee);
router.delete('/:id', auth, deleteEmployee); 

module.exports = router;
