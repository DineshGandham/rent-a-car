package com.example.user_service.controller;

import com.example.user_service.model.PasswordResetToken;
import com.example.user_service.model.User;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.user_service.dto.*;
import com.example.user_service.repository.PasswordResetTokenRepository;
import com.example.user_service.repository.UserRepository;
import com.example.user_service.security.JwtUtil;
import com.example.user_service.service.EmailService;

import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private EmailService emailService;


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        log.info("Login attempt for username: {}", request.getUsername());
        try {
            manager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            log.info("Authentication successful for username: {}", request.getUsername());
            String token = jwtUtil.generateToken(request.getUsername());
            String user = request.getUsername();
            return ResponseEntity.ok(new AuthResponse(token,"Authentication successful",user));
        } catch (BadCredentialsException e) {
            log.error("Invalid credentials for username: {}", request.getUsername());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new AuthResponse("Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            log.info("Username already exists", request.getUsername());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RegisterResponse("Username already exists"));
        }
    
        // Check if the email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RegisterResponse("Email already exists"));
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setRole("USER");

        userRepository.save(user);

        log.info("User registered: {}", request.getUsername());

        String token = jwtUtil.generateToken(request.getUsername());
        return ResponseEntity.ok(new RegisterResponse(token,"User Registered successfully"));
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<ForgotResponse>forgotPassword(@RequestBody ForgotRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if(userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ForgotResponse("User not found"));
        }

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setEmail(request.getEmail());
        Instant expiry = LocalDateTime.now().plusHours(1).atZone(ZoneId.systemDefault()).toInstant();
        resetToken.setExpirydate(expiry);
        passwordResetTokenRepository.save(resetToken);

        try {
            emailService.sendResetLink(request.getEmail(), token);
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ForgotResponse("Failed to send reset link. Please try again later."));
        }
    
        return ResponseEntity.ok(new ForgotResponse("Reset password link sent to your email"));
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<ResetResponse> resetPassword(@RequestBody ResetRequest request) {

        String token = request.getToken();
        String newPassword = request.getNewPassword();

        Optional<PasswordResetToken> tokenOptional = passwordResetTokenRepository.findByToken(token);
        if (tokenOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResetResponse("Invalid token"));
        }

        PasswordResetToken resetToken = tokenOptional.get();

        // Convert LocalDateTime to Instant for comparison
        if (resetToken.getExpirydate().isBefore(Instant.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResetResponse("Token has expired"));
        }

        Optional<User> userOptional = userRepository.findByEmail(resetToken.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResetResponse("User not found"));
        }

        User user = userOptional.get();
        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);

        return ResponseEntity.ok(new ResetResponse("Password has been reset successfully"));
    }
    
}
