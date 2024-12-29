package com.example.fitness_tracker.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
public class Creatine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long creatine_id;


    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    // Creates a column in the creatine table called user_id which will serve as FK that references the User table's PK
    private User user;


    @Column(nullable = false)
    private boolean taken;    // More descriptive than 'completed'

    // Default constructor
    public Creatine() {
    }

    // Constructor with fields
    public Creatine(Date date, User user, boolean taken) {
        this.date = date;
        this.user = user;
        this.taken = taken;
    }
}
