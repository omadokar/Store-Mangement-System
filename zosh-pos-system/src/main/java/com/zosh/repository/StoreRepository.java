package com.zosh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.zosh.model.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Store findByStoreAdminId(Long adminId);
}
