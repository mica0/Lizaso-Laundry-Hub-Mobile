import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    'poppins-regular': require("../assets/fonts/Poppins-Regular.ttf"),
    'poppins-semibold': require("../assets/fonts/Poppins-SemiBold.ttf"),
    'poppins-bold': require("../assets/fonts/Poppins-Bold.ttf"),
  })
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
