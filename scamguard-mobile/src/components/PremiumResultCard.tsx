import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";

import {
  getReasons,
  getRecommendedAction,
  getSeverity,
  getSeverityLabel,
} from "../utils/resultHelpers";

type Props = {
  riskType?: string;
  scamProbability?: string;
  safetyAdvice?: string;
  input?: string;
  onReport?: () => void;
};

export default function PremiumResultCard({
  riskType,
  scamProbability,
  safetyAdvice,
  input,
  onReport,
}: Props) {
  const safeRiskType = riskType || "Unknown";
  const safeProbability = scamProbability || "0%";
  const safeAdvice = safetyAdvice || "No advice available.";

  const severity = getSeverity(safeProbability);
  const severityLabel = getSeverityLabel(safeProbability);
  const reasons = getReasons(safeRiskType, input);
  const recommendedAction = getRecommendedAction(safeProbability);

  const badgeStyle =
    severity === "danger"
      ? styles.badgeDanger
      : severity === "warning"
      ? styles.badgeWarning
      : styles.badgeSafe;

  const probabilityStyle =
    severity === "danger"
      ? styles.probabilityDanger
      : severity === "warning"
      ? styles.probabilityWarning
      : styles.probabilitySafe;

  const progressWidth = `${Math.min(
    100,
    Math.max(0, Number(safeProbability.replace("%", "")))
  )}%`;

  const handleCopyAdvice = () => {
    const text = `${safeRiskType} | ${safeProbability} | ${safeAdvice}`;

    if (Platform.OS === "web") {
      window.alert(`Copy this manually:\n\n${text}`);
    } else {
      Alert.alert("Copy Advice", text);
    }
  };

  return (
    <View style={styles.card}>
      {/* TOP HEADER */}
      <View style={styles.topRow}>
        <Text style={styles.title}>Detection Result</Text>
        <View style={[styles.badge, badgeStyle]}>
          <Text style={styles.badgeText}>{severityLabel}</Text>
        </View>
      </View>

      {/* RISK TYPE */}
      <Text style={styles.label}>RISK TYPE</Text>
      <Text style={styles.value}>{safeRiskType}</Text>

      {/* PROBABILITY */}
      <Text style={styles.label}>SCAM PROBABILITY</Text>
      <Text style={[styles.probability, probabilityStyle]}>
        {scamProbability || "N/A"}
      </Text>

      {/* PROGRESS BAR */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            badgeStyle,
            { width: progressWidth as any }, // ✅ FIXED ERROR
          ]}
        />
      </View>

      {/* REASONS */}
      <Text style={styles.sectionTitle}>Why this was flagged</Text>
      {reasons.map((reason, index) => (
        <Text key={index} style={styles.bullet}>
          • {reason}
        </Text>
      ))}

      {/* ADVICE */}
      <Text style={styles.sectionTitle}>Safety Advice</Text>
      <Text style={styles.advice}>{safeAdvice}</Text>

      {/* RECOMMENDATION */}
      <Text style={styles.sectionTitle}>Recommended Action</Text>
      <Text style={styles.recommendation}>{recommendedAction}</Text>

      {/* BUTTONS */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleCopyAdvice}
        >
          <Text style={styles.secondaryButtonText}>Copy Advice</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={onReport}>
          <Text style={styles.primaryButtonText}>Report Scam</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#12233f",
    borderRadius: 18,
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#23385a",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  badgeDanger: {
    backgroundColor: "#ef4444",
  },

  badgeWarning: {
    backgroundColor: "#f59e0b",
  },

  badgeSafe: {
    backgroundColor: "#22c55e",
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  label: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 3,
  },

  value: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  probability: {
    fontSize: 28,
    fontWeight: "800",
  },

  probabilityDanger: {
    color: "#ef4444",
  },

  probabilityWarning: {
    color: "#f59e0b",
  },

  probabilitySafe: {
    color: "#22c55e",
  },

  progressTrack: {
    height: 10,
    backgroundColor: "#24344f",
    borderRadius: 999,
    marginTop: 12,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 8,
  },

  bullet: {
    color: "#d1d5db",
    lineHeight: 22,
    marginBottom: 4,
  },

  advice: {
    color: "#e5e7eb",
    lineHeight: 22,
  },

  recommendation: {
    color: "#cbd5e1",
    lineHeight: 22,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#1e2b44",
    borderWidth: 1,
    borderColor: "#334155",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  primaryButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});