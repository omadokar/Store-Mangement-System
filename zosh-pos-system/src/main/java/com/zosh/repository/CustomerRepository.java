package com.zosh.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.zosh.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String keyword, String email);
}