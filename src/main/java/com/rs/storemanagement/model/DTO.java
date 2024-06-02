package com.rs.storemanagement.model;

import com.rs.storemanagement.model.Item;

import java.util.List;

public class DTO {
    private List<Item> itemsToSave;
    private String supplierName;

    // Getters và setters
    public List<Item> getItemsToSave() {
        return itemsToSave;
    }

    public void setItemsToSave(List<Item> itemsToSave) {
        this.itemsToSave = itemsToSave;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }
}