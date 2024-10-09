import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../../constants/fonts";
import { login } from "../../../data/api/authApi";

export default function SignIn() {
  const [username, setUsername] = useState("12345");
  const [password, setPassword] = useState("12345");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();
  const router = useRouter();

  const Clear = () => {
    setUsername("");
    setPassword("");
  };

  const validateFields = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleInputChange = (field) => (value) => {
    switch (field) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
      default:
        break;
    }

    // Clear errors related to the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleLogin = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const data = {
        username: username,
        password: password,
      };

      // router.push("/(customer)/home");
      // router.push("/(staff)/pickup");

      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // const response = await login(data);
        if (true) {
          router.push("/(staff)/pickup");
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: response.message,
          }));
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data.message);
        } else {
          console.log("An unexpected error occurred.");
        }
        setLoading(false);
      } finally {
        setLoading(false);
      }
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
              style={{
                width: "100%",
                height: 48,
                borderColor: errors.username ? COLORS.error : COLORS.primary,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your username"
                placeholderTextColor={COLORS.grey}
                keyboardType="default"
                style={{ width: "100%", fontFamily: fonts.Regular }}
                value={username}
                onChangeText={handleInputChange("username")}
              />
            </View>
            {errors.username && (
              <Text
                style={{
                  color: COLORS.error,
                  fontSize: 12,
                  marginTop: 4,
                  marginStart: 10,
                }}
              >
                {errors.username}
              </Text>
            )}
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
              style={{
                width: "100%",
                height: 48,
                borderColor: errors.password ? COLORS.error : COLORS.primary,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.grey}
                secureTextEntry={!isPasswordShown}
                style={{ width: "100%", fontFamily: fonts.Regular }}
                value={password}
                onChangeText={handleInputChange("password")}
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
            {errors.password && (
              <Text
                style={{
                  color: COLORS.error,
                  fontSize: 12,
                  marginTop: 4,
                  marginStart: 10,
                }}
              >
                {errors.password}
              </Text>
            )}
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
              opacity: loading ? 0.7 : 1,
              height: 50,
              justifyContent: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.white} />
            ) : (
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
            )}
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
