import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { router, useLocalSearchParams } from "expo-router";
import { CheckCircle } from "lucide-react-native";

export default function OrganizerVerify() {
  const { claim, utxo, proofHash, timestamp } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.glow} />

      <Animated.View entering={FadeInUp} style={styles.iconWrap}>
        <CheckCircle size={90} color="#10b981" />
      </Animated.View>

      <Animated.Text entering={FadeInUp.delay(80)} style={styles.title}>
        Proof Verified ✔
      </Animated.Text>

      <Animated.View entering={FadeInUp.delay(150)} style={styles.card}>
        <Text style={styles.label}>Claim</Text>
        <Text style={styles.value}>{claim}</Text>

        <Text style={styles.label}>UTxO Receipt</Text>
        <Text style={styles.value}>{utxo}</Text>

        <Text style={styles.label}>Proof Hash</Text>
        <Text style={styles.value}>{proofHash}</Text>

        <Text style={styles.label}>Timestamp</Text>
        <Text style={styles.value}>{timestamp}</Text>
      </Animated.View>

      <Pressable style={styles.button} onPress={() => router.replace("/organizer/scanner")}>
        <Text style={styles.buttonText}>Scan Next</Text>
      </Pressable>

      <Pressable onPress={() => router.replace("/wallet-home")}>
        <Text style={styles.link}>Go to Home →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    paddingTop: 80,
  },

  glow: {
    position: "absolute",
    width: 320,
    height: 320,
    backgroundColor: "rgba(16,185,129,0.15)",
    borderRadius: 200,
    top: -40,
    right: -40,
  },

  iconWrap: {
    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 30,
  },

  card: {
    width: "85%",
    padding: 22,
    backgroundColor: "#1e293b",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },

  label: {
    color: "#94a3b8",
    marginTop: 14,
    fontSize: 14,
  },

  value: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#10b981",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    marginTop: 40,
  },

  buttonText: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "700",
  },

  link: {
    marginTop: 20,
    color: "#38bdf8",
    fontSize: 16,
  },
});
