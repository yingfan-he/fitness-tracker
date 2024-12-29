package com.example.fitness_tracker.controller;

import com.example.fitness_tracker.model.Creatine;
import com.example.fitness_tracker.model.User;
import com.example.fitness_tracker.service.CreatineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/creatine")
public class CreatineController {
    @Autowired
    private CreatineService creatineService;

    // Record new creatine intake
    @PostMapping
    public Creatine recordCreatineIntake(@RequestBody Creatine creatine) {
        return creatineService.recordCreatineIntake(creatine.getUser(),
                creatine.getDate(),
                creatine.isTaken());
    }
   /* Example request:
   POST http://localhost:8080/api/creatine
   Content-Type: application/json
   {
       "user": {
           "id": 123
       },
       "date": "2024-12-28",
       "taken": true
   }
   */

    // Get all creatine records for a user
    @GetMapping("/user/{userId}")
    public List<Creatine> getCreatineHistoryByUser(@PathVariable Long userId) {
        return creatineService.getCreatineByUser(userId);
    }
   /* Example request:
   GET http://localhost:8080/api/creatine/user/123
   */

    // Get history between dates for a user
    @GetMapping("/user/{userId}/dates")
    public List<Creatine> getCreatineHistoryBetweenDates(
            @PathVariable Long userId,
            @RequestParam Date startDate,
            @RequestParam Date endDate) {
        User user = new User();
        user.setUserId(userId);
        return creatineService.getCreatineHistoryBetweenDates(user, startDate, endDate);
    }
   /* Example request:
   GET http://localhost:8080/api/creatine/user/123/dates?startDate=2024-01-01&endDate=2024-12-31
   */

    // Update creatine record
    @PutMapping("/{id}")
    public Creatine updateCreatineRecord(@PathVariable Long id, @RequestBody Creatine creatine) {
        return creatineService.updateCreatineRecord(id, creatine.isTaken());
    }
   /* Example request:
   PUT http://localhost:8080/api/creatine/123
   Content-Type: application/json
   {
       "taken": false
   }
   */

    // Delete creatine record
    @DeleteMapping("/{id}")
    public void deleteCreatineRecord(@PathVariable Long id) {
        creatineService.deleteCreatineRecord(id);
    }
   /* Example request:
   DELETE http://localhost:8080/api/creatine/123
   */
}