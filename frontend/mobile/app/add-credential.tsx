import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { router } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

const credentialOptions = [
  {
    id: "age18",
    title: "Age ≥ 18",
    subtitle: "Prove you are an adult",
    icon: "🎂",
  },
  {
    id: "student",
    title: "Student Status",
    subtitle: "Verify student eligibility",
    icon: "🎓",
  },
  {
    id: "resident",
    title: "Local Residency",
    subtitle: "Confirm your postal region",
    icon: "🏠",
  },
];

export default function AddCredential() {
  const selectCredential = (cred: any, index: number) => {
    router.push({
      pathname: "/credential-input",
      params: { id: cred.id },
    });
  };

  const renderItem = ({ item, index }) => (
    <Animated.View entering={FadeInUp.delay(index * 120)}>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && { transform: [{ scale: 0.97 }] }
        ]}
        onPress={() => selectCredential(item, index)}
      >
        <Text style={styles.icon}>{item.icon}</Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.glow} />

      <Text style={styles.heading}>Choose Credential</Text>
      <Text style={styles.subheading}>Select what you want to prove</Text>

      <FlatList
        data={credentialOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    paddingTop: 60
  },

  glow: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "rgba(56,189,248,0.12)",
    borderRadius: 200,
    top: -40,
    right: -20,
    filter: "blur(90px)"
  },

  heading: {
    color: "white",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 6,
  },

  subheading: {
    color: "#94a3b8",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
  },

  icon: {
    fontSize: 32,
    marginRight: 16,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 3,
  },
});
