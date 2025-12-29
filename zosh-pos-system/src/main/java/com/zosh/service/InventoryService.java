package com.zosh.service;

import java.util.List;
import com.zosh.payload.dto.InventoryDto;

public interface InventoryService {

    InventoryDto createInventory(InventoryDto inventoryDto);

    InventoryDto updateInventory(Long id, InventoryDto inventoryDto);

    void deleteInventory(Long id);

    InventoryDto getInventoryById(Long id);

    InventoryDto getInventoryByProductIdAndBranchId(Long productId, Long branchId);

    List<InventoryDto> getAllInventoryByBranchId(Long branchId);

}