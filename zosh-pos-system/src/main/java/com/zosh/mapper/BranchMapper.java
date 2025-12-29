package com.zosh.mapper;

import java.time.LocalDateTime;
import com.zosh.model.Branch;
import com.zosh.model.Store;
import com.zosh.payload.dto.BranchDto;

public class BranchMapper {

    public static BranchDto toDto(Branch branch) {
        BranchDto branchDto = BranchDto.builder()
                .id(branch.getId())
                .name(branch.getName())
                .address(branch.getAddress())
                .email(branch.getEmail())
                .phone(branch.getPhone())
                .openTime(branch.getOpenTime())
                .closeTime(branch.getCloseTime())
                .workingDays(branch.getWorkingDays())
                .createdAt(branch.getCreatedAt())
                .updatedAt(branch.getUpdatedAt())
                .build();
        if (branch.getStore() != null) {
            branchDto.setStoreId(branch.getStore().getId());
            branchDto.setStore(StoreMapper.toDto(branch.getStore()));
        }
        if (branch.getManager() != null) {
            branchDto.setManager(UserMapper.toDTO(branch.getManager()));
        }
        return branchDto;
    }

    public static Branch toEntity(BranchDto branchDto, Store store) {
        Branch branch = Branch.builder()
                .id(branchDto.getId())
                .name(branchDto.getName())
                .address(branchDto.getAddress())
                .email(branchDto.getEmail())
                .phone(branchDto.getPhone())
                .openTime(branchDto.getOpenTime())
                .closeTime(branchDto.getCloseTime())
                .workingDays(branchDto.getWorkingDays())
                .store(store)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        return branch;
    }
}