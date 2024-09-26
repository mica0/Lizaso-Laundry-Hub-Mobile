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
import noconvo from "../../assets/images/start_convo.png"; // Import the image here

export default function Chat() {
  const route = useRoute();
  const navigation = useNavigation(); // Get the navigation object
  const { customerId, customerName } = route.params; // Extract parameters from the route

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef(); // Reference to the ScrollView

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: "staff", // Or "customer", based on the chat's direction
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{customerName}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Chat window */}
      <ScrollView
        contentContainerStyle={[
          styles.chatContainer,
          messages.length === 0 && styles.centeredContent, // Center the "Start Conversation" message
        ]}
        ref={scrollViewRef} // Attach the ref to the ScrollView
        keyboardShouldPersistTaps="handled" // Allows tapping on the input field while keyboard is open
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
          onSubmitEditing={handleSendMessage} // Send message on enter
          returnKeyType="send" // Change keyboard button to "Send"
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
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: COLORS.secondary, // Change this color as per your design
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  placeholder: {
    width: 50, // Placeholder width for alignment
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  centeredContent: {
    justifyContent: "center", // Center the content vertically when no messages
    alignItems: "center", // Center the content horizontally when no messages
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  noConversationImage: {
    width: 200, // Adjust size as needed
    height: 200, // Adjust size as needed
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
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
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
