// import React, { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Onboarding from "../components/Onboarding";
// import Login from "../components/Login";

// export default function Index() {
//   const [isOnboardingComplete, setIsOnboardingComplete] = useState(null);

//   useEffect(() => {
//     const checkOnboardingStatus = async () => {
//       try {
//         const onboardingStatus = await AsyncStorage.getItem(
//           "onboardingCompleted"
//         );
//         if (onboardingStatus === "true") {
//           setIsOnboardingComplete(true);
//         } else {
//           setIsOnboardingComplete(false);
//         }
//       } catch (error) {
//         console.error("Failed to fetch onboarding status", error);
//       }
//     };

//     checkOnboardingStatus();
//   }, []);

//   if (isOnboardingComplete === null) {
//     // Show a loading indicator while checking onboarding status
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       {isOnboardingComplete ? <Login /> : <Onboarding />}
//     </View>
//   );
// }

import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import Onboarding from "../components/Onboarding";
import Login from "../components/Login";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Onboarding />
      {/* <Login /> */}
    </View>
  );
}
