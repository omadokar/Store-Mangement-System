package com.zosh.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.zosh.model.ShiftReport;
import com.zosh.model.User;

public interface ShiftReportRepository extends JpaRepository<ShiftReport, Long> {

    List<ShiftReport> findAllByCashierId(Long cashierId);

    List<ShiftReport> findAllByBranchId(Long branchId);

    Optional<ShiftReport> findByCashierIdAndShiftStartTime(Long cashierId, LocalDateTime shiftStartTime);

    Optional<ShiftReport> findTopByCashierAndShiftEndTimeIsNullOrderByShiftStartTimeDesc(User cashier);

    Optional<ShiftReport> findTopByCashierAndShiftStartTimeBetween(User cashier, LocalDateTime shiftStartTime,
            LocalDateTime shiftEndTime);

}