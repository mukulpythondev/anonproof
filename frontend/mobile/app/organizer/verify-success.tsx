import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function VerifySuccess() {
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.glow} />

      <Animated.Text entering={FadeInUp} style={styles.bigCheck}>✅</Animated.Text>
      <Animated.Text entering={FadeInUp.delay(60)} style={styles.title}>Entry Approved</Animated.Text>

      <Animated.View entering={FadeInUp.delay(120)} style={styles.card}>
        <Text style={styles.label}>Claim</Text>
        <Text style={styles.value}>{params.claim}</Text>

        <Text style={styles.label}>UTxO</Text>
        <Text style={styles.value}>{params.utxo}</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(200)}>
        <Pressable
          style={styles.button}
          onPress={() => router.replace("/organizer/dashboard")}
        >
          <Text style={styles.btnText}>Back to Dashboard</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", alignItems: "center", paddingTop: 90 },
  glow: {
    position: "absolute",
    width: 350,
    height: 350,
    backgroundColor: "rgba(16,185,129,0.12)",
    borderRadius: 200,
    top: -40,
    right: -30,
  },
  bigCheck: { fontSize: 90, marginBottom: 18 },
  title: { color: "white", fontSize: 30, fontWeight: "800", marginBottom: 20 },
  card: {
    width: "85%",
    backgroundColor: "#1e293b",
    padding: 22,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  label: { color: "#94a3b8", marginTop: 12 },
  value: { color: "white", fontSize: 18, fontWeight: "600" },
  button: {
    backgroundColor: "#34d399",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
    marginTop: 40,
  },
  btnText: { color: "#0f172a", fontSize: 18, fontWeight: "700" }
});
