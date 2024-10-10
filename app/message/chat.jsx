import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import noconvo from "../../assets/images/start_convo.png";
import { LinearGradient } from "expo-linear-gradient";
import { setPostNewMessage } from "../../data/api/postApi";

export default function Chat() {
  const route = useRoute();
  const navigation = useNavigation();
  const { customerId, customerName, sender_type, receiver_type } = route.params;

  // Sample messages data
  const sampleMessages = [
    { id: 1, text: "Hi there! How can I assist you today?", sender: "staff" },
    { id: 2, text: "I need help with my order.", sender: "customer" },
    {
      id: 3,
      text: "Sure! Can you provide me with your order number?",
      sender: "staff",
    },
    { id: 4, text: "It's #12345.", sender: "customer" },
    { id: 5, text: "Thank you! I will check that for you.", sender: "staff" },
  ];

  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef();

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const senderId = 3;
      const newMsg = {
        receiverId: customerId,
        text: newMessage,
        senderType: sender_type,
        receiverType: receiver_type,
      };

      try {
        const response = await setPostNewMessage(senderId, newMsg);
      } catch (error) {
        console.error("Failed to send message:", error);
      }

      setNewMessage("");
    }
  };

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (messages.length > 0) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#5787C8", "#71C7DA"]}
        locations={[0, 0.8]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.5, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{customerName}</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      {/* Chat window */}
      <ScrollView
        contentContainerStyle={[
          styles.chatContainer,
          messages.length === 0 && styles.centeredContent, // Center the "Start Conversation" message
        ]}
        ref={scrollViewRef} // Attach the ref to the ScrollView
        keyboardShouldPersistTaps="handled" // Allows tapping on the input field while keyboard is open
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image source={noconvo} style={styles.noConversationImage} />
            <Text style={styles.startConversationText}>
              Start a conversation now!
            </Text>
          </View>
        ) : (
          messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.sender === "staff" ? styles.sent : styles.received,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Message input field */}
      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
          style={styles.input}
          onSubmitEditing={handleSendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingVertical: 5,
    backgroundColor: COLORS.secondary,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: COLORS.secondary,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.Bold,
    textAlign: "center",
    flex: 1,
    color: COLORS.white,
  },
  placeholder: {
    width: 50,
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  noConversationImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  startConversationText: {
    fontSize: 18,
    color: COLORS.secondary,
    fontFamily: fonts.Medium,
    textAlign: "center",
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: "#C7D7EC",
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
  },
  messageText: {
    fontSize: 16,
    color: COLORS.text3,
    fontFamily: fonts.Medium,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});
