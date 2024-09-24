import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fonts } from "../../constants/fonts";
import COLORS from "../../constants/colors";
import { FlashList } from "@shopify/flash-list";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { Portal } from "@gorhom/portal";

const mockServices = [
  {
    id: "1",
    name: "Washing",
    location: "123 Main St, City Center",
    customerName: "John Doe",
    requestDate: "2024-09-01T10:00:00Z",
    distance: "7 km",
    status: "Pending Pickup",
  },
  {
    id: "2",
    name: "Dry Cleaning",
    location: "456 Park Ave, Downtown",
    customerName: "Jane Smith",
    requestDate: "2024-09-02T09:30:00Z",
    distance: "1 km",
    status: "Cancel",
  },
  {
    id: "3",
    name: "Ironing",
    location: "789 Elm St, Suburbs",
    customerName: "Alex Johnson",
    requestDate: "2024-09-03T08:15:00Z",
    distance: "3 km",
    status: "Pending Pickup",
  },
  {
    id: "4",
    name: "Laundry",
    location: "321 River St, Uptown",
    customerName: "John Reynald Velarde",
    requestDate: "2024-09-04T12:45:00Z",
    distance: "5 km",
    status: "Ongoing Pickup",
  },
  {
    id: "5",
    name: "Laundry",
    location: "321 River St, Uptown",
    customerName: "Emily Brown",
    requestDate: "2024-09-04T11:45:00Z",
    distance: "5 km",
    status: "Ongoing Pickup",
  },
];
const pendingOrdersCount = mockServices.filter(
  (service) => service.status === "Pending Pickup"
).length;

const AnimatedIcon = () => {
  const rotation = useSharedValue(0);

  // Define the animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // Start the rotation animation
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
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("All");

  const bottomSheetRef = useRef(null);
  const bottomPendingSheet = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);
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

  const closePendingModal = () => {
    bottomPendingSheet.current?.close();
  };

  const openOngoingModal = (service) => {
    setSelectedService(service);
    bottomSheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    bottomSheetRef.current?.close();
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
    // For the "All" tab, prioritize "Ongoing Pickup"
    if (filter === "All") {
      if (a.status === "Ongoing Pickup" && b.status !== "Ongoing Pickup") {
        return -1; // a comes first
      }
      if (a.status !== "Ongoing Pickup" && b.status === "Ongoing Pickup") {
        return 1; // b comes first
      }
      // If both are either "Pending Pickup" or the same status, sort by request date
      return new Date(a.requestDate) - new Date(b.requestDate);
    }

    // For the "Nearest" tab, sort by distance
    if (filter === "Nearest") {
      const distanceA = parseFloat(a.distance);
      const distanceB = parseFloat(b.distance);
      return distanceA - distanceB; // Sort by distance
    }

    // Default sorting by request date
    return new Date(a.requestDate) - new Date(b.requestDate);
  });

  const renderItem = ({ item }) => {
    let iconName;
    let backgroundColor;
    let iconComponent;
    let statusText;

    if (item.status === "Pending Pickup") {
      iconName = "time-outline";
      backgroundColor = COLORS.secondary;
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
              {item.status !== "Cancel" && (
                <TouchableOpacity style={[styles.button, styles.messageButton]}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color={COLORS.danger}
                  />
                </TouchableOpacity>
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
    <SafeAreaView style={styles.container}>
      {/* Upper Design */}
      <View style={{ marginBottom: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: COLORS.white }}>
          Pickup Orders
        </Text>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#FF6F61", // Example color
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            {pendingOrdersCount}
          </Text>
        </View>
        <Text style={{ fontSize: 16, color: "white" }}>Pending</Text>
      </View>

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
          <View style={styles.contentContainer}>
            {selectedService && (
              <>
                <Text style={styles.modalTitle}>{selectedService.name}</Text>
                <Text style={styles.modalText}>
                  Customer: {selectedService.customerName}
                </Text>
                <Text style={styles.modalText}>
                  Location: {selectedService.location}
                </Text>
                <Text style={styles.modalText}>
                  Request Date:{" "}
                  {new Date(selectedService.requestDate).toLocaleString()}
                </Text>
                <Text style={styles.modalText}>
                  Distance: {selectedService.distance}
                </Text>
                <Text style={styles.modalText}>
                  Status: {selectedService.status}
                </Text>
              </>
            )}

            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={styles.finishButton}
                onPress={closePendingModal}
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
        </BottomSheet>
      </Portal>
      {/* For Ongoing */}
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: COLORS.white }}
          handleIndicatorStyle={{ backgroundColor: COLORS.primary }}
          backdropComponent={renderBackdrop}
        >
          <View style={styles.contentContainer}>
            {selectedService && (
              <>
                <Text style={styles.modalTitle}>{selectedService.name}</Text>
                <Text style={styles.modalText}>
                  Customer: {selectedService.customerName}
                </Text>
                <Text style={styles.modalText}>
                  Location: {selectedService.location}
                </Text>
                <Text style={styles.modalText}>
                  Request Date:{" "}
                  {new Date(selectedService.requestDate).toLocaleString()}
                </Text>
                <Text style={styles.modalText}>
                  Distance: {selectedService.distance}
                </Text>
                <Text style={styles.modalText}>
                  Status: {selectedService.status}
                </Text>
              </>
            )}

            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={styles.finishButton}
                onPress={handleCloseSheet}
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
        </BottomSheet>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
  },
  modalText: {
    fontSize: 16,
  },
  finishButton: {
    padding: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  firstContainer: {
    padding: 16,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    marginTop: 50,
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
    backgroundColor: COLORS.lightGray,
  },
  acceptButton: {
    backgroundColor: COLORS.pending,
  },
});

{
  /* <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: COLORS.white }}
          handleIndicatorStyle={{ backgroundColor: COLORS.primary }}
          backdropComponent={renderBackdrop}
        >
          <View style={styles.contentContainer}>
            {selectedService && (
              <>
                <Text style={styles.modalTitle}>{selectedService.name}</Text>
                <Text style={styles.modalText}>
                  Customer: {selectedService.customerName}
                </Text>
                <Text style={styles.modalText}>
                  Location: {selectedService.location}
                </Text>
                <Text style={styles.modalText}>
                  Request Date:{" "}
                  {new Date(selectedService.requestDate).toLocaleString()}
                </Text>
                <Text style={styles.modalText}>
                  Distance: {selectedService.distance}
                </Text>
                <Text style={styles.modalText}>
                  Status: {selectedService.status}
                </Text>
              </>
            )}
          </View>
        </BottomSheet> */
}

{
  /* <LinearGradient
colors={["#5787C8", "#71C7DA"]}
start={{ x: 0, y: 0 }}
end={{ x: 1, y: 0 }}
style={{ flex: 1 }}
>
<SafeAreaView style={styles.container}>
  <View style={{ marginBottom: 1, alignItems: "center" }}>
    <Text
      style={{ fontSize: 24, fontWeight: "bold", color: COLORS.white }}
    >
      Pickup Orders
    </Text>
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FF6F61", // Example color
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
      }}
    >
      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        {pendingOrdersCount}
      </Text>
    </View>
    <Text style={{ fontSize: 16, color: "white" }}>Pending</Text>
  </View>

  <View style={styles.listContainer}>
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
</SafeAreaView>
</LinearGradient> */
}
