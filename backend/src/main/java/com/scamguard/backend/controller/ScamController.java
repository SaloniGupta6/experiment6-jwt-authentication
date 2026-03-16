package com.scamguard.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ScamController {

    @PostMapping("/detect-scam")
    public Map<String, Object> detectScam(@RequestBody Map<String, String> request) {

        String message = request.get("message");

        String aiUrl = "http://localhost:5000/predict";

        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> aiRequest = new HashMap<>();
        aiRequest.put("message", message);

        Map response = restTemplate.postForObject(aiUrl, aiRequest, Map.class);

        return response;
    }
}
