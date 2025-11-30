import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { generateProof } from "@/util/api";

export default function ShareProof() {
  const { claim } = useLocalSearchParams();
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function createProof() {
    try {
      const res = await generateProof(claim, "user_input_random");

      const qrPayload = {
        claim: res.claim,
        proofHash: res.proofHash,
        utxo: res.utxo,
        proof: res.proof,
        publicSignals: res.publicSignals,
      };

      setQrData(qrPayload);
    } catch (err) {
      alert("Failed to generate proof: " + err.message);
      router.back();
    } finally {
      setLoading(false);
    }
  }

  useState(() => {
    createProof();
  });

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#38bdf8" />
        <Text style={styles.text}>Generating Zero-Knowledge proof...</Text>
      </View>
    );

  if (!qrData)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Something went wrong.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your ZK-Proof QR</Text>

      <View style={styles.qrBox}>
        <QRCode value={JSON.stringify(qrData)} size={280} />
      </View>

      <Text style={styles.sub}>Show this QR to the event organizer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", alignItems: "center", paddingTop: 80 },
  title: { fontSize: 28, fontWeight: "700", color: "white", marginBottom: 20 },
  qrBox: { padding: 20, backgroundColor: "white", borderRadius: 20, elevation: 10 },
  sub: { color: "#94a3b8", marginTop: 20, fontSize: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" },
  text: { color: "white", marginTop: 12 },
  error: { color: "red", fontSize: 18 },
});
