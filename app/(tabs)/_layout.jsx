import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import React from "react";
import TabBar from "../../components/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        // tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: "Explore",
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          tabBarLabel: "Payment",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}

// import { View, Text } from "react-native";
// import { Tabs } from "expo-router";
// import React from "react";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { Colors } from "../../constants/Colors";
// import TabBar from "../../components/TabBar";

// export default function TabLayout() {
//   return (
//     <Tabs
//       tabBar={(props) => <TabBar {...props} />}
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: Colors.PRIMARY,
//       }}
//     >
//       <Tabs.Screen
//         name="home"
//         options={{
//           tabBarLabel: "Home",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="home" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           tabBarLabel: "Explore",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="search" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="payment"
//         options={{
//           tabBarLabel: "Payment",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="search" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           tabBarLabel: "Profile",
//           tabBarIcon: ({ color }) => (
//             <MaterialIcons name="account-circle" size={24} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
