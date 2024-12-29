package com.example.fitness_tracker.controller;

import com.example.fitness_tracker.model.User;
import org.springframework.web.bind.annotation.*;
import com.example.fitness_tracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

// @RestController combines @Controller and @ResponseBody
// Tells Spring this class will handle HTTP requests and return data directly (not views)
@RestController

// Base URL path for all endpoints in this controller
// All methods in this class will start with "/api/users"
@RequestMapping("/api/users")
public class UserController {

    // @Autowired tells Spring to automatically inject (connect) a UserService instance
    // Instead of creating it manually with "new UserService()"
    @Autowired
    private UserService userService;



    // all of these json bodies will be created in the frontend

    // Handles HTTP POST requests to "/api/users"
    // @RequestBody converts incoming JSON to User object
    // this will automatically parse through the JSON body and instantiate a User object
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    /* POST http://localhost:8080/api/users
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john.doe@email.com"
}*/

    // Handles HTTP GET requests to "/api/users/{id}" (e.g., /api/users/123)
    // @PathVariable takes the {id} from URL and passes it as a parameter
    @GetMapping("/{id}") // you call on this method by appending this at end of URL
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    /* GET http://localhost:8080/api/users/123 */

    // Handles HTTP GET requests to "/api/users"
    // Returns all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    /* GET http://localhost:8080/api/users */

    // Handles HTTP PUT requests to "/api/users/{id}"
    // @PathVariable gets id from URL
    // @RequestBody gets updated user data from request body
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    /* PUT http://localhost:8080/api/users/123
Content-Type: application/json

{
    "name": "John Updated",
    "email": "john.updated@email.com"
} */

    // Handles HTTP DELETE requests to "/api/users/{id}"
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    /* DELETE http://localhost:8080/api/users/123 */

    // Handles HTTP GET requests to "/api/users/email/{email}"
    // Example: /api/users/email/john@example.com
    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }
}

/* GET http://localhost:8080/api/users/email/john.doe@email.com */