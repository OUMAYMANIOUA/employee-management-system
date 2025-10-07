import { useState, useEffect } from 'react';
import { listEmployees, deleteEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    setLoading(true);
    setError('');
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des employés:', error);
        setError('Erreur lors du chargement des employés');
        setLoading(false);
      });
  }

  function addNewEmployee() {
    navigate('/add-employee');
  }

  function updateEmployee(id) {
    navigate('/update-employee/' + id);
  }

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      deleteEmployee(id)
        .then(() => {
          getAllEmployees();
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'employé:", error);
          setError('Erreur lors de la suppression');
        });
    }
  };

  const roles = Array.isArray(currentUser?.roles) ? currentUser.roles : [];
  const isManager = roles.includes('ROLE_MANAGER');

  if (loading) {
    return (
      <div className='container py-5 flex-grow-1'>
        <div className='text-center py-5'>
          <div
            className='modern-spinner mx-auto mb-3'
            style={{ width: '3rem', height: '3rem', borderWidth: '4px' }}
          ></div>
          <p className='text-muted'>Chargement des employés...</p>
        </div>
      </div>
    );
  }
  return (
    <div className='container py-3 flex-grow-1'>
      <div className='d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3'>
        <div>
          <h2 className='text-primary mb-1'>
            <i className='fas fa-users me-2'></i>
            Liste des Employés
          </h2>
          <p className='text-muted mb-0'>
            Gérez et consultez tous vos employés
          </p>
        </div>

        {isManager && (
          <button className='btn primary-btn' onClick={addNewEmployee}>
            <i className='fas fa-plus me-2'></i>
            Ajouter Employé
          </button>
        )}
      </div>

      {error && (
        <div className='alert alert-danger alert-modern mb-4'>
          <i className='fas fa-exclamation-triangle me-2'></i>
          {error}
        </div>
      )}

      {employees.length === 0 ? (
        <div className='empty-state modern-card'>
          <i className='fas fa-users'></i>
          <h4>Aucun employé trouvé</h4>
          <p>Commencez par ajouter votre premier employé.</p>
          {isManager && (
            <button className='btn primary-btn' onClick={addNewEmployee}>
              <i className='fas fa-plus me-2'></i>
              Ajouter employé
            </button>
          )}
        </div>
      ) : (
        <div className='table-responsive modern-card'>
          <table className='table table-hover modern-table mb-0'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Email</th>
                {isManager && <th className='text-center'>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className='fw-bold text-primary'>#{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>
                    <a
                      href={`mailto:${employee.email}`}
                      className='text-decoration-none'
                    >
                      <i className='fas fa-envelope me-1'></i>
                      {employee.email}
                    </a>
                  </td>
                  {isManager && (
                    <td>
                      <div className='d-flex gap-2 justify-content-center'>
                        <button
                          className='btn btn-outline-primary btn-sm'
                          onClick={() => updateEmployee(employee.id)}
                        >
                          <i className='fas fa-edit me-1'></i>
                          Modifier
                        </button>
                        <button
                          className='btn btn-outline-danger btn-sm'
                          onClick={() => handleDelete(employee.id)}
                        >
                          <i className='fas fa-trash me-1'></i>
                          Supprimer
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListEmployeeComponent;
