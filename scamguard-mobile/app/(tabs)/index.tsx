import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🛡</Text>
      <Text style={styles.title}>ScamGuard AI</Text>
      <Text style={styles.subtitle}>
        Your personal AI safety assistant for scam messages, phishing links, and digital fraud.
      </Text>

      <TouchableOpacity style={styles.primaryCard} onPress={() => router.push("/message-scan")}>
        <Text style={styles.cardIcon}>📩</Text>
        <View>
          <Text style={styles.cardTitle}>Scan a Message</Text>
          <Text style={styles.cardText}>Check SMS, WhatsApp, emails, and suspicious text.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryCard} onPress={() => router.push("/url-scan")}>
        <Text style={styles.cardIcon}>🔗</Text>
        <View>
          <Text style={styles.cardTitle}>Scan a URL</Text>
          <Text style={styles.cardText}>Detect phishing links and suspicious websites.</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.footerCard}>
        <Text style={styles.footerTitle}>Why ScamGuard?</Text>
        <Text style={styles.footerText}>
          Built to help users stay safe from scams, fake offers, phishing attacks, and risky digital decisions.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 24,
    justifyContent: "center",
  },
  logo: {
    fontSize: 54,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    color: "#cbd5e1",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
    marginBottom: 36,
  },
  primaryCard: {
    backgroundColor: "#1e293b",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    gap: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  secondaryCard: {
    backgroundColor: "#1e293b",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    gap: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardIcon: {
    fontSize: 26,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardText: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 250,
  },
  footerCard: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  footerTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  footerText: {
    color: "#cbd5e1",
    lineHeight: 22,
    fontSize: 14,
  },
});