package com.zosh.payload.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryDto {

    private Long id;

    private BranchDto branch;

    private Long branchId;

    private ProductDto product;

    private Long productId;

    private Integer quantity;

    private LocalDateTime lastUpdated;

}