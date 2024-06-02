package com.rs.storemanagement.service.impl;

import com.rs.storemanagement.exception.NotFoundException;
import com.rs.storemanagement.model.Supplier;
import com.rs.storemanagement.repository.SupplierRepository;
import com.rs.storemanagement.service.SupplierService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierServiceImpl implements SupplierService {
    private SupplierRepository supplierRepository;

    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    public List<Supplier> findByKeyword(String keyword) {
        return supplierRepository.searchSuppliers(keyword);
    }

    @Override
    public Supplier save(Supplier supplier) {
        List<Supplier> supplierList = supplierRepository.findAll();

        for (Supplier s : supplierList){
            if(supplier.getName().equals(s.getName()) && supplier.getId() != s.getId()){
                throw new NotFoundException("Tên nhà cung cấp đã có trong hệ thống! Vui lòng chọn lại!");
            }
            if(supplier.getPhone().equals(s.getPhone()) && supplier.getId() != s.getId()){
                throw new NotFoundException("Số điện thoại đã có trong hệ thống! Vui lòng chọn lại!");
            }
            if(supplier.getBank().equals(s.getBank()) && supplier.getId() != s.getId()){
                throw new NotFoundException("Thông tin ngân hàng đã có trong hệ thống! Vui lòng chọn lại!");
            }
        }
        return supplierRepository.save(supplier);
    }

    @Override
    public List<Supplier> findAll() {
        return supplierRepository.findAll();
    }

    @Override
    public Optional<Supplier> findById(int id) {
        return supplierRepository.findById(id);
    }

    @Override
    public Supplier findByName(String name) {
        return supplierRepository.findByName(name);
    }

    @Override
    public void deleteById(int id) {
        supplierRepository.deleteById(id);;
    }

}
