import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet, linkin } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import { saveCredential } from "../util/storage";
import { generateProof } from "../util/api";
export default function CredentialInput() {
  const { id } = useLocalSearchParams();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const config = {
    age18: { label: "Date of Birth", placeholder: "YYYY-MM-DD" },
    student: { label: "Student ID", placeholder: "Enter your student ID" },
    resident: { label: "Postal Code", placeholder: "Enter your postal code" },
  }[id] || { label: "Value", placeholder: "" };

 const handleSubmit = async () => {
  if (!value.trim()) return;

  setLoading(true);

  const response = await generateProof(id, value);

  const proof = {
    proofHash: response.proofHash,
    claim: id,
    inputValue: value,
    timestamp: response.timestamp,
    utxo: response.utxo,          // ✅ REAL TX HASH
    validator: "midnight_zkp_v1",
  };

  await saveCredential(proof);
  setLoading(false);

  router.push({
    pathname: "/proof-success",
    params: { proof: JSON.stringify(proof) },
  });
};


  return (
    <View style={styles.container}>

      <View style={styles.glow} />

      <Animated.View entering={FadeInUp} style={{ width: "100%" }}>
        <Text style={styles.heading}>{config.label}</Text>
        <Text style={styles.subheading}>
          Your data remains private — only the proof is shared.
        </Text>

        <TextInput
          style={styles.input}
          placeholder={config.placeholder}
          placeholderTextColor="#64748b"
          value={value}
          onChangeText={setValue}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.97 }] }
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0f172a" />
          ) : (
            <Text style={styles.buttonText}>Generate Proof</Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>← Back</Text>
        </Pressable>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    paddingTop: 80,
  },

  glow: {
    position: "absolute",
    width: 350,
    height: 350,
    backgroundColor: "rgba(52,211,153,0.12)",
    borderRadius: 200,
    top: 0,
    left: -40,
    filter: "blur(100px)",
  },

  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },

  subheading: {
    color: "#94a3b8",
    marginBottom: 30,
    fontSize: 15,
    lineHeight: 20,
  },

  input: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },

  button: {
    backgroundColor: "#34d399",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#34d399",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
  },

  buttonText: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#0f172a" 
  },

  link: {
    color: "#38bdf8",
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
});
