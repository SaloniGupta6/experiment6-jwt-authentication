import React, { useState } from "react";
import { Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import api from "../src/services/api";
import PremiumResultCard from "../src/components/PremiumResultCard";

export default function MessageScan() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!message) return Alert.alert("Enter message");

    try {
      setLoading(true);
      const res = await api.post("/api/detect-scam", { message });
      setResult(res.data);
    } catch {
      Alert.alert("Error connecting server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📩 Scan Message</Text>

      <TextInput
        style={styles.input}
        multiline
        value={message}
        onChangeText={setMessage}
        placeholder="Paste message..."
        placeholderTextColor="#94a3b8"
      />

      <TouchableOpacity style={styles.button} onPress={handleScan}>
        <Text style={styles.btnText}>
          {loading ? "Checking..." : "Scan"}
        </Text>
      </TouchableOpacity>

      {result && <PremiumResultCard result={result} onReport={() => {}} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617", padding: 16 },
  title: { color: "#fff", fontSize: 22, fontWeight: "800" },
  input: {
    backgroundColor: "#0f172a",
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    color: "#fff",
    minHeight: 120,
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 14,
    marginTop: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "800" },
});