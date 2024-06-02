package com.rs.storemanagement.repository;

import com.rs.storemanagement.model.Bill;
import com.rs.storemanagement.model.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Integer> {
    @Query(value = "SELECT * FROM bill b WHERE b.date = :date", nativeQuery = true)
    List<Bill> searchBillByDate(@Param("date") LocalDate date);

    @Transactional
    void deleteBySupplierId(Integer supplierId);
}
