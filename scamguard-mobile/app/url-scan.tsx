import React, { useState } from "react";
import { Text, TextInput, StyleSheet, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import api from "../src/services/api";
import PremiumResultCard from "../src/components/PremiumResultCard";
import { getUser } from "../src/utils/authStorage";

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

      const user = await getUser();

      await api.post("/api/save-scan", {
        userEmail: user?.email || "",
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
        <PremiumResultCard
          riskType={result.riskType}
          scamProbability={result.scamProbability}
          safetyAdvice={result.safetyAdvice}
          input={url}
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
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#22395f",
  },
  button: {
    backgroundColor: "#4f86f7",
    color: "#fff",
    padding: 16,
    marginTop: 16,
    borderRadius: 12,
    textAlign: "center",
    fontWeight: "800",
  },
});