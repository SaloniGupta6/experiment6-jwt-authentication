package com.scamguard.backend.controller;

import com.scamguard.backend.model.DetectionResponse;
import com.scamguard.backend.service.OpenAiDetectionService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ScamController {

    private final OpenAiDetectionService openAiDetectionService;

    public ScamController(OpenAiDetectionService openAiDetectionService) {
        this.openAiDetectionService = openAiDetectionService;
    }

    @PostMapping("/detect-scam")
    public DetectionResponse detectScam(@RequestBody Map<String, String> request) {
        String message = request.get("message");

        if (message == null || message.trim().isEmpty()) {
            return new DetectionResponse(
                    "Unknown",
                    "0%",
                    "safe",
                    "Please provide a message to analyze.",
                    "Paste a suspicious message and try again.",
                    List.of("No message content was provided")
            );
        }

        try {
            return openAiDetectionService.analyzeMessage(message);
        } catch (Exception e) {
            return fallbackDetection(message);
        }
    }

    @PostMapping("/detect-url")
    public Map<String, Object> detectUrl(@RequestBody Map<String, String> request) {
        String url = request.get("url");
        if (url == null || url.trim().isEmpty()) {
            url = "";
        }

        String text = url.toLowerCase().trim();

        Map<String, Object> response = new HashMap<>();
        List<String> reasons = new ArrayList<>();

        boolean hasShortener =
                text.contains("bit.ly") || text.contains("tinyurl") || text.contains("goo.gl")
                        || text.contains("t.co") || text.contains("rb.gy") || text.contains("shorturl");

        boolean hasLoginWords =
                text.contains("login") || text.contains("verify") || text.contains("update")
                        || text.contains("secure") || text.contains("signin") || text.contains("auth")
                        || text.contains("confirm");

        boolean hasRewardWords =
                text.contains("claim") || text.contains("reward") || text.contains("gift")
                        || text.contains("free-money") || text.contains("lottery")
                        || text.contains("prize") || text.contains("bonus") || text.contains("won");

        boolean hasBankWords =
                text.contains("bank") || text.contains("upi") || text.contains("kyc")
                        || text.contains("account") || text.contains("wallet")
                        || text.contains("payment") || text.contains("otp");

        boolean hasSuspiciousDomain =
                text.contains(".xyz") || text.contains(".ru") || text.contains(".tk")
                        || text.contains(".click") || text.contains(".top")
                        || text.contains(".gq") || text.contains(".ml");

        boolean hasAtSymbol = text.contains("@");
        boolean noHttps = text.startsWith("http://");
        boolean suspiciousHyphen = text.contains("-");
        boolean hasIpAddress =
                text.matches(".*\\b\\d{1,3}(\\.\\d{1,3}){3}\\b.*");

        boolean looksLikeGoogleButFake =
                text.contains("google") && !text.contains("google.com");

        boolean looksLikeBankButFake =
                text.contains("bank") && !text.contains(".bank") && !text.contains("official");

        boolean looksLikePaytmFake =
                text.contains("paytm") && !text.contains("paytm.com");

        boolean looksLikePhonePeFake =
                text.contains("phonepe") && !text.contains("phonepe.com");

        boolean looksLikeGPayFake =
                (text.contains("gpay") || text.contains("googlepay")) && !text.contains("pay.google.com");

        if (hasShortener) reasons.add("Uses a shortened URL");
        if (hasLoginWords) reasons.add("Contains login or verification wording");
        if (hasRewardWords) reasons.add("Uses reward or claim bait words");
        if (hasBankWords) reasons.add("Contains banking or account-related wording");
        if (hasSuspiciousDomain) reasons.add("Uses a commonly abused suspicious domain");
        if (hasAtSymbol) reasons.add("Contains @ symbol which may hide the real destination");
        if (noHttps) reasons.add("Does not use secure HTTPS");
        if (suspiciousHyphen) reasons.add("Uses suspicious hyphen-based domain styling");
        if (hasIpAddress) reasons.add("Uses direct IP-based URL instead of a trusted domain");
        if (looksLikeGoogleButFake) reasons.add("May imitate a trusted brand like Google");
        if (looksLikeBankButFake) reasons.add("Looks like a fake bank-style domain");
        if (looksLikePaytmFake) reasons.add("May imitate Paytm");
        if (looksLikePhonePeFake) reasons.add("May imitate PhonePe");
        if (looksLikeGPayFake) reasons.add("May imitate Google Pay");

        int score = 0;

        if (hasShortener) score += 20;
        if (hasLoginWords) score += 15;
        if (hasRewardWords) score += 25;
        if (hasBankWords) score += 20;
        if (hasSuspiciousDomain) score += 25;
        if (hasAtSymbol) score += 20;
        if (noHttps) score += 10;
        if (suspiciousHyphen) score += 10;
        if (hasIpAddress) score += 20;
        if (looksLikeGoogleButFake) score += 15;
        if (looksLikeBankButFake) score += 15;
        if (looksLikePaytmFake) score += 15;
        if (looksLikePhonePeFake) score += 15;
        if (looksLikeGPayFake) score += 15;

        if (score >= 60) {
            response.put("riskType", "Phishing / Dangerous URL");
            response.put("scamProbability", Math.min(score, 95) + "%");
            response.put("severity", "danger");
            response.put("safetyAdvice", "Do not open this link. It may be a phishing or scam website.");
            response.put("recommendedAction", "Avoid clicking it, block the sender, and verify through an official source.");
            response.put("reasons", reasons.isEmpty() ? List.of("Multiple risky URL patterns detected") : reasons);
        } else if (score >= 30) {
            response.put("riskType", "Suspicious URL");
            response.put("scamProbability", score + "%");
            response.put("severity", "warning");
            response.put("safetyAdvice", "Be careful with this link. Verify the source before opening it.");
            response.put("recommendedAction", "Open only if you fully trust the sender and destination.");
            response.put("reasons", reasons.isEmpty() ? List.of("Some suspicious URL patterns detected") : reasons);
        } else {
            response.put("riskType", "Safe / No Strong Risk Signal");
            response.put("scamProbability", "12%");
            response.put("severity", "safe");
            response.put("safetyAdvice", "No major scam pattern detected, but still verify unknown links before opening.");
            response.put("recommendedAction", "Proceed carefully and check the destination domain.");
            response.put("reasons", List.of("No strong suspicious URL patterns detected"));
        }

        return response;
    }

    private DetectionResponse fallbackDetection(String message) {
        String text = message.toLowerCase();

        if (text.contains("lottery") || text.contains("won") || text.contains("prize") || text.contains("claim now")) {
            return new DetectionResponse(
                    "Lottery / Reward Scam",
                    "95%",
                    "danger",
                    "Do not click any links or share personal details. This looks like a reward bait scam.",
                    "Ignore the message, block the sender, and never pay or share details to claim rewards.",
                    List.of(
                            "Promises prize or reward",
                            "Uses reward bait language",
                            "Encourages quick claim action"
                    )
            );
        } else if (text.contains("otp") || text.contains("bank") || text.contains("account blocked") || text.contains("verify account")) {
            return new DetectionResponse(
                    "Bank / OTP Scam",
                    "92%",
                    "danger",
                    "Never share OTP, PIN, or banking details. Contact your bank directly using the official app or website.",
                    "Do not click the link. Verify only through your bank’s official app or support.",
                    List.of(
                            "Contains banking language",
                            "Asks for verification or OTP",
                            "Uses urgency or account threat"
                    )
            );
        } else if (text.contains("job") || text.contains("registration fee") || text.contains("earn money")) {
            return new DetectionResponse(
                    "Fake Job Scam",
                    "88%",
                    "warning",
                    "Avoid paying fees for jobs. Verify the employer and offer before taking action.",
                    "Do not pay any registration amount. Research the recruiter and company independently.",
                    List.of(
                            "Mentions job or quick earning",
                            "Asks for fee or payment",
                            "Matches common fake job scam pattern"
                    )
            );
        } else if (text.contains("click") || text.contains("link") || text.contains("urgent")) {
            return new DetectionResponse(
                    "Phishing / Suspicious Message",
                    "80%",
                    "warning",
                    "Avoid opening links in urgent or suspicious messages. Verify the sender first.",
                    "Do not open unknown links. Confirm authenticity from an official source.",
                    List.of(
                            "Contains suspicious link language",
                            "Uses urgency wording",
                            "Encourages immediate action"
                    )
            );
        } else {
            return new DetectionResponse(
                    "Low Risk / No Strong Scam Signal",
                    "18%",
                    "safe",
                    "No major scam pattern detected, but still avoid sharing sensitive information unless fully verified.",
                    "Stay cautious and verify unusual requests before responding.",
                    List.of(
                            "No strong scam keywords detected",
                            "No clear request for sensitive information"
                    )
            );
        }
    }
}