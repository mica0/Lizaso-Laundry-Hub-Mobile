import { Camera, CameraView } from "expo-camera";
import { Stack, useNavigation } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { Overlay } from "./overlay";
import { updateServiceRequestUsingQRCode } from "../../data/api/putApi";

export default function Qrscan() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const route = useRoute();
  const navigation = useNavigation();
  // const { customerId } = route.params;

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBarcodeScanned = async ({ data }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      const qrData = {
        code: data,
      };
      try {
        const response = await updateServiceRequestUsingQRCode(data, qrData);
        console.log("Response from service request:", response);
      } catch (error) {
        console.error("Error updating service request:", error);
      }
      setTimeout(() => {
        qrLock.current = false; // Unlock scanning
        navigation.goBack(); // Navigate back after a delay
      }, 500);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Overlay />
    </SafeAreaView>
  );
}
