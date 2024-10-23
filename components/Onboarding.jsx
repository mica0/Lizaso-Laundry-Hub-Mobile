import React from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper"; // Import Swiper
import { useRouter } from "expo-router";
import COLORS from "@/constants/colors";
import { fonts } from "@/constants/fonts";

// Import sample images
const onboardingImages = {
  welcome: require("@/assets/images/start_convo.png"),
  manage: require("@/assets/images/start_convo.png"),
  getStarted: require("@/assets/images/start_convo.png"),
};

export default function Onboarding() {
  const router = useRouter();

  const completeOnboarding = async () => {
    try {
      // Set the onboarding complete flag
      await AsyncStorage.setItem("@onboarding_complete", "true");
      // Navigate to the login screen
      router.replace("auth/sign-in");
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  const skipOnboarding = async () => {
    await AsyncStorage.setItem("@onboarding_complete", "true");
    router.replace("auth/sign-in");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        paginationStyle={styles.pagination}
      >
        <View style={styles.slide}>
          <Image source={onboardingImages.welcome} style={styles.image} />
          <Text style={styles.title}>Welcome to Lizaso Laundry Hub!</Text>
          <Text style={styles.subtitle}>
            Your laundry management solution starts here.
          </Text>
        </View>
        <View style={styles.slide}>
          <Image source={onboardingImages.manage} style={styles.image} />
          <Text style={styles.title}>Manage Your Laundry</Text>
          <Text style={styles.subtitle}>
            Easily track and manage your laundry orders.
          </Text>
        </View>
        <View style={styles.slide}>
          <Image source={onboardingImages.getStarted} style={styles.image} />
          <Text style={styles.title}>Get Started Now</Text>
          <Text style={styles.subtitle}>Complete onboarding to begin.</Text>
          <Button
            title="Get Started"
            onPress={completeOnboarding}
            color={COLORS.secondary}
          />
        </View>
      </Swiper>
    </SafeAreaView>
  );
}

// Styling for the onboarding screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: COLORS.secondary, // Optional: add background color
    borderRadius: 5,
  },
  skipText: {
    color: COLORS.white,
    fontFamily: fonts.SemiBold,
  },
  wrapper: {
    height: Dimensions.get("window").height,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  pagination: {
    bottom: 50,
  },
});

// import React from "react";
// import {
//   View,
//   Text,
//   Button,
//   SafeAreaView,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Swiper from "react-native-swiper"; // Import Swiper
// import { useRouter } from "expo-router";
// import COLORS from "@/constants/colors";

// export default function Onboarding() {
//   const router = useRouter();

//   const completeOnboarding = async () => {
//     try {
//       // Set the onboarding complete flag
//       await AsyncStorage.setItem("@onboarding_complete", "true");
//       // Navigate to the login screen
//       router.replace("auth/sign-in");
//     } catch (error) {
//       console.error("Error saving onboarding status:", error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Swiper
//         style={styles.wrapper}
//         showsButtons={false}
//         paginationStyle={styles.pagination}
//       >
//         <View style={styles.slide}>
//           <Text style={styles.title}>Welcome to Lizaso Laundry Hub!</Text>
//           <Text style={styles.subtitle}>
//             Your laundry management solution starts here.
//           </Text>
//         </View>
//         <View style={styles.slide}>
//           <Text style={styles.title}>Manage Your Laundry</Text>
//           <Text style={styles.subtitle}>
//             Easily track and manage your laundry orders.
//           </Text>
//         </View>
//         <View style={styles.slide}>
//           <Text style={styles.title}>Get Started Now</Text>
//           <Text style={styles.subtitle}>Complete onboarding to begin.</Text>
//           <Button
//             title="Get Started"
//             onPress={completeOnboarding}
//             color={COLORS.secondary}
//           />
//         </View>
//       </Swiper>
//     </SafeAreaView>
//   );
// }

// // Styling for the onboarding screen
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   wrapper: {
//     height: Dimensions.get("window").height,
//   },
//   slide: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     marginBottom: 40,
//   },
//   pagination: {
//     bottom: 50,
//   },
// });
