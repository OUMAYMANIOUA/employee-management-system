import React, { useState, useEffect } from 'react';
import { listEmployees, deleteEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des employés:", error);
      });
  }

  function addNewEmployee() {
    navigate('/add-employee');
  }

  function updateEmployee(id) {
    navigate('/update-employee/' + id);
  }

  const handleDelete = (id) => {
    deleteEmployee(id)
      .then(() => {
        getAllEmployees(); // recharger la liste
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de l'employé:", error);
      });
  };

  return (
    <div className='container'>
      <h2 className='text-center'>ListEmployeeComponent</h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className='btn btn-info'
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => handleDelete(employee.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
