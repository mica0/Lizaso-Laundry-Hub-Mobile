// import { View, Text } from 'react-native'
// import React from 'react'

// export default function google() {
//   return (
//     <View>
//       <Text>google</Text>
//     </View>
//   )
// }

// Google.jsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; // Icon for back button

// Ensure that the WebBrowser session is complete
// WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
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
    <View style={styles.container}>
      {/* Back button at the top left */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Google Sign-In content */}
      <View style={styles.content}>
        {userInfo ? (
          <Text style={styles.text}>Welcome, {userInfo.name}!</Text>
        ) : (
          <TouchableOpacity
            style={styles.signInButton}
            disabled={!request}
            onPress={() => promptAsync()}
          >
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
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
    backgroundColor: "#4285F4", // Google blue color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
