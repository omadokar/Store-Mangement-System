package com.zosh.controller;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.zosh.payload.dto.ShiftReportDto;
import com.zosh.service.ShiftReportService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/shift-report")
public class ShiftReportController {

    private final ShiftReportService shiftReportService;

    // done
    @PostMapping("/start")
    public ShiftReportDto startShift() throws Exception {
        return shiftReportService.startShift();
    }

    // done
    @PatchMapping("/end")
    public ShiftReportDto endShift() throws Exception {
        return shiftReportService.endShift();
    }

    // done
    @GetMapping("/{id}")
    public ShiftReportDto getShiftReportById(@PathVariable Long id) {
        return shiftReportService.getShiftReportById(id);
    }

    @GetMapping("/all")
    public List<ShiftReportDto> getAllShiftReports() {
        return shiftReportService.getAllShiftReports();
    }

    @GetMapping("/branch/{branchId}")
    public List<ShiftReportDto> getShiftReportsByBranchId(@PathVariable Long branchId) {
        return shiftReportService.getShiftReportsByBranchId(branchId);
    }

    // done
    @GetMapping("/cashier/{cashierId}")
    public List<ShiftReportDto> getShiftReportsByCashierId(@PathVariable Long cashierId) {
        return shiftReportService.getShiftReportsByCashierId(cashierId);
    }

    // done
    @GetMapping("/current-progress/{cashierId}")
    public ShiftReportDto getCurrentShiftProgress(@PathVariable Long cashierId) throws Exception {
        return shiftReportService.getCurrentShiftProgress(cashierId);
    }

    // done
    @GetMapping("/cashier/{cashierId}/date/{date}")
    public ShiftReportDto getShiftReportCashierAndDate(@PathVariable Long cashierId,
            @PathVariable LocalDateTime date) throws Exception {
        return shiftReportService.getShiftReportCashierAndDate(cashierId, date);
    }
}

// @GetMapping