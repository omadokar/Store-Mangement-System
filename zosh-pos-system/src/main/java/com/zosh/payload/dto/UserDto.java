package com.zosh.payload.dto;

import java.time.LocalDateTime;
import com.zosh.domain.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private UserRole role;
    private String password;
    private Long storeId;
    private Long branchId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime lastLogin;
}
