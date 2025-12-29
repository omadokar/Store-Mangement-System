package com.zosh.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.zosh.mapper.InventoryMapper;
import com.zosh.model.Branch;
import com.zosh.model.Inventory;
import com.zosh.model.Product;
import com.zosh.payload.dto.InventoryDto;
import com.zosh.repository.BranchRepository;
import com.zosh.repository.InventoryRepository;
import com.zosh.repository.ProductRepository;
import com.zosh.service.InventoryService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;
    private final BranchRepository branchRepository;
    private final ProductRepository productRepository;

    @Override
    public InventoryDto createInventory(InventoryDto inventoryDto) {
        Branch branch = branchRepository.findById(inventoryDto.getBranchId())
                .orElseThrow(() -> new RuntimeException("Branch Not Found"));
        Product product = productRepository.findById(inventoryDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product Not Found"));
        Inventory inventory = InventoryMapper.toEntity(inventoryDto, branch, product);
        return InventoryMapper.toDto(inventoryRepository.save(inventory));
    }

    @Override
    public InventoryDto updateInventory(Long id, InventoryDto inventoryDto) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory Not Found"));

        inventory.setQuantity(inventoryDto.getQuantity());
        return InventoryMapper.toDto(inventoryRepository.save(inventory));
    }

    @Override
    public void deleteInventory(Long id) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory Not Found"));
        inventoryRepository.delete(inventory);
    }

    @Override
    public InventoryDto getInventoryById(Long id) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory Not Found"));
        return InventoryMapper.toDto(inventory);
    }

    @Override
    public InventoryDto getInventoryByProductIdAndBranchId(Long productId, Long branchId) {
        Inventory inventory = inventoryRepository.findByProductIdAndBranchId(productId, branchId);
        return InventoryMapper.toDto(inventory);
    }

    @Override
    public List<InventoryDto> getAllInventoryByBranchId(Long branchId) {
        List<Inventory> inventories = inventoryRepository.findByBranchId(branchId);
        return inventories.stream().map(InventoryMapper::toDto).collect(Collectors.toList());
    }

}
