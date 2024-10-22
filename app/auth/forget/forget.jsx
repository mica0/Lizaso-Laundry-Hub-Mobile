import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import COLORS from "../../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { fonts } from "../../../constants/fonts";

export default function Forget() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    // Handle the password reset logic here
    console.log("Password reset link sent to:", email);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secondary }}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email address below and we will send you instructions to
          reset your password.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Remember your password? <Text style={styles.link}>Log in</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  input: {
    height: 50,
    borderColor: "#A9A9A9",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
  },
  link: {
    color: COLORS.primary, // Set your link color
    fontWeight: "bold",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginVertical: 10,
    marginBottom: 15,
  },
  backText: {
    fontSize: 18,
    marginLeft: 8,
    color: COLORS.white,
    fontFamily: fonts.SemiBold,
  },
});
