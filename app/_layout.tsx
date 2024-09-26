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
        </Stack>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}

// import { Text } from "react-native";
// import { Stack } from "expo-router";
// import useFonts from "../hooks/useFonts";

// export default function RootLayout() {
//   const fontsLoaded = useFonts();
//   if (!fontsLoaded) {
//     return <Text>Loading...</Text>;
//   }
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="index" />
//     </Stack>
//   );
// }

// import { Text } from "react-native";
// import { Stack } from "expo-router";
// import useFonts from "../hooks/useFonts";

// export default function RootLayout() {
//   const fontsLoaded = useFonts();
//   if (!fontsLoaded) {
//     return <Text>Loading...</Text>;
//   }
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="index" />
//       <Stack.Screen name="(tabs)" />
//       {/* <Stack.Screen name="auth/sign-in" />
//       <Stack.Screen name="auth/sign-up" /> */}
//     </Stack>
//   );
// }

// import React from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { Stack } from 'expo-router';
// import useFonts from '../hooks/useFonts'; // Adjust the path based on your project structure

// export default function RootLayout() {
//   const fontsLoaded = useFonts();

//   // Show a loading indicator while fonts are loading
//   if (!fontsLoaded) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   // Render the Stack component once fonts are loaded
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="index" />
//       {/* Add other screens as needed */}
//     </Stack>
//   );
// }

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontFamily: 'Poppins-Regular', // Apply your font here
//     fontSize: 18,
//   },
// });

// <Stack screenOptions={{ headerShown: false }}>
//   {/* <Stack.Screen name="(tabs)" /> */}
//   <Stack.Screen name="index" />
//   {/* <Stack.Screen name={""}  /> */}
//   <Stack.Screen name="auth/sign-in" />
//   <Stack.Screen name="auth/sign-up" />
// </Stack>

// const [fontsLoaded] = useFonts({
//   'poppins-regular': require("../assets/fonts/Poppins-Regular.ttf"),
//   'poppins-semibold': require("../assets/fonts/Poppins-SemiBold.ttf"),
//   'poppins-bold': require("../assets/fonts/Poppins-Bold.ttf"),
// });

// const [isAuthenticated, setIsAuthenticated] = useState(null);
// const router = useRouter();

// If fonts are not loaded, render fallback content (like a loader or placeholder)
// if (!fontsLoaded) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Loading fonts...</Text>
//     </View>
//   );
// }
