package net.christmas_wishlist.demo.controller;

import net.christmas_wishlist.demo.model.User;
import net.christmas_wishlist.demo.service.UserService;
import net.christmas_wishlist.demo.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


//TODO: add logger statements for login and create user methods
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserService userService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        user.setId(generateUniqueId()); // Add method to generate unique ID
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        boolean isCreated = userService.addUser(user);
        if (isCreated) {
            logger.info("User created successfully: {}", user.getUsername());
            return ResponseEntity.ok("User created successfully");
        } else {
            logger.warn("User already exists: {}", user.getUsername());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }
    }

    private Long generateUniqueId() {
        return System.currentTimeMillis(); // Simple example - consider using a more robust method
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        UserDetails userDetails = userService.loadUserByUsername(username);

        if (userDetails != null && passwordEncoder.matches(password, userDetails.getPassword())) {
            String token = jwtUtil.generateToken(userDetails);
            logger.info("User logged in successfully: {}", username);
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            logger.warn("Invalid login attempt for username: {}", username);
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}