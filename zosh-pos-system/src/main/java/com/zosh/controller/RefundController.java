package com.zosh.controller;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.zosh.payload.dto.RefundDto;
import com.zosh.payload.response.ApiResponse;
import com.zosh.service.RefundService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/refund")
public class RefundController {

    private final RefundService refundService;

    // done
    @PostMapping
    public ResponseEntity<RefundDto> createRefund(@RequestBody RefundDto refundDto) {
        RefundDto refund = refundService.createRefund(refundDto);
        return ResponseEntity.ok(refund);
    }

    // done
    @GetMapping
    public ResponseEntity<List<RefundDto>> getAllRefunds() {
        return ResponseEntity.ok(refundService.getAllRefunds());
    }

    // done
    @GetMapping("/{id}")
    public ResponseEntity<RefundDto> getRefundById(@PathVariable Long id) {
        return ResponseEntity.ok(refundService.getRefundById(id));
    }

    // done
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteRefund(@PathVariable Long id) {
        refundService.deleteRefund(id);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Refund Deleted Successfully");
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/shift/{shiftId}")
    public ResponseEntity<List<RefundDto>> getRefundByShiftReportId(@PathVariable Long shiftId) {
        return ResponseEntity.ok(refundService.getRefundByShiftReportId(shiftId));
    }

    // done
    @GetMapping("/cashier/{cashierId}/range")
    public ResponseEntity<List<RefundDto>> getRefundByCashierIdAndDateRange(@PathVariable Long cashierId,
            @RequestParam LocalDateTime startDate, @RequestParam LocalDateTime endDate) {
        return ResponseEntity.ok(refundService.getRefundByCashierIdAndDateRange(cashierId, startDate, endDate));
    }

    // done
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<RefundDto>> getRefundByBranchId(@PathVariable Long branchId) {
        return ResponseEntity.ok(refundService.getRefundByBranchId(branchId));
    }
}