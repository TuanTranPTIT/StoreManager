package com.rs.storemanagement.service.impl;

import com.rs.storemanagement.model.Item;
import com.rs.storemanagement.repository.ItemRepository;
import com.rs.storemanagement.service.ItemService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {
    private ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public List<Item> findByBillId(int billId) {
        return itemRepository.searchItem(billId);
    }

    @Override
    public Item save(Item Item) {
        return itemRepository.save(Item);
    }

    @Override
    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    @Override
    public Optional<Item> findById(int id) {
        return itemRepository.findById(id);
    }

    @Override
    public void deleteById(int id) {
        itemRepository.deleteById(id);
    }

    @Override
    public void saveAll(List<Item> items){
        itemRepository.saveAll(items);
    }
    @Override
    public void deleteByBillId(Integer billId){
        itemRepository.deleteByBillId(billId);
    }

    @Override
    public void deleteBySupplierId(Integer supplierId) {
        itemRepository.deleteBySupplierId(supplierId);
    }

    @Override
    public List<Item> findBySupplierId(int id) {
        return itemRepository.findBySupplierId(id);
    }

    @Override
    public List<Item> findBySupplierAndKeyword(int supplierId, String keyword) {
        return itemRepository.findBySupplierAndKeyword(supplierId, keyword);
    }
}
