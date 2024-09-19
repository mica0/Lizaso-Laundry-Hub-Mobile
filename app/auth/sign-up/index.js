import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../../constants/fonts";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: fonts.Bold,
              marginVertical: 12,
              color: COLORS.primary,
            }}
          >
            Create Accounts
          </Text>
          <Text style={{ fontSize: 16, fontFamily: fonts.Regular, color: COLORS.primary }}>
            Connect with your friend today!
          </Text>
        </View>

        {/* MOBILE NUMBER */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Mobile Number
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="+63"
              placeholderTextColor={COLORS.primary}
              keyboardType="numeric"
              style={{
                width: "12%",
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: "100%",
              }}
            />
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.grey}
              keyboardType="numeric"
              style={{ width: "80%" }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Username
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
              placeholderTextColor={COLORS.grey}
              keyboardType="email"
              style={{ width: "100%" }}
            />
          </View>
        </View>

        {/* PASSWORD */}
        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
          Password
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
            placeholderTextColor={COLORS.grey}
            secureTextEntry={isPasswordShown}
            style={{ width: "100%" }}
          />

          <TouchableOpacity
            onPress={() => setIsPasswordShown(!isPasswordShown)}
            style={{ position: "absolute", right: 12 }}
          >
            {isPasswordShown == true ? (
              <Ionicons name="eye-off" size={24} color={COLORS.primary} />
            ) : (
              <Ionicons name="eye" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", marginVertical: 6 }}></View>

        {/* Login Button */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.secondary,
            borderRadius: 10,
            marginTop: 10,
            padding: 10,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 15,
              fontFamily: fonts.Bold,
              textAlign: "center",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
              gap:2
            }}
          >
            <Text style={{ color: COLORS.primary, fontFamily: fonts.Regular }}>
            Already have account?
            </Text>
            <TouchableOpacity onPress={() => router.navigate('/auth/sign-in')}>
              <Text
                style={{ color: COLORS.secondary, fontFamily: fonts.SemiBold }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
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
