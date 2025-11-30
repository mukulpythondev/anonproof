import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadCredentials = async () => {
  const raw = await AsyncStorage.getItem("midnightCredentials");
  return raw ? JSON.parse(raw) : [];
};

export const saveCredential = async (cred) => {
  const existing = await loadCredentials();
  const updated = [...existing, cred];
  await AsyncStorage.setItem("midnightCredentials", JSON.stringify(updated));
};

export const loadCredentialByClaim = async (claimId) => {
  const all = await loadCredentials();
  return all.find((item) => item.claim === claimId);
};


export const clearCredentials = async () => {
await AsyncStorage.removeItem("midnightCredentials");
};
