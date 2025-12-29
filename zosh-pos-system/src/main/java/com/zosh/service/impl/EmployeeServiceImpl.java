package com.zosh.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.zosh.domain.UserRole;
import com.zosh.mapper.UserMapper;
import com.zosh.model.Branch;
import com.zosh.model.Store;
import com.zosh.model.User;
import com.zosh.payload.dto.UserDto;
import com.zosh.repository.BranchRepository;
import com.zosh.repository.StoreRepository;
import com.zosh.repository.UserRepositoryTemp;
import com.zosh.service.EmployeeService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final UserRepositoryTemp userRepositoryTemp;
    private final StoreRepository storeRepository;
    private final BranchRepository branchRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto createStoreEmployee(UserDto employee, Long storeId) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found"));

        if (userRepositoryTemp.findByEmail(employee.getEmail()) != null) {
            throw new RuntimeException("Email already used with another account");
        }
        Branch branch = null;
        if (employee.getRole() == UserRole.ROLE_BRANCH_MANAGER) {
            if (employee.getBranchId() == null) {
                throw new RuntimeException("Branch id is required");
            }
            branch = branchRepository.findById(employee.getBranchId())
                    .orElseThrow(() -> new RuntimeException("Branch not found"));
        }
        User user = UserMapper.toEntity(employee);
        user.setStore(store);
        user.setBranch(branch);
        user.setPassword(passwordEncoder.encode(employee.getPassword()));
        User savedEmployee = userRepositoryTemp.save(user);
        if (employee.getRole() == UserRole.ROLE_BRANCH_MANAGER && branch != null) {
            branch.setManager(savedEmployee);
            branchRepository.save(branch);
        }
        return UserMapper.toDTO(savedEmployee);
    }

    @Override
    public UserDto createBranchEmployee(UserDto employee, Long branchId) {
        Branch branch = branchRepository.findById(employee.getBranchId())
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        if (userRepositoryTemp.findByEmail(employee.getEmail()) != null) {
            throw new RuntimeException("Email already used with another account");
        }
        if (employee.getRole() == UserRole.ROLE_BRANCH_CASHIER || employee.getRole() == UserRole.ROLE_BRANCH_MANAGER) {
            User user = UserMapper.toEntity(employee);
            user.setBranch(branch);
            user.setPassword(passwordEncoder.encode(employee.getPassword()));
            return UserMapper.toDTO(userRepositoryTemp.save(user));
        } else {
            throw new RuntimeException("Invalid role");
        }
    }

    @Override
    public UserDto updateEmployee(Long employeeId, UserDto employee) {
        User existingEmployee = userRepositoryTemp.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee Not Found"));

        if (employee.getBranchId() != null) {
            Branch branch = branchRepository.findById(employee.getBranchId())
                    .orElseThrow(() -> new RuntimeException("Branch not found"));
            existingEmployee.setBranch(branch);
        }

        if (employee.getFullName() != null) {
            existingEmployee.setFullName(employee.getFullName());
        }
        if (employee.getEmail() != null) {
            existingEmployee.setEmail(employee.getEmail());
        }
        if (employee.getRole() != null) {
            existingEmployee.setRole(employee.getRole());
        }
        if (employee.getPassword() != null) {
            existingEmployee.setPassword(passwordEncoder.encode(employee.getPassword()));
        }

        return UserMapper.toDTO(userRepositoryTemp.save(existingEmployee));
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        User existingEmployee = userRepositoryTemp.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee Not Found"));
        userRepositoryTemp.delete(existingEmployee);
    }

    @Override
    public List<UserDto> getAllEmployeesByStoreId(Long storeId, UserRole role) {
        Store store = storeRepository.findById(storeId).orElseThrow(() -> new RuntimeException("Store not found"));
        return userRepositoryTemp.findByStore(store).stream().map(UserMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<UserDto> getAllEmployeesByBranchId(Long branchId, UserRole role) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new RuntimeException("Branch not found"));
        return userRepositoryTemp.findByBranchId(branchId).stream().map(UserMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<UserDto> getAllEmployee() {
        return userRepositoryTemp.findAll().stream().map(UserMapper::toDTO).collect(Collectors.toList());
    }
}
