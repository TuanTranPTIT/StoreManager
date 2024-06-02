package com.rs.storemanagement.repository;

import com.rs.storemanagement.model.Product;
import com.rs.storemanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "SELECT * FROM user u WHERE" +
            " u.email LIKE %:email% AND "+
            " u.password LIKE %:password%", nativeQuery = true)
    User findByEnP(@Param("email") String email,@Param("password") String password);

    boolean existsByEmail(String email);

}
