package com.example.fitness_tracker.repository;

import com.example.fitness_tracker.model.Creatine;
import com.example.fitness_tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CreatineRepository extends JpaRepository<Creatine, Long> {
    // Find all creatine records for a user
    List<Creatine> findByUserUserId(Long userId);

    // Find record for specific user and date
    Creatine findByUserAndDate(User user, Date date);

    // Find records between dates for a user
    List<Creatine> findByUserAndDateBetween(User user, Date startDate, Date endDate);

}
