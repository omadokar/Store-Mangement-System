package com.zosh.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.zosh.payload.dto.CategoryDto;
import com.zosh.payload.response.ApiResponse;
import com.zosh.service.CategoryService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    // done
    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto) {
        return ResponseEntity.ok(categoryService.createCategory(categoryDto));
    }

    // done
    @GetMapping("/{storeId}")
    public ResponseEntity<List<CategoryDto>> getCategoryByStoreId(@PathVariable Long storeId) {
        return ResponseEntity.ok(categoryService.getCategoryByStoreId(storeId));
    }

    // done
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> updateCategoryById(@PathVariable Long id, @RequestBody CategoryDto categoryDto) {
        return ResponseEntity.ok(categoryService.updateCategoryById(id, categoryDto));
    }

    // done
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCategoryById(@PathVariable Long id) {
        categoryService.deleteCategoryById(id);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Category Deleted Successfully");
        return ResponseEntity.ok(apiResponse);
    }
}
