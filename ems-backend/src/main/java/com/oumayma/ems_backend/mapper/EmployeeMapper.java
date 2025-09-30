package com.oumayma.ems_backend.mapper;

import com.oumayma.ems_backend.dto.EmployeeDto;
import com.oumayma.ems_backend.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(// Prend l'ID de l'entity(de la base
                employee.getId(),
                employee.getFirstname(),
                employee.getLastName(),
                employee.getEmail()
        );
    }
    public static Employee mapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }

}
