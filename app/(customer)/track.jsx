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
import { AntDesign } from "@expo/vector-icons";
import qrcode from "../../assets/images/qrcode.png";
import { Portal } from "@gorhom/portal";

// Sample data with multiple orders
const orders = [
  {
    orderId: "#293BFDFF6FE14FF2AE41",
    customerName: "Jane Smith",
    pickupDate: "2024-10-14",
    deliveryDate: "2024-10-15",
    totalPrice: "$40.00",
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
                {item.totalPrice}
              </Text>
            </Text>
          </View>
          {/* Collapsible Button inside the floating box */}
          <TouchableOpacity style={styles.compeletePaymentButton}>
            <Text style={styles.collapsibleText}>Pay Now</Text>
          </TouchableOpacity>
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
        {/* FlatList to display multiple orders */}
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.orderId}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </SafeAreaView>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderContainer: {
    padding: 10,
  },
  orderDetailsContainer: {
    padding: 20,
    backgroundColor: COLORS.background,
    borderRadius: 10,
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
  collapsibleButton: {
    padding: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: "center",
  },
  compeletePaymentButton: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: "center",
  },
  collapsibleText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: fonts.SemiBold,
  },
  progressContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  progressStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
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
    top: 30,
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
