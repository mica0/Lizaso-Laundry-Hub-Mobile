import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../../constants/fonts";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { register } from "../../../data/api/authApi";

export default function SignUp() {
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullName] = useState("");

  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClear = async () => {
    setPhoneNumber("");
    setUsername("");
    setFullName("");
    setPassword("");
    setIsChecked(false);
  };

  const getNameParts = (fullname) => {
    const parts = fullname.split(" ");

    let firstName = "";
    let middleName = "";
    let lastName = "";

    if (parts.length > 0) {
      firstName = parts[0];
    }
    if (parts.length > 1) {
      lastName = parts[parts.length - 1];
    }
    if (parts.length > 2) {
      middleName = parts.slice(1, -1).join(" ");
    }

    return { firstName, middleName, lastName };
  };

  const validateFields = () => {
    const newErrors = {};
    // if (!serviceName) {
    //   newErrors.serviceName = "Service name is required";
    // }
    // if (!defaultPrice) {
    //   newErrors.defaultPrice = "Price is required";
    // } else if (defaultPrice <= 0) {
    //   newErrors.defaultPrice = "Price must be greater than 0";
    // }
    return newErrors;
  };

  const handleInputChange = (field) => (value) => {
    // Update state based on the field
    if (field === "phoneNumber") {
      setPhoneNumber(value);
    } else if (field === "username") {
      setUsername(value);
    } else if (field === "fullname") {
      setFullName(value);
    } else if (field === "password") {
      setPassword(value);
    }

    // Clear errors related to the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleSignup = async () => {
    const { firstName, middleName, lastName } = getNameParts(fullname);
    const data = {
      c_number: phoneNumber,
      c_username: username,
      c_firstname: firstName,
      c_middlename: middleName,
      c_lastname: lastName,
      c_password: password,
      isAgreement: isChecked,
    };
    try {
      const response = await register(data);
      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  // const handleSignup = async () => {
  //   const data = {
  //     phone: phoneNumber,
  //     username: username,
  //     fullname: fullname,
  //     password: password,
  //     isChecked: isChecked,
  //   };

  //   try {
  //     setTimeout(async () => {
  //       const response = await register(data);
  //       console.log("Registration successful:", response);
  //     }, 500);
  //   } catch (error) {
  //     console.error("Registration failed:", error);
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              marginTop: 15,
              fontSize: 22,
              fontFamily: fonts.Bold,
              marginVertical: 12,
              color: COLORS.primary,
            }}
          >
            Create an Account
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: fonts.Regular,
              color: COLORS.primary,
            }}
          >
            Fast and easy laundry service at hand!
          </Text>
        </View>

        {/* MOBILE NUMBER */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.Medium,
              marginVertical: 8,
              color: COLORS.primary,
            }}
          >
            Mobile Number
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="+63"
              placeholderTextColor={COLORS.primary}
              editable={false}
              style={{
                width: "12%",
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: "100%",
                fontFamily: fonts.Medium,
              }}
            />
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.grey}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={handleInputChange("phoneNumber")}
              style={{ width: "80%", fontFamily: fonts.Regular }}
            />
          </View>
        </View>

        {/* Fullname */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.Medium,
              marginVertical: 8,
              color: COLORS.primary,
            }}
          >
            Fullname
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Full Name (First, Middle, Last)"
              placeholderTextColor={COLORS.grey}
              keyboardType="default"
              value={fullname}
              onChangeText={handleInputChange("fullname")}
              style={{ width: "100%", fontFamily: fonts.Regular }}
            />
          </View>
        </View>

        {/* Username */}
        <View style={{ marginBottom: 12 }}>
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
              borderColor: COLORS.primary,
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
              value={username}
              onChangeText={handleInputChange("username")}
              style={{ width: "100%", fontFamily: fonts.Regular }}
            />
          </View>
        </View>

        {/* PASSWORD */}
        <View style={{ marginBottom: 15 }}>
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
              borderColor: COLORS.primary,
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
              secureTextEntry={isPasswordShown}
              value={password}
              onChangeText={handleInputChange("password")}
              style={{ width: "100%", fontFamily: fonts.Regular }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{ position: "absolute", right: 12 }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.primary} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms and Conditons */}
        <View style={{ marginBottom: 5 }}>
          <View style={{ flexDirection: "row", marginVertical: 6 }}>
            <Checkbox
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.secondary : undefined}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 13,
                fontFamily: fonts.Regular,
              }}
            >
              I agree with terms the{" "}
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: COLORS.secondary,
                  fontSize: 13,
                  fontFamily: fonts.Regular,
                }}
              >
                terms and conditions.{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleSignup}
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
            Register
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 15,
            gap: 2,
          }}
        >
          <Text style={{ color: COLORS.primary, fontFamily: fonts.Regular }}>
            Already have account?
          </Text>
          <TouchableOpacity onPress={() => router.navigate("/auth/sign-in")}>
            <Text
              style={{ color: COLORS.secondary, fontFamily: fonts.SemiBold }}
            >
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  backButton: {
    marginTop: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
});
