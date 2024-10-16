import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Collapsible from "react-native-collapsible";
import { Portal } from "@gorhom/portal";
import { fonts } from "../../constants/fonts";
import COLORS from "../../constants/colors";
import qrcode from "../../assets/images/qrcode.png";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function OrderItem({ item, index }) {
  const navigaton = useNavigation();
  const [collapsedStates, setCollapsedStates] = useState(
    item.progress.map(() => true)
  );
  const toggleCollapsible = (index) => {
    const newStates = [...collapsedStates];
    newStates[index] = !newStates[index];
    setCollapsedStates(newStates);
  };

  // Going to message page
  const handleGoToMessage = async (id, name) => {
    navigaton.navigate("message/chat", {
      customerId: id,
      fullname: name,
    });
  };

  // Going to message page
  const handleGoToPayNow = async (id) => {
    navigaton.navigate("pay/payment", {
      service_id: id,
    });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQRCode, setSelectedQRCode] = useState(null);

  const enlargeQRCode = (qrCode) => {
    setSelectedQRCode(qrCode);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedQRCode(null);
  };
  return (
    <View style={styles.orderContainer}>
      <View style={styles.orderDetailsContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.orderTrackTitle}>Tracking Number:</Text>
            <Text style={styles.orderTrackNumber}>{item.tracking_code}</Text>
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
              onPress={() => enlargeQRCode(qrcode)}
            >
              <Image
                source={qrcode}
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
            <TouchableOpacity
              style={styles.compeletePaymentButton}
              onPress={() => handleGoToPayNow(item.id)}
            >
              <Text style={styles.paymentText}>Pay Now</Text>
            </TouchableOpacity>

            {/* Message Button with Icon and Badge */}
            <View style={styles.iconWithBadge}>
              <TouchableOpacity
                style={styles.messageButton}
                onPress={() => handleGoToMessage(item.user_id, item.user_name)}
              >
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
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.error,
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
