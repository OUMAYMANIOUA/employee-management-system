import React from 'react';
import './App.css'
import ListEmployeeComponent from './Components/ListEmployeeComponent'
import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeComponent from './Components/EmployeeComponent'
import LoginComponent from './Components/LoginComponent';
import RegisterComponent from './Components/RegisterComponent';
import AuthService from './services/AuthService';

function App() {
  const PrivateRoute = ({ children }) => {
    const currentUser = AuthService.getCurrentUser();
    return currentUser ? children : <Navigate to="/login" />;
  };

  const ManagerRoute = ({ children }) => {
    const currentUser = AuthService.getCurrentUser();
    const roles = Array.isArray(currentUser?.roles) ? currentUser.roles : [];
    const isManager = roles.includes('ROLE_MANAGER');
    return isManager ? children : <Navigate to="/employees" />;
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <HeaderComponent />
        <main className="flex-grow-1 d-flex flex-column">
          <Routes>
            <Route path='/' element={<Navigate to="/employees" />} />
            <Route path='/login' element={<LoginComponent />} />
            <Route path='/register' element={<RegisterComponent />} />
            <Route path='/employees' element={
              <PrivateRoute>
                <ListEmployeeComponent />
              </PrivateRoute>
            } />
            <Route path='/add-employee' element={
              <ManagerRoute>
                <EmployeeComponent />
              </ManagerRoute>
            } />
            <Route path='/update-employee/:id' element={
              <ManagerRoute>
                <EmployeeComponent />
              </ManagerRoute>
            } />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;