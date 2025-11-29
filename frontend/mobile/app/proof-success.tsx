import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Animated, { FadeInUp, FadeIn } from "react-native-reanimated";

export default function ProofSuccess() {
  const { proof } = useLocalSearchParams();
  const proofData = JSON.parse(proof);

  return (
    <View style={styles.container}>
      <View style={styles.glow} />

      <Animated.Text entering={FadeInUp} style={styles.emoji}>
        🎉
      </Animated.Text>

      <Animated.Text entering={FadeInUp.delay(80)} style={styles.title}>
        Proof Generated!
      </Animated.Text>

      <Animated.View entering={FadeInUp.delay(150)} style={styles.card}>
        <Text style={styles.label}>Credential</Text>
        <Text style={styles.value}>{proofData.claim}</Text>

        <Text style={styles.label}>UTxO Receipt</Text>
        <Text style={styles.value}>{proofData.utxo}</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(220)}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.96 }] }
          ]}
          onPress={() =>
            router.push({
              pathname: "/share-proof",
              params: { claim: proofData.claim }
            })
          }
        >
          <Text style={styles.buttonText}>View QR Code</Text>
        </Pressable>
      </Animated.View>

      <Pressable onPress={() => router.replace("/wallet-home")}>
        <Text style={styles.link}>← Back to Wallet</Text>
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
    paddingHorizontal: 20,
  },

  glow: {
    position: "absolute",
    width: 320,
    height: 320,
    backgroundColor: "rgba(52,211,153,0.12)",
    borderRadius: 200,
    top: -40,
    left: -40,
  },

  emoji: {
    fontSize: 80,
    marginBottom: 10,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 20,
  },

  card: {
    width: "90%",
    padding: 22,
    borderRadius: 16,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
  },

  label: {
    color: "#94a3b8",
    marginTop: 14,
    fontSize: 14,
  },

  value: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#34d399",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 14,
    marginBottom: 30,
    shadowColor: "#34d399",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },

  link: {
    color: "#38bdf8",
    fontSize: 16,
  },
});
