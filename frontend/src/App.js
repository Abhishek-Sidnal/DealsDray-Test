import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Navbar from './components/Navbar'; 
import PrivateRoute from './components/PrivateRoute'; 
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <div>
        <Toaster />
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <EmployeeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/employees/create"
            element={
              <PrivateRoute>
                <AddEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-employee/:id"
            element={
              <PrivateRoute>
                <EditEmployee />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
