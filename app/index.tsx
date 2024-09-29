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

// import { View } from "react-native";
// import Onboarding from "../components/Onboarding";
// import animated_logo from "../assets/lottie/animated_logo.json";

// export default function Index() {
//   return (
//     <View style={{ flex: 1 }}>
//       <Onboarding />
//     </View>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { View, StyleSheet } from "react-native";
// import Lottie from "lottie-react-native";
// import Onboarding from "../components/Onboarding";
// import animated_logo from "../assets/lottie/logo_move.json";

// export default function Index() {
//   const [isSplashVisible, setSplashVisible] = useState(true);

//   useEffect(() => {
//     // Hide the splash screen after 3 seconds (or duration of your animation)
//     const timer = setTimeout(() => {
//       setSplashVisible(false);
//     }, 5000); // Adjust duration as needed

//     // Clean up the timer
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {isSplashVisible ? (
//         <Lottie
//           source={animated_logo}
//           autoPlay
//           loop={false} // Set to true if you want it to repeat
//           style={styles.lottie}
//         />
//       ) : (
//         <Onboarding />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center", // Center vertically
//     alignItems: "center", // Center horizontally
//     backgroundColor: "#ffffff", // Match this to your splash background color
//   },
//   lottie: {
//     width: 250, // Adjust width as needed
//     height: 250, // Adjust height as needed
//   },
// });

import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Lottie from "lottie-react-native";
import Onboarding from "../components/Onboarding";
import animated_logo from "../assets/lottie/logo_move.json";

export default function Index() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    // Hide the splash screen after 5 seconds
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 5000); // Adjust duration as needed

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {isSplashVisible ? (
        <Lottie
          source={animated_logo}
          autoPlay
          loop={true} // Change to true for continuous looping
          style={styles.lottie}
        />
      ) : (
        <Onboarding />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#ffffff", // Match this to your splash background color
  },
  lottie: {
    width: 250, // Adjust width as needed
    height: 250, // Adjust height as needed
  },
});
