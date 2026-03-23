package com.scamguard.backend.model;

public class ScanRecord {
    private String type;
    private String input;
    private String riskType;
    private String scamProbability;
    private String safetyAdvice;
    private String createdAt;

    public ScanRecord() {
    }

    public ScanRecord(String type, String input, String riskType, String scamProbability, String safetyAdvice, String createdAt) {
        this.type = type;
        this.input = input;
        this.riskType = riskType;
        this.scamProbability = scamProbability;
        this.safetyAdvice = safetyAdvice;
        this.createdAt = createdAt;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getRiskType() {
        return riskType;
    }

    public void setRiskType(String riskType) {
        this.riskType = riskType;
    }

    public String getScamProbability() {
        return scamProbability;
    }

    public void setScamProbability(String scamProbability) {
        this.scamProbability = scamProbability;
    }

    public String getSafetyAdvice() {
        return safetyAdvice;
    }

    public void setSafetyAdvice(String safetyAdvice) {
        this.safetyAdvice = safetyAdvice;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}