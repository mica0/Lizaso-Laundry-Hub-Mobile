import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function Chat() {
  const route = useRoute();
  const navigation = useNavigation(); // Get the navigation object
  const { customerId, customerName } = route.params; // Extract parameters from the route

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "customer" },
    { id: 2, text: "I want to know the status of my order.", sender: "staff" },
  ]);
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
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{customerName}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Chat window */}
      <ScrollView
        contentContainerStyle={styles.chatContainer}
        ref={scrollViewRef} // Attach the ref to the ScrollView
        keyboardShouldPersistTaps="handled" // Allows tapping on the input field while keyboard is open
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.sender === "staff" ? styles.sent : styles.received,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: "#2196F3", // Change this color as per your design
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
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6", // Light green color for sent messages
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC", // Light gray for received messages
  },
  messageText: {
    fontSize: 16,
    color: "#333",
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
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

// import { useRoute } from "@react-navigation/native";
// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
// } from "react-native";

// export default function Chat() {
//   const route = useRoute();
//   const { customerId, customerName } = route.params; // Extract parameters from the route

//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hello! How can I help you today?", sender: "customer" },
//     { id: 2, text: "I want to know the status of my order.", sender: "staff" },
//   ]);
//   const [newMessage, setNewMessage] = useState("");
//   const scrollViewRef = useRef(); // Reference to the ScrollView

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const newMsg = {
//         id: messages.length + 1,
//         text: newMessage,
//         sender: "staff", // Or "customer", based on the chat's direction
//       };
//       setMessages((prevMessages) => [...prevMessages, newMsg]);
//       setNewMessage("");
//     }
//   };

//   useEffect(() => {
//     // Scroll to the bottom when messages update
//     scrollViewRef.current.scrollToEnd({ animated: true });
//   }, [messages]);

//   return (
//     <View style={styles.container}>
//       {/* Chat window */}
//       <ScrollView
//         contentContainerStyle={styles.chatContainer}
//         ref={scrollViewRef} // Attach the ref to the ScrollView
//         keyboardShouldPersistTaps="handled" // Allows tapping on the input field while keyboard is open
//       >
//         {messages.map((message) => (
//           <View
//             key={message.id}
//             style={[
//               styles.messageContainer,
//               message.sender === "staff" ? styles.sent : styles.received,
//             ]}
//           >
//             <Text style={styles.messageText}>{message.text}</Text>
//           </View>
//         ))}
//       </ScrollView>

//       {/* Message input field */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           value={newMessage}
//           onChangeText={setNewMessage}
//           placeholder="Type a message"
//           style={styles.input}
//           onSubmitEditing={handleSendMessage} // Send message on enter
//           returnKeyType="send" // Change keyboard button to "Send"
//         />
//         <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 10,
//   },
//   chatContainer: {
//     flexGrow: 1,
//     justifyContent: "flex-end",
//     paddingBottom: 10,
//   },
//   messageContainer: {
//     maxWidth: "80%",
//     padding: 10,
//     borderRadius: 20,
//     marginBottom: 10,
//   },
//   sent: {
//     alignSelf: "flex-end",
//     backgroundColor: "#DCF8C6", // Light green color for sent messages
//   },
//   received: {
//     alignSelf: "flex-start",
//     backgroundColor: "#ECECEC", // Light gray for received messages
//   },
//   messageText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderTopWidth: 1,
//     borderColor: "#ccc",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     backgroundColor: "#f9f9f9",
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     backgroundColor: "#fff",
//   },
//   sendButton: {
//     marginLeft: 10,
//     backgroundColor: "#2196F3",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//   },
//   sendButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });
