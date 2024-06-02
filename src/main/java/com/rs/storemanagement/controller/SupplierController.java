package com.rs.storemanagement.controller;

import com.rs.storemanagement.model.Item;
import com.rs.storemanagement.model.Product;
import com.rs.storemanagement.model.Supplier;
import com.rs.storemanagement.service.BillService;
import com.rs.storemanagement.service.ItemService;
import com.rs.storemanagement.service.ProductService;
import com.rs.storemanagement.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;
    @Autowired
    private ItemService itemService;
    @Autowired
    private BillService billService;
    @Autowired
    private ProductService productService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping("/supplier/create")
    public Supplier create(@RequestBody Supplier supplier){
        return supplierService.save(supplier);
    }

    @GetMapping("/suppliers")
    public List<Supplier> getAll(){
        return supplierService.findAll();
    }

    @GetMapping("/supplier")
    public Supplier getById(@RequestParam(name="id") int id){
        return (Supplier) supplierService.findById(id).orElse(null);
    }

    @GetMapping("/suppliers/search")
    public List<Supplier> searchSuppliers(@RequestParam("keyword") String keyword) {
        return supplierService.findByKeyword(keyword);
    }
    @GetMapping("/supplier/name")
    public Supplier getSupplierByName(@RequestParam("name") String name) {
        return supplierService.findByName(name);
    }

    @DeleteMapping("/supplier/delete")
    public void delete(@RequestParam(name="id") int id){
        List<Integer> listOldQuantity = new ArrayList<>();
        List<Item> oldItems = itemService.findBySupplierId(id);
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

        itemService.deleteBySupplierId(id);
        billService.deleteBySupplierId(id);
        supplierService.deleteById(id);
    }

    @PutMapping("/supplier/update")
    public void update(@RequestBody Supplier supplier){
        supplierService.save(supplier);
    }
}

