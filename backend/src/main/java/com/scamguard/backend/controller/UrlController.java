package com.scamguard.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UrlController {

    @PostMapping("/detect-url")
    public Map<String, String> detectUrl(@RequestBody Map<String, String> request) {
        String url = request.get("url");

        if (url == null) {
            url = "";
        }

        String text = url.toLowerCase();

        Map<String, String> response = new HashMap<>();

        if (text.contains("free") || text.contains("gift") || text.contains("lottery") || text.contains("win")) {
            response.put("riskType", "Phishing / Reward URL");
            response.put("scamProbability", "94%");
            response.put("safetyAdvice", "Do not open this link. It appears to be a phishing or fake reward website.");
        } else if (text.contains("login") || text.contains("verify") || text.contains("bank")) {
            response.put("riskType", "Credential Theft Risk");
            response.put("scamProbability", "89%");
            response.put("safetyAdvice", "Avoid entering passwords or bank details unless the site is verified and official.");
        } else {
            response.put("riskType", "Low Risk / No Strong Scam Signal");
            response.put("scamProbability", "15%");
            response.put("safetyAdvice", "This URL does not show a strong scam pattern, but always verify the domain before trusting it.");
        }

        return response;
    }
}