package com.example.api_gateway.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> userServiceFallback() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User service is currently unavailable. Please try again later.");
        response.put("status", "SERVICE_UNAVAILABLE");
        response.put("timestamp", LocalDateTime.now());
        response.put("service", "user-service");
        
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }

    @GetMapping("/booking")
    public ResponseEntity<Map<String, Object>> bookingServiceFallback() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Booking service is currently unavailable. Please try again later.");
        response.put("status", "SERVICE_UNAVAILABLE");
        response.put("timestamp", LocalDateTime.now());
        response.put("service", "booking-service");
        
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }

    @GetMapping("/auth")
    public ResponseEntity<Map<String, Object>> authServiceFallback() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Authentication service is currently unavailable. Please try again later.");
        response.put("status", "SERVICE_UNAVAILABLE");
        response.put("timestamp", LocalDateTime.now());
        response.put("service", "auth-service");
        
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }

    @GetMapping("/generic")
    public ResponseEntity<Map<String, Object>> genericFallback() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Service is currently unavailable. Please try again later.");
        response.put("status", "SERVICE_UNAVAILABLE");
        response.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }
}