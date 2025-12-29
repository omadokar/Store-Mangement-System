package com.zosh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.zosh.model.Category;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findAllCategoryByStoreId(long storeId);
}