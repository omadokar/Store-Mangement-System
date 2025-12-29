package com.zosh.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.zosh.payload.response.ApiResponse;

@RestController
public class HomeController {

    @GetMapping
    public ResponseEntity<ApiResponse> home() {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("welcome to AES system");
        return ResponseEntity.ok(apiResponse);
    }
}
