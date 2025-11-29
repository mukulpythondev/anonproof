import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function OrganizerLogin() {
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!password.trim()) {
      Alert.alert("Error", "Password cannot be empty.");
      return;
    }

    // HARD-CODED ORGANIZER PASSWORD (Hackathon Friendly)
    if (password !== "midnight-admin") {
      Alert.alert("Access Denied", "Incorrect organizer password.");
      return;
    }

    // Save organizer role
    await AsyncStorage.setItem("organizerUser", "true");

    // Redirect to organizer dashboard
    router.replace("/organizer/dashboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Organizer Login</Text>
      <Text style={styles.subheading}>Restricted access for event staff only</Text>

      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter organizer password"
        placeholderTextColor="#64748b"
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable onPress={() => router.replace("/login")}>
        <Text style={styles.link}>← Back to Attendee App</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    paddingTop: 120,
  },
  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subheading: {
    color: "#94a3b8",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 25,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#34d399",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  link: {
    color: "#38bdf8",
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
});
