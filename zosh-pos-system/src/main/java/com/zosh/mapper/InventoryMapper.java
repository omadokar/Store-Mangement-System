package com.zosh.mapper;

import com.zosh.model.Branch;
import com.zosh.model.Inventory;
import com.zosh.model.Product;
import com.zosh.payload.dto.InventoryDto;

public class InventoryMapper {

    public static InventoryDto toDto(Inventory inventory) {
        return InventoryDto.builder()
                .id(inventory.getId())
                .branch(BranchMapper.toDto(inventory.getBranch()))
                .branchId(inventory.getBranch().getId())
                .product(ProductMapper.toDto(inventory.getProduct()))
                .productId(inventory.getProduct().getId())
                .quantity(inventory.getQuantity())
                .lastUpdated(inventory.getLastUpdated())
                .build();
    }

    public static Inventory toEntity(InventoryDto inventoryDto, Branch branch, Product product) {
        return Inventory.builder()
                .branch(branch)
                .product(product)
                .quantity(inventoryDto.getQuantity())
                .build();
    }
}