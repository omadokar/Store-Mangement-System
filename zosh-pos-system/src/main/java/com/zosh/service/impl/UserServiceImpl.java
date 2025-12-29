package com.zosh.service.impl;

import java.util.List;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.zosh.configuration.JwtConstant;
import com.zosh.model.User;
import com.zosh.repository.UserRepositoryTemp;
import com.zosh.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepositoryTemp userRepositoryTemp;
    private final JwtConstant jwtConstant;

    @Override
    public User getUserFromJwtToken(String jwtToken) {
        String email = jwtConstant.getEmailFromToken(jwtToken);
        return userRepositoryTemp.findByEmail(email);
    }

    @Override
    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepositoryTemp.findByEmail(email);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepositoryTemp.findByEmail(email);
    }

    @Override
    public User getUserById(Long id) {
        return userRepositoryTemp.findById(id).get();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepositoryTemp.findAll();
    }

}
