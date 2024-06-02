package com.rs.storemanagement.service;

import com.rs.storemanagement.model.Supplier;

import java.util.List;
import java.util.Optional;

public interface SupplierService {

    List<Supplier> findByKeyword(String keyword);

    Supplier save(Supplier supplier);

    List<Supplier> findAll();

    Optional<Supplier> findById(int id);

    Supplier findByName(String name);

    //List<Supplier> findByKeyword(String keyword);

    void deleteById(int id);
}
