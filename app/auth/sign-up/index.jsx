import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function index() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.primary,
            }}
          >
            Create Account
          </Text>
          <Text style={{ fontSize: 16, color: COLORS.primary }}>
            Connect with your friend today!
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
            Firstname
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your firstname"
              placeholderTextColor={COLORS.secondary}
              keyboardType="email"
              style={{ width: "100%" }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          {/* FIRST NAME */}
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
            Firstname
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your firstname"
              placeholderTextColor={COLORS.secondary}
              keyboardType="email"
              style={{ width: "100%" }}
            />
          </View>

          {/* USERNAME */}
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
            Firstname
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor={COLORS.secondary}
              keyboardType="email"
              style={{ width: "100%" }}
            />
          </View>

          {/* PASSWORD */}
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
            Firstname
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.secondary}
              secureTextEntry={isPasswordShown}
              style={{ width: "100%" }}
            />

            <TouchableOpacity
              style={{ position: "absolute", right: 12 }}
              onPress={() => setIsPasswordShown(!isPasswordShown)}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.primary} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>

          {/* CONFRIM PASSWORD */}
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
            Firstname
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.secondary}
              secureTextEntry={isPasswordShown}
              style={{ width: "100%" }}
            />

            <TouchableOpacity
              style={{ position: "absolute", right: 12 }}
              onPress={() => setIsPasswordShown(!isPasswordShown)}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.primary} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>

          {/* PHONE NUMBER */}
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
            Firstname
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your firstname"
              placeholderTextColor={COLORS.secondary}
              keyboardType="email"
              style={{ width: "100%" }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; // For navigation
// import { useRouter } from 'expo-router';

// export default function SignUp() {
//   const navigation = useNavigation();
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const router = useRouter();

//   const handleSignUp = () => {
//     // Handle sign-up logic here
//     console.log('Sign Up:', { username, email, password });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign Up</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <Button title="Sign Up" onPress={handleSignUp} />

//       <TouchableOpacity onPress={() => router.push('auth/sign-in') } style={styles.backButton}>
//         <Text style={styles.backButtonText}>Back to Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 8,
//     borderRadius: 4,
//   },
//   backButton: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   backButtonText: {
//     color: '#007bff',
//     fontSize: 16,
//   },
// });
