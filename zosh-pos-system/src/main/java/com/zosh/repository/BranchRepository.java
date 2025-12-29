package com.zosh.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.zosh.model.Branch;

public interface BranchRepository extends JpaRepository<Branch, Long> {
    List<Branch> findAllByStoreId(Long storeId);
}
