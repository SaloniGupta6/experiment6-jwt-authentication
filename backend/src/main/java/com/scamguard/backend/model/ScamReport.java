package com.scamguard.backend.model;

public class ScamReport {
    private String userEmail;
    private String content;
    private String numberOrLink;
    private String category;
    private String createdAt;

    public ScamReport() {
    }

    public ScamReport(String userEmail, String content, String numberOrLink, String category, String createdAt) {
        this.userEmail = userEmail;
        this.content = content;
        this.numberOrLink = numberOrLink;
        this.category = category;
        this.createdAt = createdAt;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getNumberOrLink() {
        return numberOrLink;
    }

    public void setNumberOrLink(String numberOrLink) {
        this.numberOrLink = numberOrLink;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}