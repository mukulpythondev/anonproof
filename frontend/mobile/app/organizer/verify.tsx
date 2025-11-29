import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Verify() {
  const params = useLocalSearchParams();

  const isValid =
    params.proofHash &&
    params.claim &&
    params.utxo &&
    params.validator;

  if (!isValid) {
    return router.replace("/organizer/verify-fail?reason=Invalid%20Proof");
  }

  const approveEntry = () => {
    router.replace({
      pathname: "/organizer/verify-success",
      params
    });
  };

  const denyEntry = () => {
    router.replace("/organizer/verify-fail?reason=Manually%20Denied");
  };

  return (
    <View style={styles.container}>
      <View style={styles.glow} />

     <Animated.Text entering={FadeInUp} style={styles.title}>
        Verification Details
      </Animated.Text>

      <Animated.View entering={FadeInUp.delay(80)} style={styles.card}>
        <Text style={styles.label}>Proof Hash</Text>
        <Text style={styles.value}>{params.proofHash}</Text>

        <Text style={styles.label}>Claim</Text>
        <Text style={styles.value}>{params.claim}</Text>

        <Text style={styles.label}>UTxO</Text>
        <Text style={styles.value}>{params.utxo}</Text>

        <Text style={styles.label}>Validator</Text>
        <Text style={styles.value}>{params.validator}</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(150)}>
        <Pressable style={styles.successBtn} onPress={approveEntry}>
          <Text style={styles.btnText}>Approve Entry</Text>
        </Pressable>

        <Pressable style={styles.failBtn} onPress={denyEntry}>
          <Text style={styles.btnTextFail}>Deny Entry</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", padding: 22, paddingTop: 80 },
  glow: {
    position: "absolute",
    width: 320,
    height: 320,
    backgroundColor: "rgba(56,189,248,0.12)",
    borderRadius: 200,
    top: -40,
    right: -40,
  },
  title: { color: "white", fontSize: 30, fontWeight: "800", marginBottom: 20 },
  card: {
    backgroundColor: "#1e293b",
    padding: 22,
    borderRadius: 16,
    borderColor: "#334155",
    borderWidth: 1,
    marginBottom: 30,
  },
  label: { color: "#94a3b8", marginTop: 12, fontSize: 13 },
  value: { color: "white", fontSize: 17, fontWeight: "600" },
  successBtn: {
    backgroundColor: "#34d399",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
  },
  failBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: { color: "#0f172a", fontSize: 18, fontWeight: "700" },
  btnTextFail: { color: "white", fontSize: 18, fontWeight: "700" }
});
