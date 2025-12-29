package com.zosh.model;

import javax.persistence.Embeddable;
import javax.validation.constraints.Email;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreContact {
    private String address;
    private String phone;

    @Email(message = "Invalid Email Format")
    private String email;
}
