package com.example.booking_service.dto;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookingRequest {
    private String pickupLocation;
    private String dropLocation;
    private LocalDateTime pickupTime;
    private LocalDateTime dropTime;
}