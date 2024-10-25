import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fonts } from "../../constants/fonts";
import COLORS from "../../constants/colors";
import { FlashList } from "@shopify/flash-list";
import { Portal } from "@gorhom/portal";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { timeAgo } from "../../constants/datetime";
import { useFocusEffect } from "expo-router";
import { getLaundryDelivery } from "../../data/api/getApi";
import usePolling from "../../hooks/usePolling";
import useAuth from "../context/AuthContext";
import { useHandleGoToMessage } from "../../components/method/useHandleGoToMessage";
import { Styles } from "../style/deliveryStyle";
import { ReadyBottomSheet } from "../../components/staff/ReadyBottomSheet";

export default function Delivery() {
  const { userDetails } = useAuth();
  const handleGoToMessage = useHandleGoToMessage();
  const [filter, setFilter] = useState("All");
  const bottomSheetRef = useRef(null);
  const bottomReadyDeliverySheet = useRef(null);
  const bottomPendingSheet = useRef(null);
  const snapPoints = useMemo(() => ["60%"], []);
  const snapPointsOnDelivery = useMemo(() => ["80%"], []);
  const [selectedService, setSelectedService] = useState(null);
  const [isReadyBottomSheetVisible, setReadyBottomSheetVisible] =
    useState(false);

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

  // For Modal Ready Delivery
  const openReadyDeliveryModal = (service) => {
    setSelectedService(service);
    bottomReadyDeliverySheet.current?.expand();
  };

  const closeReadyDeliveryModal = () => {};

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

  const handleReturnToPending = async (id) => {
    console.log(id);
    bottomSheetRef.current?.close();
  };

  // Ready for delivery
  const handleGetReadyDelivery = async (id) => {
    console.log(id);
  };

  const handleCancelRequest = async (id) => {
    console.log(id);
    bottomPendingSheet.current?.close();
  };

  const openPendingModal = (service) => {
    setSelectedService(service);
    bottomPendingSheet.current?.expand();
  };

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
        style={Styles.itemContainer}
        onPress={() => {
          if (item.request_status === "Ready for Delivery") {
            openReadyDeliveryModal(item);
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
        <View style={Styles.itemDetails}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={Styles.customerText}>{item.customer_fullname}</Text>
              <Text style={Styles.locationText}>{item.address_line}</Text>
              {/* <Text style={Styles.itemText}>{item.payment_method}</Text> */}
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
                      style={[Styles.button, Styles.messageButton]}
                    >
                      <Ionicons
                        name="chatbubble-ellipses"
                        size={24}
                        color={COLORS.primary}
                      />
                      {item.unread_messages > 0 && (
                        <View style={Styles.badge}>
                          <Text
                            style={[
                              Styles.badgeText,
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
                <View style={[Styles.button, { backgroundColor }]}>
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
          <View style={Styles.divider} />
          <View style={Styles.rowBetween}>
            <View style={Styles.requestStatusContainer}>
              <Text style={Styles.labelText}>Payment Method</Text>
              <View style={Styles.dateContainer}>
                <MaterialIcons
                  name="payments"
                  size={18}
                  color={COLORS.secondary}
                  style={{ paddingRight: 5 }}
                />
                <Text style={Styles.dateText}>
                  {/* {new Date(item.request_date).toLocaleString()} */}
                  {item.payment_method}
                </Text>
              </View>
            </View>
            <View style={Styles.requestStatusContainer}>
              <Text style={Styles.labelText}>Distance</Text>
              <View style={Styles.statusContainer}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={COLORS.success}
                  style={{ paddingRight: 2 }}
                />
                <Text style={Styles.statusText}>{item.distance}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={Styles.container}>
      {/* Upper Design */}
      <View style={{ padding: 2 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: fonts.Bold,
              fontSize: 25,
              color: COLORS.secondary,
            }}
          >
            Laundry Delivery
          </Text>
        </View>

        <View style={Styles.container_header}>
          {/* Ready for Delivery */}
          <View style={[Styles.card, Styles.readyCard]}>
            <Text style={[Styles.cardTitle, Styles.readyText]}>
              Ready for Delivery
            </Text>
            <Text style={[Styles.cardCount, Styles.readyText]}>
              {readyCount}
            </Text>
          </View>

          {/* Ongoing Delivery */}
          <View style={[Styles.card, Styles.ongoingCard]}>
            <Text style={[Styles.cardTitle, Styles.ongoingText]}>
              Ongoing Delivery
            </Text>
            <Text style={[Styles.cardCount, Styles.ongoingText]}>
              {ongoingCount}
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Design */}
      <View style={Styles.listContainer}>
        <View style={Styles.tabContainer}>
          <TouchableOpacity
            style={[Styles.tab, filter === "All" && Styles.activeTab]}
            onPress={() => setFilter("All")}
          >
            <Text
              style={[Styles.tabText, filter === "All" && Styles.activeTabText]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Styles.tab, filter === "Nearest" && Styles.activeTab]}
            onPress={() => setFilter("Nearest")}
          >
            <Text
              style={[
                Styles.tabText,
                filter === "Nearest" && Styles.activeTabText,
              ]}
            >
              Nearest
            </Text>
          </TouchableOpacity>
        </View>
        <FlashList
          data={sortedServices}
          renderItem={renderItem}
          keyExtractor={(item) => item.request_id.toString()}
          contentContainerStyle={{ paddingBottom: 70 }}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
        />
      </View>

      {/* For Ready for delivery */}
      <ReadyBottomSheet
        ref={bottomReadyDeliverySheet}
        selectedService={selectedService}
        closePendingModal={closeReadyDeliveryModal}
        handleGetLaundry={handleGetReadyDelivery}
      />
    </SafeAreaView>
  );
}

{
  /* <BottomSheet
          ref={bottomPendingSheet}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: COLORS.white }}
          handleIndicatorStyle={{ backgroundColor: COLORS.primary }}
          backdropComponent={renderBackdrop}
        >
          <View style={Styles.headerContainer}>
            <Text style={Styles.headerTitle}>Ready for Delivery</Text>

            <TouchableOpacity
              style={Styles.closeButton}
              onPress={closePendingModal}
            >
              <MaterialIcons name="close" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          <View style={Styles.divider} />
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

          <View style={Styles.contentContainer}>
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
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    backgroundColor: COLORS.background,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.SemiBold,
                      fontSize: 15,
                      color: COLORS.primary,
                    }}
                  >
                    Cancel request
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.finishButton}
                  onPress={() => handleGetLaundry(selectedService.id)}
                >
                  <Text
                    style={{
                      fontFamily: fonts.SemiBold,
                      fontSize: 15,
                      color: COLORS.white,
                    }}
                  >
                    Get the laundry
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottomSheet> */
}

{
  /* For On Delivery */
}
{
  /* <Portal>
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
          <View style={Styles.headerContainer}>
            <Text style={Styles.headerTitle}>On Delivery</Text>
            <TouchableOpacity
              onPress={closeOngoingModal}
              style={Styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          <View style={Styles.divider} />
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
          <View style={Styles.contentContainer}>
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
                      {isPermissionGranted ? (
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
                    )}
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
                    Styles.finishButton,
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
      </Portal> */
}

{
  /* <Portal>
        <BottomSheet
          ref={bottomPendingSheet}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: COLORS.white }}
          handleIndicatorStyle={{ backgroundColor: COLORS.primary }}
          backdropComponent={renderBackdrop}
        >
          <View style={Styles.headerContainer}>
            <Text style={Styles.headerTitle}>Ready for Delivery</Text>

            <TouchableOpacity
              style={Styles.closeButton}
              onPress={closePendingModal}
            >
              <MaterialIcons name="close" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          <View style={Styles.divider} />
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

          <View style={Styles.contentContainer}>
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
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    backgroundColor: COLORS.background,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.SemiBold,
                      fontSize: 15,
                      color: COLORS.primary,
                    }}
                  >
                    Cancel request
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.finishButton}
                  onPress={() => handleGetLaundry(selectedService.id)}
                >
                  <Text
                    style={{
                      fontFamily: fonts.SemiBold,
                      fontSize: 15,
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
      </Portal> */
}
