import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;

    const user = { email, password };

    await AsyncStorage.setItem("midnightUser", JSON.stringify(user));
    await AsyncStorage.removeItem("midnightCredentials");

    router.replace("/onboarding");
  };

  return (
    <View style={styles.container}>

      {/* Background Glow */}
      <View style={styles.glow} />

      <Animated.View entering={FadeInUp.duration(600)} style={styles.card}>
        <Text style={styles.heading}>Welcome Back</Text>

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
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/signup")}>
          <Text style={styles.link}>Create an account</Text>
        </Pressable>

        <Pressable 
          onPress={() => router.push("/organizer/login")} 
          style={{ marginTop: 28 }}
        >
          <Text style={styles.orgLink}>Organizer Login →</Text>
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
  },

  glow: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 200,
    backgroundColor: "rgba(52, 211, 153, 0.12)",
    top: "18%",
    filter: "blur(80px)",
  },

  card: {
    width: "100%",
    maxWidth: 380,
  },

  heading: {
    color: "white",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 28,
  },

  input: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
    borderColor: "#334155",
  },

  button: {
    backgroundColor: "#34d399",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#34d399",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
  },

  buttonText: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "700",
  },

  link: {
    color: "#38bdf8",
    textAlign: "center",
    marginTop: 18,
    fontSize: 15,
  },

  orgLink: {
    color: "#60a5fa",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
});
