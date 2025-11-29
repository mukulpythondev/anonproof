import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "organizerScans";

export async function saveScanResult(result) {
  const existing = await AsyncStorage.getItem(KEY);
  let list = existing ? JSON.parse(existing) : [];

  list.unshift(result); // latest first

  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function loadScanResults() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function clearScanResults() {
  await AsyncStorage.removeItem(KEY);
}
export async function saveScanLog(entry) {
  try {
    const existing = await AsyncStorage.getItem("scanLogs");
    const logs = existing ? JSON.parse(existing) : [];
    logs.push(entry);
    await AsyncStorage.setItem("scanLogs", JSON.stringify(logs));
  } catch (err) {
    console.log("Error saving scan log:", err);
  }
}
