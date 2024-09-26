import { Text } from "react-native";
import { Stack } from "expo-router";
import useFonts from "../hooks/useFonts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {
  const fontsLoaded = useFonts();
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="message/chat" />
          <Stack.Screen name="notification/list" />
        </Stack>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
