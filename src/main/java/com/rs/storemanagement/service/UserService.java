package com.rs.storemanagement.service;

import com.rs.storemanagement.model.User;

public interface UserService {
    User findUserByEnP(String email, String password);
    User save(User user);
    boolean existsByEmail(String email);
}
