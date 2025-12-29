package com.zosh.service.impl;

import com.zosh.domain.UserRole;
import com.zosh.mapper.CategoryMapper;
import com.zosh.model.Category;
import com.zosh.model.Store;
import com.zosh.model.User;
import com.zosh.payload.dto.CategoryDto;
import com.zosh.service.CategoryService;
import com.zosh.service.UserService;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;
import com.zosh.repository.CategoryRepository;
import com.zosh.repository.StoreRepository;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;
    private final UserService userService;

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        User user = userService.getCurrentUser();
        Store store = storeRepository.findById(categoryDto.getStoreId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Store not found"));
        checkAuthority(user, store);
        Category category = Category.builder()
                .store(store)
                .name(categoryDto.getName())
                .build();
        return CategoryMapper.toDto(categoryRepository.save(category));
    }

    @Override
    public List<CategoryDto> getCategoryByStoreId(Long storeId) {
        List<CategoryDto> categories = categoryRepository.findAllCategoryByStoreId(storeId).stream()
                .map(CategoryMapper::toDto).collect(Collectors.toList());
        return categories;
    }

    @Override
    public CategoryDto updateCategoryById(Long id, CategoryDto categoryDto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found"));
        User user = userService.getCurrentUser();
        checkAuthority(user, category.getStore());
        category.setName(categoryDto.getName());
        return CategoryMapper.toDto(categoryRepository.save(category));
    }

    @Override
    public void deleteCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found"));
        User user = userService.getCurrentUser();
        checkAuthority(user, category.getStore());
        categoryRepository.delete(category);
    }

    private void checkAuthority(User user, Store store) {
        boolean isAdmin = user.getRole().equals(UserRole.ROLE_STORE_ADMIN);
        boolean isManager = user.getRole().equals(UserRole.ROLE_STORE_MANAGER);
        boolean isSameStore = user.equals(store.getStoreAdmin());
        if (!isAdmin && !isManager && !isSameStore) {
            throw new AccessDeniedException("User not permitted to perform this action on the store.");
        }
    }
}
