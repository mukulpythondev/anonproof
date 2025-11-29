import { Stack } from "expo-router";

export default function OrganizerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="scanner" />       {/* FIXED */}
      <Stack.Screen name="verify" />
      <Stack.Screen name="verify-success" />
      <Stack.Screen name="verify-fail" />
    </Stack>
  );
}
