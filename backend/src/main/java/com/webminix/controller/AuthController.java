package com.webminix.controller;

import com.webminix.dto.LoginRequest;
import com.webminix.dto.LoginResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        if ("user@example.com".equals(request.getEmail()) && "password".equals(request.getPassword())) {
            return new LoginResponse("success", "Login successful");
        } else {
            return new LoginResponse("fail", "Invalid credentials");
        }
    }

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard() {
        Map<String, Object> response = new HashMap<>();
        response.put("welcome", "Welcome to Webminix Dashboard!");

        List<Map<String, Object>> tasks = new ArrayList<>();
        Map<String, Object> task1 = new HashMap<>();
        task1.put("id", 1);
        task1.put("title", "Complete task");
        tasks.add(task1);

        Map<String, Object> task2 = new HashMap<>();
        task2.put("id", 2);
        task2.put("title", "Submit demo");
        tasks.add(task2);

        response.put("tasks", tasks);
        return response;
    }
}
