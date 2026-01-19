package com.my.ecommerce.service;

import com.my.ecommerce.model.User;
import com.my.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Check if username already exists to prevent duplicates
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        // In a real production app, we would hash the password here (e.g. BCrypt)
        // For this simple project, we will store it as is.
        return userRepository.save(user);
    }

    public User loginUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);

        // Check if user exists AND if password matches
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }
        return null; // Return null if login fails
    }
}