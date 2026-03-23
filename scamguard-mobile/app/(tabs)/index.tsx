import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity, Alert, Platform } from "react-native";
import { router } from "expo-router";
import { clearAuth } from "../../src/utils/authStorage";

const cards = [
  {
    title: "Scan Message",
    subtitle: "Check suspicious SMS, WhatsApp, or email text",
    emoji: "📩",
    route: "/message-scan",
    color: "#65c66e",
  },
  {
    title: "Scan URL",
    subtitle: "Analyze suspicious links before opening them",
    emoji: "🔗",
    route: "/url-scan",
    color: "#4f86f7",
  },
  {
    title: "History",
    subtitle: "See your previous scans and results",
    emoji: "🕘",
    route: "/history",
    color: "#f59e0b",
  },
  {
    title: "Report Scam",
    subtitle: "Report scam messages, links, or numbers",
    emoji: "🚨",
    route: "/report-scam",
    color: "#ef4444",
  },
  {
    title: "Learn Scams",
    subtitle: "Learn common fraud patterns and stay safe",
    emoji: "🎓",
    route: "/learn",
    color: "#a855f7",
  },
];

export default function HomeScreen() {
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
        <Text style={styles.title}>🛡 ScamGuard AI</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Your AI safety assistant</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Stay safe from scams every day</Text>
        <Text style={styles.heroText}>
          Detect risky messages, suspicious links, and common fraud patterns in seconds.
        </Text>
      </View>

      <View style={styles.grid}>
        {cards.map((card) => (
          <Pressable
            key={card.title}
            style={[styles.card, { borderColor: card.color }]}
            onPress={() => router.push(card.route as any)}
          >
            <Text style={styles.cardEmoji}>{card.emoji}</Text>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
          </Pressable>
        ))}
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
    alignItems: "center",
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
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#22395f",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  heroText: {
    color: "#d1d5db",
    lineHeight: 22,
  },
  grid: {
    gap: 14,
  },
  card: {
    backgroundColor: "#1e2b44",
    borderRadius: 16,
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
    fontWeight: "700",
    marginBottom: 6,
  },
  cardSubtitle: {
    color: "#cbd5e1",
    lineHeight: 20,
  },
});