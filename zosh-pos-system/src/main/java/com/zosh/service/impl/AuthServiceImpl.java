package com.zosh.service.impl;

import java.time.LocalDateTime;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.zosh.configuration.JwtConstant;
import com.zosh.domain.UserRole;
import com.zosh.payload.dto.UserDto;
import com.zosh.payload.response.AuthResponse;
import com.zosh.repository.UserRepositoryTemp;
import com.zosh.service.AuthService;
import lombok.RequiredArgsConstructor;
import com.zosh.model.User;
import com.zosh.mapper.UserMapper;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepositoryTemp userRepositoryTemp;
    private final PasswordEncoder passwordEncoder;
    private final JwtConstant jwtConstant;
    private final CustomUserImplementation customUserImplementation;

    @Override
    public AuthResponse signup(UserDto userDto) {
        User user = userRepositoryTemp.findByEmail(userDto.getEmail());
        if (user != null) {
            throw new RuntimeException("User already exists");
        }
        if (userDto.getRole().equals(UserRole.ROLE_ADMIN)) {
            throw new RuntimeException("Role Admin is not allowed");
        }
        user = new User();
        user.setFullName(userDto.getFullName());
        user.setEmail(userDto.getEmail());
        user.setPhone(userDto.getPhone());
        user.setRole(userDto.getRole());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setLastLogin(LocalDateTime.now());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        User savedUser = userRepositoryTemp.save(user);

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDto.getEmail(),
                userDto.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtConstant.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("User registered successfully");
        authResponse.setUser(UserMapper.toDTO(savedUser));
        return authResponse;
    }

    @Override
    public AuthResponse login(UserDto userDto) {
        String email = userDto.getEmail();
        String password = userDto.getPassword();
        Authentication authentication = authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.iterator().next().getAuthority();
        String jwt = jwtConstant.generateToken(authentication);

        User user = userRepositoryTemp.findByEmail(email);
        user.setLastLogin(LocalDateTime.now());
        userRepositoryTemp.save(user);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("User logged in successfully");
        authResponse.setUser(UserMapper.toDTO(user));
        return authResponse;
    }

    private Authentication authenticate(String email, String password) {

        UserDetails userDetails = customUserImplementation.loadUserByUsername(email);
        if (userDetails == null) {
            throw new UsernameNotFoundException("User not found");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
