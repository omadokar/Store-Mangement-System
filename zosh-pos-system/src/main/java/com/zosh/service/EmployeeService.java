package com.zosh.service;

import java.util.List;
import com.zosh.domain.UserRole;
import com.zosh.payload.dto.UserDto;

public interface EmployeeService {

    UserDto createStoreEmployee(UserDto employee, Long storeId);

    UserDto createBranchEmployee(UserDto employee, Long branchId);

    UserDto updateEmployee(Long employeeId, UserDto employee);

    void deleteEmployee(Long employeeId);

    List<UserDto> getAllEmployeesByStoreId(Long storeId, UserRole role);

    List<UserDto> getAllEmployeesByBranchId(Long branchId, UserRole role);

    List<UserDto> getAllEmployee();
}