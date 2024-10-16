import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { LinearGradient } from "expo-linear-gradient";
import qrcode from "../../assets/images/qrcode.png";

import OrderItem from "../../components/customer/OrderItem";

export default function Track() {
  const [orders, setOrders] = useState([
    {
      id: 63,
      tracking_code: "#293BFDFF6FE14FF2AE41",
      customerName: "Jane Smith",
      pickupDate: "2024-10-14",
      deliveryDate: "2024-10-15",
      totalPrice: "40.00",
      request_status: "Pending Pickup",
      service_name: "Wash",
      service_default_price: "60:00",
      user_id: 6,
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
  ]);

  const renderOrderItem = ({ item, index }) => (
    <OrderItem item={item} index={index} />
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
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
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
});
