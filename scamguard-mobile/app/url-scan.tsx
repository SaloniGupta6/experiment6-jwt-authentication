import React, { useState } from "react";
import { Text, TextInput, StyleSheet, ScrollView, Alert, View } from "react-native";
import api from "../src/services/api";

export default function UrlScan() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!url.trim()) {
      Alert.alert("Input required", "Please enter a suspicious URL.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/detect-url", { url });
      setResult(res.data);

      await api.post("/api/save-scan", {
        type: "url",
        input: url,
        riskType: res.data.riskType || "Unknown",
        scamProbability: res.data.scamProbability || "N/A",
        safetyAdvice: res.data.safetyAdvice || "No advice available.",
      });
    } catch (err: any) {
      console.log("URL API ERROR:", err?.response?.data || err.message);
      Alert.alert("Error", "Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🔗 Scan Suspicious URL</Text>
      <Text style={styles.subheading}>
        Paste any suspicious link below to check whether it looks risky.
      </Text>

      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        placeholder="Paste suspicious URL here..."
        placeholderTextColor="#94a3b8"
        autoCapitalize="none"
      />

      <Text style={styles.button} onPress={handleScan}>
        {loading ? "Checking..." : "Scan URL"}
      </Text>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>URL Analysis</Text>

          <Text style={styles.label}>RISK TYPE</Text>
          <Text style={styles.value}>{result.riskType || "Unknown"}</Text>

          <Text style={styles.label}>SCAM PROBABILITY</Text>
          <Text style={styles.probability}>{result.scamProbability || "N/A"}</Text>

          <Text style={styles.label}>SAFETY ADVICE</Text>
          <Text style={styles.advice}>
            {result.safetyAdvice || "No advice available."}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#081735",
    padding: 16,
  },
  heading: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  subheading: {
    color: "#d1d5db",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#1e2b44",
    color: "#fff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  button: {
    backgroundColor: "#4f86f7",
    color: "#fff",
    padding: 16,
    marginTop: 16,
    borderRadius: 12,
    textAlign: "center",
    fontWeight: "700",
  },
  resultCard: {
    backgroundColor: "#1e2b44",
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
  },
  resultTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  label: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 8,
  },
  value: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  probability: {
    color: "#ff6b6b",
    fontSize: 18,
    fontWeight: "700",
  },
  advice: {
    color: "#e5e7eb",
    fontSize: 14,
    marginTop: 4,
  },
});