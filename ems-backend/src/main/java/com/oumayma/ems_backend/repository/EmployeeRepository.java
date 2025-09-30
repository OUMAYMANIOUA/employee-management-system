package com.oumayma.ems_backend.repository;

import com.oumayma.ems_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Long> { //employee :le type d’entité que ce repository gère , long : le type de cle primaire
}
