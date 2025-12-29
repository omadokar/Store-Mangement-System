package com.zosh.mapper;

import java.util.stream.Collectors;
import com.zosh.model.Order;
import com.zosh.payload.dto.OrderDto;

public class OrderMapper {

    public static OrderDto toDto(Order order) {
        return OrderDto.builder()
                .id(order.getId())
                .createdAt(order.getCreatedAt())
                .branchId(order.getBranch() != null ? order.getBranch().getId() : null)
                .orderItems(order.getOrderItems().stream().map(OrderItemMapper::toDto).collect(Collectors.toList()))
                .cashier(UserMapper.toDTO(order.getCashier()))
                .totalAmount(order.getTotalAmount())
                .customer(order.getCustomer())
                .paymentType(order.getPaymentType())
                .build();
    }
}
