import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useRef, useMemo, useEffect } from "react";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { Portal } from "@gorhom/portal";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { timeAgo } from "../../constants/datetime";

export const ReadyBottomSheet = React.forwardRef(
  ({ selectedService, closePendingModal, handleGetLaundry }, ref) => {
    // const bottomReadyDeliverySheet = useRef(null);
    const snapPoints = useMemo(() => ["50%", "60%"], []);
    const renderBackdrop = (props) => (
      <BottomSheetBackdrop {...props} opacity={0.5} />
    );

    console.log(selectedService.address_line);

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
            <View style={Styles.headerContainer}>
              <Text style={Styles.headerTitle}>Ready for Delivery</Text>

              <TouchableOpacity
                style={Styles.closeButton}
                onPress={closePendingModal}
              >
                <MaterialIcons
                  name="close"
                  size={24}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
            </View>
            <View style={Styles.divider} />
          </BottomSheet>
        </Portal>
      </>
    );
  }
);

// Sample styles for the component
const Styles = StyleSheet.create({
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
  closeButton: { padding: 10 },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 5,
    width: "100%",
  },
  customerDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  contentContainer: { flex: 1, justifyContent: "flex-end" },
  detailsCard: {
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 10,
    padding: 10,
  },
  detailsContainer: { paddingStart: 20, marginBottom: 10 },
  row: { flexDirection: "row", marginBottom: 5 },
  label: { fontFamily: fonts.Bold, fontSize: 14, color: COLORS.text3 },
  value: { fontFamily: fonts.Medium, fontSize: 14, color: COLORS.primary },
  success: { fontFamily: fonts.Medium, fontSize: 14, color: COLORS.success },
  dividerLine: { height: 1, backgroundColor: "#ddd", width: "100%" },
  requestDateContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    alignSelf: "center",
    padding: 5,
    maxWidth: "90%",
    marginTop: 10,
  },
  requestDate: { fontFamily: fonts.Medium, color: COLORS.white, fontSize: 12 },
  waitingContainer: { alignSelf: "center", marginBottom: 5 },
  waitingText: {
    fontFamily: fonts.Medium,
    color: COLORS.primary,
    fontSize: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    gap: 10,
  },
  cancelButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: fonts.SemiBold,
    fontSize: 15,
    color: COLORS.primary,
  },
  finishButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  finishButtonText: {
    fontFamily: fonts.SemiBold,
    fontSize: 15,
    color: COLORS.white,
  },
});

{
  /* <View style={Styles.customerDetailsContainer}>
                <Text style={{ fontFamily: fonts.SemiBold, fontSize: 16 }}>
                  Customer Details
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.SemiBold,
                    fontSize: 15,
                    color: "white",
                    backgroundColor: COLORS.accent,
                    borderRadius: 15,
                    paddingHorizontal: 20,
                  }}
                >
                  {selectedService?.name || "No Service Selected"}
                </Text>
              </View> */
}

{
  /* <View style={Styles.contentContainer}>
                <View style={Styles.detailsCard}>
                  {selectedService && (
                    <>
                      <View style={Styles.detailsContainer}>
                        <View style={Styles.row}>
                          <Text style={Styles.label}>Customer:</Text>
                          <Text style={Styles.value}>
                            {selectedService.customerName}
                          </Text>
                        </View>
                        <View style={Styles.row}>
                          <Text style={Styles.label}>Location:</Text>
                          <Text style={Styles.value}>
                            {selectedService.location}
                          </Text>
                        </View>
                        <View style={Styles.row}>
                          <Text style={Styles.label}>Distance:</Text>
                          <Text style={Styles.success}>
                            {selectedService.distance}
                          </Text>
                        </View>
                      </View>
                      <View style={Styles.dividerLine} />
                      <View style={Styles.requestDateContainer}>
                        <Text style={Styles.requestDate}>
                          {timeAgo(selectedService.requestDate)}
                        </Text>
                      </View>
                      <View style={Styles.waitingContainer}>
                        <Text style={Styles.waitingText}>
                          Waiting for confirmation
                        </Text>
                      </View>
                    </>
                  )}
                </View>

                <View style={Styles.buttonContainer}>
                  <TouchableOpacity style={Styles.cancelButton}>
                    <Text style={Styles.cancelButtonText}>Cancel request</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={Styles.finishButton}
                    onPress={() => handleGetLaundry(selectedService.id)}
                  >
                    <Text style={Styles.finishButtonText}>Get the laundry</Text>
                  </TouchableOpacity>
                </View>
              </View> */
}
