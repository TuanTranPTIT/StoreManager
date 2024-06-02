package com.rs.storemanagement.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int billId;
    private int productId;
    private double inPrice;
    private int quantity;
    private double totalPrice;
    private int supplierId;

    public Item() {
    }

    public Item(int billId, int productId, double inPrice, int quantity, double totalPrice, int supplierId) {
        this.billId = billId;
        this.productId = productId;
        this.inPrice = inPrice;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.supplierId = supplierId;
    }

    public Item(int id, int billId, int productId, double inPrice, int quantity, double totalPrice, int supplierId) {
        this.id = id;
        this.billId = billId;
        this.productId = productId;
        this.inPrice = inPrice;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.supplierId = supplierId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBillId() {
        return billId;
    }

    public void setBillId(int billId) {
        this.billId = billId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public double getInPrice() {
        return inPrice;
    }

    public void setInPrice(double inPrice) {
        this.inPrice = inPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }
}
