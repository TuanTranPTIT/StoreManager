package com.rs.storemanagement.service.impl;

import com.rs.storemanagement.model.Bill;
import com.rs.storemanagement.model.Product;
import com.rs.storemanagement.repository.BillRepository;
import com.rs.storemanagement.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BillServiceImpl implements BillService {

    private BillRepository billRepository;


    @Autowired
    public BillServiceImpl(BillRepository billRepository) {
        this.billRepository = billRepository;
    }
    @Override
    public Bill save(Bill bill){
        return billRepository.save(bill);
    }

    @Override
    public List<Bill> search(LocalDate date) {
        return billRepository.searchBillByDate(date);
    }
    @Override
    public List<Bill> findAll() {
        return billRepository.findAll();
    }

    @Override
    public Optional<Bill> findById(int id) {
        return billRepository.findById(id);
    }

    @Override
    public void deleteBySupplierId(Integer supplierId) {
        billRepository.deleteBySupplierId(supplierId);
    }

    @Override
    public void deleteById(int id) {
        billRepository.deleteById(id);
    }
}
