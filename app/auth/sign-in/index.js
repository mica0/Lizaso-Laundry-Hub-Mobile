import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../../constants/fonts";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const navigation = useNavigation();
  const router = useRouter();

  const handleLogin = () => {
    let hasError = false;

    // Validate inputs
    if (username.trim() === "") {
      setUsernameError("Username is required");
      hasError = true;
    } else {
      setUsernameError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      console.log("Username:", username);
      console.log("Password:", password);
    }
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    if (text.trim() !== "") {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.trim() !== "") {
      setPasswordError("");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/lizaso_logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          {/* Username Field */}
          <View style={{ marginBottom: 10, marginTop: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.Medium,
                marginVertical: 8,
                color: COLORS.primary,
                marginStart: 5,
              }}
            >
              Username
            </Text>
            <View
              style={[
                styles.inputContainer,
                usernameError ? styles.errorBorder : {},
              ]}
            >
              <TextInput
                placeholder="Enter your username"
                placeholderTextColor={COLORS.grey}
                keyboardType="default"
                style={{ width: "100%", fontFamily: fonts.Regular }}
                value={username}
                onChangeText={handleUsernameChange}
              />
            </View>
            {usernameError ? (
              <Text style={{ color: "red", fontSize: 12 }}>
                {usernameError}
              </Text>
            ) : null}
          </View>

          {/* Password Field */}
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.Medium,
                color: COLORS.primary,
                marginVertical: 8,
              }}
            >
              Password
            </Text>
            <View
              style={[
                styles.inputContainer,
                passwordError ? styles.errorBorder : {},
              ]}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.grey}
                secureTextEntry={!isPasswordShown}
                style={{ width: "100%", fontFamily: fonts.Regular }}
                value={password}
                onChangeText={handlePasswordChange}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{ position: "absolute", right: 12 }}
              >
                <Ionicons
                  name={isPasswordShown ? "eye-off" : "eye"}
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={{ color: "red", fontSize: 12 }}>
                {passwordError}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity>
            <Text
              style={{
                textAlign: "right",
                color: COLORS.primary,
                marginVertical: 5,
                fontFamily: fonts.Regular,
              }}
            >
              Forget Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
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
              Login
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: "center",
              marginVertical: 10,
              fontSize: 14,
              fontFamily: fonts.Regular,
              color: COLORS.primary,
            }}
          >
            or continue with
          </Text>

          {/* Google Login Button */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderWidth: 2,
              borderColor: COLORS.grayMedium,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
              marginBottom: 10,
            }}
          >
            <Image
              source={require("../../../assets/images/google_icon.png")}
              style={{ height: 20, width: 20 }}
            />
            <Text
              style={{
                fontSize: 15,
                color: COLORS.primary,
                fontFamily: fonts.Medium,
                marginLeft: 8,
              }}
            >
              Google
            </Text>
          </TouchableOpacity>

          {/* Register Link */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 5,
              gap:2
            }}
          >
            <Text style={{ color: COLORS.primary, fontFamily: fonts.Regular }}>
              New User?
            </Text>
            <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
              <Text
                style={{ color: COLORS.secondary, fontFamily: fonts.SemiBold }}
              >
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#447F8C",
  },
  safeArea: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  logo: {
    width: 200,
    height: 200,
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 25,
  },
  inputContainer: {
    width: "100%",
    height: 48,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
  },
  errorBorder: {
    borderColor: "red",
  },
});

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Image,
// } from "react-native";
// import { useNavigation, useRouter } from "expo-router";
// import COLORS from "../../../constants/colors";
// import { Ionicons } from "@expo/vector-icons";
// import { fonts } from "../../../constants/fonts";

// export default function SignIn() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [usernameError, setUsernameError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [isPasswordShown, setIsPasswordShown] = useState(false);

//   const navigation = useNavigation();

//   const handleGoRegister = () => {};

//   const handleLogin = () => {
//     let hasError = false;

//     // Validate inputs
//     if (username.trim() === "") {
//       setUsernameError("Username is required");
//       hasError = true;
//     } else {
//       setUsernameError("");
//     }

//     if (password.trim() === "") {
//       setPasswordError("Password is required");
//       hasError = true;
//     } else {
//       setPasswordError("");
//     }

//     if (!hasError) {
//       console.log("Username:", username);
//       console.log("Password:", password);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.logoContainer}>
//           <Image
//             source={require("../../../assets/images/lizaso_logo.png")}
//             style={styles.logo}
//           />
//         </View>
//         <View style={styles.formContainer}>
//           <View style={{ marginBottom: 10, marginTop: 1 }}>
//             <Text
//               style={{
//                 fontSize: 15,
//                 fontFamily: fonts.Medium,
//                 marginVertical: 8,
//                 color: COLORS.primary,
//               }}
//             >
//               Username
//             </Text>
//             <View
//               style={{
//                 width: "100%",
//                 height: 48,
//                 borderColor: COLORS.primary,
//                 borderWidth: 1,
//                 borderRadius: 8,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 paddingLeft: 22,
//               }}
//             >
//               <TextInput
//                 placeholder="Enter your username"
//                 placeholderTextColor={COLORS.grey}
//                 keyboardType="default"
//                 value={username}
//                 style={{ width: "100%", fontFamily: fonts.Regular }}
//               />
//             </View>
//           </View>
//           <View style={{ marginBottom: 10 }}>
//             <Text
//               style={{
//                 fontSize: 15,
//                 fontFamily: fonts.Medium,
//                 color: COLORS.primary,
//                 marginVertical: 8,
//               }}
//             >
//               Password
//             </Text>
//             <View
//               style={{
//                 width: "100%",
//                 height: 48,
//                 borderColor: COLORS.primary,
//                 borderWidth: 1,
//                 borderRadius: 8,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 paddingLeft: 22,
//               }}
//             >
//               <TextInput
//                 placeholder="Enter your password"
//                 placeholderTextColor={COLORS.grey}
//                 secureTextEntry={isPasswordShown}
//                 style={{ width: "100%", fontFamily: fonts.Regular }}
//               />

//               <TouchableOpacity
//                 onPress={() => setIsPasswordShown(!isPasswordShown)}
//                 style={{ position: "absolute", right: 12 }}
//               >
//                 {isPasswordShown == true ? (
//                   <Ionicons name="eye-off" size={24} color={COLORS.primary} />
//                 ) : (
//                   <Ionicons name="eye" size={24} color={COLORS.primary} />
//                 )}
//               </TouchableOpacity>
//             </View>
//           </View>
//           <TouchableOpacity>
//             <Text
//               style={{
//                 textAlign: "right",
//                 color: COLORS.primary,
//                 marginVertical: 5,
//                 fontFamily: fonts.Regular,
//               }}
//             >
//               Forget Password?
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               backgroundColor: COLORS.secondary,
//               borderRadius: 10,
//               marginTop: 10,
//               padding: 10,
//             }}
//           >
//             <Text
//               style={{
//                 color: COLORS.white,
//                 fontSize: 15,
//                 fontFamily: fonts.Bold,
//                 textAlign: "center",
//               }}
//             >
//               Login
//             </Text>
//           </TouchableOpacity>
//           <Text
//             style={{
//               textAlign: "center",
//               marginVertical: 10,
//               fontSize: 14,
//               fontFamily: fonts.Regular,
//               color: COLORS.primary,
//             }}
//           >
//             or continue with
//           </Text>
//           <TouchableOpacity
//             style={{
//               flexDirection: "row",
//               borderWidth: 2,
//               borderColor: COLORS.grayMedium,
//               borderRadius: 10,
//               justifyContent: "center",
//               alignItems: "center",
//               padding: 8,
//               gap: 10,
//             }}
//           >
//             <Image
//               source={require("../../../assets/images/google_icon.png")}
//               style={{ height: 20, width: 20 }}
//             />
//             <Text
//               style={{
//                 fontSize: 15,
//                 color: COLORS.primary,
//                 fontFamily: fonts.Medium,
//               }}
//             >
//               Google
//             </Text>
//           </TouchableOpacity>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//               marginVertical: 15,
//               gap: 2,
//             }}
//           >
//             <Text style={{ color: COLORS.primary, fontFamily: fonts.Regular }}>
//               New User?
//             </Text>
//             <TouchableOpacity>
//               <Text
//                 style={{ color: COLORS.secondary, fontFamily: fonts.SemiBold }}
//               >
//                 Register Now
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#447F8C",
//   },
//   safeArea: {
//     flex: 1,
//   },
//   logoContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginVertical: 20,
//   },
//   logo: {
//     width: 200,
//     height: 200,
//   },
//   formContainer: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//     padding: 25,
//   },
// });

{
  /* <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../../../assets/images/lizaso_logo.png")} // Ensure the path is correct
          style={styles.logo}
        />
        <View style={styles.formContainer}>
          <View style={{ marginVertical: 22 }}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>Don't have account? Register now</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor={COLORS.grey}
              keyboardType="email-address"
              style={[styles.input, usernameError && styles.inputError]}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            {usernameError ? (
              <Text style={styles.errorText}>{usernameError}</Text>
            ) : null}
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.grey}
              secureTextEntry
              style={[styles.input, passwordError && styles.inputError]}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView> */
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   logo: {
//     width: "100%",
//     height: 200,
//     resizeMode: "cover", // Cover the width of the screen while maintaining the aspect ratio
//   },
//   formContainer: {
//     padding: 25,
//     marginTop: 20, // Adjust as needed to ensure proper spacing
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginVertical: 12,
//     color: COLORS.primary,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: COLORS.primary,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "400",
//     marginVertical: 8,
//   },
//   input: {
//     padding: 15,
//     borderColor: COLORS.grey,
//     borderWidth: 1,
//     borderRadius: 15,
//   },
//   inputError: {
//     borderColor: COLORS.error, // Define a color for the error border
//   },
//   button: {
//     backgroundColor: "#007BFF",
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   errorText: {
//     color: COLORS.error, // Define a color for the error text
//     fontSize: 14,
//     marginTop: 4,
//   },
// });

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
// } from "react-native";
// import { useRouter } from "expo-router";
// import COLORS from "../../../constants/colors";

// export default function SignIn() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [usernameError, setUsernameError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const router = useRouter();

//   const handleLogin = () => {
//     let hasError = false;

//     // Validate inputs
//     if (username.trim() === "") {
//       setUsernameError("Username is required");
//       hasError = true;
//     } else {
//       setUsernameError("");
//     }

//     if (password.trim() === "") {
//       setPasswordError("Password is required");
//       hasError = true;
//     } else {
//       setPasswordError("");
//     }

//     // If there are no errors, proceed with login
//     if (!hasError) {
//       console.log("Username:", username);
//       console.log("Password:", password);
//       // Add login logic here, e.g., API call
//       // router.push('/home'); // Navigate to another screen on successful login
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Uncomment and update the logo as needed */}
//       {/* <Image
//         source={require("../../../assets/images/lizaso_logo.png")}
//         style={styles.logo}
//       /> */}
//       <View style={styles.formContainer}>
//         <View style={{ marginVertical: 22 }}>
//           <Text style={styles.title}>Create Account</Text>
//           <Text style={styles.subtitle}>Connect with your friend today!</Text>
//         </View>

//         <View style={{ marginBottom: 12 }}>
//           <Text style={styles.label}>Username</Text>
//           <TextInput
//             placeholder="Enter your username"
//             placeholderTextColor={COLORS.grey}
//             keyboardType="email-address"
//             style={[styles.input, usernameError && styles.inputError]}
//             value={username}
//             onChangeText={(text) => setUsername(text)}
//           />
//           {usernameError ? (
//             <Text style={styles.errorText}>{usernameError}</Text>
//           ) : null}
//         </View>

//         <View style={{ marginBottom: 12 }}>
//           <Text style={styles.label}>Password</Text>
//           <TextInput
//             placeholder="Enter your password"
//             placeholderTextColor={COLORS.grey}
//             secureTextEntry
//             style={[styles.input, passwordError && styles.inputError]}
//             value={password}
//             onChangeText={(text) => setPassword(text)}
//           />
//           {passwordError ? (
//             <Text style={styles.errorText}>{passwordError}</Text>
//           ) : null}
//         </View>

//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Sign In</Text>
//         </TouchableOpacity>

//         {/* Add a signup link or additional components if needed */}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   formContainer: {
//     padding: 25,
//     marginTop: 60,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginVertical: 12,
//     color: COLORS.primary,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: COLORS.primary,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "400",
//     marginVertical: 8,
//   },
//   input: {
//     padding: 15,
//     borderColor: COLORS.grey,
//     borderWidth: 1,
//     borderRadius: 15,
//   },
//   inputError: {
//     borderColor: COLORS.error, // Define a color for the error border
//   },
//   button: {
//     backgroundColor: "#007BFF",
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   errorText: {
//     color: COLORS.error, // Define a color for the error text
//     fontSize: 14,
//     marginTop: 4,
//   },
// });

// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native"; // For navigation
// import { useRouter } from "expo-router";
// import COLORS from "../../../constants/colors";

// export default function SignIn() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();

//   const handleLogin = () => {
//     console.log("Username:", username);
//     console.log("Password:", password);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* <Image
//         source={require("../../../assets/images/lizaso_logo.png")}
//         style={styles.logo}
//       /> */}
//       <View style={styles.formContainer}>
//         <View style={{ marginVertical: 22 }}>
//           <Text
//             style={{
//               fontSize: 22,
//               fontWeight: "bold",
//               marginVertical: 12,
//               color: COLORS.primary,
//             }}
//           >
//             Create Accounts
//           </Text>
//           <Text style={{ fontSize: 16, color: COLORS.primary }}>
//             Connect with your friend today!
//           </Text>
//         </View>

//         <View style={{ marginBottom: 12 }}>
//           <Text
//             style={{
//               fontSize: 16,
//               fontWeight: 400,
//               marginVertical: 8,
//             }}
//           >
//             Username
//           </Text>
//           <View>
//             <TextInput
//               placeholder="Enter your username"
//               placeholderTextColor={COLORS.grey}
//               keyboardType="email"
//               style={styles.input}
//             />
//           </View>
//         </View>
//         <View style={{ marginBottom: 12 }}>
//           <Text
//             style={{
//               fontSize: 16,
//               fontWeight: 400,
//               marginVertical: 8,
//             }}
//           >
//             Password
//           </Text>
//           <View>
//             <TextInput
//               placeholder="Enter your password"
//               placeholderTextColor={COLORS.grey}
//               keyboardType="email"
//               style={styles.input}
//             />
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   formContainer: {
//     padding: 25,
//     marginTop: 60,
//   },
//   logo: {
//     width: "80%",
//     height: 200,
//     resizeMode: "contain",
//     marginBottom: 20,
//   },
//   input: {
//     padding: 15,
//     borderColor: COLORS.grey,
//     borderWidth: 1,
//     borderRadius: 15,
//   },
//   button: {
//     backgroundColor: "#007BFF",
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   signupText: {
//     color: "#007BFF",
//     textAlign: "center",
//   },
// });

{
  /* <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("auth/sign-up")}>
          <Text style={styles.signupText}>
            Don't have an account yet? Sign Up
          </Text>
        </TouchableOpacity> */
}
