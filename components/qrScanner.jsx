import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Camera } from "expo-camera"; // Ensure this import is correct

export default function QRScanner() {
  // Corrected function declaration
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");

  // Request camera permission when the component mounts
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Handle the QR code being scanned
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    alert(`QR Code with data ${data} has been scanned!`);
  };

  // If camera permission is still being requested
  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  // If camera permission is denied
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {scanned ? (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      ) : (
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
          ratio="16:9" // Optional: Set camera ratio
        />
      )}

      {scannedData ? (
        <Text style={styles.scannedText}>Scanned Data: {scannedData}</Text>
      ) : null}
    </View>
  );
}

// Add some basic styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    height: 300,
    width: 300,
  },
  scannedText: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: "Arial",
  },
});
