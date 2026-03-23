import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { clearAuth, getUser } from "../../src/utils/authStorage";

const quickActions = [
  {
    title: "Scan Message",
    subtitle: "Detect suspicious SMS, WhatsApp, or email text",
    emoji: "📩",
    route: "/message-scan",
    color: "#65c66e",
  },
  {
    title: "Scan URL",
    subtitle: "Analyze links before opening them",
    emoji: "🔗",
    route: "/url-scan",
    color: "#4f86f7",
  },
  {
    title: "History",
    subtitle: "Review previous scans and risk outcomes",
    emoji: "🕘",
    route: "/history",
    color: "#f59e0b",
  },
  {
    title: "Report Scam",
    subtitle: "Report scam messages, links, or fraud numbers",
    emoji: "🚨",
    route: "/report-scam",
    color: "#ef4444",
  },
  {
    title: "Learn Scams",
    subtitle: "Stay aware of common scam patterns",
    emoji: "🎓",
    route: "/learn",
    color: "#a855f7",
  },
];

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await getUser();
      setUser(savedUser);
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    await clearAuth();

    if (Platform.OS === "web") {
      window.alert("Logged out successfully.");
    } else {
      Alert.alert("Logout", "Logged out successfully.");
    }

    router.replace("/login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greeting}>
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </Text>
          <Text style={styles.title}>🛡 ScamGuard AI</Text>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Your premium AI safety assistant</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Today’s Protection Status</Text>
        <Text style={styles.heroText}>
          ScamGuard helps you detect risky messages, suspicious links, and fraud patterns in seconds.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>94%</Text>
            <Text style={styles.statLabel}>Detection Confidence</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Safety Assistance</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        {quickActions.map((item) => (
          <Pressable
            key={item.title}
            style={[styles.card, { borderColor: item.color }]}
            onPress={() => router.push(item.route as any)}
          >
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Safety Tips</Text>
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Never share OTP, PIN, or banking passwords</Text>
        <Text style={styles.tipText}>
          Legitimate banks and payment apps never ask for your OTP or PIN over call, SMS, or chat.
        </Text>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Always verify suspicious links</Text>
        <Text style={styles.tipText}>
          If a message pressures you to click immediately, verify the sender and domain before acting.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#081735",
    padding: 16,
  },
  topRow: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greeting: {
    color: "#93c5fd",
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 16,
    marginTop: 6,
    marginBottom: 16,
  },
  heroCard: {
    backgroundColor: "#13233f",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#22395f",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  heroText: {
    color: "#d1d5db",
    lineHeight: 22,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#1a2d4d",
    borderRadius: 16,
    padding: 14,
  },
  statNumber: {
    color: "#65c66e",
    fontSize: 24,
    fontWeight: "800",
  },
  statLabel: {
    color: "#cbd5e1",
    marginTop: 4,
    fontSize: 13,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
  grid: {
    gap: 14,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#12233f",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.2,
  },
  cardEmoji: {
    fontSize: 28,
    marginBottom: 10,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  cardSubtitle: {
    color: "#cbd5e1",
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: "#12233f",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#22395f",
  },
  tipTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  tipText: {
    color: "#d1d5db",
    lineHeight: 22,
  },
});