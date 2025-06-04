package com.example.api_gateway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @Autowired
    private DiscoveryClient discoveryClient;

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now());
        response.put("service", "api-gateway");
        response.put("version", "1.0.0");
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/services")
    public ResponseEntity<Map<String, Object>> getRegisteredServices() {
        Map<String, Object> response = new HashMap<>();
        List<String> services = discoveryClient.getServices();
        
        response.put("registeredServices", services);
        response.put("totalServices", services.size());
        response.put("timestamp", LocalDateTime.now());
        
        // Get instance count for each service
        Map<String, Integer> serviceInstances = new HashMap<>();
        for (String service : services) {
            int instanceCount = discoveryClient.getInstances(service).size();
            serviceInstances.put(service, instanceCount);
        }
        response.put("serviceInstances", serviceInstances);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> info() {
        Map<String, Object> response = new HashMap<>();
        response.put("name", "API Gateway");
        response.put("description", "Microservice API Gateway with Eureka integration");
        response.put("version", "1.0.0");
        response.put("java.version", System.getProperty("java.version"));
        response.put("spring.boot.version", "3.4.4");
        response.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }
}