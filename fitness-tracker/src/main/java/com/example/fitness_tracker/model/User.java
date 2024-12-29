package com.example.fitness_tracker.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name = "users")  // Add this annotation to specify table name
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    // Auto-generates values for this field (like AUTO_INCREMENT in SQL)
    private Long userId;  // userId is PK

    @Column(nullable = false)   // Creates a column that cannot contain NULL values
    private String name;


    @Column(unique = true, nullable = false)   // Creates a column that must be unique and cannot be NULL
    private String email;


    // @OneToMany defines a one-to-many relationship (one user can have many creatine records)
    // mappedBy tells JPA that the User field in Creatine class owns the relationship
    // cascade means operations on User will cascade to related Creatine records (if you delete a user, their creatine records are deleted)
    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Creatine> creatineIntake = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Workout> workouts = new ArrayList<>();





    public User() {
    }


    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public User(Long userId) {
        this.userId = userId;
    }

}
