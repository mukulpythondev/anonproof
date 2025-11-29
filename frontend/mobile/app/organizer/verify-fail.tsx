import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function VerifyFail() {
  const { reason } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.glow} />

      <Animated.Text entering={FadeInUp} style={styles.bigX}>❌</Animated.Text>
      <Animated.Text entering={FadeInUp.delay(80)} style={styles.title}>
        Verification Failed
      </Animated.Text>

      <Animated.Text entering={FadeInUp.delay(160)} style={styles.reason}>
        {reason}
      </Animated.Text>

      <Animated.View entering={FadeInUp.delay(240)}>
        <Pressable
          style={styles.button}
          onPress={() => router.replace("/organizer/scanner")}
        >
          <Text style={styles.btnText}>Scan Again</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", alignItems: "center", paddingTop: 100 },
  glow: {
    position: "absolute",
    width: 350,
    height: 350,
    backgroundColor: "rgba(239,68,68,0.12)",
    borderRadius: 200,
    top: -40,
    right: -30,
  },
  bigX: { fontSize: 90, marginBottom: 20 },
  title: { color: "white", fontSize: 30, fontWeight: "800" },
  reason: {
    color: "#f87171",
    marginTop: 12,
    marginBottom: 25,
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#38bdf8",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    marginTop: 20,
  },
  btnText: { color: "#0f172a", fontSize: 18, fontWeight: "700" }
});
