package com.zosh.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.zosh.mapper.RefundMapper;
import com.zosh.model.Branch;
import com.zosh.model.Order;
import com.zosh.model.Refund;
import com.zosh.model.User;
import com.zosh.payload.dto.RefundDto;
import com.zosh.repository.OrderRepository;
import com.zosh.repository.RefundRepository;
import com.zosh.service.RefundService;
import com.zosh.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefundServiceImpl implements RefundService {

    private final UserService userService;
    private final RefundRepository refundRepository;
    private final OrderRepository orderRepository;

    @Override
    public RefundDto createRefund(RefundDto refundDto) {
        User cashier = null;
        if (refundDto.getCashierId() != null) {
            cashier = userService.getUserById(refundDto.getCashierId());
        } else if (refundDto.getCashier() != null && refundDto.getCashier().getId() != null) {
            cashier = userService.getUserById(refundDto.getCashier().getId());
        } else {
            cashier = userService.getCurrentUser();
        }

        Order order = orderRepository.findById(refundDto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Branch branch = order.getBranch();
        Refund refund = Refund.builder()
                .order(order)
                .reason(refundDto.getReason())
                .amount(refundDto.getAmount())
                .cashier(cashier)
                .branch(branch)
                .createdAt(LocalDateTime.now())
                .paymentType(refundDto.getPaymentType())
                .build();
        Refund savedRefund = refundRepository.save(refund);
        return RefundMapper.toDto(savedRefund);
    }

    @Override
    public List<RefundDto> getAllRefunds() {
        List<Refund> refunds = refundRepository.findAll();
        return refunds.stream().map(RefundMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public RefundDto getRefundById(Long id) {
        Refund refund = refundRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Refund not found"));
        return RefundMapper.toDto(refund);
    }

    @Override
    public void deleteRefund(Long id) {
        this.getRefundById(id);
        refundRepository.deleteById(id);
    }

    @Override
    public List<RefundDto> getRefundByShiftReportId(Long shiftReportId) {
        List<Refund> refunds = refundRepository.findByShiftReportId(shiftReportId);
        return refunds.stream().map(RefundMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<RefundDto> getRefundByCashierIdAndDateRange(Long cashierId, LocalDateTime startDate,
            LocalDateTime endDate) {
        List<Refund> refunds = refundRepository.findByCashierIdAndCreatedAtBetween(cashierId, startDate, endDate);
        return refunds.stream().map(RefundMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<RefundDto> getRefundByBranchId(Long branchId) {
        List<Refund> refunds = refundRepository.findByBranchId(branchId);
        return refunds.stream().map(RefundMapper::toDto).collect(Collectors.toList());
    }

}
