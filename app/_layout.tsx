import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Text, View } from 'react-native'; // For fallback content while loading fonts

export default function RootLayout() {
  // Load fonts and get the loading status
  const [fontsLoaded] = useFonts({
    'poppins-regular': require("../assets/fonts/Poppins-Regular.ttf"),
    'poppins-semibold': require("../assets/fonts/Poppins-SemiBold.ttf"),
    'poppins-bold': require("../assets/fonts/Poppins-Bold.ttf"),
  });

  // If fonts are not loaded, render fallback content (like a loader or placeholder)
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  // Once fonts are loaded, render the Stack layout
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";

// export default function RootLayout() {
//   useFonts({
//     'poppins-regular': require("../assets/fonts/Poppins-Regular.ttf"),
//     'poppins-semibold': require("../assets/fonts/Poppins-SemiBold.ttf"),
//     'poppins-bold': require("../assets/fonts/Poppins-Bold.ttf"),
//   })
//   return (
//     <Stack screenOptions={{headerShown: false}}>
//       <Stack.Screen name="(tabs)" />
//     </Stack>
//   );
// }
