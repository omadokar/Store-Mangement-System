package com.zosh.mapper;

import com.zosh.payload.dto.UserDto;
import java.time.LocalDateTime;
import com.zosh.model.User;

public class UserMapper {

    public static UserDto toDTO(User user) {
        UserDto userDto = new UserDto();
        userDto.setFullName(user.getFullName());
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());
        if (user.getStore() != null) {
            userDto.setStoreId(user.getStore().getId());
        }
        if (user.getBranch() != null) {
            userDto.setBranchId(user.getBranch().getId());
        }
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());
        userDto.setLastLogin(user.getLastLogin());
        userDto.setPhone(user.getPhone());
        return userDto;
    }

    public static User toEntity(UserDto userDto) {
        User user = new User();
        user.setFullName(userDto.getFullName());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setLastLogin(LocalDateTime.now());
        user.setPhone(userDto.getPhone());
        user.setPassword(userDto.getPassword());
        return user;
    }
}
