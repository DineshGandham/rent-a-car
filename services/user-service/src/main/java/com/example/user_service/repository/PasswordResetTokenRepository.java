package com.example.user_service.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.user_service.model.PasswordResetToken;


public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String>{
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByToken(String token);
}