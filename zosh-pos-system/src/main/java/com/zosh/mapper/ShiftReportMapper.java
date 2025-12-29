package com.zosh.mapper;

import java.util.List;
import java.util.stream.Collectors;
import com.zosh.model.Order;
import com.zosh.model.Product;
import com.zosh.model.Refund;
import com.zosh.model.ShiftReport;
import com.zosh.payload.dto.OrderDto;
import com.zosh.payload.dto.ProductDto;
import com.zosh.payload.dto.RefundDto;
import com.zosh.payload.dto.ShiftReportDto;

public class ShiftReportMapper {

    public static ShiftReportDto shiftReportToShiftReportDto(ShiftReport shiftReport) {
        ShiftReportDto.ShiftReportDtoBuilder builder = ShiftReportDto.builder()
                .id(shiftReport.getId())
                .shiftStartTime(shiftReport.getShiftStartTime())
                .shiftEndTime(shiftReport.getShiftEndTime())
                .totalRefunds(shiftReport.getTotalRefunds())
                .totalSales(shiftReport.getTotalSales())
                .netSales(shiftReport.getNetSales())
                .totalOrders(shiftReport.getTotalOrders())
                .cashier(UserMapper.toDTO(shiftReport.getCashier()))
                .cashierId(shiftReport.getCashier().getId())
                .paymentSummaries(shiftReport.getPaymentSummaries())
                .products(mapProducts(shiftReport.getProducts()))
                .recentOrders(mapOrders(shiftReport.getRecentOrders()))
                .refunds(mapRefunds(shiftReport.getRefunds()));

        if (shiftReport.getBranch() != null) {
            builder.branch(BranchMapper.toDto(shiftReport.getBranch()))
                    .branchId(shiftReport.getBranch().getId());
        }

        return builder.build();
    }

    public static List<ProductDto> mapProducts(List<Product> products) {
        return products.stream().map(ProductMapper::toDto).collect(Collectors.toList());
    }

    public static List<OrderDto> mapOrders(List<Order> orders) {
        return orders.stream().map(OrderMapper::toDto).collect(Collectors.toList());
    }

    public static List<RefundDto> mapRefunds(List<Refund> refunds) {
        return refunds.stream().map(RefundMapper::toDto).collect(Collectors.toList());
    }
}
