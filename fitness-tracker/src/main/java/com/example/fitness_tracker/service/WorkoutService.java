package com.example.fitness_tracker.service;

import com.example.fitness_tracker.model.MuscleGroup;
import com.example.fitness_tracker.model.User;
import com.example.fitness_tracker.model.Workout;
import com.example.fitness_tracker.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {
    @Autowired
    private WorkoutRepository workoutRepository;

    public Workout createWorkout(Workout workout) {
        if (workout.getSets() <= 0 || workout.getReps() <= 0) {
            throw new RuntimeException("Sets and reps must be positive numbers");
        }
        return workoutRepository.save(workout);
    }

    public Workout getWorkoutById(Long id) {
        return workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found"));
    }

    public List<Workout> getWorkoutsByUserAndMuscleGroup(User user, MuscleGroup muscleGroup) {
        return workoutRepository.findByUserAndMuscleGroup(user, muscleGroup);
    }

    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    public List<Workout> getWorkoutsByUser(User user) {
        return workoutRepository.findByUser(user);
    }

    public List<Workout> getWorkoutsByMuscleGroup(MuscleGroup muscleGroup) {
        return workoutRepository.findByMuscleGroup(muscleGroup);
    }

    public Workout updateWorkout(Long workoutId, Workout workout) {
        Workout workoutToUpdate = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        // Validate inputs
        if (workout.getSets() <= 0 || workout.getReps() <= 0) {
            throw new RuntimeException("Sets and reps must be positive numbers");
        }

        workoutToUpdate.setWorkoutName(workout.getWorkoutName());
        workoutToUpdate.setMuscleGroup(workout.getMuscleGroup());
        workoutToUpdate.setSets(workout.getSets());
        workoutToUpdate.setReps(workout.getReps());
        workoutToUpdate.setDate(workout.getDate());

        return workoutRepository.save(workoutToUpdate); // returns the updated Workout object after it gets saved to the DB
    }

    public void deleteWorkoutById(Long workoutId) {
        Workout workout = getWorkoutById(workoutId);  // This will throw if not found
        workoutRepository.deleteById(workoutId);
    }

}
