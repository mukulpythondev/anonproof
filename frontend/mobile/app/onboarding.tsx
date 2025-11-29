import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Onboarding() {
  return (
    <View style={styles.container}>
      
      {/* Background Glow */}
      <View style={styles.glow} />

      <Animated.View entering={FadeInUp.duration(700)} style={styles.content}>
        <Text style={styles.title}>Welcome to Midnight Pass</Text>

        <Text style={styles.subtitle}>
          Prove credentials privately using Zero-Knowledge Proofs.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.96 }] },
          ]}
          onPress={() => router.push("/wallet-home")}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    padding: 28,
  },

  glow: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 200,
    backgroundColor: "rgba(96, 165, 250, 0.15)",
    top: "20%",
    right: "-10%",
    filter: "blur(90px)",
  },

  content: {
    maxWidth: 380,
  },

  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "800",
    marginBottom: 14,
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#34d399",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#34d399",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
  },

  buttonText: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "700",
  },
});
