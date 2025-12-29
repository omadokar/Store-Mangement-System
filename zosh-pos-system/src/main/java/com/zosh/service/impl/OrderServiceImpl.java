package com.zosh.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;
import com.zosh.domain.OrderStatus;
import com.zosh.domain.PaymentType;
import com.zosh.mapper.OrderMapper;
import com.zosh.model.Branch;
import com.zosh.model.Order;
import com.zosh.model.OrderItem;
import com.zosh.model.Product;
import com.zosh.model.User;
import com.zosh.payload.dto.OrderDto;
import com.zosh.repository.OrderRepository;
import com.zosh.repository.ProductRepository;
import com.zosh.service.OrderService;
import com.zosh.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final ProductRepository productRepository;

    @Override
    public OrderDto createOrder(OrderDto orderDto) {
        User cashier = userService.getCurrentUser();
        Branch branch = cashier.getBranch();
        Order order = Order.builder()
                .branch(branch)
                .cashier(cashier)
                .customer(orderDto.getCustomer())
                .paymentType(orderDto.getPaymentType())
                .build();
        List<OrderItem> orderItems = orderDto.getOrderItems().stream().map(
                items -> {
                    Product product = productRepository.findById(items.getProductId())
                            .orElseThrow(() -> new RuntimeException("Product not found"));
                    return OrderItem.builder()
                            .order(order)
                            .product(product)
                            .quantity(items.getQuantity().longValue())
                            .price(items.getPrice() != null ? items.getPrice()
                                    : product.getSellingPrice() * items.getQuantity())
                            .build();
                }).collect(Collectors.toList());
        double totalAmount = orderItems.stream().mapToDouble(OrderItem::getPrice).sum();
        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems);
        Order saved = orderRepository.save(order);
        return OrderMapper.toDto(saved);
    }

    @Override
    public OrderDto getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return OrderMapper.toDto(order);
    }

    @Override
    public List<OrderDto> getOrderByBranch(Long branchId, Long customerId, Long cashierId, PaymentType paymentType,
            OrderStatus status) {
        List<Order> orders = orderRepository.findByBranchId(branchId);
        return orders.stream().map(OrderMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getOrderByCashier(Long cashierId) {
        List<Order> orders = orderRepository.findByCashierId(cashierId);
        return orders.stream().map(OrderMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public List<OrderDto> getTodaysOrdersByBranch(Long branchId) {
        List<Order> orders = orderRepository.findByBranchIdAndCreatedAtBetween(branchId,
                LocalDateTime.now().minusDays(1), LocalDateTime.now());
        return orders.stream().map(OrderMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getOrderByCustomerId(Long customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        return orders.stream().map(OrderMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getTop5RecentOrdersByBranchId(Long branchId) {
        List<Order> orders = orderRepository.findTop5ByBranchIdOrderByCreatedAtDesc(branchId);
        return orders.stream().map(OrderMapper::toDto).collect(Collectors.toList());
    }

}
