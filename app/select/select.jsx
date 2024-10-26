import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import COLORS from "../../constants/colors";
import { route, useNavigation } from "expo-router";
import useAuth from "../context/AuthContext";
import { useRoute } from "@react-navigation/native";
import { fonts } from "../../constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

export default function Select() {
  const { userDetails } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const { service_id, service_name } = route.params;
  const [name, setName] = useState(userDetails.fullname);
  const [notes, setNotes] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Username is required";
    }
    return newErrors;
  };
  const handleInputChange = (field) => (value) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleSubmit = () => {
    console.log("Submit data");
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          {/* Back Button */}
          <View style={{ marginTop: 10 }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
          </View>

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
              Service Details
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: fonts.Regular,
                color: COLORS.primary,
              }}
            >
              Complete the details of service request below
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.serviceBox}>
              <Text style={styles.serviceTitle}>{service_name}</Text>
            </View>

            {/* Customer Name Input */}
            <View style={{ marginBottom: 20, marginTop: 20 }}>
              <Text style={styles.paymentTitle}>Customer Name:</Text>
              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: errors.name ? COLORS.error : COLORS.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="Enter your name"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  value={name}
                  onChangeText={handleInputChange("name")}
                  style={{ width: "100%", fontFamily: fonts.Regular }}
                />
              </View>
              {errors.name && (
                <Text
                  style={{
                    fontFamily: fonts.Regular,
                    color: COLORS.error,
                    fontSize: 12,
                    marginTop: 4,
                    marginStart: 10,
                  }}
                >
                  {errors.name}
                </Text>
              )}
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.paymentTitle}>Payment Method:</Text>
              <View style={styles.paymentOptions}>
                <TouchableOpacity
                  style={[
                    styles.paymentButton,
                    selectedPayment === "COD" && styles.selectedPaymentButton,
                  ]}
                  onPress={() => setSelectedPayment("COD")}
                >
                  <Text
                    style={[
                      styles.paymentText,
                      selectedPayment === "COD" && styles.selectedPaymentText,
                    ]}
                  >
                    Cash on Delivery
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.paymentButton,
                    selectedPayment === "GCash" && styles.selectedPaymentButton,
                  ]}
                  onPress={() => setSelectedPayment("GCash")}
                >
                  <Text
                    style={[
                      styles.paymentText,
                      selectedPayment === "GCash" && styles.selectedPaymentText,
                    ]}
                  >
                    GCash
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Additional Notes Input */}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.notesLabel}>Additional Notes:</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Enter any special requests or notes here..."
                multiline
              />
            </View>
          </View>
        </View>
        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  backText: {
    fontSize: 16,
    fontFamily: fonts.Bold,
    color: COLORS.secondary,
    marginLeft: 5,
  },
  buttonContainer: {
    padding: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
  },
  submitButtonText: {
    color: COLORS.white,
    fontFamily: fonts.Bold,
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  serviceBox: {
    backgroundColor: COLORS.secondary_light,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  serviceTitle: {
    fontFamily: fonts.Bold,
    fontSize: 18,
    color: COLORS.secondary,
    textAlign: "center",
  },
  serviceDescription: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: COLORS.subtitle,
    marginBottom: 15,
  },
  input: {
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  paymentTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 5,
  },
  paymentOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  paymentButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedPaymentButton: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  paymentText: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
  selectedPaymentText: {
    color: COLORS.white,
  },
  notesLabel: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 5,
    marginTop: 10,
  },
  notesInput: {
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    marginBottom: 15,
    textAlign: "left", // Aligns text to the left
    textAlignVertical: "top", // Aligns text to the top for multiline
  },

  submitButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
  },
  submitButtonText: {
    color: COLORS.white,
    fontFamily: fonts.Bold,
    fontSize: 16,
  },
});
