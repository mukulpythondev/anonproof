import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { loadCredentials } from "../util/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function WalletHome() {
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    loadCredentials().then(setCredentials);
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("midnightUser");
    router.replace("/login");
  };

  const renderCard = ({ item, index }) => (
    <Animated.View entering={FadeInUp.delay(index * 100)}>

      <Pressable
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/share-proof",
            params: { claim: item.claim }
          })
        }
      >
        <Text style={styles.icon}>
          {item.claim === "age18" ? "🎂" : item.claim === "student" ? "🎓" : "🏠"}
        </Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>
            {item.claim === "age18" ? "Age ≥ 18" :
             item.claim === "student" ? "Student Status" : "Residency Proof"}
          </Text>

          <Text style={styles.verified}>✔ Verified on-chain</Text>
          <Text style={styles.utxo}>UTxO: {item.utxo}</Text>
        </View>
      </Pressable>

    </Animated.View>
  );

  return (
    <View style={styles.container}>

      {/* Glow */}
      <View style={styles.glow} />

      {/* Logout */}
      <Pressable onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

      <Text style={styles.title}>Your Wallet</Text>

      {credentials.length === 0 ? (
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

      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          pressed && { transform: [{ scale: 0.96 }] }
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
    width: 380,
    height: 380,
    borderRadius: 300,
    backgroundColor: "rgba(59, 130, 246, 0.12)",
    top: "10%",
    right: "-10%",
    filter: "blur(100px)",
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
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
  },

  icon: { fontSize: 36, marginRight: 14 },
  cardTitle: { color: "white", fontSize: 18, fontWeight: "700" },
  verified: { color: "#34d399", fontSize: 13, marginTop: 4 },
  utxo: { color: "#94a3b8", fontSize: 12, marginTop: 4 },

  addButton: {
    backgroundColor: "#34d399",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: "auto",
  },
  addButtonText: { fontSize: 18, color: "#0f172a", fontWeight: "700" },
});
