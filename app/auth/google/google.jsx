import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; // Icon for back button
import { fonts } from "../../../constants/fonts";

// Ensure that the WebBrowser session is complete
// WebBrowser.maybeCompleteAuthSession();

export default function Google() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);

  // Configure Google OAuth
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId: "<YOUR_EXPO_CLIENT_ID>",
  //   iosClientId: "<YOUR_IOS_CLIENT_ID>",
  //   androidClientId: "<YOUR_ANDROID_CLIENT_ID>",
  //   webClientId: "<YOUR_WEB_CLIENT_ID>",
  // });

  // Handle the response after the Google sign-in attempt
  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { authentication } = response;
  //     fetchUserInfo(authentication.accessToken);
  //   }
  // }, [response]);

  // Function to fetch Google user info
  // const fetchUserInfo = async (token) => {
  //   const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const user = await response.json();
  //   setUserInfo(user);
  //   AsyncStorage.setItem("user", JSON.stringify(user)); // Store user info in local storage
  //   navigation.navigate("MainApp"); // Navigate to the main app after successful login
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secondary }}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color={COLORS.white} />
      </TouchableOpacity>
      <View style={styles.container}>
        {/* Google Sign-In content */}
        <View style={styles.content}>
          {userInfo ? (
            <Text style={styles.text}>Welcome, {userInfo.name}!</Text>
          ) : (
            <TouchableOpacity
              style={styles.signInButton}
              // disabled={!request}
              onPress={() => promptAsync()}
            >
              <Text style={styles.buttonText}>Continue with Google</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  signInButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginVertical: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: fonts.Bold,
  },
});
