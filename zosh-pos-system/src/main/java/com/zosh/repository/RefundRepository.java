package com.zosh.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.zosh.model.Refund;

public interface RefundRepository extends JpaRepository<Refund, Long> {

    List<Refund> findByCashierIdAndCreatedAtBetween(Long cashierId, LocalDateTime startDate, LocalDateTime endDate);

    List<Refund> findByCashierId(Long id);

    List<Refund> findByShiftReportId(Long shiftReportId);

    List<Refund> findByBranchId(Long id);
}