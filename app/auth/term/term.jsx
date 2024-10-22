import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Term() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.first_container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Terms and Conditions</Text>

          <Text style={styles.subHeader}>1. General</Text>
          <Text style={styles.paragraph}>
            By using our laundry service, you agree to comply with and be bound
            by the following terms and conditions. These terms apply to all
            users of the service.
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={styles.subHeader}>2. Services Provided</Text>
          <Text style={styles.paragraph}>
            We offer laundry services including washing, drying, and folding of
            clothes. Prices and available services are subject to change without
            notice. Any changes will be reflected in the app and communicated to
            you before order confirmation.
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={styles.subHeader}>3. User Responsibilities</Text>
          <Text style={styles.paragraph}>
            You are responsible for ensuring that all items handed over for
            laundry services are properly labeled and that any special care
            instructions are clearly communicated. We are not responsible for
            any damage caused by undisclosed issues such as delicate fabric,
            bleeding colors, or previous damage to the clothing.
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={styles.subHeader}>4. Payment</Text>
          <Text style={styles.paragraph}>
            All payments must be made through the app using the available
            payment methods. Payment is required before or at the time of
            service delivery. Failure to provide payment may result in the
            suspension of your account.
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={styles.subHeader}>5. Liability</Text>
          <Text style={styles.paragraph}>
            While we take utmost care with your laundry, we are not responsible
            for any loss or damage of items beyond the cost of the service fee.
            We recommend not sending valuable or irreplaceable items.
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={styles.subHeader}>6. Cancellations and Refunds</Text>
          <Text style={styles.paragraph}>
            You may cancel your order within 30 minutes of placing it via the
            app. Refunds will only be issued for cancellations made within this
            time frame. No refunds will be issued once your laundry has been
            collected or processed.
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={styles.subHeader}>7. Termination</Text>
          <Text style={styles.paragraph}>
            We reserve the right to terminate your access to our services at any
            time for any reason, including but not limited to violation of these
            terms.
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={styles.subHeader}>8. Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We reserve the right to modify these terms at any time. Any changes
            will be effective immediately upon posting in the app. Continued use
            of the service will indicate your acceptance of the new terms.
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={styles.subHeader}>9. Contact Information</Text>
          <Text style={styles.paragraph}>
            If you have any questions or concerns about these terms, please
            contact us via the customer support section in the app.
          </Text>

          <Text style={styles.footer}>Effective Date: October 22, 2024</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  first_container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
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
  header: {
    marginTop: 20,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 5,
    textAlign: "center",
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 16,
    fontFamily: fonts.Bold,
  },
  subHeader: {
    color: COLORS.secondary,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 13,
    marginBottom: 8,
    fontFamily: fonts.Regular,
    color: COLORS.primary,
  },
  footer: {
    marginTop: 24,
    marginBottom: 60,
    fontSize: 12,
    color: COLORS.subtitle,
    fontWeight: fonts.Light,
  },
});
