package com.oumayma.ems_backend;

import com.oumayma.ems_backend.dto.EmployeeDto;
import com.oumayma.ems_backend.entity.Employee;
import com.oumayma.ems_backend.exception.RessourceNotFoundException;
import com.oumayma.ems_backend.mapper.EmployeeMapper;
import com.oumayma.ems_backend.repository.EmployeeRepository;
import com.oumayma.ems_backend.service.Impl.EmployeeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    private Employee employee;
    private EmployeeDto employeeDto;

    @BeforeEach
    void setUp() {
        employee = new Employee("John", "Doe", "john.doe@email.com");
        employee.setId(1L);

        employeeDto = new EmployeeDto(1L, "John", "Doe", "john.doe@email.com");
    }

    @Test
    void createEmployee_ShouldReturnEmployeeDto() {
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        EmployeeDto result = employeeService.createEmployeeDto(employeeDto);

        assertNotNull(result);
        assertEquals(employeeDto.getFirstName(), result.getFirstName());
        verify(employeeRepository, times(1)).save(any(Employee.class));
    }

    @Test
    void getEmployeeById_WhenEmployeeExists_ShouldReturnEmployeeDto() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        EmployeeDto result = employeeService.getEmployeeById(1L);

        assertNotNull(result);
        assertEquals(employeeDto.getEmail(), result.getEmail());
    }

    @Test
    void getEmployeeById_WhenEmployeeNotExists_ShouldThrowException() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RessourceNotFoundException.class, () -> {
            employeeService.getEmployeeById(1L);
        });
    }

    @Test
    void getAllEmployees_ShouldReturnEmployeeList() {
        when(employeeRepository.findAll()).thenReturn(Arrays.asList(employee));

        List<EmployeeDto> result = employeeService.getAllEmployees();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(employeeRepository, times(1)).findAll();
    }
}