package com.scamguard.backend.controller;

import com.scamguard.backend.model.ScanRecord;
import com.scamguard.backend.model.ScamReport;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserDataController {

    private final List<ScanRecord> scanHistory = new ArrayList<>();
    private final List<ScamReport> scamReports = new ArrayList<>();

    @PostMapping("/save-scan")
    public ScanRecord saveScan(@RequestBody ScanRecord scanRecord) {
        if (scanRecord.getCreatedAt() == null || scanRecord.getCreatedAt().isEmpty()) {
            scanRecord.setCreatedAt(LocalDateTime.now().toString());
        }
        scanHistory.add(0, scanRecord);
        return scanRecord;
    }

    @GetMapping("/history")
    public List<ScanRecord> getHistory() {
        return scanHistory;
    }

    @PostMapping("/report-scam")
    public ScamReport reportScam(@RequestBody ScamReport scamReport) {
        if (scamReport.getCreatedAt() == null || scamReport.getCreatedAt().isEmpty()) {
            scamReport.setCreatedAt(LocalDateTime.now().toString());
        }
        scamReports.add(0, scamReport);
        return scamReport;
    }

    @GetMapping("/reports")
    public List<ScamReport> getReports() {
        return scamReports;
    }
}