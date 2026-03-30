import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛡 ScamGuard AI</Text>

      <TouchableOpacity onPress={() => router.push("/message-scan")} style={styles.btn}>
        <Text style={styles.text}>Scan Message</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/url-scan")} style={styles.btn}>
        <Text style={styles.text}>Scan URL</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/history")} style={styles.btn}>
        <Text style={styles.text}>History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "#081735", padding: 20 },
  title: { color: "#fff", fontSize: 28, marginBottom: 30 },
  btn: { backgroundColor: "#4f86f7", padding: 16, marginBottom: 12 },
  text: { color: "#fff", textAlign: "center" },
});