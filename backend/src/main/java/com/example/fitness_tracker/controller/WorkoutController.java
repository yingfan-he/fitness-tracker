package com.example.fitness_tracker.controller;

import com.example.fitness_tracker.model.Workout;
import com.example.fitness_tracker.model.User;
import com.example.fitness_tracker.repository.WorkoutRepository;
import com.example.fitness_tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new workout
    @PostMapping
    public ResponseEntity<Workout> createWorkout(@RequestBody Workout workout, Principal principal) {
        try {
            // Get the authenticated user's email from the JWT token
            String email = principal.getName();

            // Fetch the user from the database
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Associate the workout with the user
            workout.setUser(user);

            // Save the workout
            Workout createdWorkout = workoutRepository.save(workout);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkout);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get all workouts for the authenticated user
    @GetMapping
    public ResponseEntity<List<Workout>> getAllWorkouts(Principal principal) {
        try {
            // Get the authenticated user's email from the JWT token
            String email = principal.getName();

            // Fetch the user from the database
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Fetch all workouts for the user
            List<Workout> workouts = workoutRepository.findByUserUserId(user.getUserId());

            return ResponseEntity.ok(workouts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get a workout by ID
    @GetMapping("/{id}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable Long id, Principal principal) {
        try {
            // Get the authenticated user's email from the JWT token
            String email = principal.getName();

            // Fetch the user from the database
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Fetch the workout by ID
            Optional<Workout> workout = workoutRepository.findById(id);

            if (workout.isPresent() && workout.get().getUser().getUserId().equals(user.getUserId())) {
                return ResponseEntity.ok(workout.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update a workout
    @PutMapping("/{id}")
    public ResponseEntity<Workout> updateWorkout(@PathVariable Long id, @RequestBody Workout workoutDetails, Principal principal) {
        try {
            // Get the authenticated user's email from the JWT token
            String email = principal.getName();

            // Fetch the user from the database
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Fetch the workout by ID
            Optional<Workout> workoutOptional = workoutRepository.findById(id);

            if (workoutOptional.isPresent() && workoutOptional.get().getUser().getUserId().equals(user.getUserId())) {
                Workout workout = workoutOptional.get();

                // Update workout details
                workout.setWorkoutName(workoutDetails.getWorkoutName());
                workout.setMuscleGroup(workoutDetails.getMuscleGroup());
                workout.setSets(workoutDetails.getSets());
                workout.setReps(workoutDetails.getReps());
                workout.setWeight(workoutDetails.getWeight());
                workout.setDate(workoutDetails.getDate());

                // Save the updated workout
                Workout updatedWorkout = workoutRepository.save(workout);

                return ResponseEntity.ok(updatedWorkout);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Delete a workout
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long id, Principal principal) {
        try {
            // Get the authenticated user's email from the JWT token
            String email = principal.getName();

            // Fetch the user from the database
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Fetch the workout by ID
            Optional<Workout> workoutOptional = workoutRepository.findById(id);

            if (workoutOptional.isPresent() && workoutOptional.get().getUser().getUserId().equals(user.getUserId())) {
                // Delete the workout
                workoutRepository.deleteById(id);

                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Workout>> getWorkoutsByUser(@PathVariable Long userId, Principal principal) {
        try {
            // Get the authenticated user's email from the JWT token
            String email = principal.getName();

            // Fetch the user from the database
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Fetch all workouts for the user
            List<Workout> workouts = workoutRepository.findByUserUserId(user.getUserId());

            return ResponseEntity.ok(workouts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/timeline")
    public ResponseEntity<Page<Workout>> getTimeline(@RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 10); // 10 items per page
        Page<Workout> workouts = workoutRepository.findAllWithUser(pageable);
        return ResponseEntity.ok(workouts);
    }
}
