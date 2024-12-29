package com.example.fitness_tracker.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Data
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workoutId;

    @Column(unique = true, nullable = false)
    private String workoutName;

    @Enumerated(EnumType.STRING) // tells JPA to store the enum as a String
    @Column(nullable = false)
    private MuscleGroup muscleGroup;

    @Column(nullable = false)
    private int sets;

    @Column(nullable = false)
    private int reps;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    public Workout() {
    }

    public Workout(String workoutName, MuscleGroup muscleGroup, int sets, int reps, User user, Date date) {
        this.workoutName = workoutName;
        this.muscleGroup = muscleGroup;
        this.sets = sets;
        this.reps = reps;
        this.user = user;
        this.date = date;
    }


}
