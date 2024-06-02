package com.rs.storemanagement.controller;

import com.rs.storemanagement.model.*;
import com.rs.storemanagement.service.BillService;
import com.rs.storemanagement.service.ItemService;
import com.rs.storemanagement.service.ProductService;
import com.rs.storemanagement.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api")
public class BillController {
    @Autowired
    private BillService billService;

    @Autowired
    private ItemService itemService;

    @Autowired
    private ProductService productService;
    @Autowired
    private SupplierService supplierService;

    @PostMapping("/bill/save_selected")
    public void saveSelectedItems(@RequestBody DTO data){
        Supplier supplier = supplierService.findByName(data.getSupplierName());
        LocalDate now = LocalDate.now();

        int sum = 0;
        for(Item i : data.getItemsToSave()){
            sum += i.getTotalPrice();
        }
        Bill bill = new Bill(now, supplier.getId(), sum);
        Bill savedBill = billService.save(bill);
        if(savedBill != null) {
            for(Item i : data.getItemsToSave()){
                sum += i.getTotalPrice();
                i.setBillId(savedBill.getId());
                Optional<Product> productOptional = (Optional<Product>) productService.findById(i.getProductId());
                if (productOptional.isPresent()) {
                    Product product = productOptional.get();
                    product.setQuantity(product.getQuantity() + i.getQuantity());
                    productService.save(product);
                }
            }
            itemService.saveAll(data.getItemsToSave());
        }
    }

    @GetMapping("/bills")
    public List<Bill> getAll(){
        return billService.findAll();
    }

    @GetMapping("/bill/search")
    public List<Bill> search(@Param("date") String date){
        date = date.replaceAll("/","-");

        LocalDate newdate = LocalDate.parse(date);
        return billService.search(newdate);
    }

    @GetMapping("/bill/get_item")
    public List<Item> getItemByBillId(@Param("billId") Integer billId){
        return itemService.findByBillId(billId);
    }

    @PutMapping("/bill/update")
    public void updateBill(@RequestBody DTO data){
        Supplier supplier = supplierService.findByName(data.getSupplierName());
        int billId = data.getItemsToSave().get(0).getBillId();
        LocalDate now = LocalDate.parse("2024-01-01");
        Optional<Bill> billOptional = billService.findById(billId);
        if (billOptional.isPresent()) {
            Bill bill = billOptional.get();
            now = bill.getDate();
        }
        List<Integer> listOldQuantity = new ArrayList<>();
        int sum = 0;

        List<Item> oldItems = itemService.findByBillId(billId);
        for (Item i : oldItems){
            listOldQuantity.add(i.getQuantity());
        }
        for (Item i : oldItems){
            int check = 0;
            for (Item j : data.getItemsToSave()){
                if (i.equals(j)){
                    check = 1;
                    break;
                }
            }
            if(check == 0){
                Optional<Product> productOptional = (Optional<Product>) productService.findById(i.getProductId());
                if (productOptional.isPresent()) {
                    listOldQuantity.remove((Integer) i.getQuantity());
                    Product product = productOptional.get();
                    product.setQuantity(product.getQuantity() - itemService.findById(i.getId()).get().getQuantity());
                }
                itemService.deleteById(i.getId());
            }
        }
        for(int i = 0; i <data.getItemsToSave().size(); i++){
            sum += data.getItemsToSave().get(i).getTotalPrice();
        }
        Bill bill = new Bill(billId, now, supplier.getId(), sum);
        Bill savedBill = billService.save(bill);
        if(savedBill != null) {
            for(Item i : data.getItemsToSave()){
                int count = 0;
                Optional<Product> productOptional = (Optional<Product>) productService.findById(i.getProductId());
                if (productOptional.isPresent()) {
                    Product product = productOptional.get();
                    if (i.getId() != 0 && count < listOldQuantity.size()) {
                        product.setQuantity(product.getQuantity() - listOldQuantity.get(count) + i.getQuantity());
                        count++;
                    } else {
                        product.setQuantity(product.getQuantity()+i.getQuantity());
                    }
                    productService.save(product);
                }
            }
            itemService.saveAll(data.getItemsToSave());
        }
    }

    @DeleteMapping("/bill/delete")
    public void deleteBill(@Param("billId") Integer billId){
        List<Integer> listOldQuantity = new ArrayList<>();
        List<Item> oldItems = itemService.findByBillId(billId);
        for (Item i : oldItems){
            listOldQuantity.add(i.getQuantity());
        }
        for (Item i : oldItems){
            Optional<Product> productOptional = (Optional<Product>) productService.findById(i.getProductId());
            if (productOptional.isPresent()) {
                Product product = productOptional.get();
                product.setQuantity(product.getQuantity() - itemService.findById(i.getId()).get().getQuantity());
            }
        }

        itemService.deleteByBillId(billId);
        billService.deleteById(billId);
    }

    @GetMapping("/bill")
    public Bill findBill(@RequestParam ("bill_id") Integer bill_id){
        return (Bill) billService.findById(bill_id).orElse(null);
    }

}
