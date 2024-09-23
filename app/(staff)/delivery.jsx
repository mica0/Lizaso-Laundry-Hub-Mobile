import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../constants/fonts";
import COLORS from "../../constants/colors";
import { FlashList } from "@shopify/flash-list";

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
    customerName: "Emily Brown",
    requestDate: "2024-09-04T11:45:00Z",
    distance: "5 km",
    status: "Pending Pickup",
  },
  {
    id: "5",
    name: "Laundry",
    location: "321 River St, Uptown",
    customerName: "Emily Brown",
    requestDate: "2024-09-04T11:45:00Z",
    distance: "5 km",
    status: "Pending Pickup",
  },
];

export default function Delivery() {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setServices(mockServices);
  }, []);

  // Filter services based on the selected tab
  const filteredServices = services.filter((service) => {
    if (filter === "All") return service.status === "Pending Pickup";
    if (filter === "Nearest") return service.status === "Pending Pickup";
    if (filter === "Cancel") return service.status === "Cancel";
    return true; // Default case
  });

  // Sort services
  const sortedServices = filteredServices.sort((a, b) => {
    if (filter === "Nearest") {
      const distanceA = parseFloat(a.distance); // Parse distance as a number
      const distanceB = parseFloat(b.distance);
      return distanceA - distanceB; // Sort by distance
    } else {
      return new Date(a.requestDate) - new Date(b.requestDate); // Sort by request date
    }
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <TouchableOpacity style={[styles.button, styles.messageButton]}>
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color={COLORS.danger}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.acceptButton]}>
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color={COLORS.white}
              />
            </TouchableOpacity>
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstContainer}>
        <Text style={styles.title}>Delivery Now</Text>
      </View>
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
    fontSize: 18,
    fontFamily: fonts.Bold,
    color: COLORS.black,
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
    backgroundColor: COLORS.success,
  },
});

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Button,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { fonts } from "../../constants/fonts";
// import COLORS from "../../constants/colors";

// const mockServices = [
//   {
//     id: "1",
//     name: "Washing",
//     location: "123 Main St, City Center",
//     customerName: "John Doe",
//     requestDate: formatDate("2024-09-01"),
//     distance: "7 km",
//   },
//   {
//     id: "2",
//     name: "Dry Cleaning",
//     location: "456 Park Ave, Downtown",
//     customerName: "Jane Smith",
//     requestDate: formatDate("2024-09-02"),
//     distance: "1 km",
//   },
//   {
//     id: "3",
//     name: "Ironing",
//     location: "789 Elm St, Suburbs",
//     customerName: "Alex Johnson",
//     requestDate: formatDate("2024-09-03"),
//     distance: "3 km",
//   },
// ];

// // Function to format date
// function formatDate(dateString) {
//   const options = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   const date = new Date(dateString);
//   return date.toLocaleString(undefined, options); // Adjust locale as needed
// }

// export default function Pickup() {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     setServices(mockServices);
//   }, []);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.itemContainer}>
//       <View style={styles.itemDetails}>
//         {/* First Row */}
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flex: 1,
//           }}
//         >
//           <View style={{ flex: 1 }}>
//             <Text style={styles.customerText}>{item.customerName}</Text>
//             <Text style={styles.itemText}>{item.name}</Text>
//             <Text style={styles.locationText}>{item.location}</Text>
//           </View>
//           <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
//             <TouchableOpacity style={[styles.button, styles.messageButton]}>
//               <Ionicons
//                 name="chatbubble-outline"
//                 size={24}
//                 color={COLORS.danger}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.button, styles.acceptButton]}>
//               <Ionicons
//                 name="checkmark-circle-outline"
//                 size={24}
//                 color={COLORS.white} // Set to white for contrast
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//         {/* Divider */}
//         <View style={styles.divider} />

//         {/*Second Row */}
//         <View style={styles.rowBetween}>
//           {/* Requested Date */}
//           <View style={styles.requestStatusContainer}>
//             <Text style={styles.labelText}>Request Date</Text>
//             <View style={styles.dateContainer}>
//               <Ionicons
//                 name="calendar-outline"
//                 size={18}
//                 color={COLORS.secondary}
//                 style={{ paddingRight: 5 }}
//               />
//               <Text style={styles.dateText}>{item.requestDate}</Text>
//             </View>
//           </View>
//           {/* Status */}
//           <View style={styles.requestStatusContainer}>
//             <Text style={styles.labelText}>Distance</Text>
//             <View style={styles.statusContainer}>
//               <Ionicons
//                 name="location-outline"
//                 size={18}
//                 color={COLORS.success}
//                 style={{ paddingRight: 2 }}
//               />
//               <Text style={styles.statusText}>{item.distance}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.firstContainer}>
//         <Text style={styles.title}>Pickup Orders</Text>
//       </View>
//       <View style={styles.listContainer}>
//         <FlatList
//           data={services}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   firstContainer: {
//     padding: 16,
//     backgroundColor: "#f5f5f5",
//   },
//   listContainer: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontFamily: fonts.Bold,
//     marginBottom: 16,
//     color: "#333",
//   },
//   itemContainer: {
//     padding: 18,
//     backgroundColor: COLORS.white,
//     marginBottom: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     width: "100%", // Ensure the item container takes full width
//   },
//   itemDetails: {
//     flexDirection: "column",
//     width: "100%", // Ensure full width for the item details
//   },
//   rowBetween: {
//     flexDirection: "row",
//     justifyContent: "space-between", // Align left and right
//     marginTop: 8, // Space between the divider and the date/status row
//   },
//   customerText: {
//     fontSize: 18,
//     fontFamily: fonts.Bold,
//     color: COLORS.black,
//     marginBottom: 2,
//   },
//   itemText: {
//     fontSize: 12,
//     fontFamily: fonts.Medium,
//     color: COLORS.primary,
//     marginBottom: 2,
//   },
//   locationText: {
//     fontSize: 14,
//     fontFamily: fonts.SemiBold,
//     color: COLORS.secondary,
//     marginBottom: 8,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#ddd",
//     marginBottom: 5,
//     width: "100%",
//   },
//   requestStatusContainer: {
//     flexDirection: "column", // Stack label above the date/status
//     alignItems: "flex-start", // Align items to the left
//   },
//   dateContainer: {
//     flexDirection: "row",
//   },
//   statusContainer: {
//     flexDirection: "row",
//   },
//   labelText: {
//     fontSize: 12,
//     fontFamily: fonts.SemiBold,
//     color: COLORS.primary, // Lighter color for the labels
//   },
//   dateText: {
//     fontSize: 12,
//     fontFamily: fonts.Regular,
//     color: COLORS.black,
//   },
//   statusText: {
//     fontSize: 12,
//     fontFamily: fonts.Regular,
//     color: COLORS.primary, // Assuming primary color is set
//   },
//   button: {
//     width: 40, // Set a fixed width
//     height: 40, // Set a fixed height
//     justifyContent: "center", // Center the icon
//     alignItems: "center", // Center the icon
//     borderRadius: 5, // Rounded corners
//   },
//   messageButton: {
//     borderWidth: 1,
//     borderColor: COLORS.primary, // Use the danger color for the border
//   },
//   acceptButton: {
//     backgroundColor: COLORS.success, // Fill color for accept button
//   },
// });
