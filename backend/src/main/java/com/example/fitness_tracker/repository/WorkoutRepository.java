package com.example.fitness_tracker.repository;

import com.example.fitness_tracker.model.MuscleGroup;
import com.example.fitness_tracker.model.User;
import com.example.fitness_tracker.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    // Get workouts by user ID (corrected to use the user relationship)
    List<Workout> findByUserUserId(Long userId);

    // Get workouts by muscle group
    List<Workout> findByMuscleGroup(MuscleGroup muscleGroup);

    // Get workouts between two dates
    List<Workout> findByDateBetween(Date startDate, Date endDate);

    // Get workouts by user and muscle group (corrected to use the user relationship)
    List<Workout> findByUserAndMuscleGroup(User user, MuscleGroup muscleGroup);

    // Get workouts by user ID and muscle group (corrected to use the user relationship)
    List<Workout> findByUserUserIdAndMuscleGroup(Long userId, MuscleGroup muscleGroup);

    Page<Workout> findAllByOrderByDateDesc(Pageable pageable);

    @Query("SELECT w FROM Workout w JOIN FETCH w.user ORDER BY w.date DESC")
    Page<Workout> findAllWithUser(Pageable pageable);
}