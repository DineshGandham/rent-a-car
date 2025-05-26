package com.example.user_service.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    
    private final JavaMailSender javaMailSender;

    @Value("${app.frontend.reset-password-url}")
    private String resetPasswordUrl;

    public void sendResetLink(String to, String token) throws MessagingException {

        String resetLink = resetPasswordUrl + "?token=" + token;
        MimeMessage mail = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mail, true);
        helper.setTo(to);
        helper.setSubject("Reset your password");
        helper.setText("Click the link to reset your password: " + resetLink, true);

        javaMailSender.send(mail);

    }
}
