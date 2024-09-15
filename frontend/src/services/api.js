import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const getEmployees = () => API.get('/employees');
export const getEmployeeById = (id) => API.get(`/employees/${id}`);
export const addEmployee = (formData) => API.post('/employees', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const editEmployee = (id, updatedEmployee) => API.put(`/employees/${id}`, updatedEmployee);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`); 
