package com.zosh.service;

import java.time.LocalDateTime;
import java.util.List;
import com.zosh.payload.dto.ShiftReportDto;

public interface ShiftReportService {

    ShiftReportDto startShift() throws Exception;

    ShiftReportDto endShift() throws Exception;

    ShiftReportDto getShiftReportById(Long shiftReportId);

    List<ShiftReportDto> getAllShiftReports();

    List<ShiftReportDto> getShiftReportsByBranchId(Long branchId);

    List<ShiftReportDto> getShiftReportsByCashierId(Long cashierId);

    ShiftReportDto getCurrentShiftProgress(Long cashierId) throws Exception;

    ShiftReportDto getShiftReportCashierAndDate(Long cashierId, LocalDateTime date) throws Exception;
}
