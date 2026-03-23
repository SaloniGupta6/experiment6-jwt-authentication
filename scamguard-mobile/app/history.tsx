import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { useFocusEffect } from "expo-router";
import api from "../src/services/api";
import { getUser } from "../src/utils/authStorage";

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);

  const loadHistory = async () => {
    try {
      const user = await getUser();

      if (!user?.email) {
        setHistory([]);
        return;
      }

      const res = await api.get("/api/history", {
        params: { email: user.email },
      });

      setHistory(res.data || []);
    } catch (error: any) {
      console.log("HISTORY API ERROR:", error?.response?.data || error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const handleClear = () => {
    if (Platform.OS === "web") {
      window.alert("User-specific clear is not implemented yet.");
    } else {
      Alert.alert("Info", "User-specific clear is not implemented yet.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>🕘 Your Scan History</Text>

        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearBtnText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No scans yet</Text>
          <Text style={styles.emptyText}>
            Your scans will appear here after you analyze messages or URLs.
          </Text>
        </View>
      ) : (
        history.map((item, index) => (
          <View key={`${item.createdAt}-${index}`} style={styles.card}>
            <Text style={styles.badge}>
              {item.type === "message" ? "MESSAGE SCAN" : "URL SCAN"}
            </Text>

            <Text style={styles.input}>{item.input}</Text>

            <Text style={styles.label}>Risk Type</Text>
            <Text style={styles.value}>{item.riskType}</Text>

            <Text style={styles.label}>Scam Probability</Text>
            <Text style={styles.probability}>{item.scamProbability}</Text>

            <Text style={styles.label}>Advice</Text>
            <Text style={styles.advice}>{item.safetyAdvice}</Text>

            <Text style={styles.time}>
              {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
            </Text>
          </View>
        ))
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
  headerRow: {
    marginTop: 20,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  clearBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  clearBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  emptyCard: {
    backgroundColor: "#1e2b44",
    borderRadius: 16,
    padding: 20,
  },
  emptyTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptyText: {
    color: "#cbd5e1",
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#1e2b44",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  badge: {
    color: "#94a3b8",
    fontSize: 12,
    marginBottom: 8,
  },
  input: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },
  label: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 8,
  },
  value: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  probability: {
    color: "#ff6b6b",
    fontSize: 17,
    fontWeight: "700",
  },
  advice: {
    color: "#e5e7eb",
    fontSize: 14,
    marginTop: 4,
  },
  time: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 14,
  },
});