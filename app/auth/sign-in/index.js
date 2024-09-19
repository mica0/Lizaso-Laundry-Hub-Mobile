import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../../constants/fonts";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const navigation = useNavigation();
  const router = useRouter();

  const handleLogin = () => {
    let hasError = false;

    // Validate inputs
    if (username.trim() === "") {
      setUsernameError("Username is required");
      hasError = true;
    } else {
      setUsernameError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      console.log("Username:", username);
      console.log("Password:", password);
    }
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    if (text.trim() !== "") {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.trim() !== "") {
      setPasswordError("");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/lizaso_logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          {/* Username Field */}
          <View style={{ marginBottom: 10, marginTop: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.Medium,
                marginVertical: 8,
                color: COLORS.primary,
              }}
            >
              Username
            </Text>
            <View
              style={[
                styles.inputContainer,
                usernameError ? styles.errorBorder : {},
              ]}
            >
              <TextInput
                placeholder="Enter your username"
                placeholderTextColor={COLORS.grey}
                keyboardType="default"
                style={{ width: "100%", fontFamily: fonts.Regular }}
                value={username}
                onChangeText={handleUsernameChange}
              />
            </View>
            {usernameError ? (
              <Text style={{ color: "red", fontSize: 12 }}>
                {usernameError}
              </Text>
            ) : null}
          </View>

          {/* Password Field */}
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.Medium,
                marginVertical: 8,
                color: COLORS.primary,
              }}
            >
              Password
            </Text>
            <View
              style={[
                styles.inputContainer,
                passwordError ? styles.errorBorder : {},
              ]}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.grey}
                secureTextEntry={!isPasswordShown}
                style={{ width: "100%", fontFamily: fonts.Regular }}
                value={password}
                onChangeText={handlePasswordChange}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{ position: "absolute", right: 12 }}
              >
                <Ionicons
                  name={isPasswordShown ? "eye-off" : "eye"}
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={{ color: "red", fontSize: 12 }}>
                {passwordError}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity>
            <Text
              style={{
                textAlign: "right",
                color: COLORS.primary,
                marginVertical: 5,
                fontFamily: fonts.Regular,
              }}
            >
              Forget Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: COLORS.secondary,
              borderRadius: 10,
              marginTop: 10,
              padding: 10,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 15,
                fontFamily: fonts.Bold,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: "center",
              marginVertical: 10,
              fontSize: 14,
              fontFamily: fonts.Regular,
              color: COLORS.primary,
            }}
          >
            or continue with
          </Text>

          {/* Google Login Button */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderWidth: 2,
              borderColor: COLORS.grayMedium,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
              marginBottom: 10,
            }}
          >
            <Image
              source={require("../../../assets/images/google_icon.png")}
              style={{ height: 20, width: 20 }}
            />
            <Text
              style={{
                fontSize: 15,
                color: COLORS.primary,
                fontFamily: fonts.Medium,
                marginLeft: 8,
              }}
            >
              Google
            </Text>
          </TouchableOpacity>

          {/* Register Link */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 5,
              gap: 2,
            }}
          >
            <Text style={{ color: COLORS.primary, fontFamily: fonts.Regular }}>
              New User?
            </Text>
            <TouchableOpacity onPress={() => router.push("/auth/sign-up")}>
              <Text
                style={{ color: COLORS.secondary, fontFamily: fonts.SemiBold }}
              >
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#447F8C",
  },
  safeArea: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  logo: {
    width: 200,
    height: 200,
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 25,
  },
  inputContainer: {
    width: "100%",
    height: 48,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
  },
  errorBorder: {
    borderColor: "red",
  },
});
