package com.oumayma.ems_backend.service.Impl;

import com.oumayma.ems_backend.dto.EmployeeDto;
import com.oumayma.ems_backend.entity.Employee;
import com.oumayma.ems_backend.exception.RessourceNotFoundException;
import com.oumayma.ems_backend.mapper.EmployeeMapper;
import com.oumayma.ems_backend.repository.EmployeeRepository;
import com.oumayma.ems_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Override //Annotation qui signifie "JE REDÉFINIS une méthode"
    public EmployeeDto createEmployeeDto(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee=employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()-> new RessourceNotFoundException("emplyee is not exist with geiven id : "+ employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees =employeeRepository.findAll();
        return employees.stream()
                .map((employee) -> EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee =employeeRepository.findById(employeeId).orElseThrow(
                () -> new RessourceNotFoundException("Employee does not exists with given id:" + employeeId)
        );

        employee.setFirstname(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeobj=employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeobj);
    }

    @Override
    public EmployeeDto deleteEmployee(Long employeeId) {
        Employee employee =employeeRepository.findById(employeeId).orElseThrow(
                () -> new RessourceNotFoundException("Employee does not exists with given id:" + employeeId)
        );
        employeeRepository.deleteById(employeeId);
        return null;
    }
}
