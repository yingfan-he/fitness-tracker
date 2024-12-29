package com.example.fitness_tracker.repository;

import com.example.fitness_tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {// this repository will manage User types, which have a PK type of Long
    User findByEmail(String email);
    List<User> findByName(String name);
}
