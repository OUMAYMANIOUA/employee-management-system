package com.oumayma.ems_backend.controller;


import com.oumayma.ems_backend.dto.EmployeeDto;
import com.oumayma.ems_backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController // this class handle http request //recevoir et renvoyer du JSON
@RequestMapping("/api/employees")//"tous mes api se trouve a cette adresse API"
public class EmployeeController {
// Cette classe va gérer les requêtes HTTP
    private EmployeeService employeeService;

    //Build Add Employee REST API
    @PostMapping //gère les requêtes POST
    //requestbody:Prends le JSON reçu par la requete api et transforme-le en objet Java
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        // Cette méthode est appelée quand on envoie requete POST /api/employees .elle renvoie les données + le code HTTP 201 (créé)
        EmployeeDto savedEmployee = employeeService.createEmployeeDto(employeeDto);
        return  new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }
    //build get employee Rest Api
    @GetMapping("{id}") //responseentity<..> ca veut dire renvoie une format json de type ...(ici employeedto)
    public ResponseEntity<EmployeeDto> getEmployeeById( @PathVariable("id") Long employeeId){
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }
//build get all employees rest api
   @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }
    //build update employee Rest Api
    @PutMapping("{id}") //responseentity<..> ca veut dire renvoie une format json de type ...(ici employeedto)
    public ResponseEntity<EmployeeDto> updateEmployee( @PathVariable("id") Long employeeId,
                                                       @RequestBody EmployeeDto updatedEmploee){
        EmployeeDto employeeDto = employeeService.updateEmployee(employeeId,updatedEmploee);
        return ResponseEntity.ok(employeeDto);
    }

    //build delete employee Rest Api
    @DeleteMapping("{id}")
    public ResponseEntity<String> updateEmployee( @PathVariable("id") Long employeeId){
        EmployeeDto employeeDto = employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee deleted successfuly!");
    }

}
