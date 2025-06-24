package com.example.booking_service.entity;

import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;

import java.time.LocalDateTime;
import lombok.*;
import jakarta.persistence.*;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String pickupLocation;
    private String dropLocation;

    private LocalDateTime pickupTime;
    private LocalDateTime dropTime;
}