import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { loadCredentialByClaim } from "../util/storage";

export default function ShareProof() {
  const { claim } = useLocalSearchParams();
  const [proof, setProof] = useState(null);

  useEffect(() => {
    loadCredentialByClaim(claim).then(setProof);
  }, []);

  if (!proof) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading proof…</Text>
      </View>
    );
  }

  const qrValue = JSON.stringify(proof);

  return (
    <View style={styles.container}>
      <View style={styles.glow} />

      <Animated.Text entering={FadeInUp} style={styles.title}>
        Your Event Pass
      </Animated.Text>

      <Animated.View entering={FadeInUp.delay(120)} style={styles.qrWrapper}>
        <QRCode value={qrValue} size={260} backgroundColor="white" />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(200)} style={styles.card}>
        <Text style={styles.label}>UTxO Receipt</Text>
        <Text style={styles.value}>{proof.utxo}</Text>

        <Text style={styles.label}>Validator</Text>
        <Text style={styles.value}>{proof.validator}</Text>
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
  },

  glow: {
    position: "absolute",
    width: 320,
    height: 320,
    backgroundColor: "rgba(56,189,248,0.12)",
    borderRadius: 200,
    top: -50,
    right: -40,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 40,
  },

  loading: {
    color: "white",
    marginTop: 80,
  },

  qrWrapper: {
    padding: 18,
    backgroundColor: "#1e293b",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#38bdf8",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
  },

  card: {
    marginTop: 40,
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
  },

  value: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  link: {
    color: "#38bdf8",
    marginTop: 30,
    fontSize: 16,
  },
});
