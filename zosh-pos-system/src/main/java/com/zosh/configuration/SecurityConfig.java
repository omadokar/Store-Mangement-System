package com.zosh.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
public class SecurityConfig {
        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http) throws Exception {
                return http.sessionManagement(
                                menagement -> menagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests(Authorize -> Authorize
                                                .antMatchers("/auth/**").permitAll()
                                                .antMatchers("/api/super-admin/**").hasRole("SUPER-ADMIN")
                                                .antMatchers("/api/admin/**").hasRole("ADMIN")
                                                .antMatchers("/api/**").authenticated()
                                                .anyRequest().permitAll())
                                .addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class)
                                .csrf(AbstractHttpConfigurer::disable).cors(
                                                cors -> cors.configurationSource(corsConfigurationSource()))
                                .build();
        }

        private CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173/"));
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
                configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
                configuration.setAllowCredentials(true);
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}
