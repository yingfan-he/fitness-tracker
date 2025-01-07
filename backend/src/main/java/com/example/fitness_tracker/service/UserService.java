package com.example.fitness_tracker.service;

import com.example.fitness_tracker.model.User;
import com.example.fitness_tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {  // can only call on methods that I defined in the UserRepository.java file
    @Autowired  // Tells Spring to automatically inject (connect) a UserRepository instance here
    private UserRepository userRepository; // Instead creating UserRepository with "new", Spring manages its lifecycle


    public User createUser(User user) {  // method to create new user
        return userRepository.save(user); // creates a new row in DB
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getUserByName(String name) {
        return userRepository.findByName(name);
    }

    public void deleteUser(Long id) {
        User user = getUserById(id); // check if user exists first
        userRepository.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long id, User user) {
        User userToUpdate = getUserById(id);
        userToUpdate.setName(user.getName());
        userToUpdate.setEmail(user.getEmail());
        return userRepository.save(userToUpdate);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

    }

    // Working on service layer***** 12-23-2024

}
