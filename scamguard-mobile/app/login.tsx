import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import { router } from "expo-router";
import api from "../src/services/api";
import { saveAuth } from "../src/utils/authStorage";

export default function LoginScreen() {
  const [email, setEmail] = useState("user123@gmail.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showMessage("Input required", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/login", { email, password });

      await saveAuth(res.data.token, {
        email: res.data.email,
        name: res.data.name,
      });

      router.replace("/(tabs)");
    } catch (error: any) {
      console.log("LOGIN ERROR:", error?.response?.data || error.message);
      showMessage("Login failed", error?.response?.data?.error || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Login</Text>
      <Text style={styles.subtitle}>Sign in to continue using ScamGuard AI</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.link}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#081735",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
  },
  subtitle: {
    color: "#cbd5e1",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#1e2b44",
    color: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  button: {
    backgroundColor: "#65c66e",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  link: {
    color: "#93c5fd",
    marginTop: 18,
    textAlign: "center",
  },
});