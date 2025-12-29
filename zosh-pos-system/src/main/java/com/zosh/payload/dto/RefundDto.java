package com.zosh.payload.dto;

import java.time.LocalDateTime;
import com.zosh.domain.PaymentType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefundDto {

    private Long id;

    private OrderDto order;

    private Long orderId;

    private String reason;

    private Double amount;

    // private ShiftReport shiftReport;

    private Long shiftReportId;

    private UserDto cashier;

    private Long cashierId;

    private String cashierName;

    private BranchDto branch;

    private Long branchId;

    private LocalDateTime createdAt;

    private PaymentType paymentType;
}
