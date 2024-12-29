package com.example.fitness_tracker.repository;

import com.example.fitness_tracker.model.MuscleGroup;
import com.example.fitness_tracker.model.User;
import com.example.fitness_tracker.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUser(User user);
    List<Workout> findByMuscleGroup(MuscleGroup muscleGroup);
    List<Workout> findByDateBetween(Date startDate, Date endDate);
    List<Workout> findByUserAndMuscleGroup(User user, MuscleGroup muscleGroup);

}
