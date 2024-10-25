import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useRef, useMemo, useEffect } from "react";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { Portal } from "@gorhom/portal";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { timeAgo } from "../../constants/datetime";

export const SelectServiceBottomSheet = React.forwardRef(
  ({ selectedService, snapPoints, closeSelectModal, handleSubmit }, ref) => {
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
              <Text style={styles.headerTitle}>Select a service</Text>

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
