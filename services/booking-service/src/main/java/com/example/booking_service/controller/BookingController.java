package com.example.booking_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.example.booking_service.service.BookingService;
import com.example.booking_service.dto.BookingRequest;
import com.example.booking_service.entity.Booking;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class BookingController {
    
    private final BookingService bookingService;

    @PostMapping("/cache")
    public ResponseEntity<String> cacheBooking(@RequestBody BookingRequest request) {
        log.info("Received request to cache booking: {}", request);
        try {
            String bookingId = bookingService.cacheBooking(request);
            log.info("Booking cached with ID: {}", bookingId);
            return ResponseEntity.ok(bookingId);
        } catch (Exception e) {
            log.error("Error caching booking: ", e);
            return ResponseEntity.internalServerError().body("Error caching booking: " + e.getMessage());
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<Booking> confirmBooking(@RequestBody BookingRequest request) {
        log.info("Received request to save booking: {}", request);
        try {
            Booking saved = bookingService.saveBooking(request);
            log.info("Booking saved to DB with ID: {}", saved.getId());
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            log.error("Error saving booking: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Booking Controller is working!");
    }

     @GetMapping
    public ResponseEntity<?> getAllBookings() {
        log.info("Fetching all bookings");
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
}