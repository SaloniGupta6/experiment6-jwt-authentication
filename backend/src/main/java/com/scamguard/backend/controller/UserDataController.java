package com.scamguard.backend.controller;

import com.scamguard.backend.model.ScanRecord;
import com.scamguard.backend.model.ScamReport;
import com.scamguard.backend.repository.ScanRecordRepository;
import com.scamguard.backend.repository.ScamReportRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserDataController {

    private final ScanRecordRepository scanRecordRepository;
    private final ScamReportRepository scamReportRepository;

    public UserDataController(ScanRecordRepository scanRecordRepository,
                              ScamReportRepository scamReportRepository) {
        this.scanRecordRepository = scanRecordRepository;
        this.scamReportRepository = scamReportRepository;
    }

    @PostMapping("/save-scan")
    public ScanRecord saveScan(@RequestBody ScanRecord scanRecord) {
        if (scanRecord.getCreatedAt() == null || scanRecord.getCreatedAt().isEmpty()) {
            scanRecord.setCreatedAt(LocalDateTime.now().toString());
        }
        return scanRecordRepository.save(scanRecord);
    }

    @GetMapping("/history")
    public List<ScanRecord> getHistory(@RequestParam String email) {
        return scanRecordRepository.findByUserEmailIgnoreCaseOrderByIdDesc(email);
    }

    @PostMapping("/report-scam")
    public ScamReport reportScam(@RequestBody ScamReport scamReport) {
        if (scamReport.getCreatedAt() == null || scamReport.getCreatedAt().isEmpty()) {
            scamReport.setCreatedAt(LocalDateTime.now().toString());
        }
        return scamReportRepository.save(scamReport);
    }

    @GetMapping("/reports")
    public List<ScamReport> getReports(@RequestParam String email) {
        return scamReportRepository.findByUserEmailIgnoreCaseOrderByIdDesc(email);
    }
}