package com.rs.storemanagement.controller;

import com.rs.storemanagement.model.User;
import com.rs.storemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        return userService.findUserByEnP(user.getEmail(), user.getPassword());
    }
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // Kiểm tra xem email đã tồn tại trong hệ thống chưa
        if (userService.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng. Vui lòng chọn email khác.");
        }

        return userService.save(user);}
}
