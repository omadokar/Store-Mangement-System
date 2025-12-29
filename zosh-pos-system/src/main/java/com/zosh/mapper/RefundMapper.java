package com.zosh.mapper;

import com.zosh.model.Refund;
import com.zosh.payload.dto.RefundDto;

public class RefundMapper {

    public static RefundDto toDto(Refund refund) {
        if (refund == null)
            return null;

        return RefundDto.builder()
                .id(refund.getId())
                .orderId(refund.getOrder() != null ? refund.getOrder().getId() : null)
                .reason(refund.getReason())
                .amount(refund.getAmount())
                .cashierId(refund.getCashier() != null ? refund.getCashier().getId() : null)
                .cashierName(refund.getCashier() != null ? refund.getCashier().getFullName() : null)
                .branchId(refund.getBranch() != null ? refund.getBranch().getId() : null)
                .createdAt(refund.getCreatedAt())
                .paymentType(refund.getPaymentType())
                .build();
    }

}
