package com.zosh.service.impl;

import com.zosh.domain.PaymentType;
import com.zosh.mapper.ShiftReportMapper;
import com.zosh.model.Order;
import com.zosh.model.OrderItem;
import com.zosh.model.PaymentSummary;
import com.zosh.model.Product;
import com.zosh.model.Refund;
import com.zosh.model.ShiftReport;
import com.zosh.model.User;
import com.zosh.payload.dto.ShiftReportDto;
import com.zosh.repository.RefundRepository;
import com.zosh.repository.ShiftReportRepository;
import com.zosh.service.ShiftReportService;
import com.zosh.service.UserService;
import lombok.RequiredArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShiftReportServiceImpl implements ShiftReportService {

    private final ShiftReportRepository shiftReportRepository;
    private final RefundRepository refundRepository;
    private final UserService userService;

    @Override
    public ShiftReportDto startShift() throws Exception {
        User cashier = userService.getCurrentUser();
        LocalDateTime shiftStartTime = LocalDateTime.now();
        LocalDateTime startOfDay = shiftStartTime.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = shiftStartTime.withHour(23).withMinute(59).withSecond(59);

        Optional<ShiftReport> existing = shiftReportRepository.findTopByCashierAndShiftStartTimeBetween(cashier,
                startOfDay, endOfDay);
        if (existing.isPresent()) {
            throw new Exception("Shift is already started for today");
        }

        ShiftReport shiftReport = ShiftReport.builder()
                .cashier(cashier)
                .branch(cashier.getBranch())
                .shiftStartTime(shiftStartTime)
                .build();

        return ShiftReportMapper.shiftReportToShiftReportDto(shiftReportRepository.save(shiftReport));
    }

    @Override
    public ShiftReportDto endShift() throws Exception {
        ShiftReport shiftReport = shiftReportRepository
                .findTopByCashierAndShiftStartTimeBetween(userService.getCurrentUser(),
                        LocalDateTime.now().withHour(0).withMinute(0).withSecond(0),
                        LocalDateTime.now().withHour(23).withMinute(59).withSecond(59))
                .orElseThrow(() -> new Exception("Shift report not found"));
        shiftReport.setShiftEndTime(LocalDateTime.now());
        List<Refund> refunds = refundRepository.findByCashierIdAndCreatedAtBetween(shiftReport.getCashier().getId(),
                shiftReport.getShiftStartTime(), shiftReport.getShiftEndTime());
        List<Order> orders = shiftReport.getRecentOrders();
        double totalRefunds = refunds.stream()
                .mapToDouble(refund -> refund.getAmount() != null ? refund.getAmount() : 0.0).sum();
        double totalSales = orders.stream()
                .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0.0).sum();
        shiftReport.setTotalRefunds(totalRefunds);
        shiftReport.setTotalSales(totalSales);
        shiftReport.setNetSales(totalSales - totalRefunds);
        shiftReport.setTotalOrders(orders.size());
        shiftReport.setRecentOrders(getRecentOrders(orders));
        shiftReport.setProducts(getTopSellingOrders(orders));
        shiftReport.setPaymentSummaries(getPaymentSummaries(orders, totalSales));
        shiftReport.setRefunds(refunds);
        return ShiftReportMapper.shiftReportToShiftReportDto(shiftReportRepository.save(shiftReport));
    }

    private List<PaymentSummary> getPaymentSummaries(List<Order> orders, double totalSales) {
        Map<PaymentType, List<Order>> grouped = orders.stream().collect(
                Collectors.groupingBy(
                        order -> order.getPaymentType() != null ? order.getPaymentType() : PaymentType.CASH));
        List<PaymentSummary> paymentSummaries = new ArrayList<>();
        for (Map.Entry<PaymentType, List<Order>> entry : grouped.entrySet()) {
            double amount = entry.getValue().stream().mapToDouble(Order::getTotalAmount).sum();
            int transactions = entry.getValue().size();
            double percentage = totalSales == 0 ? 0 : (amount / totalSales) * 100;
            PaymentSummary paymentSummary = new PaymentSummary();
            paymentSummary.setPaymentType(entry.getKey());
            paymentSummary.setTotalAmount(amount);
            paymentSummary.setTransactionCount(transactions);
            paymentSummary.setPercentage(percentage);
            paymentSummaries.add(paymentSummary);
        }
        return paymentSummaries;
    }

    private List<Order> getRecentOrders(List<Order> orders) {
        return orders.stream()
                .sorted(Comparator.comparing(Order::getCreatedAt).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }

    private List<Product> getTopSellingOrders(List<Order> orders) {
        Map<Product, Integer> productSalesMap = new HashMap<>();
        for (Order order : orders) {
            for (OrderItem orderItem : order.getOrderItems()) {
                Product product = orderItem.getProduct();
                productSalesMap.put(product,
                        (int) (productSalesMap.getOrDefault(product, 0) + orderItem.getQuantity()));
            }
        }
        return productSalesMap.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .map(Map.Entry::getKey)
                .limit(5)
                .collect(Collectors.toList());
    }

    @Override
    public ShiftReportDto getShiftReportById(Long shiftReportId) {
        ShiftReport shiftReport = shiftReportRepository.findById(shiftReportId)
                .orElseThrow(() -> new RuntimeException("Shift report not found"));
        return ShiftReportMapper.shiftReportToShiftReportDto(shiftReport);
    }

    @Override
    public List<ShiftReportDto> getAllShiftReports() {
        return shiftReportRepository.findAll().stream()
                .map(ShiftReportMapper::shiftReportToShiftReportDto).collect(Collectors.toList());
    }

    @Override
    public List<ShiftReportDto> getShiftReportsByBranchId(Long branchId) {
        return shiftReportRepository.findAllByBranchId(branchId).stream()
                .map(ShiftReportMapper::shiftReportToShiftReportDto).collect(Collectors.toList());
    }

    @Override
    public List<ShiftReportDto> getShiftReportsByCashierId(Long cashierId) {
        return shiftReportRepository.findAllByCashierId(cashierId).stream()
                .map(ShiftReportMapper::shiftReportToShiftReportDto).collect(Collectors.toList());
    }

    @Override
    public ShiftReportDto getCurrentShiftProgress(Long cashierId) throws Exception {
        return shiftReportRepository
                .findTopByCashierAndShiftEndTimeIsNullOrderByShiftStartTimeDesc(userService.getUserById(cashierId))
                .map(ShiftReportMapper::shiftReportToShiftReportDto)
                .orElseThrow(() -> new Exception("No shift report found for cashier"));
    }

    @Override
    public ShiftReportDto getShiftReportCashierAndDate(Long cashierId, LocalDateTime date) throws Exception {
        return shiftReportRepository.findByCashierIdAndShiftStartTime(cashierId, date)
                .map(ShiftReportMapper::shiftReportToShiftReportDto)
                .orElseThrow(() -> new Exception("No shift report found for cashier and date"));
    }

}
