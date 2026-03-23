import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";

export default function UrlScan() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!url.trim()) return;

    try {
      setLoading(true);
      setResult(null);

      const response = await fetch(
        "https://experiment6-jwt-authentication-1.onrender.com/api/detect-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        risk: "Unknown",
        type: "Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = () => {
    if (!result?.risk) return "#94a3b8";

    const value = result.risk.toLowerCase();

    if (value.includes("high")) return "#ef4444";
    if (value.includes("medium")) return "#f59e0b";
    return "#22c55e";
  };

  const getAdvice = () => {
    if (!result?.risk) return "";

    const value = result.risk.toLowerCase();

    if (value.includes("high")) {
      return "Do not open this link. It may be phishing or malware.";
    }
    if (value.includes("medium")) {
      return "This link looks suspicious. Verify the domain before opening.";
    }
    return "This URL appears safer, but still avoid unknown websites.";
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔗 Scan Suspicious URL</Text>
      <Text style={styles.subtitle}>
        Paste any suspicious website or phishing link below.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Paste suspicious URL here..."
        placeholderTextColor="#94a3b8"
        value={url}
        onChangeText={setUrl}
      />

      <TouchableOpacity style={styles.button} onPress={handleScan}>
        <Text style={styles.buttonText}>Scan URL</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 20 }} />}

      {result && !loading && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>URL Analysis</Text>

          <Text style={styles.label}>Risk Level</Text>
          <Text style={[styles.riskValue, { color: getRiskColor() }]}>
            {result.risk || "Unknown"}
          </Text>

          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{result.type || "Unknown"}</Text>

          <Text style={styles.label}>Safety Advice</Text>
          <Text style={styles.advice}>{getAdvice()}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 15,
    marginBottom: 20,
    lineHeight: 22,
  },
  input: {
    backgroundColor: "#1e293b",
    color: "#ffffff",
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 18,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  resultCard: {
    backgroundColor: "#1e293b",
    borderRadius: 18,
    padding: 18,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },
  resultTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 14,
  },
  label: {
    color: "#94a3b8",
    fontSize: 13,
    textTransform: "uppercase",
    marginTop: 10,
  },
  value: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },
  riskValue: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 6,
  },
  advice: {
    color: "#e2e8f0",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
});