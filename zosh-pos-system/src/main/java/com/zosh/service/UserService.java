package com.zosh.service;

import java.util.List;
import com.zosh.model.User;

public interface UserService {
    User getUserFromJwtToken(String jwtToken);

    User getCurrentUser();

    User getUserByEmail(String email);

    User getUserById(Long id);

    List<User> getAllUsers();

}