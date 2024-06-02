package com.rs.storemanagement.service.impl;

import com.rs.storemanagement.model.User;
import com.rs.storemanagement.repository.UserRepository;
import com.rs.storemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository  userRepository;

    @Override
    public User findUserByEnP(String email, String password) {
        return userRepository.findByEnP(email,password);
    }
    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}
