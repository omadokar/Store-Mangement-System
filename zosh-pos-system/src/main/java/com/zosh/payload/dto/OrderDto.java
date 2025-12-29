package com.zosh.payload.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.zosh.domain.PaymentType;
import com.zosh.model.Customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {

    private Long id;

    private Double totalAmount;

    private LocalDateTime createdAt;

    private BranchDto branch;

    private Long branchId;

    private Long customerId;

    private UserDto cashier;

    private Customer customer;

    private PaymentType paymentType;

    private List<OrderItemDto> orderItems;

}