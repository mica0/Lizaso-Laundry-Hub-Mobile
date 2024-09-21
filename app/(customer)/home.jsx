import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Popup from "../../components/Popup"; // Ensure the path is correct
import { fonts } from "../../constants/fonts";
import { MaterialIcons } from "@expo/vector-icons";

const mockServices = [
  { id: "1", name: "Washing", icon: "local-laundry-service" },
  { id: "2", name: "Dry Cleaning", icon: "dry-cleaning" },
  { id: "3", name: "Ironing", icon: "iron" },
  { id: "4", name: "Fold Laundry", icon: "folder" },
  { id: "5", name: "Pickup & Delivery", icon: "local-shipping" },
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    setLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        setServices(mockServices);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError("Failed to load services");
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchServices();
    setRefreshing(false);
  };

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
      <View style={styles.iconTextContainer}>
        <MaterialIcons name={item.icon} size={30} color="#4690FF" />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4690FF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Laundry Services</Text>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : services.length === 0 ? (
        <Text style={styles.emptyText}>No services available</Text>
      ) : (
        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

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
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 34,
    fontFamily: fonts.Bold,
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  itemContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 20,
    fontFamily: fonts.Medium,
    marginLeft: 16,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Popup from "../../components/Popup"; // Ensure the path is correct
// import { fonts } from "../../constants/fonts";

// const mockServices = [
//   { id: "1", name: "Washing" },
//   { id: "2", name: "Dry Cleaning" },
//   { id: "3", name: "Ironing" },
//   { id: "4", name: "Fold Laundry" },
//   { id: "5", name: "Pickup & Delivery" },
// ];

// export default function Home() {
//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState(null);
//   const [popupVisible, setPopupVisible] = useState(false);

//   useEffect(() => {
//     setServices(mockServices);
//   }, []);

//   const handlePress = (service) => {
//     setSelectedService(service);
//     setPopupVisible(true);
//   };

//   const handleClose = () => {
//     setPopupVisible(false);
//     setSelectedService(null);
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => handlePress(item.name)}
//       style={styles.itemContainer}
//     >
//       <Text style={styles.itemText}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Laundry Services</Text>
//       <FlatList
//         data={services}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//       />
//       <Popup
//         visible={popupVisible}
//         onClose={handleClose}
//         service={selectedService}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 40,
//     fontFamily: fonts.Regular,
//     marginBottom: 16,
//   },
//   itemContainer: {
//     padding: 16,
//     backgroundColor: "#fff",
//     marginBottom: 8,
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   itemText: {
//     fontSize: 18,
//     fontFamily: fonts.Regular,
//   },
// });
