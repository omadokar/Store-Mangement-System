package com.zosh.service;

import java.util.List;
import com.zosh.model.User;
import com.zosh.payload.dto.ProductDto;

public interface ProductService {

    ProductDto createProduct(ProductDto productDto, User user);

    ProductDto getProductById(Long id);

    ProductDto updateProductById(Long id, ProductDto productDto, User user);

    void deleteProductById(Long id, User user);

    List<ProductDto> getAllProductByStoreId(Long storeId);

    List<ProductDto> searchByKeyword(String keyword, Long storeId);

}