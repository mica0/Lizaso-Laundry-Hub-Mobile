import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../../constants/fonts";
import { useNavigation, useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import { login, register } from "../../../data/api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";
import { getCheckCustomerDetails } from "../../../data/api/getApi";

export default function Complete() {
  const { userDetails } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [addressLine, setAddressLine] = useState("");
  const [country, setCountry] = useState("PH");
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!addressLine) {
      newErrors.addressLine1 = "Address is required";
    }

    if (!country) {
      newErrors.country = "Country is required";
    }

    if (!region) {
      newErrors.region = "Region is required";
    }

    if (!province) {
      newErrors.province = "Province is required";
    }

    if (!city) {
      newErrors.province = "City is required";
    }

    if (!postalCode) {
      newErrors.postalCode = "Postal Code is required";
    }

    return newErrors;
  };

  const handleInputChange = (field) => (value) => {
    // Update state based on the field
    switch (field) {
      case "addressline":
        setAddressLine(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "region":
        setRegion(value);
        break;
      case "province":
        setProvince(value);
        break;
      case "city":
        setCity(value);
        break;
      case "postal":
        setPostalCode(value);
        break;
      default:
        break;
    }

    // Clear errors related to the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  //   const handleSignup = async () => {
  //     // Validate fields and update error state
  //     const newErrors = validateFields();
  //     setErrors(newErrors);

  //     // If there are no validation errors
  //     if (Object.keys(newErrors).length === 0) {
  //       if (!isChecked) {
  //         Alert.alert(
  //           "Attention",
  //           "You must agree to the terms before signing up."
  //         );
  //         return;
  //       }
  //       // const data = {
  //       //   c_number: phoneNumber,
  //       //   c_username: username,
  //       //   c_firstname: firstname,
  //       //   c_middlename: middlename,
  //       //   c_lastname: lastname,
  //       //   c_password: password,
  //       //   isAgreement: isChecked,
  //       // };

  //       const data = {
  //         mobile_number: phoneNumber,
  //         email: email,
  //         username: username,
  //         firstname: firstname,
  //         middlename: middlename,
  //         lastname: lastname,
  //         password: password,
  //         isAgreement: isChecked,
  //       };

  //       setLoading(true);

  //       try {
  //         const response = await register(data);
  //         if (response.success) {
  //           const login_response = await login({
  //             username: username,
  //             password: password,
  //           });

  //           await AsyncStorage.setItem("accessToken", login_response.accessToken);

  //           if (userDetails.user_type === "Customer") {
  //             // This is check the store_id and address_id in User_Account table if its null or
  //             const details = await getCheckCustomerDetails(userDetails.userId);

  //             if (details.success !== false) {
  //               const { storeIdIsNull, addressIdIsNull } = details;

  //               if (storeIdIsNull || addressIdIsNull) {
  //                 router.push("/auth/complete/complete");
  //               } else {
  //                 router.push("/(customer)/home");
  //               }
  //             }
  //           } else {
  //             router.push("/(staff)/pickup");
  //           }
  //         } else {
  //           setErrors((prevErrors) => ({
  //             ...prevErrors,
  //             username: response.message,
  //           }));
  //         }
  //       } catch (error) {
  //         setLoading(false);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   const handleTermAndConditons = () => {
  //     navigation.navigate("auth/term/term", {});
  //   };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
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
              Enter Your Address and Location
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

          {/* Address Line */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.Medium,
                marginVertical: 8,
                color: COLORS.primary,
              }}
            >
              Firstname
            </Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: errors.firstname ? COLORS.error : COLORS.primary,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your first name"
                placeholderTextColor={COLORS.grey}
                keyboardType="default"
                value={firstname}
                onChangeText={handleInputChange("firstname")}
                style={{ width: "100%", fontFamily: fonts.Regular }}
              />
            </View>
            {errors.firstname && (
              <Text
                style={{
                  fontFamily: fonts.Regular,
                  color: COLORS.error,
                  fontSize: 12,
                  marginTop: 4,
                  marginStart: 10,
                }}
              >
                {errors.firstname}
              </Text>
            )}
          </View>

          <TouchableOpacity
            // onPress={handleSignup}
            disabled={loading}
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
                Next
              </Text>
            )}
          </TouchableOpacity>

          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
              marginBottom: 20,
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
          </View> */}
        </View>
      </ScrollView>
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
