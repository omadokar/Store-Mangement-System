package com.zosh.service;

import java.util.List;
import com.zosh.payload.dto.BranchDto;

public interface BranchService {

    BranchDto createBranch(BranchDto branchDto);

    BranchDto updateBranch(Long branchId, BranchDto branchDto);

    void deleteBranch(Long id);

    List<BranchDto> getAllBranchesByStoreId(Long storeId);

    BranchDto getBranchById(Long id);
}