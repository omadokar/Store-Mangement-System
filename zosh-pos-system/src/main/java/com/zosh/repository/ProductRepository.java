package com.zosh.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.zosh.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByStoreId(Long id);

    @Query("select p from Product p " +
            "where p.store.id = :storeId " +
            "and (p.name like concat('%', :query, '%')) " +
            "or (p.brand like concat('%', :query, '%')) " +
            "or (p.sku like concat('%', :query, '%'))")
    List<Product> searchByKeyword(@Param("storeId") Long storeId, @Param("query") String query);
}