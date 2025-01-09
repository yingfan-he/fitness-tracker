package com.example.fitness_tracker.service;

import com.example.fitness_tracker.model.MuscleGroup;
import com.example.fitness_tracker.model.User;
import com.example.fitness_tracker.model.Workout;
import com.example.fitness_tracker.repository.UserRepository;
import com.example.fitness_tracker.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkoutRepository workoutRepository;

    // Create a new workout for a specific user
    public Workout createWorkout(Workout workout, Long userId) {
        // Ensure the user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Validate workout inputs
        if (workout.getSets() <= 0 || workout.getReps() <= 0) {
            throw new RuntimeException("Sets and reps must be positive numbers");
        }

        // Associate the workout with the user
        workout.setUser(user);

        // Save and return the workout
        return workoutRepository.save(workout);
    }

    // Get a workout by its ID
    public Workout getWorkoutById(Long id) {
        return workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found"));
    }

    // Get all workouts (for the social feed)
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    // Get all workouts for a specific user
    public List<Workout> getWorkoutsByUser(Long userId) {
        return workoutRepository.findByUserUserId(userId); // Updated to use findByUserUserId
    }

    // Get all workouts for a specific muscle group
    public List<Workout> getWorkoutsByMuscleGroup(MuscleGroup muscleGroup) {
        return workoutRepository.findByMuscleGroup(muscleGroup);
    }

    // Get workouts for a specific user and muscle group
    public List<Workout> getWorkoutsByUserAndMuscleGroup(Long userId, MuscleGroup muscleGroup) {
        return workoutRepository.findByUserUserIdAndMuscleGroup(userId, muscleGroup); // Updated to use findByUserUserIdAndMuscleGroup
    }

    // Update an existing workout
    public Workout updateWorkout(Long workoutId, Workout workout, Long userId) {
        // Validate the user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch the workout to update
        Workout workoutToUpdate = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        // Validate that the workout belongs to the provided user
        if (!workoutToUpdate.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized: Workout does not belong to the specified user");
        }

        // Validate inputs
        if (workout.getSets() <= 0 || workout.getReps() <= 0) {
            throw new RuntimeException("Sets and reps must be positive numbers");
        }

        // Update workout details
        workoutToUpdate.setWorkoutName(workout.getWorkoutName());
        workoutToUpdate.setMuscleGroup(workout.getMuscleGroup());
        workoutToUpdate.setSets(workout.getSets());
        workoutToUpdate.setReps(workout.getReps());
        workoutToUpdate.setDate(workout.getDate());
        workoutToUpdate.setWeight(workout.getWeight());

        // Save and return the updated workout
        return workoutRepository.save(workoutToUpdate);
    }

    // Delete a workout by its ID
    public void deleteWorkoutById(Long workoutId) {
        // Fetch the workout to ensure it exists
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        // Delete the workout
        workoutRepository.deleteById(workoutId);
    }
}