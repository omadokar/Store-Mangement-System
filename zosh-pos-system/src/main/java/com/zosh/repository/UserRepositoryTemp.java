package com.zosh.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.zosh.model.Store;
import com.zosh.model.User;

public interface UserRepositoryTemp extends JpaRepository<User, Long> {

    User findByEmail(String email);

    List<User> findByStore(Store store);

    List<User> findByBranchId(Long branchId);

}
