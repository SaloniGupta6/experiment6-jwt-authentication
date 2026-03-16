package com.scamguard.backend.controller;

import com.scamguard.backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // ---------------------------
    // LOGIN API
    // ---------------------------
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> user) {

        String username = user.get("username");
        String password = user.get("password");

        // Dummy authentication for experiment
        if ("user123".equals(username) && "password123".equals(password)) {

            String token = jwtUtil.generateToken(username);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);

            return ResponseEntity.ok(response);
        }

        Map<String, String> error = new HashMap<>();
        error.put("error", "Invalid username or password");

        return ResponseEntity.status(401).body(error);
    }

    // ---------------------------
    // PROTECTED ROUTE
    // ---------------------------
    @GetMapping("/protected")
    public ResponseEntity<Map<String, String>> protectedRoute() {

        Map<String, String> response = new HashMap<>();
        response.put("message", "Access granted to protected route using JWT token");

        return ResponseEntity.ok(response);
    }
}