import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fonts } from "../../constants/fonts";
import COLORS from "../../constants/colors";
import { FlashList } from "@shopify/flash-list";
import { Portal } from "@gorhom/portal";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { timeAgo } from "../../constants/datetime";
import { Link, useFocusEffect, useNavigation } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { getLaundryDelivery } from "../../data/api/getApi";
import usePolling from "../../hooks/usePolling";
import useAuth from "../context/AuthContext";
import { useHandleGoToMessage } from "../../components/method/useHandleGoToMessage";

export default function Delivery() {
  const navigation = useNavigation();
  const { userDetails } = useAuth();
  const handleGoToMessage = useHandleGoToMessage();
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("All");
  const bottomSheetRef = useRef(null);
  const bottomPendingSheet = useRef(null);
  const snapPoints = useMemo(() => ["60%"], []);
  const snapPointsOnDelivery = useMemo(() => ["80%"], []);
  const [selectedService, setSelectedService] = useState(null);

  // #Data Section
  const fetchLaundryDelivery = useCallback(async () => {
    const response = await getLaundryDelivery(
      userDetails.storeId,
      userDetails.userId
    );
    return response.data;
  }, [userDetails.storeId, userDetails.userId]);

  const {
    data: deliveryData,
    loading,
    error,
    setIsPolling,
  } = usePolling(fetchLaundryDelivery, 10000);

  useFocusEffect(
    useCallback(() => {
      setIsPolling(true);

      return () => {
        setIsPolling(false);
      };
    }, [])
  );

  const readyCount = Array.isArray(deliveryData)
    ? deliveryData.filter(
        (service) => service.request_status === "Ready for Delivery"
      ).length
    : 0;

  const ongoingCount = Array.isArray(deliveryData)
    ? deliveryData.filter(
        (service) => service.request_status === "Out for Delivery"
      ).length
    : 0;

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const openPendingModal = (service) => {
    setSelectedService(service);
    bottomPendingSheet.current?.expand();
  };

  const openOngoingModal = (service) => {
    setSelectedService(service);
    bottomSheetRef.current?.expand();
  };

  const closeOngoingModal = (service) => {
    setSelectedService(service);
    bottomSheetRef.current?.close();
  };

  const closePendingModal = (service) => {
    setSelectedService(service);
    bottomPendingSheet.current?.close();
  };

  // On delivery
  const handleScanCode = async (id) => {
    bottomSheetRef.current?.close();

    setTimeout(() => {
      navigation.navigate("scanner/qrscan", { customerId: id });
    }, 300);
  };

  const handleReturnToPending = async (id) => {
    console.log(id);
    bottomSheetRef.current?.close();
  };

  // Ready for delivery
  const handleGetLaundry = async (id) => {
    console.log(id);
    bottomPendingSheet.current?.close();
  };

  const handleCancelRequest = async (id) => {
    console.log(id);
    bottomPendingSheet.current?.close();
  };

  // Filter services based on the selected tab
  const filteredServices = deliveryData.filter((service) => {
    if (filter === "All") {
      return (
        service.request_status === "Ready for Delivery" ||
        service.request_status === "Out for Delivery"
      );
    }
    if (filter === "Nearest") {
      return (
        service.request_status === "Ready for Delivery" ||
        service.request_status === "Out for Delivery"
      );
    }
    if (filter === "Completed Delivery")
      return service.request_status === "Completed Delivery";
    return true;
  });

  const sortedServices = filteredServices.sort((a, b) => {
    if (filter === "All") {
      if (
        a.request_status === "Out for Delivery" &&
        b.request_status !== "Out for Delivery"
      ) {
        return -1;
      }
      if (
        a.request_status !== "Out for Delivery" &&
        b.request_status === "Out for Delivery"
      ) {
        return 1;
      }
      return new Date(a.request_date) - new Date(b.request_date);
    }

    if (filter === "Nearest") {
      const distanceA = parseFloat(a.distance);
      const distanceB = parseFloat(b.distance);
      return distanceA - distanceB;
    }

    return new Date(a.request_date) - new Date(b.request_date);
  });

  const renderItem = ({ item }) => {
    let iconName;
    let backgroundColor;
    let iconComponent;
    let statusText;

    if (item.request_status === "Ready for Delivery") {
      iconName = "time-outline";
      backgroundColor = COLORS.accent;
      iconComponent = (
        <Ionicons name={iconName} size={24} color={COLORS.white} />
      );
      statusText = "Ready for delivery";
    } else if (item.request_status === "Ongoing Pickup") {
      backgroundColor = COLORS.success;
      // iconComponent = <AnimatedIcon />;
      statusText = "Ongoing";
    } else if (item.request_status === "Cancel") {
      iconName = "book-cancel-outline";
      iconComponent = (
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={COLORS.white}
        />
      );
      backgroundColor = COLORS.error;
      statusText = "Cancel";
    }

    return (
      <Pressable
        style={styles.itemContainer}
        onPress={() => {
          if (item.request_status === "Ready for Delivery") {
            openPendingModal(item);
          } else if (item.request_status === "Out for Delivery") {
            openOngoingModal(item);
          } else {
          }
        }}
        activeOpacity={
          item.request_status === "Ready for Delivery" ||
          item.request_status === "Out for Delivery"
            ? 0.2
            : 1
        }
      >
        <View style={styles.itemDetails}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.customerText}>{item.customer_fullname}</Text>
              <Text style={styles.itemText}>{item.payment_method}</Text>
              <Text style={styles.locationText}>{item.address_line}</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "flex-start", gap: 2 }}
            >
              {item.request_status !== "Canceled" &&
                item.request_status !== "Pending Pickup" && (
                  <View style={{ position: "relative" }}>
                    <TouchableOpacity
                      onPress={() =>
                        handleGoToMessage(
                          item.customer_id,
                          item.customer_fullname
                        )
                      }
                      style={[styles.button, styles.messageButton]}
                    >
                      <Ionicons
                        name="chatbubble-ellipses"
                        size={24}
                        color={COLORS.primary}
                      />
                      {item.unread_messages > 0 && (
                        <View style={styles.badge}>
                          <Text
                            style={[
                              styles.badgeText,
                              { fontSize: item.unread_messages > 99 ? 10 : 12 },
                            ]}
                          >
                            {item.unread_messages > 99
                              ? "99+"
                              : item.unread_messages}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              <View style={{ alignItems: "center" }}>
                <View style={[styles.button, { backgroundColor }]}>
                  {iconComponent}
                </View>
                <View style={{ alignItems: "center" }}>
                  {item.request_status === "Ready for Delivery" && (
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          fontFamily: fonts.Regular,
                          fontSize: 12,
                          color: COLORS.primary,
                        }}
                      >
                        Ready for
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.Regular,
                          fontSize: 12,
                          color: COLORS.primary,
                          marginTop: -6, // Adjust this value to reduce the gap
                        }}
                      >
                        delivery
                      </Text>
                    </View>
                  )}
                  {item.status === "Out for Delivery" && (
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          fontFamily: fonts.Regular,
                          fontSize: 12,
                          color: COLORS.primary,
                        }}
                      >
                        On
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.Regular,
                          fontSize: 12,
                          color: COLORS.primary,
                          marginTop: -6, // Adjust this value to reduce the gap
                        }}
                      >
                        delivery
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.rowBetween}>
            <View style={styles.requestStatusContainer}>
              <Text style={styles.labelText}>Request Date</Text>
              <View style={styles.dateContainer}>
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color={COLORS.secondary}
                  style={{ paddingRight: 5 }}
                />
                <Text style={styles.dateText}>
                  {new Date(item.request_date).toLocaleString()}
                </Text>
              </View>
            </View>
            <View style={styles.requestStatusContainer}>
              <Text style={styles.labelText}>Distance</Text>
              <View style={styles.statusContainer}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={COLORS.success}
                  style={{ paddingRight: 2 }}
                />
                <Text style={styles.statusText}>{item.distance}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  // const renderItem = ({ item }) => {
  //   let iconName;
  //   let backgroundColor;
  //   let iconComponent;

  //   if (item.request_status === "Ready for Delivery") {
  //     iconName = "time-outline";
  //     backgroundColor = COLORS.accent;
  //     iconComponent = (
  //       <Ionicons name={iconName} size={24} color={COLORS.white} />
  //     );
  //   } else if (item.request_status === "Out for Delivery") {
  //     backgroundColor = COLORS.success;
  //     iconComponent = (
  //       <MaterialCommunityIcons
  //         name="truck-delivery-outline"
  //         size={24}
  //         color={COLORS.white}
  //       />
  //     ); // comment for now
  //     statusText = "On Delivery";
  //   } else if (item.request_status === "Cancel") {
  //     iconName = "book-cancel-outline";
  //     iconComponent = (
  //       <MaterialCommunityIcons
  //         name={iconName}
  //         size={24}
  //         color={COLORS.white}
  //       />
  //     );
  //     backgroundColor = COLORS.error;
  //   }

  //   return (
  //     <TouchableOpacity
  //       style={styles.itemContainer}
  //       onPress={() => {
  //         if (item.request_status === "Ready for Delivery") {
  //           openPendingModal(item);
  //         } else if (item.request_status === "Out for Delivery") {
  //           openOngoingModal(item);
  //         } else {
  //         }
  //       }}
  //       activeOpacity={
  //         item.request_status === "Ready for Delivery" ||
  //         item.request_status === "Out for Delivery"
  //           ? 0.2
  //           : 1
  //       }
  //     >
  //       <View style={styles.itemDetails}>
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             justifyContent: "space-between",
  //             alignItems: "center",
  //             flex: 1,
  //           }}
  //         >
  //           <View style={{ flex: 1 }}>
  //             <Text style={styles.customerText}>{item.customer_fullname}</Text>
  //             <Text style={styles.itemText}>{item.payment_method}</Text>
  //             <Text style={styles.locationText}>{item.address_line}</Text>
  //           </View>
  //           <View
  //             style={{ flexDirection: "row", alignItems: "flex-start", gap: 2 }}
  //           >
  //             {item.request_status !== "Cancel" && (
  //               <View style={{ position: "relative" }}>
  //                 <TouchableOpacity
  //                   onPress={() =>
  //                     handleGoToMessage(item.id, item.customer_fullname)
  //                   }
  //                   style={[styles.button, styles.messageButton]}
  //                 >
  //                   <Ionicons
  //                     name="chatbubble-ellipses"
  //                     size={24}
  //                     color={COLORS.primary}
  //                   />
  //                   {item.messageCount > 0 && (
  //                     <View style={styles.badge}>
  //                       <Text
  //                         style={[
  //                           styles.badgeText,
  //                           { fontSize: item.messageCount > 99 ? 10 : 12 },
  //                         ]}
  //                       >
  //                         {item.messageCount > 99 ? "99+" : item.messageCount}
  //                       </Text>
  //                     </View>
  //                   )}
  //                 </TouchableOpacity>
  //               </View>
  //             )}
  //             <View style={{ alignItems: "center" }}>
  //               <View style={[styles.button, { backgroundColor }]}>
  //                 {iconComponent}
  //               </View>
  //               <View style={{ alignItems: "center" }}>
  //                 {item.status === "Ready for Delivery" && (
  //                   <View style={{ alignItems: "center" }}>
  //                     <Text
  //                       style={{
  //                         fontFamily: fonts.Regular,
  //                         fontSize: 12,
  //                         color: COLORS.primary,
  //                       }}
  //                     >
  //                       Ready for
  //                     </Text>
  //                     <Text
  //                       style={{
  //                         fontFamily: fonts.Regular,
  //                         fontSize: 12,
  //                         color: COLORS.primary,
  //                         marginTop: -6, // Adjust this value to reduce the gap
  //                       }}
  //                     >
  //                       delivery
  //                     </Text>
  //                   </View>
  //                 )}
  //                 {item.status === "Out for Delivery" && (
  //                   <View style={{ alignItems: "center" }}>
  //                     <Text
  //                       style={{
  //                         fontFamily: fonts.Regular,
  //                         fontSize: 12,
  //                         color: COLORS.primary,
  //                       }}
  //                     >
  //                       On
  //                     </Text>
  //                     <Text
  //                       style={{
  //                         fontFamily: fonts.Regular,
  //                         fontSize: 12,
  //                         color: COLORS.primary,
  //                         marginTop: -6, // Adjust this value to reduce the gap
  //                       }}
  //                     >
  //                       delivery
  //                     </Text>
  //                   </View>
  //                 )}
  //               </View>
  //             </View>
  //           </View>
  //         </View>
  //         <View style={styles.divider} />
  //         <View style={styles.rowBetween}>
  //           <View style={styles.requestStatusContainer}>
  //             <Text style={styles.labelText}>Request Date</Text>
  //             <View style={styles.dateContainer}>
  //               <Ionicons
  //                 name="calendar-outline"
  //                 size={18}
  //                 color={COLORS.secondary}
  //                 style={{ paddingRight: 5 }}
  //               />
  //               <Text style={styles.dateText}>
  //                 {new Date(item.request_date).toLocaleString()}
  //               </Text>
  //             </View>
  //           </View>
  //           <View style={styles.requestStatusContainer}>
  //             <Text style={styles.labelText}>Distance</Text>
  //             <View style={styles.statusContainer}>
  //               <Ionicons
  //                 name="location-outline"
  //                 size={18}
  //                 color={COLORS.success}
  //                 style={{ paddingRight: 2 }}
  //               />
  //               <Text style={styles.statusText}>{item.distance}</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  // QR CODE SECTIOn
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView style={styles.container}>
      {/* Upper Design */}
      <View style={{ marginStart: 20, marginTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            paddingRight: 20,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: fonts.SemiBold,
                fontSize: 18,
                color: COLORS.primary,
              }}
            >
              Staff Name
            </Text>
            <Text
              style={{
                fontFamily: fonts.Medium,
                fontSize: 14,
                color: COLORS.primary,
                marginTop: 2,
              }}
            >
              Laundry Store Name
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.default_divider} />

      {/* Bottom Design */}
      <View style={styles.listContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, filter === "All" && styles.activeTab]}
            onPress={() => setFilter("All")}
          >
            <Text
              style={[styles.tabText, filter === "All" && styles.activeTabText]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, filter === "Nearest" && styles.activeTab]}
            onPress={() => setFilter("Nearest")}
          >
            <Text
              style={[
                styles.tabText,
                filter === "Nearest" && styles.activeTabText,
              ]}
            >
              Nearest
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, filter === "Cancel" && styles.activeTab]}
            onPress={() => setFilter("Cancel")}
          >
            <Text
              style={[
                styles.tabText,
                filter === "Cancel" && styles.activeTabText,
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        <FlashList
          data={sortedServices}
          renderItem={renderItem}
          keyExtractor={(item) => item.request_id.toString()}
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
        />
      </View>
      {/* For On Delivery */}
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPointsOnDelivery}
          enablePanDownToClose={true}
          backgroundStyle={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
          }}
          handleIndicatorStyle={{ backgroundColor: COLORS.primary }}
          backdropComponent={renderBackdrop}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>On Delivery</Text>
            <TouchableOpacity
              onPress={closeOngoingModal}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginStart: 20,
              marginEnd: 20,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.SemiBold,
                fontSize: 16,
                color: COLORS.text3,
              }}
            >
              Customer Details
            </Text>

            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: fonts.SemiBold,
                  fontSize: 13,
                  color: "white",
                  backgroundColor: COLORS.error,
                  borderRadius: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 2,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {"Pending" || "No Service Selected"}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.Medium,
                  color: COLORS.primary,
                  fontSize: 10,
                  marginTop: 2,
                  textAlign: "center",
                }}
              >
                Payment Status
              </Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.divider,
                borderRadius: 10,
                paddingTop: 10,
              }}
            >
              <View>
                {selectedService && (
                  <>
                    <View style={{ paddingStart: 20, marginBottom: 10 }}>
                      <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text
                          style={{
                            fontFamily: fonts.Bold,
                            fontSize: 14,
                            color: COLORS.text3,
                          }}
                        >
                          Customer:
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.Medium,
                            fontSize: 14,
                            color: COLORS.primary,
                          }}
                        >
                          {selectedService.customerName}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text
                          style={{
                            fontFamily: fonts.Bold,
                            fontSize: 14,
                            color: COLORS.text3,
                          }}
                        >
                          Total Amount:
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.Medium,
                            fontSize: 14,
                            color: COLORS.primary,
                          }}
                        >
                          PHP 240
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text
                          style={{
                            fontFamily: fonts.Bold,
                            fontSize: 14,
                            color: COLORS.text3,
                          }}
                        >
                          Payment Method:
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.Medium,
                            fontSize: 14,
                            color: COLORS.primary,
                          }}
                        >
                          Cash on delivery
                        </Text>
                      </View>

                      <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text
                          style={{
                            fontFamily: fonts.Bold,
                            fontSize: 14,
                            color: COLORS.text3,
                          }}
                        >
                          Location:
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.Medium,
                            fontSize: 14,
                            color: COLORS.secondary,
                            flexShrink: 1,
                            flexWrap: "wrap",
                            maxWidth: "80%",
                          }}
                        >
                          {selectedService.location}
                        </Text>
                      </View>
                    </View>
                    {/* Divider */}
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#ddd",
                        width: "100%",
                      }}
                    />
                    <View
                      style={{
                        alignSelf: "center",
                        marginBottom: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 20,
                      }}
                    >
                      {/* {isPermissionGranted ? (
                      <View
                        style={{
                          backgroundColor: "lightgrey",
                          height: 50,
                          width: 50,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            width: "100%", // Full width
                            paddingHorizontal: 20,
                          }}
                        ></View>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={{
                          backgroundColor: COLORS.primary,
                          padding: 10,
                          borderRadius: 10,
                        }}
                        onPress={requestPermission}
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            fontFamily: fonts.SemiBold,
                            fontSize: 15,
                            textAlign: "center",
                          }}
                        >
                          Request Camera Permission
                        </Text>
                      </TouchableOpacity>
                    )} */}
                    </View>
                  </>
                )}
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 10,
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: COLORS.light,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                  onPress={() => handleReturnToPending(selectedService.id)}
                >
                  <Text
                    style={{
                      fontFamily: fonts.SemiBold,
                      fontSize: 16,
                      color: COLORS.black,
                    }}
                  >
                    Return to pending
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.finishButton,
                    {
                      backgroundColor: isPermissionGranted
                        ? COLORS.secondary
                        : COLORS.disableButtonBg,
                    },
                  ]}
                  onPress={
                    isPermissionGranted
                      ? () => handleScanCode(selectedService.id)
                      : null
                  }
                  disabled={!isPermissionGranted}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontFamily: fonts.SemiBold,
                        fontSize: 16,
                        color: isPermissionGranted
                          ? COLORS.white
                          : COLORS.disableButtonTxt,
                      }}
                    >
                      Scan Code
                    </Text>
                    <MaterialCommunityIcons
                      name="qrcode-scan" // Use the appropriate icon name
                      size={24} // Adjust size as needed
                      color={
                        isPermissionGranted
                          ? COLORS.white
                          : COLORS.disableButtonTxt
                      } // Set icon color
                      style={{ marginLeft: 8 }} // Add some space between text and icon
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottomSheet>
      </Portal>
      {/* For Ready for delivery */}
      <Portal>
        <BottomSheet
          ref={bottomPendingSheet}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: COLORS.white }}
          handleIndicatorStyle={{ backgroundColor: COLORS.primary }}
          backdropComponent={renderBackdrop}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Pending Pickup</Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={closePendingModal}
            >
              <MaterialIcons name="close" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              marginStart: 20,
              marginEnd: 20,
              marginTop: 20,
            }}
          >
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
          </View>
          <View style={styles.contentContainer}>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.divider,
                borderRadius: 10,
                paddingTop: 10,
              }}
            >
              <View>
                {selectedService && (
                  <>
                    <View style={{ paddingStart: 20, marginBottom: 10 }}>
                      <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text
                          style={{
                            fontFamily: fonts.Bold,
                            fontSize: 14,
                            color: COLORS.text3,
                          }}
                        >
                          Customer:
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.Medium,
                            fontSize: 14,
                            color: COLORS.primary,
                          }}
                        >
                          {selectedService.customerName}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text
                          style={{
                            fontFamily: fonts.Bold,
                            fontSize: 14,
                            color: COLORS.text3,
                          }}
                        >
                          Location:
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.Medium,
                            fontSize: 14,
                            color: COLORS.secondary,
                            flexShrink: 1, // Allow the text to shrink
                            flexWrap: "wrap", // Allow text to wrap to the next line
                            maxWidth: "80%", // Adjust this percentage as needed to prevent overflow
                          }}
                        >
                          {selectedService.location}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text
                          style={{
                            fontFamily: fonts.Bold,
                            fontSize: 14,
                            color: COLORS.text3,
                          }}
                        >
                          Distance:
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.Medium,
                            fontSize: 14,
                            color: COLORS.success,
                          }}
                        >
                          {selectedService.distance}
                        </Text>
                      </View>
                    </View>
                    {/* Divider */}
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#ddd",
                        width: "100%",
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: COLORS.secondary,
                        borderRadius: 20,
                        marginTop: 10,
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        maxWidth: "90%",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: fonts.Medium,
                          color: COLORS.white,
                          fontSize: 12,
                        }}
                      >
                        {timeAgo(selectedService.requestDate)}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignSelf: "center",
                        marginBottom: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: fonts.Medium,
                          color: COLORS.primary,
                          fontSize: 10,
                        }}
                      >
                        Waiting for confirmation
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>

            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 10,
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: COLORS.light,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                  onPress={() => handleCancelRequest(selectedService.id)}
                >
                  <Text
                    style={{
                      fontFamily: fonts.SemiBold,
                      fontSize: 16,
                      color: COLORS.black,
                    }}
                  >
                    Cancel request
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.finishButton}
                  onPress={() => handleGetLaundry(selectedService.id)}
                >
                  <Text
                    style={{
                      fontFamily: fonts.SemiBold,
                      fontSize: 16,
                      color: COLORS.white,
                    }}
                  >
                    Get the laundry
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottomSheet>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontFamily: fonts.SemiBold,
    marginBottom: 15,
    color: COLORS.primary,
  },
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
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
  },
  finishButton: {
    padding: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: "center",
    width: "55%",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  firstContainer: {
    padding: 16,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.Bold,
    marginBottom: 16,
    color: "#333",
  },
  itemContainer: {
    padding: 18,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  itemDetails: {
    flexDirection: "column",
    width: "100%",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  customerText: {
    fontSize: 16,
    fontFamily: fonts.Bold,
    color: COLORS.primary,
    marginBottom: 2,
  },
  itemText: {
    fontSize: 12,
    fontFamily: fonts.Medium,
    color: COLORS.primary,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    fontFamily: fonts.SemiBold,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  default_divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 5,
    width: "100%",
  },
  requestStatusContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  dateContainer: {
    flexDirection: "row",
  },
  statusContainer: {
    flexDirection: "row",
  },
  labelText: {
    fontSize: 12,
    fontFamily: fonts.SemiBold,
    color: COLORS.primary,
  },
  dateText: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: COLORS.black,
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: COLORS.primary,
  },
  tabContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginBottom: 12,
    gap: 12,
    alignItems: "center",
  },
  tab: {
    flex: 1,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },

  tabText: {
    fontSize: 15,
    color: COLORS.secondary,
    fontFamily: fonts.SemiBold,
  },

  activeTabText: {
    color: COLORS.white,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  messageButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 5,
  },
  badge: {
    position: "absolute",
    right: -5, // Adjust this value as needed
    top: -5, // Adjust this value as needed
    backgroundColor: COLORS.message,
    borderRadius: 10, // Circular badge
    width: 20, // Width of the badge
    height: 20, // Height of the badge
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
