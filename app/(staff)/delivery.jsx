import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
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
import nodata from "../../assets/images/no_data.png";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { timeAgo } from "../../constants/datetime";
import { useNavigation } from "expo-router";

const mockServices = [
  {
    id: "1",
    name: "Washing",
    location: "123 Main St, City Center",
    customerName: "John Doe",
    requestDate: "2024-09-01T10:00:00Z",
    distance: "7 km",
    status: "Pending Pickup",
    messageCount: 1,
  },
  {
    id: "2",
    name: "Dry Cleaning",
    location: "456 Park Ave, Downtown",
    customerName: "Jane Smith",
    requestDate: "2024-09-02T09:30:00Z",
    distance: "1 km",
    status: "Cancel",
    messageCount: 0,
  },
  {
    id: "3",
    name: "Ironing",
    location: "789 Elm St, Suburbs",
    customerName: "Alex Johnson",
    requestDate: "2024-09-03T08:15:00Z",
    distance: "3 km",
    status: "Pending Pickup",
    messageCount: 10,
  },
  {
    id: "4",
    name: "Laundry",
    location: "321 River St, Uptown",
    customerName: "John Reynald Velarde",
    requestDate: "2024-09-04T12:45:00Z",
    distance: "5 km",
    status: "Ongoing Pickup",
    messageCount: 50,
  },
  {
    id: "5",
    name: "Laundry",
    location: "321 River St, Uptowns",
    customerName: "Emily Brown",
    requestDate: "2024-09-04T11:45:00Z",
    distance: "5 km",
    status: "Ongoing Pickup",
    messageCount: 80,
  },
];
const pendingCount = mockServices.filter(
  (service) => service.status === "Pending Pickup"
).length;

const ongoingCount = mockServices.filter(
  (service) => service.status === "Ongoing Pickup"
).length;

const AnimatedIcon = () => {
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
  }, [rotation]);

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name="hourglass-outline" size={24} color={COLORS.white} />
    </Animated.View>
  );
};

export default function Pickup() {
  const navigaton = useNavigation();
  const [services, setServices] = useState([]);
  const [notiCount, setNotiCount] = useState({ count: 1 });
  const [filter, setFilter] = useState("All");
  const bottomSheetRef = useRef(null);
  const bottomPendingSheet = useRef(null);
  const snapPoints = useMemo(() => ["60%"], []);
  const [selectedService, setSelectedService] = useState(null);

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

  useEffect(() => {
    setServices(mockServices);
  }, []);

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

  // Ongoing
  const handleFinishPickup = async (id) => {
    console.log(id);
    bottomSheetRef.current?.close();
  };

  const handleReturnToPending = async (id) => {
    console.log(id);
    bottomSheetRef.current?.close();
  };

  // Pending
  const handleGetLaundry = async (id) => {
    console.log(id);
    bottomPendingSheet.current?.close();
  };

  const handleCancelRequest = async (id) => {
    console.log(id);
    bottomPendingSheet.current?.close();
  };

  // Going to another screen
  const handleGoToMessage = async (id, name) => {
    console.log("Message ID Customer: " + id);
    console.log("Message Customer Name: " + name);
    navigaton.navigate("message/chat", { customerId: id, customerName: name });
  };

  const handleGoToNotification = async (id) => {
    console.log("Message ID Customer: " + id);
    navigaton.navigate("notification/list", {});
  };

  // Filter services based on the selected tab
  const filteredServices = services.filter((service) => {
    if (filter === "All") {
      return (
        service.status === "Pending Pickup" ||
        service.status === "Ongoing Pickup"
      );
    }
    if (filter === "Nearest") {
      return (
        service.status === "Pending Pickup" ||
        service.status === "Ongoing Pickup"
      );
    }
    if (filter === "Cancel") return service.status === "Cancel";
    return true;
  });

  const sortedServices = filteredServices.sort((a, b) => {
    if (filter === "All") {
      if (a.status === "Ongoing Pickup" && b.status !== "Ongoing Pickup") {
        return -1;
      }
      if (a.status !== "Ongoing Pickup" && b.status === "Ongoing Pickup") {
        return 1;
      }
      return new Date(a.requestDate) - new Date(b.requestDate);
    }

    if (filter === "Nearest") {
      const distanceA = parseFloat(a.distance);
      const distanceB = parseFloat(b.distance);
      return distanceA - distanceB;
    }

    return new Date(a.requestDate) - new Date(b.requestDate);
  });

  const renderItem = ({ item }) => {
    let iconName;
    let backgroundColor;
    let iconComponent;
    let statusText;

    if (item.status === "Pending Pickup") {
      iconName = "time-outline";
      backgroundColor = COLORS.accent;
      iconComponent = (
        <Ionicons name={iconName} size={24} color={COLORS.white} />
      );
      statusText = "Pending";
    } else if (item.status === "Ongoing Pickup") {
      backgroundColor = COLORS.success;
      // iconComponent = <AnimatedIcon />; // comment for now
      statusText = "Ongoing";
    } else if (item.status === "Cancel") {
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
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          if (item.status === "Pending Pickup") {
            openPendingModal(item);
          } else if (item.status === "Ongoing Pickup") {
            openOngoingModal(item);
          } else {
          }
        }}
        activeOpacity={
          item.status === "Pending Pickup" || item.status === "Ongoing Pickup"
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
              <Text style={styles.customerText}>{item.customerName}</Text>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "flex-start", gap: 2 }}
            >
              {item.status !== "Cancel" && item.status !== "Pending Pickup" && (
                <View style={{ position: "relative" }}>
                  <TouchableOpacity
                    onPress={() =>
                      handleGoToMessage(item.id, item.customerName)
                    }
                    style={[styles.button, styles.messageButton]}
                  >
                    <Ionicons
                      name="chatbubble-ellipses"
                      size={24}
                      color={COLORS.primary}
                    />
                    {item.messageCount > 0 && (
                      <View style={styles.badge}>
                        <Text
                          style={[
                            styles.badgeText,
                            { fontSize: item.messageCount > 99 ? 10 : 12 },
                          ]}
                        >
                          {item.messageCount > 99 ? "99+" : item.messageCount}
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
                <Text
                  style={{
                    fontFamily: fonts.Regular,
                    fontSize: 12,
                    color: COLORS.primary,
                  }}
                >
                  {statusText}
                </Text>
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
                  {new Date(item.requestDate).toLocaleString()}
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
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={["#5787C8", "#71C7DA"]}
      locations={[0, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {/* Upper Design */}
        <View style={{ marginBottom: 1, marginStart: 20, marginTop: 10 }}>
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
                  color: COLORS.white,
                }}
              >
                Staff Name
              </Text>
              <Text
                style={{
                  fontFamily: fonts.Medium,
                  fontSize: 14,
                  color: COLORS.white,
                  marginTop: 2,
                }}
              >
                Laundry Store Name
              </Text>
            </View>
            {/* Notification Bell Icon */}
            <View style={{ position: "relative" }}>
              <TouchableOpacity
                onPress={handleGoToNotification}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.white,
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Ionicons
                  name="notifications-sharp"
                  size={24}
                  color={COLORS.white}
                />
                {notiCount.count > 0 && (
                  <View style={styles.badge}>
                    <Text
                      style={[
                        styles.badgeText,
                        { fontSize: notiCount.count > 99 ? 10 : 12 },
                      ]}
                    >
                      {notiCount.count > 99 ? "99+" : notiCount.count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom Design */}
        <View style={styles.listContainer}>
          {/* Upper */}
          <View style={{ marginBottom: 15, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: fonts.Bold,
                fontSize: 20,
                color: COLORS.primary,
              }}
            >
              Laundry Pickup
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                marginTop: 5,
                gap: 15,
              }}
            >
              <View
                style={{
                  height: 80,
                  width: "45%",
                  backgroundColor: COLORS.accent,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  // Shadow Section
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "35%",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.Bold,
                      fontSize: 24,
                      color: COLORS.white,
                    }}
                  >
                    {pendingCount}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.Medium,
                      fontSize: 16,
                      color: COLORS.white,
                      marginTop: 2, // Adjust this value to reduce the gap
                    }}
                  >
                    Pending
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 80,
                  width: "45%",
                  backgroundColor: COLORS.success,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  // Shadow Section
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "35%",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.Bold,
                      fontSize: 24,
                      color: COLORS.white,
                    }}
                  >
                    {ongoingCount}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.Medium,
                      fontSize: 16,
                      color: COLORS.white,
                      marginTop: 2,
                    }}
                  >
                    Ongoing
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.divider} />
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, filter === "All" && styles.activeTab]}
              onPress={() => setFilter("All")}
            >
              <Text
                style={[
                  styles.tabText,
                  filter === "All" && styles.activeTabText,
                ]}
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
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={100}
          />
        </View>
        {/* For Pending */}
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
                <MaterialIcons
                  name="close"
                  size={24}
                  color={COLORS.secondary}
                />
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
        {/* For Ongoing */}
        <Portal>
          <BottomSheet
            ref={bottomSheetRef}
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
              <Text style={styles.headerTitle}>Ongoing Pickup</Text>
              <TouchableOpacity
                onPress={closeOngoingModal}
                style={styles.closeButton}
              >
                <MaterialIcons
                  name="close"
                  size={24}
                  color={COLORS.secondary}
                />
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
              <Text
                style={{
                  fontFamily: fonts.SemiBold,
                  fontSize: 15,
                  color: "white",
                  backgroundColor: COLORS.success,
                  borderRadius: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 2,
                  maxWidth: "50%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
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
                          Waiting for Pickup
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
              {/* Bottom Button */}
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
                    style={styles.finishButton}
                    onPress={() => handleFinishPickup(selectedService.id)}
                  >
                    <Text
                      style={{
                        fontFamily: fonts.SemiBold,
                        fontSize: 16,
                        color: COLORS.white,
                      }}
                    >
                      Finish Pickup
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BottomSheet>
        </Portal>
      </SafeAreaView>
    </LinearGradient>
  );
}

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
  },
  firstContainer: {
    padding: 16,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: 20,
    // Shadow Section
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
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
// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { fonts } from "../../constants/fonts";
// import COLORS from "../../constants/colors";
// import { FlashList } from "@shopify/flash-list";

// const mockServices = [
//   {
//     id: "1",
//     name: "Washing",
//     location: "123 Main St, City Center",
//     customerName: "John Doe",
//     requestDate: "2024-09-01T10:00:00Z",
//     distance: "7 km",
//     status: "Pending Pickup",
//   },
//   {
//     id: "2",
//     name: "Dry Cleaning",
//     location: "456 Park Ave, Downtown",
//     customerName: "Jane Smith",
//     requestDate: "2024-09-02T09:30:00Z",
//     distance: "1 km",
//     status: "Cancel",
//   },
//   {
//     id: "3",
//     name: "Ironing",
//     location: "789 Elm St, Suburbs",
//     customerName: "Alex Johnson",
//     requestDate: "2024-09-03T08:15:00Z",
//     distance: "3 km",
//     status: "Pending Pickup",
//   },
//   {
//     id: "4",
//     name: "Laundry",
//     location: "321 River St, Uptown",
//     customerName: "Emily Brown",
//     requestDate: "2024-09-04T11:45:00Z",
//     distance: "5 km",
//     status: "Pending Pickup",
//   },
//   {
//     id: "5",
//     name: "Laundry",
//     location: "321 River St, Uptown",
//     customerName: "Emily Brown",
//     requestDate: "2024-09-04T11:45:00Z",
//     distance: "5 km",
//     status: "Pending Pickup",
//   },
// ];

// export default function Delivery() {
//   const [services, setServices] = useState([]);
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     setServices(mockServices);
//   }, []);

//   // Filter services based on the selected tab
//   const filteredServices = services.filter((service) => {
//     if (filter === "All") return service.status === "Pending Pickup";
//     if (filter === "Nearest") return service.status === "Pending Pickup";
//     if (filter === "Cancel") return service.status === "Cancel";
//     return true; // Default case
//   });

//   // Sort services
//   const sortedServices = filteredServices.sort((a, b) => {
//     if (filter === "Nearest") {
//       const distanceA = parseFloat(a.distance); // Parse distance as a number
//       const distanceB = parseFloat(b.distance);
//       return distanceA - distanceB; // Sort by distance
//     } else {
//       return new Date(a.requestDate) - new Date(b.requestDate); // Sort by request date
//     }
//   });

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.itemContainer}>
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
//             <Text style={styles.customerText}>{item.customerName}</Text>
//             <Text style={styles.itemText}>{item.name}</Text>
//             <Text style={styles.locationText}>{item.location}</Text>
//           </View>
//           <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
//             <TouchableOpacity style={[styles.button, styles.messageButton]}>
//               <Ionicons
//                 name="chatbubble-outline"
//                 size={24}
//                 color={COLORS.danger}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.button, styles.acceptButton]}>
//               <Ionicons
//                 name="checkmark-circle-outline"
//                 size={24}
//                 color={COLORS.white}
//               />
//             </TouchableOpacity>
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
//                 {new Date(item.requestDate).toLocaleString()}
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

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.firstContainer}>
//         <Text style={styles.title}>Delivery Now</Text>
//       </View>
//       <View style={styles.listContainer}>
//         <View style={styles.tabContainer}>
//           <TouchableOpacity
//             style={[styles.tab, filter === "All" && styles.activeTab]}
//             onPress={() => setFilter("All")}
//           >
//             <Text
//               style={[styles.tabText, filter === "All" && styles.activeTabText]}
//             >
//               All
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.tab, filter === "Nearest" && styles.activeTab]}
//             onPress={() => setFilter("Nearest")}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 filter === "Nearest" && styles.activeTabText,
//               ]}
//             >
//               Nearest
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.tab, filter === "Cancel" && styles.activeTab]}
//             onPress={() => setFilter("Cancel")}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 filter === "Cancel" && styles.activeTabText,
//               ]}
//             >
//               Cancel
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <FlashList
//           data={sortedServices}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ paddingBottom: 60 }}
//           showsVerticalScrollIndicator={false}
//           estimatedItemSize={100}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.secondary,
//   },
//   firstContainer: {
//     padding: 16,
//   },
//   listContainer: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     padding: 20,
//     marginTop: 50,
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
//     fontSize: 18,
//     fontFamily: fonts.Bold,
//     color: COLORS.black,
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
//     backgroundColor: COLORS.lightGray,
//   },
//   acceptButton: {
//     backgroundColor: COLORS.success,
//   },
// });
