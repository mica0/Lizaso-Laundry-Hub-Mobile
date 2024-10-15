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
import useAuth from "../context/AuthContext";

export default function Qrscan() {
  const qrLock = useRef(false);
  const { userDetails } = useAuth();
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
      try {
        const response = await updateServiceRequestUsingQRCode(
          data,
          userDetails.userId
        );
        if (response) {
          console.log("Gago success kaya");
          setTimeout(() => {
            qrLock.current = false;
            navigation.goBack();
          }, 500);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.error("Error updating service request:", error);
      }
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
