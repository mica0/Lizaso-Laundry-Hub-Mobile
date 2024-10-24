// import React, { useCallback, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TextInput,
//   Pressable,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import COLORS from "../../constants/colors";
// import { fonts } from "../../constants/fonts";
// import { formatDate, truncateMessage } from "../../constants/method";
// import d_profile from "../../assets/images/d_profile1.png";
// import { useFocusEffect, useNavigation } from "expo-router";
// import noconvo from "../../assets/images/start_convo.png";
// import { getStaffMessage } from "../../data/api/getApi";
// import useAuth from "../context/AuthContext";
// import usePolling from "../../hooks/usePolling";

// const customers = [
//   {
//     id: "1",
//     name: "Rose Oriana",
//     latestMessage: "Hello, I have a question about my service request.",
//     avatar: "",
//     sender_type: "Staff",
//     receiver_type: "Customer",
//     isRead: 0,
//     date_send: "2024-10-09 09:30:00",
//   },
// ];

// export default function D_messages() {
//   const userDetails = useAuth();
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState("");

//   const userId = 6;

//   // const fetchMessages = useCallback(async () => {
//   //   try {
//   //     const response = await getStaffMessage(userId);

//   //     if (response && response.length > 0) {
//   //       const messageData = response[0];

//   //       return messageData.messages;
//   //     } else {
//   //       return [];
//   //     }
//   //   } catch (error) {
//   //     return []; // Return an empty array in case of error
//   //   }

//   //   // const response = await getStaffMessage(userId);
//   //   // console.log(1);
//   //   // console.log(response);
//   //   // return response;
//   // }, [userId]);

//   // const {
//   //   data: messages,
//   //   loading,
//   //   error,
//   //   setIsPolling,
//   // } = usePolling(fetchMessages, 2000);
//   const fetchMessages = useCallback(async () => {
//     try {
//       const response = await getStaffMessage(userDetails.userId);
//       return response;
//     } catch (error) {
//       return [];
//     }
//   }, [userId]);

//   const {
//     data: inboxData,
//     loading,
//     error,
//     setIsPolling,
//   } = usePolling(fetchMessages, 2000);

//   useFocusEffect(
//     useCallback(() => {
//       setIsPolling(true);

//       return () => {
//         setIsPolling(false);
//       };
//     }, [])
//   );

//   // const [filteredCustomers, setFilteredCustomers] = useState([]);

//   // const fetchMessaqge = async () => {
//   //   try {
//   //     const data = await getStaffMessage(storeId);
//   //     setPickupData(data);
//   //   } catch (err) {
//   //     setError(err.message || "Something went wrong");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchLaundryPickup();
//   // }, [storeId]);

//   const handleSearch = (text) => {
//     setSearchQuery(text);

//     // Filter customers based on search query
//     const filteredData = customers
//       .filter((customer) =>
//         customer.name.toLowerCase().includes(text.toLowerCase())
//       )
//       // Sort customers by date_send in descending order
//       .sort((a, b) => new Date(b.date_send) - new Date(a.date_send));

//     setFilteredCustomers(filteredData);
//   };

//   const handleCustomerSelect = (item) => {
//     navigation.navigate("message/chat", {
//       customerId: item.id,
//       customerName: item.recipient_full_name,
//       sender_type: "Staff",
//       receiver_type: "Customer",
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

//       {/* Display filtered customers or no messages message */}
//       {/* {customers.length === 0 ? (
//         <View style={styles.noMessagesContainer}>
//           <Image source={noconvo} style={styles.noMessagesImage} />
//           <Text style={styles.noMessagesText}>No messages yet</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={customers}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item, index }) => (
//             <Pressable
//               style={[
//                 styles.customerContainer,
//                 index === 0 && styles.firstItem,
//               ]}
//               onPress={() => handleCustomerSelect(item)}
//             >
//               <Image
//                 source={item.avatar ? { uri: item.avatar } : d_profile}
//                 style={styles.avatar}
//               />
//               <View style={styles.messageContainer}>
//                 <Text style={styles.customerName}>
//                   {item.recipient_fullname}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.latestMessage,
//                     item.isRead === 0 && styles.unreadMessage,
//                   ]}
//                 >
//                   {truncateMessage(item.message, 50)}
//                 </Text>
//               </View>
//               <Text style={styles.timestamp}>{formatDate(item.date_sent)}</Text>
//             </Pressable>
//           )}
//           contentContainerStyle={styles.customerList}
//           showsVerticalScrollIndicator={false}
//           estimatedItemSize={100}
//         />

//         // <FlatList
//         //   data={messages}
//         //   keyExtractor={(item) => item.id}
//         //   renderItem={({ item, index }) => (
//         //     <Pressable
//         //       style={[
//         //         styles.customerContainer,
//         //         index === 0 && styles.firstItem,
//         //       ]}
//         //       onPress={() => handleCustomerSelect(item)}
//         //     >
//         //       <Image
//         //         source={item.avatar ? { uri: item.avatar } : d_profile}
//         //         style={styles.avatar}
//         //       />
//         //       <View style={styles.messageContainer}>
//         //         <Text style={styles.customerName}>
//         //           {item.recipient_customer_fullname}
//         //         </Text>
//         //         <Text
//         //           style={[
//         //             styles.latestMessage,
//         //             item.isRead === 0 && styles.unreadMessage,
//         //           ]}
//         //         >
//         //           {truncateMessage(item.message, 50)}
//         //         </Text>
//         //       </View>
//         //       <Text style={styles.timestamp}>{formatDate(item.date_sent)}</Text>
//         //     </Pressable>
//         //   )}
//         //   contentContainerStyle={styles.customerList}
//         //   showsVerticalScrollIndicator={false}
//         //   estimatedItemSize={100}
//         // />
//       )} */}
//     </SafeAreaView>
//   );
// }

import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { truncateMessage } from "../../constants/method";
import d_profile from "../../assets/images/d_profile1.png";
import { useFocusEffect, useNavigation } from "expo-router";
import { getInbox } from "../../data/api/getApi";
import useAuth from "../context/AuthContext";
import usePolling from "../../hooks/usePolling";

const customers = [
  {
    id: "1",
    name: "John Doe",
    latestMessage: "Hello, I have a question about my order.",
    avatar: "",
    timestamp: "11:30 AM",
  },
  {
    id: "2",
    name: "Jane Smith",
    latestMessage: "When will my laundry be delivered?",
    avatar: "",
    timestamp: "09:32 AM",
  },
  {
    id: "3",
    name: "Alice Johnson",
    latestMessage: "Thank you for the quick delivery!",
    avatar: "",
    timestamp: "10:35 AM",
  },
  {
    id: "4",
    name: "John Doe",
    latestMessage: "Hello, I have a question about my order.",
    avatar: "",
    timestamp: "10:30 AM",
  },
  {
    id: "5",
    name: "Jane Smith",
    latestMessage: "When will my laundry be delivered?",
    avatar: "",
    timestamp: "10:32 AM",
  },
];

export default function Inbox() {
  const { userDetails } = useAuth();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchInbox = useCallback(async () => {
    try {
      const response = await getInbox(userDetails.userId);
      return response.data;
    } catch (error) {
      return [];
    }
  }, [userDetails.userId]);

  const {
    data: inbox,
    loading,
    error,
    setIsPolling,
  } = usePolling(fetchInbox, 10000);

  useFocusEffect(
    useCallback(() => {
      setIsPolling(true);

      return () => {
        setIsPolling(false);
      };
    }, [])
  );

  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const filterInbox = useCallback(() => {
    // Example filtering by user name or only showing conversations with unread messages
    const filtered = inbox.filter((conversation) => {
      const userOneName = conversation.user_one.full_name.toLowerCase();
      const userTwoName = conversation.user_two.full_name.toLowerCase();

      // Example filter criteria:
      // 1. Filter based on whether the user's name contains a search term (optional)
      // 2. Or filter conversations with unread messages
      const searchTerm = ""; // Define your search term here, if needed
      const hasUnreadMessages = conversation.last_message.is_read === 0;

      return (
        userOneName.includes(searchTerm.toLowerCase()) ||
        userTwoName.includes(searchTerm.toLowerCase()) ||
        hasUnreadMessages
      );
    });

    setFilteredCustomers(filtered);
  }, [inbox]);

  useEffect(() => {
    if (inbox) {
      filterInbox();
    }
  }, [inbox, filterInbox]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = customers.filter((customer) =>
      customer.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCustomers(filteredData);
  };

  const handleGoToMessage = async (id, name) => {
    navigation.navigate("message/chat", {
      user_id: id,
      name: name,
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

      {/* Display filtered customers */}
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Pressable
            style={[styles.customerContainer, index === 0 && styles.firstItem]}
            onPress={() => handleGoToMessage(item.id, item.name)}
          >
            <Image
              source={item.avatar ? { uri: item.avatar } : d_profile}
              style={styles.avatar}
            />
            <View style={styles.messageContainer}>
              <Text style={styles.customerName}>{item.name}</Text>
              <Text style={styles.latestMessage}>
                {truncateMessage(item.latestMessage, 50)}
              </Text>
            </View>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </Pressable>
        )}
        contentContainerStyle={styles.customerList}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={100}
      />
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
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  noMessagesText: {
    fontSize: 18,
    fontFamily: fonts.Regular,
    color: COLORS.secondary,
  },
});

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
