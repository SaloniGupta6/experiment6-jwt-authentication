package com.scamguard.backend.service;

import com.scamguard.backend.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserStoreService {

    private final List<User> users = new ArrayList<>();

    public UserStoreService() {
        users.add(new User("Demo User", "user123@gmail.com", "password123"));
    }

    public boolean emailExists(String email) {
        return users.stream().anyMatch(user -> user.getEmail().equalsIgnoreCase(email));
    }

    public User findByEmail(String email) {
        return users.stream()
                .filter(user -> user.getEmail().equalsIgnoreCase(email))
                .findFirst()
                .orElse(null);
    }

    public User saveUser(User user) {
        users.add(user);
        return user;
    }

    public List<User> getAllUsers() {
        return users;
    }
}