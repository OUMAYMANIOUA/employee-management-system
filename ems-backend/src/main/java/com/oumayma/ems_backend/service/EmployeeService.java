package com.oumayma.ems_backend.service;

import com.oumayma.ems_backend.dto.EmployeeDto;
import com.oumayma.ems_backend.entity.Employee;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

//Dans une interface, tout est public par défaut !
public interface EmployeeService {
    EmployeeDto createEmployeeDto(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto);
    EmployeeDto deleteEmployee(Long employeeId);
}
