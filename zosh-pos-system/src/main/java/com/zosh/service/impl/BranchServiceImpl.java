package com.zosh.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.zosh.domain.UserRole;
import com.zosh.mapper.BranchMapper;
import com.zosh.model.Branch;
import com.zosh.model.Store;
import com.zosh.model.User;
import com.zosh.payload.dto.BranchDto;
import com.zosh.repository.BranchRepository;
import com.zosh.repository.StoreRepository;
import com.zosh.service.BranchService;
import com.zosh.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    private final BranchRepository branchRepository;
    private final StoreRepository storeRepository;
    private final UserService userService;

    @Override
    public BranchDto createBranch(BranchDto branchDto) {

        if (branchDto.getStoreId() == null) {
            if (branchDto.getStore() != null) {
                branchDto.setStoreId(branchDto.getStore().getId());
            } else {
                throw new IllegalArgumentException("Store ID is required");
            }
        }

        Store store = storeRepository.findById(branchDto.getStoreId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Store not found"));
        User currentUser = userService.getCurrentUser();
        checkAuthority(currentUser, store);
        Branch branch = BranchMapper.toEntity(branchDto, store);
        branch = branchRepository.save(branch);
        return BranchMapper.toDto(branch);
    }

    @Override
    public BranchDto updateBranch(Long branchId, BranchDto branchDto) {
        Branch existing = branchRepository.findById(branchId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Branch not found"));
        User currentUser = userService.getCurrentUser();
        checkAuthority(currentUser, existing.getStore());
        existing.setName(branchDto.getName());
        existing.setAddress(branchDto.getAddress());
        existing.setEmail(branchDto.getEmail());
        existing.setPhone(branchDto.getPhone());
        existing.setOpenTime(branchDto.getOpenTime());
        existing.setCloseTime(branchDto.getCloseTime());
        existing.setWorkingDays(branchDto.getWorkingDays());
        existing.setUpdatedAt(LocalDateTime.now());
        existing = branchRepository.save(existing);
        return BranchMapper.toDto(existing);
    }

    @Override
    public void deleteBranch(Long id) {
        Branch existing = branchRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Branch not found"));
        User currentUser = userService.getCurrentUser();
        checkAuthority(currentUser, existing.getStore());
        branchRepository.delete(existing);
    }

    @Override
    public List<BranchDto> getAllBranchesByStoreId(Long storeId) {
        List<Branch> branches = branchRepository.findAllByStoreId(storeId);
        return branches.stream().map(BranchMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public BranchDto getBranchById(Long id) {
        Branch existing = branchRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Branch not found"));
        return BranchMapper.toDto(existing);
    }

    private void checkAuthority(User user, Store store) {
        boolean isAdmin = user.getRole().equals(UserRole.ROLE_BRANCH_MANAGER);
        boolean isStoreAdmin = user.getRole().equals(UserRole.ROLE_STORE_ADMIN);
        boolean isOwner = Objects.equals(user.getId(), store.getStoreAdmin().getId());

        if (!(isAdmin || (isStoreAdmin && isOwner))) {
            throw new AccessDeniedException("User not permitted to perform this action on the store.");
        }
    }

}
