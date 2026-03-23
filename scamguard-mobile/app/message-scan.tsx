import React, { useState } from "react";
import { Text, TextInput, StyleSheet, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import api from "../src/services/api";
import PremiumResultCard from "../src/components/PremiumResultCard";
import { getUser } from "../src/utils/authStorage";

export default function MessageScan() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!message.trim()) {
      Alert.alert("Input required", "Please enter a suspicious message.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/detect-scam", { message });
      setResult(res.data);

      const user = await getUser();

      await api.post("/api/save-scan", {
        userEmail: user?.email || "",
        type: "message",
        input: message,
        riskType: res.data.riskType || "Unknown",
        scamProbability: res.data.scamProbability || "N/A",
        safetyAdvice: res.data.safetyAdvice || "No advice available.",
      });
    } catch (err: any) {
      console.log("MESSAGE API ERROR:", err?.response?.data || err.message);
      Alert.alert("Error", "Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>📩 Scan Suspicious Message</Text>
      <Text style={styles.subheading}>
        Paste any SMS, WhatsApp message, email text, or suspicious text below.
      </Text>

      <TextInput
        style={styles.input}
        multiline
        value={message}
        onChangeText={setMessage}
        placeholder="Paste suspicious message here..."
        placeholderTextColor="#94a3b8"
      />

      <Text style={styles.button} onPress={handleScan}>
        {loading ? "Checking..." : "Detect Scam"}
      </Text>

      {result && (
        <PremiumResultCard
          riskType={result.riskType}
          scamProbability={result.scamProbability}
          safetyAdvice={result.safetyAdvice}
          input={message}
          onReport={() => router.push("/report-scam")}
        />
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
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 10,
  },
  subheading: {
    color: "#d1d5db",
    marginBottom: 16,
    lineHeight: 22,
  },
  input: {
    backgroundColor: "#12233f",
    color: "#fff",
    minHeight: 150,
    borderRadius: 16,
    padding: 16,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#22395f",
  },
  button: {
    backgroundColor: "#65c66e",
    color: "#fff",
    padding: 16,
    marginTop: 16,
    borderRadius: 12,
    textAlign: "center",
    fontWeight: "800",
  },
});