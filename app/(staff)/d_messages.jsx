import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { formatDate, truncateMessage } from "../../constants/method";
import d_profile from "../../assets/images/d_profile1.png";
import { useNavigation } from "expo-router";
import noconvo from "../../assets/images/start_convo.png";

const customers = [
  {
    id: "1",
    name: "John Doe",
    latestMessage: "Hello, I have a question about my order.",
    avatar: "",
    isRead: 0,
    date_send: "2024-10-09 09:30:00",
  },
  {
    id: "2",
    name: "Jane Smith",
    latestMessage: "When will my laundry be delivered?",
    avatar: "",
    isRead: 1,
    date_send: "2024-10-07 09:32:00",
  },
  {
    id: "3",
    name: "Alice Johnson",
    latestMessage: "Thank you for the quick delivery!",
    avatar: "",
    isRead: 0,
    date_send: "2024-10-06 10:35:00",
  },
  {
    id: "4",
    name: "Michael Brown",
    latestMessage: "Can you provide an update on my order?",
    avatar: "",
    isRead: 1,
    date_send: "2024-10-05 10:30:00",
  },
  {
    id: "5",
    name: "Emily Davis",
    latestMessage: "My laundry is not complete, can you check?",
    avatar: "",
    isRead: 0,
    date_send: "2024-09-30 10:32:00",
  },
];

export default function D_messages() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  // Search handler function
  const handleSearch = (text) => {
    setSearchQuery(text);

    // Filter customers based on search query
    const filteredData = customers
      .filter((customer) =>
        customer.name.toLowerCase().includes(text.toLowerCase())
      )
      // Sort customers by date_send in descending order
      .sort((a, b) => new Date(b.date_send) - new Date(a.date_send));

    setFilteredCustomers(filteredData);
  };

  const handleCustomerSelect = (customer) => {
    navigation.navigate("message/chat", {
      customerId: customer.id,
      customerName: customer.name,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16 }}>
        <Text style={styles.header}>Messages</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Display filtered customers or no messages message */}
      {filteredCustomers.length === 0 ? (
        <View style={styles.noMessagesContainer}>
          <Image source={noconvo} style={styles.noMessagesImage} />
          <Text style={styles.noMessagesText}>No messages yet</Text>
        </View>
      ) : (
        <FlatList
          data={filteredCustomers}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Pressable
              style={[
                styles.customerContainer,
                index === 0 && styles.firstItem,
              ]}
              onPress={() => handleCustomerSelect(item)}
            >
              <Image
                source={item.avatar ? { uri: item.avatar } : d_profile}
                style={styles.avatar}
              />
              <View style={styles.messageContainer}>
                <Text style={styles.customerName}>{item.name}</Text>
                <Text
                  style={[
                    styles.latestMessage,
                    item.isRead === 0 && styles.unreadMessage,
                  ]}
                >
                  {truncateMessage(item.latestMessage, 50)}
                </Text>
              </View>
              <Text style={styles.timestamp}>{formatDate(item.date_send)}</Text>
            </Pressable>
          )}
          contentContainerStyle={styles.customerList}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    fontSize: 24,
    fontFamily: fonts.SemiBold,
    marginBottom: 15,
    color: COLORS.primary,
  },
  searchInput: {
    height: 40,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: fonts.Regular,
    backgroundColor: COLORS.white,
  },
  customerList: {
    flexGrow: 1,
    paddingBottom: 90,
  },
  customerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1, // Only bottom border for all items
    borderColor: "#e0e0e0",
  },
  firstItem: {
    borderTopWidth: 1, // Add top border only for the first item
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  messageContainer: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontFamily: fonts.Bold,
    color: COLORS.text1,
  },
  latestMessage: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: COLORS.primary,
  },
  unreadMessage: {
    fontSize: 14,
    fontFamily: fonts.Bold,
    color: COLORS.secondary,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: COLORS.secondary,
    marginLeft: 15,
    textAlign: "right",
  },
  noMessagesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMessagesImage: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    marginBottom: 16, // Space between the image and text
  },
  noMessagesText: {
    fontSize: 18,
    fontFamily: fonts.Regular,
    color: COLORS.secondary,
  },
});

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   Pressable,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import COLORS from "../../constants/colors";
// import { fonts } from "../../constants/fonts";
// import { truncateMessage } from "../../constants/method";
// import d_profile from "../../assets/images/d_profile1.png";
// import { useNavigation } from "expo-router";

// const customers = [
//   {
//     id: "1",
//     name: "John Doe",
//     latestMessage: "Hello, I have a question about my order.",
//     avatar: "",
//     timestamp: "11:30 AM",
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     latestMessage: "When will my laundry be delivered?",
//     avatar: "",
//     timestamp: "09:32 AM",
//   },
//   {
//     id: "3",
//     name: "Alice Johnson",
//     latestMessage: "Thank you for the quick delivery!",
//     avatar: "",
//     timestamp: "10:35 AM",
//   },
//   {
//     id: "4",
//     name: "John Doe",
//     latestMessage: "Hello, I have a question about my order.",
//     avatar: "",
//     timestamp: "10:30 AM",
//   },
//   {
//     id: "5",
//     name: "Jane Smith",
//     latestMessage: "When will my laundry be delivered?",
//     avatar: "",
//     timestamp: "10:32 AM",
//   },
// ];

// export default function D_messages() {
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredCustomers, setFilteredCustomers] = useState(customers);

//   // Search handler function
//   const handleSearch = (text) => {
//     setSearchQuery(text);

//     // Filter customers based on search query
//     const filteredData = customers.filter((customer) =>
//       customer.name.toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredCustomers(filteredData);
//   };

//   const handleCustomerSelect = (customer) => {
//     navigation.navigate("message/chat", {
//       customerId: customer.id,
//       customerName: customer.name,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{ padding: 16 }}>
//         <Text style={styles.header}>Messages</Text>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search customers..."
//           value={searchQuery}
//           onChangeText={handleSearch}
//         />
//       </View>

//       {/* Display filtered customers */}
//       <FlatList
//         data={filteredCustomers}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item, index }) => (
//           <Pressable
//             style={[styles.customerContainer, index === 0 && styles.firstItem]}
//             onPress={() => handleCustomerSelect(item)}
//           >
//             <Image
//               source={item.avatar ? { uri: item.avatar } : d_profile}
//               style={styles.avatar}
//             />
//             <View style={styles.messageContainer}>
//               <Text style={styles.customerName}>{item.name}</Text>
//               <Text style={styles.latestMessage}>
//                 {truncateMessage(item.latestMessage, 50)}
//               </Text>
//             </View>
//             <Text style={styles.timestamp}>{item.timestamp}</Text>
//           </Pressable>
//         )}
//         contentContainerStyle={styles.customerList}
//         showsVerticalScrollIndicator={false}
//         estimatedItemSize={100}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // padding: 16,
//     // backgroundColor: "#f5f5f5",
//     backgroundColor: COLORS.white,
//   },
//   header: {
//     fontSize: 24,
//     fontFamily: fonts.Regular,
//     marginBottom: 16,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: COLORS.grey,
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 16,
//     fontFamily: fonts.Regular,
//     backgroundColor: COLORS.white,
//   },
//   customerList: {
//     flexGrow: 1,
//     paddingBottom: 100,
//   },
//   customerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     backgroundColor: COLORS.white,
//     borderBottomWidth: 1, // Only bottom border for all items
//     borderColor: "#e0e0e0",
//   },
//   firstItem: {
//     borderTopWidth: 1, // Add top border only for the first item
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 30,
//     marginRight: 10,
//   },
//   messageContainer: {
//     flex: 1,
//   },
//   customerName: {
//     fontSize: 18,
//     fontFamily: fonts.Bold,
//     color: COLORS.text1,
//   },
//   latestMessage: {
//     fontSize: 14,
//     fontFamily: fonts.Regular,
//     color: COLORS.primary,
//   },
//   timestamp: {
//     fontSize: 12,
//     fontFamily: fonts.Regular,
//     color: COLORS.secondary,
//     marginLeft: 5,
//     textAlign: "right",
//   },
// });
