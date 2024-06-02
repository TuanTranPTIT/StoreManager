package com.rs.storemanagement.service;

import com.rs.storemanagement.model.Bill;
import com.rs.storemanagement.model.Product;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BillService {
    Bill save(Bill bill);
    List<Bill> search(LocalDate date);
    List<Bill> findAll();
    Optional<Bill> findById(int id);
    void deleteBySupplierId(Integer supplierId);
    void deleteById(int id);
}

