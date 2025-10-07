package com.oumayma.ems_backend.controller;

import com.oumayma.ems_backend.dto.LoginRequest;
import com.oumayma.ems_backend.dto.JwtResponse;
import com.oumayma.ems_backend.entity.User;
import com.oumayma.ems_backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestParam String firstName,
                                          @RequestParam String lastName,
                                          @RequestParam String email,
                                          @RequestParam String password) {
        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");

        User user = authService.registerUser(firstName, lastName, email, password, roles);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/signup/manager")
    public ResponseEntity<?> registerManager(@RequestParam String firstName,
                                             @RequestParam String lastName,
                                             @RequestParam String email,
                                             @RequestParam String password) {
        Set<String> roles = new HashSet<>();
        roles.add("ROLE_MANAGER");
        roles.add("ROLE_USER");

        User user = authService.registerUser(firstName, lastName, email, password, roles);
        return ResponseEntity.ok("Manager registered successfully!");
    }
}