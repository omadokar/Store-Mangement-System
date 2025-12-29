package com.zosh.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.zosh.model.User;
import com.zosh.payload.dto.ProductDto;
import com.zosh.payload.response.ApiResponse;
import com.zosh.service.ProductService;
import com.zosh.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;

    // done
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto,
            @RequestHeader("Authorization") String jwt) {
        User user = userService.getUserFromJwtToken(jwt);
        return ResponseEntity.ok(productService.createProduct(productDto, user));
    }

    // done
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id,
            @RequestHeader("Authorization") String jwt) {
        User user = userService.getUserFromJwtToken(jwt);
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // done
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProductById(@PathVariable Long id, @RequestBody ProductDto productDto,
            @RequestHeader("Authorization") String jwt) {
        User user = userService.getUserFromJwtToken(jwt);
        return ResponseEntity.ok(productService.updateProductById(id, productDto, user));
    }

    // done
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProductById(@PathVariable Long id,
            @RequestHeader("Authorization") String jwt) {
        User user = userService.getUserFromJwtToken(jwt);
        productService.deleteProductById(id, user);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Deleted Succesfully");
        return ResponseEntity.ok(apiResponse);
    }

    // done
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ProductDto>> getAllProductByStoreId(@PathVariable Long storeId) {
        return ResponseEntity.ok(productService.getAllProductByStoreId(storeId));
    }

    // done
    @GetMapping("/search/{storeId}/search")
    public ResponseEntity<List<ProductDto>> searchByKeyword(@PathVariable Long storeId, @RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchByKeyword(keyword, storeId));
    }
}