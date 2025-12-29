package com.zosh.payload.dto;

import java.time.LocalDateTime;
import java.util.List;
import com.zosh.model.PaymentSummary;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShiftReportDto {
    private Long id;

    private LocalDateTime shiftStartTime;

    private LocalDateTime shiftEndTime;

    private Double totalRefunds;

    private Double totalSales;

    private Double netSales;

    private int totalOrders;

    private UserDto cashier;

    private BranchDto branch;

    private Long branchId;

    private Long cashierId;

    private List<PaymentSummary> paymentSummaries;

    private List<ProductDto> products;

    private List<OrderDto> recentOrders;

    private List<RefundDto> refunds;
}
