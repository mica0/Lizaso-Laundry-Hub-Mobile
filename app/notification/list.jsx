import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../constants/fonts";

// Sample notifications data
const initialNotifications = [
  {
    id: "1",
    message: "Your laundry is ready for pickup",
    time: "2 hours ago",
    icon: "checkmark-circle-outline", // Notification icon (Ionicons)
  },
  {
    id: "2",
    message: "New promotion: 20% off for new customers!",
    time: "1 day ago",
    icon: "pricetag-outline",
  },
  {
    id: "3",
    message: "Reminder: Your laundry will be picked up tomorrow",
    time: "2 days ago",
    icon: "time-outline",
  },
];

export default function Notification() {
  const route = useRoute();
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(initialNotifications);

  // Clear the notification list
  const clearNotifications = () => {
    setNotifications([]);
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity onPress={() => console.log("Notification clicked!")}>
      <View style={styles.notificationItem}>
        {/* Left Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={32} color={COLORS.primary} />
        </View>

        {/* Message and Time */}
        <View style={styles.textContainer}>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle}>Notification</Text>

        {/* Clear List Button on the Right */}
        <TouchableOpacity
          onPress={clearNotifications}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationList}
        />
      ) : (
        <View style={styles.noNotifications}>
          <Text style={styles.noNotificationsText}>No notifications</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Align items to the ends
    paddingTop: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    width: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.Bold,
    color: COLORS.primary,
    textAlign: "center",
    flex: 1,
  },
  clearButton: {
    width: 60, // Button width
    alignItems: "flex-end", // Align text to the right edge
  },
  clearButtonText: {
    color: COLORS.secondary,
    fontFamily: fonts.Medium,
    fontSize: 14,
  },
  notificationList: {
    paddingVertical: 20,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
    alignItems: "center",
    borderWidth: 1, // Add border for the outline
    borderColor: COLORS.border1, // Light gray color for the outline
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: COLORS.primary,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: COLORS.primary,
    marginTop: 5,
  },
  noNotifications: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noNotificationsText: {
    fontSize: 16,
    color: COLORS.gray,
    fontFamily: fonts.Regular,
  },
});
