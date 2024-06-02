package com.rs.storemanagement.repository;

import com.rs.storemanagement.model.Product;
import com.rs.storemanagement.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
    @Query(value = "SELECT * FROM supplier s WHERE s.name LIKE %:keyword%", nativeQuery = true)
    List<Supplier> searchSuppliers(@Param("keyword") String keyword);

    @Query(value = "SELECT * FROM supplier s WHERE" +
            " s.name = %:name% LIMIT 1", nativeQuery = true)
    Supplier findByName(@Param("name") String name);
}
