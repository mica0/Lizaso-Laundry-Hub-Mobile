import { useState, useEffect } from 'react';
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { Text, View } from 'react-native'; 

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'poppins-regular': require("../assets/fonts/Poppins-Regular.ttf"),
    'poppins-semibold': require("../assets/fonts/Poppins-SemiBold.ttf"),
    'poppins-bold': require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  // If fonts are not loaded, render fallback content (like a loader or placeholder)
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="(tabs)" /> */}
    </Stack>
  );
}
