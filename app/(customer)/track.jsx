import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { LinearGradient } from "expo-linear-gradient";
import Collapsible from "react-native-collapsible";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import qrcode from "../../assets/images/qrcode.png";
import { Portal } from "@gorhom/portal";

// Sample data with multiple orders
const orders = [
  {
    orderId: "#293BFDFF6FE14FF2AE41",
    customerName: "Jane Smith",
    pickupDate: "2024-10-14",
    deliveryDate: "2024-10-15",
    totalPrice: "40.00",
    request_status: "Pending Pickup",
    service_name: "Wash",
    service_default_price: "60:00",
    user_name: "Juan Tamad",
    progress: [
      {
        stage: "Pending Pickup",
        description: "Pickup requested; staff on the way.",
        status_date: "2024-10-14 09:00 AM",
        completed: true,
        falseDescription:
          "Pickup request received; waiting for staff assignment.",
      },
      {
        stage: "Ongoing Pickup",
        description: "Pickup requested; staff on the way.",
        status_date: "2024-10-14 09:00 AM",
        completed: false,
        falseDescription:
          "Pickup request received; waiting for staff assignment.",
      },
      {
        stage: "Completed Delivery",
        description: "Delivered and payment confirmed.",
        status_date: "2024-10-15 05:00 PM",
        completed: false,
        falseDescription: "Delivery has not been completed.",
      },
    ],
  },
  {
    orderId: "#293BFDFF6FE14FF2AE412",
    customerName: "Jane Smith",
    pickupDate: "2024-10-14",
    deliveryDate: "2024-10-15",
    totalPrice: "40.00",
    request_status: "Pending Pickup",
    service_name: "Wash",
    service_default_price: "60:00",
    user_name: "Juan Tamad",
    progress: [
      {
        stage: "Pending Pickup",
        description: "Pickup requested; staff on the way.",
        status_date: "2024-10-14 09:00 AM",
        completed: true,
        falseDescription:
          "Pickup request received; waiting for staff assignment.",
      },
      {
        stage: "Ongoing Pickup",
        description: "Pickup requested; staff on the way.",
        status_date: "2024-10-14 09:00 AM",
        completed: false,
        falseDescription:
          "Pickup request received; waiting for staff assignment.",
      },
      {
        stage: "Completed Delivery",
        description: "Delivered and payment confirmed.",
        status_date: "2024-10-15 05:00 PM",
        completed: false,
        falseDescription: "Delivery has not been completed.",
      },
    ],
  },
];

export default function Track() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQRCode, setSelectedQRCode] = useState(null);
  const [collapsedStates, setCollapsedStates] = useState(
    orders.map(() => true)
  );

  // Method to handle QR code enlargement
  const enlargeQRCode = (qrCode) => {
    setSelectedQRCode(qrCode); // Store the selected QR code
    setModalVisible(true); // Show the modal
  };

  // Method to close the modal
  const closeModal = () => {
    setModalVisible(false); // Hide the modal
    setSelectedQRCode(null); // Reset the selected QR code
  };

  // Toggle collapsibility for each order's progress
  const toggleCollapsible = (index) => {
    const newStates = [...collapsedStates];
    newStates[index] = !newStates[index];
    setCollapsedStates(newStates);
  };

  const renderOrderItem = ({ item, index }) => (
    <View style={styles.orderContainer}>
      {/* Order Details Section */}
      <View style={styles.orderDetailsContainer}>
        {/* <Text style={styles.title}>Order Details</Text> */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.orderTrackTitle}>Tracking Number:</Text>
            <Text style={styles.orderTrackNumber}>{item.orderId}</Text>
            <Text style={styles.orderInfo}>
              Status:{" "}
              <Text
                style={{
                  fontFamily: fonts.Bold,
                  color:
                    item.request_status === "Pending Pickup"
                      ? COLORS.accent
                      : item.request_status === "Ongoing Pickup"
                      ? COLORS.success
                      : item.request_status === "Completed Pickup"
                      ? COLORS.secondary
                      : "#6C757D",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                }}
              >
                {item.request_status}
              </Text>
            </Text>
            <Text style={styles.orderInfo}>
              Selected Service:{" "}
              <Text
                style={{
                  fontFamily: fonts.Bold,
                  color: COLORS.secondary,
                }}
              >
                {item.service_name}
              </Text>
            </Text>
            <Text style={styles.orderInfo}>
              Base Price:{" "}
              <Text
                style={{
                  fontFamily: fonts.Bold,
                  color: COLORS.secondary,
                }}
              >
                {item.service_default_price}
              </Text>
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.qrCodeContainer}
              onPress={() => enlargeQRCode(qrcode)} // Use the static QR code image
            >
              <Image
                source={qrcode} // Display the static QR code image
                style={styles.qrCodeImage}
                resizeMode="contain"
              />
              <Text style={styles.tapToEnlarge}>Tap to Enlarge</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />
        <View style={{ flexDirection: "column" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.orderInfo}>
              Pickup or Delivery Staff:{" "}
              <Text
                style={{
                  fontFamily: fonts.Bold,
                  color: COLORS.secondary,
                }}
              >
                {item.user_name}
              </Text>
            </Text>
            <Text style={styles.orderInfo}>
              Total Amount:{" "}
              <Text
                style={{
                  fontFamily: fonts.Bold,
                  color: COLORS.secondary,
                }}
              >
                ₱{item.totalPrice}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={styles.compeletePaymentButton}>
              <Text style={styles.paymentText}>Pay Now</Text>
            </TouchableOpacity>

            {/* Message Button with Icon and Badge */}
            <View style={styles.iconWithBadge}>
              <TouchableOpacity style={styles.messageButton}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Collapsible Button inside the floating box */}
        <TouchableOpacity
          onPress={() => toggleCollapsible(index)}
          style={styles.collapsibleButton}
        >
          <Text style={styles.collapsibleText}>
            {collapsedStates[index]
              ? "Show Track Progress"
              : "Hide Track Progress"}
          </Text>
        </TouchableOpacity>

        {/* Collapsible Content */}
        <Collapsible collapsed={collapsedStates[index]}>
          <View style={styles.progressContainer}>
            {item.progress.map((stage, stageIndex) => (
              <View key={stageIndex} style={styles.progressStep}>
                {/* The circle icon with the connecting line */}
                <View style={styles.iconContainer}>
                  <AntDesign
                    name={stage.completed ? "checkcircle" : "closecircle"}
                    size={24}
                    color={stage.completed ? COLORS.secondary : COLORS.border}
                    style={styles.icon}
                  />

                  {stageIndex < item.progress.length - 1 && (
                    <View
                      style={[
                        styles.verticalLine,
                        stage.completed
                          ? { backgroundColor: COLORS.secondary }
                          : { backgroundColor: COLORS.border },
                      ]}
                    />
                  )}
                </View>

                {/* Progress details */}
                <View style={styles.progressItem}>
                  <Text style={styles.stageTitle}>{stage.stage}</Text>
                  <Text style={styles.description}>
                    {stage.completed
                      ? stage.description
                      : stage.falseDescription}
                  </Text>
                  {stage.completed && stage.status_date && (
                    <Text style={styles.dateText}>
                      Completed on: {stage.status_date}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </Collapsible>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#5787C8", "#71C7DA"]}
      locations={[0, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.5, y: 0 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {/* Title for Laundry Items */}
        <View style={styles.carouselContainer}>
          <Text style={styles.carouselTitle}>Track Your Laundry Order</Text>
        </View>

        {/* FlatList to display multiple orders */}
        <View style={styles.bottomContainer}>
          <View style={styles.listContainer}>
            <FlatList
              data={orders}
              renderItem={renderOrderItem}
              keyExtractor={(item) => item.orderId}
              contentContainerStyle={{ paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Modal for Enlarged QR Code */}
        {selectedQRCode && (
          <Portal>
            <View style={styles.overlayContainer}>
              <TouchableOpacity
                onPress={closeModal}
                style={styles.overlayBackground}
              >
                <Image
                  source={qrcode}
                  style={styles.enlargedQRCode}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </Portal>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselTitle: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: fonts.Bold,
    color: COLORS.white,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    flex: 1,
    marginBottom: 40,
  },
  orderContainer: {
    padding: 10,
  },
  orderDetailsContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.Bold,
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  orderInfo: {
    fontSize: 14,
    fontFamily: fonts.SemiBold,
    color: COLORS.primary,
    marginBottom: 5,
  },
  orderTrackTitle: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: COLORS.primary,
  },
  orderTrackNumber: {
    fontSize: 16,
    fontFamily: fonts.Bold,
    color: COLORS.text3,
    marginBottom: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 15,
  },
  compeletePaymentButton: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: "center",
  },
  paymentText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: fonts.SemiBold,
  },
  messageButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  iconWithBadge: {
    position: "relative",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  collapsibleButton: {
    padding: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  collapsibleText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: fonts.SemiBold,
  },
  progressContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  progressStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    position: "relative",
  },
  iconContainer: {
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  icon: {
    marginBottom: 5,
  },
  verticalLine: {
    width: 2,
    height: "100%",
    position: "absolute",
    top: 22,
    zIndex: 0,
  },
  progressItem: {
    marginLeft: 15,
    flex: 1,
  },
  stageTitle: {
    fontSize: 16,
    fontFamily: fonts.Bold,
    color: COLORS.primary,
  },
  description: {
    fontSize: 12,
    fontFamily: fonts.Medium,
    color: COLORS.primary,
  },
  dateText: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: "#6C757D",
  },

  // qr image
  qrCodeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  qrCodeImage: {
    width: 100,
    height: 100,
  },
  tapToEnlarge: {
    fontSize: 12,
    color: "#6C757D",
    marginTop: 5,
  },

  // Tap qr image
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    backgroundColor: COLORS.white,
  },
  overlayBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  enlargedQRCode: {
    width: 300,
    height: 300,
  },
});
