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

        String url = request.get("url").toLowerCase();

        Map<String, String> response = new HashMap<>();

        if(url.contains("free") || url.contains("lottery") || url.contains("win-money")) {

            response.put("risk","High Risk");
            response.put("type","Phishing URL");

        }
        else if(url.contains("verify") || url.contains("bank-login")) {

            response.put("risk","Medium Risk");
            response.put("type","Suspicious Login Page");

        }
        else {

            response.put("risk","Safe");
            response.put("type","Trusted URL");

        }

        return response;
    }
}
