// import { View, Text, StyleSheet } from "react-native";
// import React from "react";
// import COLORS from "../../constants/colors";
// import { fonts } from "../../constants/fonts";
// import BottomSheet from "@gorhom/bottom-sheet";

// export default function PendingBottomSheet({
//   selectedService,
//   ref,
//   snapPoints,
//   backdropComponent,
// }) {
//   return (
//     <>
//       <BottomSheet
//         ref={ref}
//         index={-1}
//         snapPoints={snapPoints}
//         enablePanDownToClose={true}
//         backgroundStyle={{ backgroundColor: COLORS.white }}
//         handleIndicatorStyle={{ backgroundColor: COLORS.primary }}
//         backdropComponent={backdropComponent}
//       >
//         <View style={styles.headerContainer}>
//           <Text style={styles.headerTitle}>Pending Pickup</Text>

//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={closePendingModal}
//           >
//             <MaterialIcons name="close" size={24} color={COLORS.secondary} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.divider} />
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignContent: "center",
//             marginStart: 20,
//             marginEnd: 20,
//             marginTop: 20,
//           }}
//         >
//           <Text style={{ fontFamily: fonts.SemiBold, fontSize: 16 }}>
//             Customer Details
//           </Text>
//           <Text
//             style={{
//               fontFamily: fonts.SemiBold,
//               fontSize: 15,
//               color: "white",
//               backgroundColor: COLORS.accent,
//               borderRadius: 15,
//               paddingHorizontal: 20,
//             }}
//           >
//             {selectedService?.service_name || "No Service Selected"}
//           </Text>
//         </View>
//         <View style={styles.contentContainer}>
//           <View
//             style={{
//               borderWidth: 1,
//               borderColor: COLORS.divider,
//               borderRadius: 10,
//               paddingTop: 10,
//             }}
//           >
//             <View>
//               {selectedService && (
//                 <>
//                   <View style={{ paddingStart: 20, marginBottom: 10 }}>
//                     <View style={{ flexDirection: "row", gap: 5 }}>
//                       <Text
//                         style={{
//                           fontFamily: fonts.Bold,
//                           fontSize: 14,
//                           color: COLORS.text3,
//                         }}
//                       >
//                         Customer:
//                       </Text>
//                       <Text
//                         style={{
//                           fontFamily: fonts.Medium,
//                           fontSize: 14,
//                           color: COLORS.primary,
//                         }}
//                       >
//                         {selectedService.customer_fullname}
//                       </Text>
//                     </View>
//                     <View style={{ flexDirection: "row", gap: 5 }}>
//                       <Text
//                         style={{
//                           fontFamily: fonts.Bold,
//                           fontSize: 14,
//                           color: COLORS.text3,
//                         }}
//                       >
//                         Location:
//                       </Text>
//                       <Text
//                         style={{
//                           fontFamily: fonts.Medium,
//                           fontSize: 14,
//                           color: COLORS.secondary,
//                           flexShrink: 1,
//                           flexWrap: "wrap",
//                           maxWidth: "80%",
//                         }}
//                       >
//                         {selectedService.address_line1}
//                       </Text>
//                     </View>
//                     <View style={{ flexDirection: "row", gap: 5 }}>
//                       <Text
//                         style={{
//                           fontFamily: fonts.Bold,
//                           fontSize: 14,
//                           color: COLORS.text3,
//                         }}
//                       >
//                         Distance:
//                       </Text>
//                       <Text
//                         style={{
//                           fontFamily: fonts.Medium,
//                           fontSize: 14,
//                           color: COLORS.success,
//                         }}
//                       >
//                         {selectedService.distance}
//                       </Text>
//                     </View>
//                   </View>
//                   {/* Divider */}
//                   <View
//                     style={{
//                       height: 1,
//                       backgroundColor: "#ddd",
//                       width: "100%",
//                     }}
//                   />
//                   <View
//                     style={{
//                       backgroundColor: COLORS.secondary,
//                       borderRadius: 20,
//                       marginTop: 10,
//                       alignSelf: "center",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       paddingHorizontal: 10,
//                       paddingVertical: 5,
//                       maxWidth: "90%",
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontFamily: fonts.Medium,
//                         color: COLORS.white,
//                         fontSize: 12,
//                       }}
//                     >
//                       {timeAgo(selectedService.request_date)}
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       alignSelf: "center",
//                       marginBottom: 5,
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontFamily: fonts.Medium,
//                         color: COLORS.primary,
//                         fontSize: 10,
//                       }}
//                     >
//                       Waiting for confirmation
//                     </Text>
//                   </View>
//                 </>
//               )}
//             </View>
//           </View>

//           <View style={{ flex: 1, justifyContent: "flex-end" }}>
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 marginBottom: 10,
//                 gap: 10,
//               }}
//             >
//               <TouchableOpacity
//                 style={{
//                   padding: 10,
//                   backgroundColor: COLORS.light,
//                   borderRadius: 10,
//                   alignItems: "center",
//                 }}
//                 onPress={() => handleCancelRequest(selectedService.request_id)}
//               >
//                 <Text
//                   style={{
//                     fontFamily: fonts.SemiBold,
//                     fontSize: 16,
//                     color: COLORS.black,
//                   }}
//                 >
//                   Cancel request
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.finishButton}
//                 onPress={() => handleGetLaundry(selectedService.request_id)}
//               >
//                 <Text
//                   style={{
//                     fontFamily: fonts.SemiBold,
//                     fontSize: 16,
//                     color: COLORS.white,
//                   }}
//                 >
//                   Get the laundry
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </BottomSheet>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   headerTitle: {
//     fontFamily: fonts.SemiBold,
//     fontSize: 18,
//     color: COLORS.primary,
//   },
//   closeButton: {
//     backgroundColor: COLORS.light,
//     borderRadius: 15,
//     width: 30,
//     height: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 24,
//   },
//   finishButton: {
//     padding: 10,
//     backgroundColor: COLORS.secondary,
//     borderRadius: 10,
//     alignItems: "center",
//     width: "55%",
//   },
//   container: {
//     flex: 1,
//   },
//   firstContainer: {
//     padding: 16,
//   },
//   listContainer: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 20,
//     marginTop: 20,
//     // Shadow Section
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 32,
//     fontFamily: fonts.Bold,
//     marginBottom: 16,
//     color: "#333",
//   },
//   itemContainer: {
//     padding: 18,
//     backgroundColor: COLORS.white,
//     marginBottom: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     width: "100%",
//   },
//   itemDetails: {
//     flexDirection: "column",
//     width: "100%",
//   },
//   rowBetween: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 8,
//   },
//   customerText: {
//     fontSize: 16,
//     fontFamily: fonts.Bold,
//     color: COLORS.primary,
//     marginBottom: 2,
//   },
//   itemText: {
//     fontSize: 12,
//     fontFamily: fonts.Medium,
//     color: COLORS.primary,
//     marginBottom: 2,
//   },
//   locationText: {
//     fontSize: 14,
//     fontFamily: fonts.SemiBold,
//     color: COLORS.secondary,
//     marginBottom: 8,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#ddd",
//     marginBottom: 5,
//     width: "100%",
//   },
//   requestStatusContainer: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//   },
//   dateContainer: {
//     flexDirection: "row",
//   },
//   statusContainer: {
//     flexDirection: "row",
//   },
//   labelText: {
//     fontSize: 12,
//     fontFamily: fonts.SemiBold,
//     color: COLORS.primary,
//   },
//   dateText: {
//     fontSize: 12,
//     fontFamily: fonts.Regular,
//     color: COLORS.black,
//   },
//   statusText: {
//     fontSize: 12,
//     fontFamily: fonts.Regular,
//     color: COLORS.primary,
//   },
//   tabContainer: {
//     flexDirection: "row",
//     paddingVertical: 10,
//     backgroundColor: COLORS.lightGray,
//     borderRadius: 10,
//     marginBottom: 12,
//     gap: 12,
//     alignItems: "center",
//   },
//   tab: {
//     flex: 1,
//     height: 40,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: COLORS.secondary,
//     backgroundColor: "transparent",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   activeTab: {
//     backgroundColor: COLORS.secondary,
//     borderColor: COLORS.secondary,
//   },

//   tabText: {
//     fontSize: 15,
//     color: COLORS.secondary,
//     fontFamily: fonts.SemiBold,
//   },

//   activeTabText: {
//     color: COLORS.white,
//   },
//   button: {
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5,
//   },

//   messageButton: {
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//     padding: 5,
//   },
//   badge: {
//     position: "absolute",
//     right: -5,
//     top: -5,
//     backgroundColor: COLORS.message,
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   badgeText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
// });
