package com.zosh.service;

import java.time.LocalDateTime;
import java.util.List;
import com.zosh.payload.dto.RefundDto;

public interface RefundService {

    RefundDto createRefund(RefundDto refund);

    List<RefundDto> getAllRefunds();

    RefundDto getRefundById(Long id);

    void deleteRefund(Long id);

    List<RefundDto> getRefundByShiftReportId(Long shiftReportId);

    List<RefundDto> getRefundByCashierIdAndDateRange(Long cashierId, LocalDateTime startDate, LocalDateTime endDate);

    List<RefundDto> getRefundByBranchId(Long branchId);
}
