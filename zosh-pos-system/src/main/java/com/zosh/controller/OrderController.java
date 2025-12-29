package com.zosh.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.zosh.service.OrderService;
import com.zosh.domain.OrderStatus;
import com.zosh.domain.PaymentType;
import com.zosh.payload.dto.OrderDto;
import com.zosh.payload.response.ApiResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // done
    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
        return ResponseEntity.ok(orderService.createOrder(orderDto));
    }

    // done
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Order Deleted Successfully");
        return ResponseEntity.ok(apiResponse);
    }

    // done
    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    // done
    @GetMapping("/today/branch/{branchId}")
    public ResponseEntity<List<OrderDto>> getOrderByBranch(@PathVariable Long branchId,
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) Long cashierId,
            @RequestParam(required = false) PaymentType paymentType,
            @RequestParam(required = false) OrderStatus status) {
        return ResponseEntity.ok(orderService.getOrderByBranch(branchId, customerId, cashierId, paymentType, status));
    }

    // done
    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<OrderDto>> getOrderByCashier(@PathVariable Long cashierId) {
        return ResponseEntity.ok(orderService.getOrderByCashier(cashierId));
    }

    // done
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<OrderDto>> getTodayOrdersByBranchId(@PathVariable Long branchId) {
        return ResponseEntity.ok(orderService.getTodaysOrdersByBranch(branchId));
    }

    // done
    @GetMapping("/recent/{branchId}")
    public ResponseEntity<List<OrderDto>> getTop5RecentOrdersByBranchId(@PathVariable Long branchId) {
        return ResponseEntity.ok(orderService.getTop5RecentOrdersByBranchId(branchId));
    }
}
