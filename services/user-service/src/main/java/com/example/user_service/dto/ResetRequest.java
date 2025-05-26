package com.example.user_service.dto;

import lombok.Data;

@Data
public class ResetRequest {
    private String token;
    private String newPassword;
}
