package com.zosh.mapper;

import com.zosh.model.Category;
import com.zosh.model.Product;
import com.zosh.model.Store;
import com.zosh.payload.dto.ProductDto;

public class ProductMapper {
    public static ProductDto toDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setSku(product.getSku());
        productDto.setDescription(product.getDescription());
        productDto.setMrp(product.getMrp());
        productDto.setSellingPrice(product.getSellingPrice());
        productDto.setBrand(product.getBrand());
        productDto.setCategory(CategoryMapper.toDto(product.getCategory()));
        productDto.setImage(product.getImage());
        productDto.setStoreId(product.getStore().getId());
        productDto.setCreatedAt(product.getCreatedAt());
        productDto.setUpdatedAt(product.getUpdatedAt());
        return productDto;
    }

    public static Product toEntity(ProductDto productDto, Store store, Category category) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setStore(store);
        product.setCategory(category);
        product.setDescription(productDto.getDescription());
        product.setSku(productDto.getSku());
        product.setImage(productDto.getImage());
        product.setMrp(productDto.getMrp());
        product.setSellingPrice(productDto.getSellingPrice());
        product.setBrand(productDto.getBrand());
        return product;
    }
}