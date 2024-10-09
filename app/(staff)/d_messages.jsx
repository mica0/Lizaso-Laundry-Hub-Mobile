import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";

// Sample customer data with avatars and timestamps
const customers = [
  {
    id: "1",
    name: "John Doe",
    latestMessage: "Hello, I have a question about my order.",
    avatar: "https://via.placeholder.com/40", // Placeholder avatar
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    name: "Jane Smith",
    latestMessage: "When will my laundry be delivered?",
    avatar: "https://via.placeholder.com/40", // Placeholder avatar
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    name: "Alice Johnson",
    latestMessage: "Thank you for the quick delivery!",
    avatar: "https://via.placeholder.com/40", // Placeholder avatar
    timestamp: "10:35 AM",
  },
  {
    id: "4",
    name: "John Doe",
    latestMessage: "Hello, I have a question about my order.",
    avatar: "https://via.placeholder.com/40", // Placeholder avatar
    timestamp: "10:30 AM",
  },
  {
    id: "5",
    name: "Jane Smith",
    latestMessage: "When will my laundry be delivered?",
    avatar: "https://via.placeholder.com/40", // Placeholder avatar
    timestamp: "10:32 AM",
  },
  {
    id: "6",
    name: "Alice Johnson",
    latestMessage: "Thank you for the quick delivery!",
    avatar: "https://via.placeholder.com/40", // Placeholder avatar
    timestamp: "10:35 AM",
  },
];

export default function D_messages({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  // Search handler function
  const handleSearch = (text) => {
    setSearchQuery(text);

    // Filter customers based on search query
    const filteredData = customers.filter((customer) =>
      customer.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCustomers(filteredData);
  };

  const handleCustomerSelect = (customer) => {
    // Navigate to the detailed chat view for the selected customer
    navigation.navigate("Chat", {
      customerId: customer.id,
      customerName: customer.name,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Customer Messages</Text>

      {/* Search input field */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search customers..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Display filtered customers */}
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.customerContainer}
            onPress={() => handleCustomerSelect(item)}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.messageContainer}>
              <Text style={styles.customerName}>{item.name}</Text>
              <Text style={styles.latestMessage}>{item.latestMessage}</Text>
            </View>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.customerList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontFamily: fonts.Regular,
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    fontFamily: fonts.Regular,
    backgroundColor: COLORS.white,
  },
  customerList: {
    flexGrow: 1,
  },
  customerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  latestMessage: {
    fontSize: 14,
    color: COLORS.grey,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.grey,
    marginLeft: 8,
    textAlign: "right",
  },
});
