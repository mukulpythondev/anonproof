import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function OrganizerDashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const raw = await AsyncStorage.getItem("scanLogs");
    setLogs(raw ? JSON.parse(raw) : []);
  };

  const verified = logs.filter(l => l.status === "success").length;
  const denied = logs.filter(l => l.status === "fail").length;

  const handleLogout = async () => {
    await AsyncStorage.removeItem("organizerUser");
    router.replace("/organizer/login");
  };

  const renderItem = ({ item, index }) => (
    <Animated.View entering={FadeInUp.delay(index * 100)}>
      <View style={styles.logItem}>
        <Text style={[styles.logStatus, item.status === "success" ? styles.success : styles.fail]}>
          {item.status === "success" ? "✔" : "✘"}
        </Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.logTitle}>{item.claim}</Text>
          <Text style={styles.logTime}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
        </View>

        <Text style={styles.logUtxo}>{item.utxo.slice(0, 10)}...</Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.glow} />

      {/* LOGOUT BTN */}
      <Pressable onPress={handleLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

      {/* HEADER */}
      <Animated.Text entering={FadeInUp} style={styles.heading}>
        Organizer Dashboard
      </Animated.Text>
      <Animated.Text entering={FadeInUp.delay(50)} style={styles.subheading}>
        Live verification statistics
      </Animated.Text>

      {/* STATS */}
      <View style={styles.statsRow}>
        <Animated.View entering={FadeInUp.delay(100)} style={[styles.card, styles.green]}>
          <Text style={styles.cardNumber}>{verified}</Text>
          <Text style={styles.cardLabel}>Verified</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(160)} style={[styles.card, styles.red]}>
          <Text style={styles.cardNumber}>{denied}</Text>
          <Text style={styles.cardLabel}>Denied</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(220)} style={[styles.card, styles.blue]}>
          <Text style={styles.cardNumber}>{logs.length}</Text>
          <Text style={styles.cardLabel}>Total</Text>
        </Animated.View>
      </View>

      <Text style={styles.sectionTitle}>Recent Scans</Text>

      {logs.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No scans yet</Text>
        </View>
      ) : (
        <FlatList
          data={[...logs].reverse().slice(0, 10)}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Pressable
        style={({ pressed }) => [
          styles.scanButton,
          pressed && { transform: [{ scale: 0.95 }] }
        ]}
        onPress={() => router.push("/organizer/scanner")}
      >
        <Text style={styles.scanText}>📷 Scan QR Code</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", padding: 20, paddingTop: 80 },

  glow: {
    position: "absolute",
    width: 350,
    height: 350,
    backgroundColor: "rgba(56,189,248,0.12)",
    borderRadius: 200,
    top: -50,
    right: -40,
  },

  logout: {
    position: "absolute",
    top: 40,
    right: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 10,
  },
  logoutText: { color: "#f87171", fontWeight: "700" },

  heading: { color: "white", fontSize: 30, fontWeight: "800" },
  subheading: { color: "#94a3b8", marginBottom: 30 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  card: {
    width: "30%",
    paddingVertical: 20,
    borderRadius: 18,
    alignItems: "center",
  },

  green: { backgroundColor: "#059669" },
  red: { backgroundColor: "#dc2626" },
  blue: { backgroundColor: "#2563eb" },

  cardNumber: { color: "white", fontSize: 26, fontWeight: "800" },
  cardLabel: { color: "#cbd5e1", fontSize: 14 },

  sectionTitle: {
    color: "#e2e8f0",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  emptyBox: {
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 14,
    borderColor: "#334155",
    borderWidth: 1,
    alignItems: "center",
  },
  emptyText: { color: "#94a3b8" },

  logItem: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  logStatus: { fontSize: 22, marginRight: 14 },
  success: { color: "#10b981" },
  fail: { color: "#f87171" },

  logTitle: { color: "white", fontSize: 16, fontWeight: "700" },
  logTime: { color: "#94a3b8", fontSize: 12 },

  logUtxo: { color: "#60a5fa", fontSize: 12 },

  scanButton: {
    backgroundColor: "#34d399",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: "auto",
    shadowColor: "#34d399",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
  },

  scanText: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "700",
  },
});
