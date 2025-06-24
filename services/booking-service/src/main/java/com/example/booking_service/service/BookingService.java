package com.example.booking_service.service;

import com.example.booking_service.dto.BookingRequest;
import com.example.booking_service.entity.Booking;
import com.example.booking_service.repository.BookingRepository;
import lombok.RequiredArgsConstructor;


import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    public String cacheBooking(BookingRequest request) {
        String bookingId = UUID.randomUUID().toString();
        redisTemplate.opsForValue().set("Booking:"+bookingId,request,15,TimeUnit.MINUTES);
        return bookingId;
    }

    public Booking saveBooking(BookingRequest request) {
        Booking booking = Booking.builder()
                                .pickupLocation(request.getPickupLocation())
                                .dropLocation(request.getDropLocation())
                                .pickupTime(request.getPickupTime())
                                .dropTime(request.getDropTime())
                                .build();
            return bookingRepository.save(booking);
    }
}
