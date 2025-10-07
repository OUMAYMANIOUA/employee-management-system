package com.oumayma.ems_backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@CrossOrigin("*")
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "Test endpoint works!";
    }

    @PostMapping("/auth-test")
    public String authTest(@RequestBody Object request) {
        return "Auth test endpoint reached!";
    }
}