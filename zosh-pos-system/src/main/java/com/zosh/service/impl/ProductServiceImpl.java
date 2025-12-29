package com.zosh.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;
import com.zosh.mapper.ProductMapper;
import com.zosh.model.Category;
import com.zosh.model.Product;
import com.zosh.model.Store;
import com.zosh.model.User;
import com.zosh.payload.dto.ProductDto;
import com.zosh.repository.CategoryRepository;
import com.zosh.repository.ProductRepository;
import com.zosh.repository.StoreRepository;
import com.zosh.service.ProductService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductDto createProduct(ProductDto productDto, User user) {
        if (productDto.getStoreId() == null) {
            throw new IllegalArgumentException("Store ID is required");
        }
        Long categoryId = productDto.getCategoryId();
        if (categoryId == null && productDto.getCategory() != null) {
            categoryId = productDto.getCategory().getId();
        }

        if (categoryId == null) {
            throw new IllegalArgumentException("Category ID is required");
        }

        Store store = storeRepository.findById(productDto.getStoreId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Store not found"));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        Product product = ProductMapper.toEntity(productDto, store, category);
        Product savedProduct = productRepository.save(product);
        return ProductMapper.toDto(savedProduct);
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        return ProductMapper.toDto(product);
    }

    @Override
    public ProductDto updateProductById(Long id, ProductDto productDto, User user) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        product.setName(productDto.getName());
        product.setSku(productDto.getSku());
        product.setDescription(productDto.getDescription());
        product.setMrp(productDto.getMrp());
        product.setSellingPrice(productDto.getSellingPrice());
        product.setBrand(productDto.getBrand());
        product.setImage(productDto.getImage());
        product.setUpdatedAt(LocalDateTime.now());
        product.setCategory(category);
        Product savedProduct = productRepository.save(product);
        return ProductMapper.toDto(savedProduct);
    }

    @Override
    public void deleteProductById(Long id, User user) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        productRepository.delete(product);
    }

    @Override
    public List<ProductDto> getAllProductByStoreId(Long storeId) {
        List<Product> products = productRepository.findByStoreId(storeId);
        return products.stream().map(ProductMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> searchByKeyword(String keyword, Long storeId) {
        List<Product> products = productRepository.searchByKeyword(storeId, keyword);
        return products.stream().map(ProductMapper::toDto).collect(Collectors.toList());
    }

}
