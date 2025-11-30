import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { XCircle } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function FailVerify() {
  const { reason } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.glow} />

      <Animated.View entering={FadeInUp} style={styles.iconWrap}>
        <XCircle size={90} color="#ef4444" />
      </Animated.View>

      <Animated.Text entering={FadeInUp.delay(80)} style={styles.title}>
        Verification Failed
      </Animated.Text>

      <Animated.Text entering={FadeInUp.delay(150)} style={styles.subtitle}>
        {reason || "Invalid Proof"}
      </Animated.Text>

      <Pressable style={styles.button} onPress={() => router.replace("/organizer/scanner")}>
        <Text style={styles.buttonText}>Try Again</Text>
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
    backgroundColor: "rgba(239,68,68,0.15)",
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
    marginBottom: 10,
  },

  subtitle: {
    color: "#ef4444",
    fontSize: 18,
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
  },

  buttonText: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "700",
  },
});
