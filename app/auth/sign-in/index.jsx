import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../../constants/fonts";
import { login } from "../../../data/api/authApi";
import useAuth from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCheckCustomerDetails } from "../../../data/api/getApi";

export default function SignIn() {
  const { userDetails, fetchUserDetails } = useAuth();
  const [username, setUsername] = useState(userDetails.username);
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();
  const router = useRouter();

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
      setLoading(true);

      const data = {
        username: username,
        password: password,
      };

      try {
        console.log("Before login API call");
        const response = await login(data);
        console.log("Login response:", response);

        if (response.success) {
          await AsyncStorage.setItem("accessToken", response.accessToken);

          await fetchUserDetails(response.accessToken);

          // if (userDetails.user_type === "Customer") {
          //   const details = await getCheckCustomerDetails(userDetails.userId);

          //   if (details.success !== false) {
          //     const { storeIdIsNull, addressIdIsNull } = details.data;
          //     if (storeIdIsNull || addressIdIsNull) {
          //       router.push("/auth/complete/address");
          //     } else {
          //       router.push("/(customer)/home");
          //     }
          //   }
          // } else {
          //   console.log(1);
          // }
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: response.message,
          }));
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (userDetails.user_type) {
      if (userDetails.user_type === "Customer") {
        const fetchDetails = async () => {
          const details = await getCheckCustomerDetails(userDetails.userId);
          if (details.success !== false) {
            const { storeIdIsNull, addressIdIsNull } = details.data;
            if (storeIdIsNull || addressIdIsNull) {
              router.push("/auth/complete/address");
            } else {
              router.push("/(customer)/home");
            }
          }
        };
        fetchDetails();
      } else {
        router.push("/(staff)/pickup");
      }
    }
  }, [userDetails]);

  const handleGoogleSignIn = () => {
    navigation.navigate("auth/google/google", {});
  };

  const handleForgetPassword = () => {
    navigation.navigate("auth/forget/forget", {});
  };

  return (
    <LinearGradient
      colors={["#5787C8", "#71C7DA"]}
      locations={[0, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.8, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../../assets/images/lizaso_logo.png")}
                style={styles.logo}
              />
              <Text style={styles.welcomeText}>
                Welcome to Lizaso Laundry Hub!
              </Text>
            </View>
            <View style={styles.formContainer}>
              {/* Username Field */}
              <View style={{ marginBottom: 10, marginTop: 10 }}>
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
                    borderColor: errors.username
                      ? COLORS.error
                      : COLORS.primary,
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
                      fontFamily: fonts.Regular,
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
                    borderColor: errors.password
                      ? COLORS.error
                      : COLORS.primary,
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

              <TouchableOpacity onPress={handleForgetPassword}>
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
                      fontSize: 16,
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
                onPress={handleGoogleSignIn}
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
                    fontSize: 16,
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
                <Text
                  style={{ color: COLORS.primary, fontFamily: fonts.Regular }}
                >
                  New User?
                </Text>
                <TouchableOpacity onPress={() => router.push("/auth/sign-up")}>
                  <Text
                    style={{
                      color: COLORS.secondary,
                      fontFamily: fonts.SemiBold,
                    }}
                  >
                    Register Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    backgroundColor: COLORS.white,
    borderRadius: 100,
    width: 100,
    height: 100,
    resizeMode: "contain",
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0, // Horizontal shadow offset
      height: 2, // Vertical shadow offset
    },
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // For Android shadow
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
