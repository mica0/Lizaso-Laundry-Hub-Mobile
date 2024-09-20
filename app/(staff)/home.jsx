import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Popup from "../../components/Popup"; // Ensure the path is correct
import { fonts } from "../../constants/fonts";

const mockServices = [
  { id: "1", name: "Washing" },
  { id: "2", name: "Dry Cleaning" },
  { id: "3", name: "Ironing" },
  { id: "4", name: "Fold Laundry" },
  { id: "5", name: "Pickup & Delivery" },
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    setServices(mockServices);
  }, []);

  const handlePress = (service) => {
    setSelectedService(service);
    setPopupVisible(true);
  };

  const handleClose = () => {
    setPopupVisible(false);
    setSelectedService(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePress(item.name)}
      style={styles.itemContainer}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Laundry Services</Text>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Popup
        visible={popupVisible}
        onClose={handleClose}
        service={selectedService}
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
  title: {
    fontSize: 40,
    fontFamily: fonts.Regular,
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    fontFamily: fonts.Regular,
  },
});
