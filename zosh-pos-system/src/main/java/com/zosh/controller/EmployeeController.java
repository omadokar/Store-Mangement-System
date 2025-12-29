package com.zosh.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.zosh.domain.UserRole;
import com.zosh.payload.dto.UserDto;
import com.zosh.payload.response.ApiResponse;
import com.zosh.service.EmployeeService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    // done
    @PostMapping("/store/{storeId}")
    public ResponseEntity<UserDto> createEmployee(@RequestBody UserDto employee, @PathVariable Long storeId) {
        return ResponseEntity.ok(employeeService.createStoreEmployee(employee, storeId));
    }

    // done
    @PostMapping("/branch/{branchId}")
    public ResponseEntity<UserDto> createBranchEmployee(@RequestBody UserDto employee, @PathVariable Long branchId) {
        return ResponseEntity.ok(employeeService.createBranchEmployee(employee, branchId));
    }

    // done
    @PutMapping("/{employeeId}")
    public ResponseEntity<UserDto> updateEmployee(@RequestBody UserDto employee, @PathVariable Long employeeId) {
        return ResponseEntity.ok(employeeService.updateEmployee(employeeId, employee));
    }

    // done
    @DeleteMapping("/{employeeId}")
    public ResponseEntity<ApiResponse> deleteEmployee(@PathVariable Long employeeId) {
        employeeService.deleteEmployee(employeeId);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Employee Deleted Successfully");
        return ResponseEntity.ok(apiResponse);
    }

    // done
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<UserDto>> getAllEmployeesByStoreId(@PathVariable Long storeId,
            @RequestParam UserRole role) {
        return ResponseEntity.ok(employeeService.getAllEmployeesByStoreId(storeId, role));
    }

    // done
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<UserDto>> getAllEmployeesByBranchId(@PathVariable Long branchId,
            @RequestParam UserRole role) {
        return ResponseEntity.ok(employeeService.getAllEmployeesByBranchId(branchId, role));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployee());
    }
}
