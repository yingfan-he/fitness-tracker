package com.example.fitness_tracker.controller;

import com.example.fitness_tracker.model.Workout;
import com.example.fitness_tracker.model.User;
import com.example.fitness_tracker.model.MuscleGroup;
import com.example.fitness_tracker.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {
    @Autowired
    private WorkoutService workoutService;

    // Create a new workout
    @PostMapping
    public Workout createWorkout(@RequestBody Workout workout) {
        return workoutService.createWorkout(workout);
    }
    /* Example request:
    POST http://localhost:8080/api/workouts
    Content-Type: application/json
    {
        "workoutName": "Bench Press",
        "muscleGroup": "CHEST",
        "sets": 3,
        "reps": 10,
        "date": "2024-12-28",
        "user": {
            "id": 123
        }
    }
    */

    // Get all workouts
    @GetMapping
    public List<Workout> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }
    /* Example request:
    GET http://localhost:8080/api/workouts
    */

    // Get workout by ID
    @GetMapping("/{id}")
    public Workout getWorkoutById(@PathVariable Long id) {
        return workoutService.getWorkoutById(id);
    }
    /* Example request:
    GET http://localhost:8080/api/workouts/123
    */

    // Get workouts by user
    @GetMapping("/user/{userId}")
    public List<Workout> getWorkoutsByUser(@PathVariable User user) {
        return workoutService.getWorkoutsByUser(user);
    }
    /* Example request:
    GET http://localhost:8080/api/workouts/user/123
    */

    // Get workouts by muscle group
    @GetMapping("/muscle/{muscleGroup}")
    public List<Workout> getWorkoutsByMuscleGroup(@PathVariable MuscleGroup muscleGroup) {
        return workoutService.getWorkoutsByMuscleGroup(muscleGroup);
    }
    /* Example request:
    GET http://localhost:8080/api/workouts/muscle/CHEST
    */

    // Update workout
    @PutMapping("/{id}")
    public Workout updateWorkout(@PathVariable Long id, @RequestBody Workout workout) {
        return workoutService.updateWorkout(id, workout);
    }
    /* Example request:
    PUT http://localhost:8080/api/workouts/123
    Content-Type: application/json
    {
        "workoutName": "Incline Bench Press",
        "muscleGroup": "CHEST",
        "sets": 4,
        "reps": 8,
        "date": "2024-12-28",
        "user": {
            "id": 123
        }
    }
    */

    // Delete workout
    @DeleteMapping("/{id}")
    public void deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkoutById(id);
    }
    /* Example request:
    DELETE http://localhost:8080/api/workouts/123
    */
}