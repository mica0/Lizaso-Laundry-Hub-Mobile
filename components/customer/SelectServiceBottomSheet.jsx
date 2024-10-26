import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useRef, useMemo, useEffect, useState } from "react";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { Portal } from "@gorhom/portal";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { timeAgo } from "../../constants/datetime";

export const SelectServiceBottomSheet = React.forwardRef(
  ({ selectedService, snapPoints, closeSelectModal, handleSubmit }, ref) => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    // const snapPoints = useMemo(() => ["50%", "60%"], []);
    const renderBackdrop = (props) => (
      <BottomSheetBackdrop {...props} opacity={0.5} />
    );

    return (
      <>
        <Portal>
          <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backgroundStyle={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
            }}
            handleIndicatorStyle={{ backgroundColor: COLORS.primary }}
            backdropComponent={renderBackdrop}
          >
            <View style={styles.headerContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>Service Details</Text>
                <Text style={styles.subTitle}>
                  Complete the service request below
                </Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeSelectModal}
              >
                <MaterialIcons
                  name="close"
                  size={24}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />

            <View style={styles.contentContainer}>
              {/* Selected Service */}
              {/* <Text style={styles.serviceTitle}>{selectedService.title}</Text> */}
              <Text style={styles.serviceTitle}>Wash</Text>
              <Text style={styles.serviceDescription}>
                {/* {selectedService.description} */}
              </Text>

              {/* Customer Name Input */}
              <TextInput
                style={styles.input}
                placeholder="Enter Customer Name"
              />
              {/* Payment Options */}
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

              {/* Additional Notes Input */}
              <Text style={styles.notesLabel}>Additional Notes:</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Enter any special requests or notes here..."
                multiline
              />

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Submit Request</Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        </Portal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    color: COLORS.primary,
  },
  subTitle: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    color: COLORS.subtitle,
  },
  closeButton: {
    backgroundColor: COLORS.light,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 5,
    width: "100%",
  },
  contentContainer: {
    padding: 20,
  },
  serviceTitle: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 5,
  },
  serviceDescription: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: COLORS.subtitle,
    marginBottom: 15,
  },
  input: {
    borderColor: COLORS.light,
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
  },
  notesInput: {
    borderColor: COLORS.light,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minHeight: 60,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  submitButtonText: {
    color: COLORS.white,
    fontFamily: fonts.Bold,
    fontSize: 16,
  },
});

// const Styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   headerTitle: { fontFamily: fonts.Bold, fontSize: 18 },
//   closeButton: { padding: 10 },
//   divider: {
//     height: 1,
//     backgroundColor: "#ddd",
//     marginBottom: 5,
//     width: "100%",
//   },
//   customerDetailsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   contentContainer: { flex: 1, justifyContent: "flex-end" },
//   detailsCard: {
//     borderWidth: 1,
//     borderColor: COLORS.divider,
//     borderRadius: 10,
//     padding: 10,
//   },
//   detailsContainer: { paddingStart: 20, marginBottom: 10 },
//   row: { flexDirection: "row", marginBottom: 5 },
//   label: { fontFamily: fonts.Bold, fontSize: 14, color: COLORS.text3 },
//   value: { fontFamily: fonts.Medium, fontSize: 14, color: COLORS.primary },
//   success: { fontFamily: fonts.Medium, fontSize: 14, color: COLORS.success },
//   dividerLine: { height: 1, backgroundColor: "#ddd", width: "100%" },
//   requestDateContainer: {
//     backgroundColor: COLORS.secondary,
//     borderRadius: 20,
//     alignSelf: "center",
//     padding: 5,
//     maxWidth: "90%",
//     marginTop: 10,
//   },
//   requestDate: { fontFamily: fonts.Medium, color: COLORS.white, fontSize: 12 },
//   waitingContainer: { alignSelf: "center", marginBottom: 5 },
//   waitingText: {
//     fontFamily: fonts.Medium,
//     color: COLORS.primary,
//     fontSize: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 10,
//     gap: 10,
//   },
//   cancelButton: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     backgroundColor: COLORS.background,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   cancelButtonText: {
//     fontFamily: fonts.SemiBold,
//     fontSize: 15,
//     color: COLORS.primary,
//   },
//   finishButton: {
//     backgroundColor: COLORS.primary,
//     borderRadius: 10,
//     padding: 10,
//     alignItems: "center",
//   },
//   finishButtonText: {
//     fontFamily: fonts.SemiBold,
//     fontSize: 15,
//     color: COLORS.white,
//   },
// });
