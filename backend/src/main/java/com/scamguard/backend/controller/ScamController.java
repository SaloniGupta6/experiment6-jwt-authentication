package com.scamguard.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ScamController {

    @PostMapping("/detect-scam")
    public Map<String, String> detectScam(@RequestBody Map<String, String> request) {
        String message = request.get("message");

        if (message == null) {
            message = "";
        }

        String text = message.toLowerCase();

        Map<String, String> response = new HashMap<>();

        if (text.contains("lottery") || text.contains("won") || text.contains("prize") || text.contains("claim now")) {
            response.put("riskType", "Lottery / Reward Scam");
            response.put("scamProbability", "95%");
            response.put("safetyAdvice", "Do not click any links or share personal details. This looks like a reward bait scam.");
        } else if (text.contains("otp") || text.contains("bank") || text.contains("account blocked") || text.contains("verify account")) {
            response.put("riskType", "Bank / OTP Scam");
            response.put("scamProbability", "92%");
            response.put("safetyAdvice", "Never share OTP, PIN, or banking details. Contact your bank directly using the official app or website.");
        } else if (text.contains("job") || text.contains("registration fee") || text.contains("earn money")) {
            response.put("riskType", "Fake Job Scam");
            response.put("scamProbability", "88%");
            response.put("safetyAdvice", "Avoid paying fees for jobs. Verify the employer and offer before taking action.");
        } else if (text.contains("click") || text.contains("link") || text.contains("urgent")) {
            response.put("riskType", "Phishing / Suspicious Message");
            response.put("scamProbability", "80%");
            response.put("safetyAdvice", "Avoid opening links in urgent or suspicious messages. Verify the sender first.");
        } else {
            response.put("riskType", "Low Risk / No Strong Scam Signal");
            response.put("scamProbability", "18%");
            response.put("safetyAdvice", "No major scam pattern detected, but still avoid sharing sensitive information unless fully verified.");
        }

        return response;
    }
}