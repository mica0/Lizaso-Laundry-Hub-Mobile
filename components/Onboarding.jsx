import React from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper"; // Import Swiper
import { useRouter } from "expo-router";

export default function Onboarding() {
  const router = useRouter();
  // Function to handle onboarding completion

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

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        paginationStyle={styles.pagination}
      >
        <View style={styles.slide}>
          <Text style={styles.title}>Welcome to Lizaso Laundry Hub!</Text>
          <Text style={styles.subtitle}>
            Your laundry management solution starts here.
          </Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.title}>Manage Your Laundry</Text>
          <Text style={styles.subtitle}>
            Easily track and manage your laundry orders.
          </Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.title}>Get Started Now</Text>
          <Text style={styles.subtitle}>Complete onboarding to begin.</Text>
          <Button
            title="Get Started"
            onPress={completeOnboarding}
            color="#007BFF"
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
    backgroundColor: "#f8f8f8",
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
