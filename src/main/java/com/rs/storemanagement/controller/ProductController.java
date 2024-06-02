package com.rs.storemanagement.controller;

import com.rs.storemanagement.model.Product;
import com.rs.storemanagement.model.Supplier;
import com.rs.storemanagement.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @PostMapping("/product/create")
    public ResponseEntity<String> create(@RequestBody Product product){
        // Kiểm tra xem sản phẩm đã tồn tại chưa
        if (productService.findByName(product.getName()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Sản phẩm đã có trong hệ thống! Vui lòng chọn tên khác.");
        }

        // Lưu sản phẩm và trả về phản hồi thành công
        productService.save(product);
        return ResponseEntity.ok("Thêm sản phẩm thành công!");
    }

    @GetMapping("/products")
    public List<Product> getAll(){
        return productService.findAll();
    }

    @GetMapping("/product")
    public Product getById(@RequestParam(name="id") int id){
        return (Product) productService.findById(id).orElse(null);
    }

    @GetMapping("/products/search")
    public List<Product> searchProducts(@RequestParam("keyword") String keyword){
        return productService.findByKeyword(keyword);
    }

    @GetMapping("/product/name")
    public Product getProductByName(@RequestParam("product_name") String name) {
        return productService.findByName(name);
    }

    @DeleteMapping("/product/delete")
    public void delete(@RequestParam(name="id") int id){
        productService.deleteById(id);
    }

    @PutMapping("/product/update")
    public void update(@RequestBody Product product){
        productService.save(product);
    }

}
