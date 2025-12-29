package com.zosh.mapper;

import com.zosh.model.Category;
import com.zosh.payload.dto.CategoryDto;

public class CategoryMapper {

    public static CategoryDto toDto(Category category) {
        CategoryDto categoryDto = CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .storeId(category.getStore().getId())
                .build();
        return categoryDto;
    }

    public static Category toEntity(CategoryDto categoryDto) {
        Category category = Category.builder()
                .id(categoryDto.getId())
                .name(categoryDto.getName())
                .build();
        return category;
    }
}