package com.my.ecommerce.controller;

import com.my.ecommerce.model.User;
import com.my.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5500") // Adjust this if your frontend port changes
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.registerUser(user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }
    // This is Endpoint to handle Google Login
    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody java.util.Map<String, String> payload) {
        String email = payload.get("email");
        String name = payload.get("name");

        if (email == null || name == null) {
            return ResponseEntity.badRequest().body("Invalid Google Data");
        }

        // Call the service method we just wrote
        return ResponseEntity.ok(userService.loginWithGoogle(email, name));
    }

}

