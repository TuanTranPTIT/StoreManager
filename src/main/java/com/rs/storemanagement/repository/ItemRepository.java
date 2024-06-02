package com.rs.storemanagement.repository;

import com.rs.storemanagement.model.Item;
import com.rs.storemanagement.model.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Query(value = "SELECT * FROM item i WHERE i.bill_id = %:billId% ", nativeQuery = true)
    List<Item> searchItem(@Param("billId") Integer billId);

    @Transactional
    void deleteByBillId(Integer billId);

    @Transactional
    void deleteBySupplierId(Integer supplierId);

    @Query(value = "SELECT * FROM item i WHERE i.supplier_id = %:supplierId% ", nativeQuery = true)
    List<Item> findBySupplierId(@Param("supplierId") Integer supplierId);

    @Query(value = "SELECT i.* FROM item i JOIN product p ON i.product_id = p.id WHERE p.name LIKE %:keyword% AND i.supplier_id = :supplierId", nativeQuery = true)
    List<Item> findBySupplierAndKeyword(@Param("supplierId") Integer supplierId, @Param("keyword") String keyword);
}
