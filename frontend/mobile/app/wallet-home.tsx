import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { loadCredentials } from "../util/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeInUp, FadeIn, SlideInUp } from "react-native-reanimated";
import { Linking } from "react-native";
export default function WalletHome() {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** Auto-refresh when returning to this screen */
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadCredentials()
        .then(setCredentials)
        .catch(() => setError("Failed to load credentials"))
        .finally(() => setLoading(false));
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("midnightUser");
    router.replace("/login");
  };

  /** ---------------- SHIMMER CARD ---------------- */
  const ShimmerCard = () => (
    <Animated.View entering={FadeIn}>
      <View style={styles.shimmerCard}>
        <View style={styles.shimmerIcon} />
        <View style={{ flex: 1 }}>
          <View style={styles.shimmerLine} />
          <View style={[styles.shimmerLine, { width: "40%", marginTop: 10 }]} />
          <View style={[styles.shimmerLine, { width: "60%", marginTop: 10 }]} />
        </View>
      </View>
    </Animated.View>
  );

  /** ---------------- ERROR POPUP ---------------- */
  const ErrorPopup = () => (
    <Animated.View entering={SlideInUp} style={styles.errorPopup}>
      <Text style={styles.errorTitle}>Error</Text>
      <Text style={styles.errorText}>{error}</Text>
      <Pressable onPress={() => setError(null)} style={styles.errorButton}>
        <Text style={styles.errorButtonText}>Dismiss</Text>
      </Pressable>
    </Animated.View>
  );

  /** ---------------- CARD RENDER ---------------- */
  const renderCard = ({ item, index }) => (
    <Animated.View entering={FadeInUp.delay(index * 120)}>
      <Pressable
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/share-proof",
            params: { claim: item.claim },
          })
        }
      >
        <Text style={styles.icon}>
          {item.claim === "age18"
            ? "🎂"
            : item.claim === "student"
            ? "🎓"
            : "🏠"}
        </Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>
            {item.claim === "age18"
              ? "Age ≥ 18"
              : item.claim === "student"
              ? "Student Status"
              : "Residency Proof"}
          </Text>

          <Text style={styles.verified}>✔ Verified (Local Proof)</Text>
         <Text
  style={[styles.utxo, { color: "#38bdf8" }]}
  onPress={() =>
    Linking.openURL(
      `https://preprod.cardanoscan.io/transaction/${item.utxo}`
    )
  }
>
  TX: {item.utxo.slice(0, 10)}...
</Text>

        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Background Glow */}
      <View style={styles.glow} />

      {/* Error Popup */}
      {error && <ErrorPopup />}

      {/* Logout */}
      <Pressable onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

      <Text style={styles.title}>Your Wallet</Text>

      {/* ---------------- LOADER ---------------- */}
      {loading ? (
        <>
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </>
      ) : credentials.length === 0 ? (
        <Animated.View entering={FadeInUp} style={styles.emptyBox}>
          <Text style={styles.emptyText}>No credentials yet</Text>
          <Text style={styles.emptySub}>Add your first credential to begin.</Text>
        </Animated.View>
      ) : (
        <FlatList
          data={credentials}
          renderItem={renderCard}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}

      {/* Add Credential Button */}
      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          pressed && { transform: [{ scale: 0.97 }] },
        ]}
        onPress={() => router.push("/add-credential")}
      >
        <Text style={styles.addButtonText}>Add Credential</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", padding: 20, paddingTop: 70 },

  glow: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 300,
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    top: "5%",
    right: "-15%",
  },

  title: { color: "white", fontSize: 34, fontWeight: "800", marginBottom: 20 },

  logoutButton: {
    position: "absolute",
    top: 40,
    right: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },

  logoutText: { color: "#f87171", fontWeight: "600" },

  /** ---------------- EMPTY STATE ---------------- */
  emptyBox: {
    backgroundColor: "#1e293b",
    padding: 30,
    borderRadius: 16,
    borderColor: "#334155",
    borderWidth: 1,
    marginTop: 20,
  },
  emptyText: { color: "white", fontSize: 22, fontWeight: "700" },
  emptySub: { color: "#94a3b8", marginTop: 6 },

  /** ---------------- SHIMMER ---------------- */
  shimmerCard: {
    backgroundColor: "#1e293b",
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    opacity: 0.5,
  },
  shimmerIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#334155",
    borderRadius: 10,
    marginRight: 14,
  },
  shimmerLine: {
    height: 12,
    backgroundColor: "#334155",
    borderRadius: 6,
    width: "70%",
  },

  /** ---------------- CARD ---------------- */
  card: {
    backgroundColor: "#1e293b",
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  icon: { fontSize: 36, marginRight: 14 },
  cardTitle: { color: "white", fontSize: 18, fontWeight: "700" },
  verified: { color: "#34d399", fontSize: 13, marginTop: 4 },
  utxo: { color: "#94a3b8", fontSize: 12, marginTop: 4 },

  /** ---------------- ADD BUTTON ---------------- */
  addButton: {
    backgroundColor: "#34d399",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: "auto",
    shadowColor: "#34d399",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
  },
  addButtonText: { fontSize: 18, color: "#0f172a", fontWeight: "700" },

  /** ---------------- ERROR POPUP ---------------- */
  errorPopup: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#ef4444",
    padding: 18,
    borderRadius: 14,
  },
  errorTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  errorText: { color: "white", fontSize: 14 },
  errorButton: {
    marginTop: 10,
    backgroundColor: "white",
    paddingVertical: 8,
    borderRadius: 10,
  },
  errorButtonText: {
    color: "#ef4444",
    fontWeight: "700",
    textAlign: "center",
  },
});
