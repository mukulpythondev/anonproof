import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { saveScanLog } from "@/util/org-storage";
export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleScan = async ({ data }) => {
  if (scanned) return;
  setScanned(true);

  try {
    const proof = JSON.parse(data);

    const entry = {
      claim: proof.claim,
      utxo: proof.utxo,
      timestamp: proof.timestamp,
      proofHash: proof.proofHash,
      status: proof.validator === "midnight_zkp_v1" ? "success" : "fail"
    };

    await saveScanLog(entry);

    router.push({
      pathname: "/organizer/verify",
      params: entry
    });

  } catch (e) {
    await saveScanLog({
      claim: "Unknown",
      utxo: "N/A",
      timestamp: Date.now(),
      proofHash: "invalid",
      status: "fail"
    });

    router.push("/organizer/verify-fail?reason=Invalid%20QR%20format");
  }
};


  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#38bdf8" />
        <Text style={styles.text}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Camera permission required</Text>
        <Pressable onPress={requestPermission} style={styles.rescan}>
          <Text style={styles.rescanText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={scanned ? undefined : handleScan}
        />
        
        {/* Scanner frame overlay */}
        <View style={styles.overlay}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>

      <Text style={styles.instruction}>
        Point camera at attendee's QR code
      </Text>

      {scanned && (
        <Pressable onPress={() => setScanned(false)} style={styles.rescan}>
          <Text style={styles.rescanText}>Scan Again</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    paddingTop: 60
  },
  frame: {
    width: "90%",
    height: "65%",
    borderColor: "#38bdf8",
    borderWidth: 2,
    borderRadius: 18,
    overflow: "hidden",
    position: "relative"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    padding: 20
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#10b981",
    borderWidth: 4
  },
  topLeft: {
    top: 20,
    left: 20,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12
  },
  topRight: {
    top: 20,
    right: 20,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12
  },
  bottomRight: {
    bottom: 20,
    right: 20,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12
  },
  center: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  text: { 
    color: "#cbd5e1", 
    marginTop: 12,
    textAlign: "center",
    fontSize: 16
  },
  instruction: {
    color: "#94a3b8",
    marginTop: 20,
    fontSize: 14,
    textAlign: "center"
  },
  rescan: {
    backgroundColor: "#10b981",
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 24,
    borderRadius: 12,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  rescanText: { 
    color: "#0f172a", 
    fontSize: 16, 
    fontWeight: "700"
  }
});