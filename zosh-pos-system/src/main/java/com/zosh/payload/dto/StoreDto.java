package com.zosh.payload.dto;

import java.time.LocalDateTime;
import com.zosh.domain.StoreStatus;
import com.zosh.model.StoreContact;
import lombok.Data;

@Data
public class StoreDto {

    private Long id;

    private String brand;

    private UserDto storeAdmin;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String description;

    private String storeType;

    private StoreStatus status;

    private StoreContact Contact;
}
