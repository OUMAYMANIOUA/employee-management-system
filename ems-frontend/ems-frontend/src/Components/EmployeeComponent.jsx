import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  // Déclaration des states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");

  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const navigator = useNavigate();

  // Charger les données de l'employé si mode update
  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      }).catch(error => {
        console.error("Erreur lors du chargement de l'employé :", error);
      });
    }
  }, [id]);

  // Validation des champs
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!firstName.trim()) {
      tempErrors.firstName = "Le prénom est requis.";
      isValid = false;
    }

    if (!lastName.trim()) {
      tempErrors.lastName = "Le nom est requis.";
      isValid = false;
    }

    if (!email.trim()) {
      tempErrors.email = "L'email est requis.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Format d'email invalide.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Fonction de soumission
  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const employee = { firstName, lastName, email };

    if (id) {
      // Mode Update
      updateEmployee(id, employee).then(() => {
        console.log("Employee updated successfully");
        navigator('/employees');
      }).catch(error => console.error("Erreur update :", error));
    } else {
      // Mode Create
      createEmployee(employee).then(() => {
        console.log("Employee created successfully");
        navigator('/employees');
      }).catch(error => console.error("Erreur create :", error));
    }
  };

  function pageTitle() {
    return id
      ? <h2 className="text-center">Mettre à jour l'employé</h2>
      : <h2 className="text-center">Ajouter un Employé</h2>;
  }

  return (
    <div className="container">
      {pageTitle()}
      <form onSubmit={saveOrUpdateEmployee}>
        
        <div className="form-group mb-3">
          <label>Prénom :</label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            placeholder="Entrer le prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Nom :</label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            placeholder="Entrer le nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Email :</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Entrer l'email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <button type="submit" className="btn btn-success">
          {id ? "Mettre à jour" : "Enregistrer"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeComponent;
