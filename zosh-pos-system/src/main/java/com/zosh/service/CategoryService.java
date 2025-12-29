package com.zosh.service;

import java.util.List;
import com.zosh.payload.dto.CategoryDto;

public interface CategoryService {

    CategoryDto createCategory(CategoryDto categoryDto);

    List<CategoryDto> getCategoryByStoreId(Long storeId);

    CategoryDto updateCategoryById(Long id, CategoryDto categoryDto);

    void deleteCategoryById(Long id);
}
