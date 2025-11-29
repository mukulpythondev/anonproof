import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Background Glow */}
      <View style={styles.glow} />

      <Animated.View entering={FadeInUp.duration(700)} style={styles.centerBox}>
        
        <Animated.View entering={FadeInUp.delay(200).duration(700)} style={styles.logoWrap}>
          <View style={styles.logoGlow} />
          <Text style={styles.logoIcon}>🛡️</Text>
        </Animated.View>

        <Text style={styles.title}>Midnight Pass</Text>

        <Text style={styles.subtitle}>
          Zero-knowledge credential wallet
        </Text>

        <Pressable 
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.97 }] }
          ]}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
    alignItems: "center",
    padding: 24,
    position: "relative",
  },

  glow: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 200,
    backgroundColor: "rgba(52, 211, 153, 0.15)",
    top: "20%",
    filter: "blur(80px)",
  },

  centerBox: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
  },

  logoWrap: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },

  logoGlow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(94,234,212,0.25)",
  },

  logoIcon: {
    fontSize: 40,
  },

  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "white",
    marginBottom: 8,
    letterSpacing: 0.5,
    textAlign: "center",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: 16,
    marginBottom: 50,
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#34d399",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    shadowColor: "#34d399",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },

  buttonText: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: 18,
  },
});
