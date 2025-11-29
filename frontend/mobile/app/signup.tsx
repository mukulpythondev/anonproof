import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) return;

    const user = { name, email, password };
    await AsyncStorage.setItem("midnightUser", JSON.stringify(user));

    // New user → clear old wallet
    await AsyncStorage.removeItem("midnightCredentials");

    router.replace("/onboarding");
  };

  return (
    <View style={styles.container}>
      <View style={styles.glow} />

      <Animated.View entering={FadeInUp.duration(600)} style={styles.card}>
        <Text style={styles.heading}>Create Account</Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#64748b"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#64748b"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#64748b"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.97 }] }
          ]}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/login")}>
          <Text style={styles.link}>← Back to Login</Text>
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
    padding: 24,
  },

  glow: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 200,
    backgroundColor: "rgba(94, 234, 212, 0.12)",
    top: "15%",
    left: "-10%",
    filter: "blur(90px)",
  },

  card: {
    width: "100%",
    maxWidth: 380,
  },

  heading: {
    color: "white",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 26,
  },

  input: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#34d399",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 4,
    shadowColor: "#34d399",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 }
  },

  buttonText: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "700",
  },

  link: {
    marginTop: 20,
    color: "#60a5fa",
    textAlign: "center",
    fontSize: 15,
  }
});
