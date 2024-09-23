import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../constants/fonts";
import COLORS from "../../constants/colors";

const mockServices = [
  {
    id: "1",
    name: "Washing",
    location: "123 Main St, City Center",
    customerName: "John Doe",
    requestDate: "2024-09-01",
    status: "Pending",
  },
  {
    id: "2",
    name: "Dry Cleaning",
    location: "456 Park Ave, Downtown",
    customerName: "Jane Smith",
    requestDate: "2024-09-02",
    status: "Completed",
  },
  {
    id: "3",
    name: "Ironing",
    location: "789 Elm St, Suburbs",
    customerName: "Alex Johnson",
    requestDate: "2024-09-03",
    status: "In Progress",
  },
];

export default function Pickup() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(mockServices);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        {/* Customer Name */}
        <Text style={styles.customerText}>{item.customerName}</Text>
        {/* Service Name */}
        <Text style={styles.itemText}>{item.name}</Text>
        {/* Location */}
        <Text style={styles.locationText}>{item.location}</Text>
        {/* Divider */}
        <View style={styles.divider} />
        {/* Date and Status Row */}
        <View style={styles.rowBetween}>
          <View style={styles.requestStatusContainer}>
            <Text style={styles.labelText}>Requested:</Text>
            <View style={styles.dateContainer}>
              <Ionicons
                name="calendar-outline"
                size={18}
                color={COLORS.secondary}
                style={{ paddingRight: 5 }}
              />
              <Text style={styles.dateText}>{item.requestDate}</Text>
            </View>
          </View>
          <View style={styles.requestStatusContainer}>
            <Text style={styles.labelText}>Status:</Text>
            <View style={styles.statusContainer}>
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color={COLORS.success}
                style={{ paddingRight: 2 }}
              />
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstContainer}>
        <Text style={styles.title}>Pickup Orders</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  firstContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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
    width: "100%", // Ensure the item container takes full width
  },
  itemDetails: {
    flexDirection: "column",
    width: "100%", // Ensure full width for the item details
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between", // Align left and right
    marginTop: 8, // Space between the divider and the date/status row
  },
  customerText: {
    fontSize: 18,
    fontFamily: fonts.Bold,
    color: COLORS.black,
    marginBottom: 2,
  },
  itemText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: COLORS.primary,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 16,
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
    flexDirection: "column", // Stack label above the date/status
    alignItems: "flex-start", // Align items to the left
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
    color: COLORS.primary, // Lighter color for the labels
  },
  dateText: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: COLORS.black,
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: COLORS.primary, // Assuming primary color is set
  },
});
