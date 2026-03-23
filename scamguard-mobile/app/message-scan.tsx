import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";

export default function MessageScan() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      setResult(null);

      const response = await fetch(
        "https://experiment6-jwt-authentication-1.onrender.com/api/detect-scam",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        type: "Error",
        scamProbability: "0%",
        message: "Unable to connect to backend",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = () => {
    if (!result?.scamProbability) return "#94a3b8";

    const value = parseInt(result.scamProbability);

    if (value >= 80) return "#ef4444";
    if (value >= 50) return "#f59e0b";
    return "#22c55e";
  };

  const getAdvice = () => {
    if (!result?.scamProbability) return "";

    const value = parseInt(result.scamProbability);

    if (value >= 80) {
      return "Do not click links, do not share OTP, and avoid replying.";
    }
    if (value >= 50) {
      return "This looks suspicious. Verify from an official source before taking action.";
    }
    return "This appears relatively safe, but still verify unknown senders.";
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📩 Scan Suspicious Message</Text>
      <Text style={styles.subtitle}>
        Paste any SMS, WhatsApp message, email text, or suspicious text below.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Paste suspicious message here..."
        placeholderTextColor="#94a3b8"
        multiline
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={handleScan}>
        <Text style={styles.buttonText}>Detect Scam</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#22c55e" style={{ marginTop: 20 }} />}

      {result && !loading && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Detection Result</Text>

          <Text style={styles.label}>Risk Type</Text>
          <Text style={styles.value}>{result.type || "Unknown"}</Text>

          <Text style={styles.label}>Scam Probability</Text>
          <Text style={[styles.riskValue, { color: getRiskColor() }]}>
            {result.scamProbability || "N/A"}
          </Text>

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
    minHeight: 180,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#334155",
  },
  button: {
    backgroundColor: "#22c55e",
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