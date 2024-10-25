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
import {
  decryptMessage,
  formatDate,
  truncateMessage,
} from "../../constants/method";
import d_profile from "../../assets/images/d_profile4.png";
import { useFocusEffect, useNavigation } from "expo-router";
import { getInbox } from "../../data/api/getApi";
import useAuth from "../context/AuthContext";
import usePolling from "../../hooks/usePolling";

export default function Inbox() {
  const { userDetails } = useAuth();
  const navigation = useNavigation();
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchInbox = useCallback(async () => {
    try {
      const response = await getInbox(userDetails.userId);
      // Map the data to the structure needed for the FlatList
      return response.data.map((conversation) => {
        const isUserOne = conversation.user_one.id === userDetails.userId;
        const otherUser = isUserOne
          ? conversation.user_two
          : conversation.user_one;

        return {
          id: conversation.conversation_id, // conversation ID as unique key
          name: otherUser.full_name, // Get the name of the other user
          otherUserId: otherUser.id,
          avatar: otherUser.avatar || null, // Assuming avatar field is available, otherwise fallback to default
          latestMessage: decryptMessage(conversation.last_message.message),
          timestamp: conversation.last_message.date_sent, // The timestamp for the latest message
        };
      });
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

  const handleSearch = (text) => {
    setSearchQuery(text);

    const filteredData = inbox.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
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
        <View style={{ alignItems: "center" }}>
          <Text style={styles.header}>Messages</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search name..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Display filtered customers */}
      <FlatList
        data={searchQuery.length > 0 ? filteredCustomers : inbox}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            style={[styles.customerContainer, index === 0 && styles.firstItem]}
            onPress={() => handleGoToMessage(item.otherUserId, item.name)}
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
            <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
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
    fontSize: 25,
    fontFamily: fonts.Bold,
    marginBottom: 15,
    color: COLORS.secondary,
  },
  searchInput: {
    height: 50,
    borderColor: COLORS.border,
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
    backgroundColor: COLORS.background,
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
