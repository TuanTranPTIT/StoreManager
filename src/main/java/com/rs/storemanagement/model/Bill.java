package com.rs.storemanagement.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private LocalDate date;
    private int supplierId;
    private double totalCost;


    public Bill(int id, LocalDate date, int supplierId, double totalCost) {
        this.id = id;
        this.date = date;
        this.supplierId = supplierId;
        this.totalCost = totalCost;
    }

    public Bill(LocalDate date, int supplierId, double totalCost) {
        this.date = date;
        this.supplierId = supplierId;
        this.totalCost = totalCost;
    }

    public Bill() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getsupplierId() {
        return supplierId;
    }

    public void setsupplierId( int supplierId) {
        this.supplierId = supplierId;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }
}
