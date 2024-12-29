package com.example.fitness_tracker.service;

import com.example.fitness_tracker.model.Creatine;
import com.example.fitness_tracker.model.User;
import com.example.fitness_tracker.repository.CreatineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CreatineService {

    @Autowired
    private CreatineRepository creatineRepository; // repository serves as an interface to interact with the Entity (entity represents the actual table in the DB)

    public Creatine recordCreatineIntake(User user, Date date, boolean taken) {
        Creatine creatine = new Creatine(date, user, taken);
        return creatineRepository.save(creatine);
    }

    public List<Creatine> getCreatineByUser(Long userId) {
        return creatineRepository.findByUserUserId(userId);
    }
    // Get creatine record for a specific date
    public Creatine getCreatineByUserAndDate(User user, Date date) {
        return creatineRepository.findByUserAndDate(user, date);
    }

    // Get history between dates
    public List<Creatine> getCreatineHistoryBetweenDates(User user, Date startDate, Date endDate) {
        return creatineRepository.findByUserAndDateBetween(user, startDate, endDate);
    }

    // Update a creatine record
    public Creatine updateCreatineRecord(Long creatineId, boolean taken) {
        Creatine creatine = creatineRepository.findById(creatineId)
                .orElseThrow(() -> new RuntimeException("Creatine record not found"));
        creatine.setTaken(taken);
        return creatineRepository.save(creatine);
    }

    // Delete a creatine record
    public void deleteCreatineRecord(Long creatineId) {
        creatineRepository.deleteById(creatineId);
    }
}



