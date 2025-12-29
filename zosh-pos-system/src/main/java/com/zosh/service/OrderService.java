package com.zosh.service;

import java.util.List;
import com.zosh.domain.OrderStatus;
import com.zosh.domain.PaymentType;
import com.zosh.payload.dto.OrderDto;

public interface OrderService {

    OrderDto createOrder(OrderDto orderDto);

    OrderDto getOrderById(Long id);

    List<OrderDto> getOrderByBranch(Long branchId, Long customerId, Long cashierId, PaymentType paymentType,
            OrderStatus status);

    List<OrderDto> getOrderByCashier(Long cashierId);

    void deleteOrder(Long id);

    List<OrderDto> getTodaysOrdersByBranch(Long branchId);

    List<OrderDto> getOrderByCustomerId(Long customerId);

    List<OrderDto> getTop5RecentOrdersByBranchId(Long branchId);

}
