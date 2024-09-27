import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Camera, useCameraPermissions } from "expo-camera";

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return <View style={styles.container}></View>;
}

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
