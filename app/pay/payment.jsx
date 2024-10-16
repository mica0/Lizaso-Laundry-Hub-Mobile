import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { fonts } from "../../constants/fonts";
import COLORS from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Payment() {
  const route = useRoute();
  const navigation = useNavigation();
  const { service_id } = route.params;

  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Sample payment breakdown
  const breakdown = {
    service: "Wash & Fold", // Title of the service
    servicePrice: "₱250", // Price of the service
    weight: "5", // Laundry weight
    totalCost: "₱300", // Total cost of the service (can include other fees)
    itemsUsedWithPrice: [
      // Items used with their prices
      { name: "Detergent", price: "₱10" },
      { name: "Fabric Softener", price: "₱5" },
      { name: "Bleach", price: "₱8" },
    ],
  };

  return (
    <LinearGradient
      colors={["#5787C8", "#71C7DA"]}
      locations={[0, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.5, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Details</Text>
        </View>

        <View style={styles.bottomContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {/* Payment Breakdown */}
            <View style={styles.breakdownContainer}>
              <Text style={styles.serviceTitle}>{breakdown.service}</Text>
              <View style={styles.breakdownRow}>
                <Text style={styles.servicePrice}>
                  {breakdown.servicePrice}
                </Text>
                {/* Service Price */}
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.multiplicationSign}>X</Text>
                {/* Multiplication Sign */}
                <Text style={styles.breakdownValue}>{breakdown.weight} kg</Text>
                {/* Laundry Weight */}
              </View>
              <Text style={styles.laundryWeightLabel}>Laundry Weight</Text>

              <View style={styles.divider} />

              <Text style={styles.itemsUsedLabel}>Items Used:</Text>
              {breakdown.itemsUsedWithPrice.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemLabel}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
              ))}
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Total Cost</Text>
                <Text style={styles.breakdownValueTotalCost}>
                  {breakdown.totalCost}
                </Text>
              </View>
            </View>

            {/* Payment Method Selection */}
            <View style={styles.paymentMethodsContainer}>
              <Text style={styles.paymentMethodTitle}>
                Select Payment Method:
              </Text>

              <TouchableOpacity
                style={[
                  styles.paymentMethodButton,
                  selectedPaymentMethod === "Cash on Delivery"
                    ? styles.selected
                    : styles.outlined,
                ]}
                onPress={() => setSelectedPaymentMethod("Cash on Delivery")}
              >
                <Text
                  style={[
                    styles.paymentMethodText,
                    selectedPaymentMethod === "Cash on Delivery"
                      ? styles.selectedText
                      : styles.outlinedText,
                  ]}
                >
                  Cash on Delivery
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentMethodButton,
                  selectedPaymentMethod === "Gcash"
                    ? styles.selected
                    : styles.outlined,
                ]}
                onPress={() => setSelectedPaymentMethod("Gcash")}
              >
                <Text
                  style={[
                    styles.paymentMethodText,
                    selectedPaymentMethod === "Gcash"
                      ? styles.selectedText
                      : styles.outlinedText,
                  ]}
                >
                  Gcash
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Proceed to Payment Button */}
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={() => {
              if (selectedPaymentMethod) {
                navigation.navigate("PaymentConfirmation", {
                  service_id,
                  selectedPaymentMethod,
                });
              }
            }}
          >
            <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  headerTitle: {
    marginLeft: 20,
    fontSize: 18,
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  breakdownContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginBottom: 20,
  },
  serviceTitle: {
    fontFamily: fonts.Bold,
    fontSize: 18,
    marginBottom: 5,
    color: COLORS.primary,
  },
  servicePrice: {
    fontFamily: fonts.Bold,
    fontSize: 24,
    color: COLORS.primary,
    textAlign: "center",
  },

  breakdownRow: {
    flexDirection: "column",
    alignItems: "center",
  },
  multiplicationSign: {
    fontFamily: fonts.SemiBold,
    fontSize: 20,
    color: COLORS.error,
  },
  laundryWeightLabel: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: COLORS.primary,
    textAlign: "center",
  },
  breakdownLabel: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: COLORS.primary,
  },
  breakdownValue: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: COLORS.primary,
  },
  breakdownValueTotalCost: {
    fontFamily: fonts.Bold,
    fontSize: 20,
    color: COLORS.secondary,
  },
  itemsUsedLabel: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: COLORS.primary,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  itemLabel: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: COLORS.primary,
  },
  itemPrice: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  paymentMethodsContainer: {
    marginBottom: 20,
  },
  paymentMethodTitle: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    marginBottom: 10,
  },
  paymentMethodButton: {
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
  paymentMethodText: {
    fontFamily: fonts.Regular,
    color: COLORS.textDark,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 10,
    alignItems: "center",
  },

  outlinedText: {
    fontFamily: fonts.SemiBold,
    color: COLORS.primary,
  },

  selected: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
  },

  selectedText: {
    color: COLORS.white,
  },

  proceedButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  proceedButtonText: {
    fontFamily: fonts.Bold,
    color: COLORS.white,
    fontSize: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginVertical: 15,
  },
});
